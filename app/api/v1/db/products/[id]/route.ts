import { type NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import Busboy from "busboy";
import { Readable } from "stream";
import type { ProductRequestBody } from "@/types/type";

const prisma = new PrismaClient();

const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

interface FormFields {
  title?: string;
  description?: string;
  price?: string;
  sizes?: string | string[];
  quantity?: string;
  discountPrice?: string;
  category?: string | string[];
  [key: string]: undefined | string | string[];
}

interface FormFile {
  filename: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
}

interface FormFiles {
  [key: string]: FormFile;
}

async function parseFormData(
  req: NextRequest
): Promise<{ fields: FormFields; files: FormFiles }> {
  return new Promise((resolve, reject) => {
    const busboy = Busboy({
      headers: {
        "content-type": req.headers.get("content-type") || "",
      },
    });

    const fields: FormFields = {};
    const files: FormFiles = {};

    busboy.on(
      "file",
      (
        fieldname: string,
        file: Readable,
        info: { filename: string; encoding: string; mimeType: string }
      ) => {
        const { filename, encoding, mimeType } = info;
        const chunks: Buffer[] = [];

        file.on("data", (chunk: Buffer) => {
          chunks.push(chunk);
        });

        file.on("end", () => {
          const buffer = Buffer.concat(chunks);
          files[fieldname] = {
            filename,
            encoding,
            mimetype: mimeType,
            buffer,
          };
        });
      }
    );

    busboy.on("field", (fieldname: string, val: string) => {
      if (fields[fieldname]) {
        if (Array.isArray(fields[fieldname])) {
          (fields[fieldname] as string[]).push(val);
        } else {
          fields[fieldname] = [fields[fieldname] as string, val];
        }
      } else {
        fields[fieldname] = val;
      }
    });

    busboy.on("finish", () => {
      resolve({ fields, files });
    });

    busboy.on("error", (err) => {
      reject(err);
    });

    const reader = req.body?.getReader();

    const stream = new Readable({
      async read() {
        if (!reader) {
          this.push(null);
          return;
        }
        try {
          const { done, value } = await reader.read();
          if (done) {
            this.push(null);
          } else {
            this.push(Buffer.from(value));
          }
        } catch (err) {
          this.destroy(err as Error);
        }
      },
    });

    stream.pipe(busboy);
  });
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error al obtener el producto:", error);

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    if (product.imageUrl) {
      const imageKey = product.imageUrl.split("/").pop();
      try {
        await s3Client.send(
          new DeleteObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME!,
            Key: imageKey!,
          })
        );
        console.log(`Imagen ${imageKey} eliminada del bucket.`);
      } catch (error) {
        console.error("Error al eliminar la imagen del bucket:", error);
      }
    }

    // Eliminar el producto de la base de datos
    const deletedProduct = await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Producto eliminado con éxito",
      deletedProduct,
    });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);

    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "ID no proporcionado" },
        { status: 400 }
      );
    }

    const formData = await parseFormData(req);
    const { fields, files } = formData;

    const data: Partial<ProductRequestBody> = {};

    // Validar y asignar campos
    if (fields.title) {
      data.title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
    }

    if (fields.price) {
      const priceValue = Array.isArray(fields.price)
        ? fields.price[0]
        : fields.price;
      const parsedPrice = parseFloat(priceValue);
      if (isNaN(parsedPrice)) {
        throw new Error("El precio no es válido");
      }
      data.price = parsedPrice;
    }

    if (fields.discountPrice) {
      const discountPriceValue = Array.isArray(fields.discountPrice)
        ? fields.discountPrice[0]
        : fields.discountPrice;
      const parsedDiscountPrice = parseFloat(discountPriceValue);
      if (!isNaN(parsedDiscountPrice)) {
        data.discountPrice = parsedDiscountPrice;
      }
    }

    if (fields.quantity) {
      const quantityValue = Array.isArray(fields.quantity)
        ? fields.quantity[0]
        : fields.quantity;
      const parsedQuantity = parseInt(quantityValue, 10);
      if (!isNaN(parsedQuantity)) {
        data.quantity = parsedQuantity;
      }
    }

    if (fields.sizes) {
      const sizesValue = Array.isArray(fields.sizes)
        ? fields.sizes[0]
        : fields.sizes;
      try {
        data.sizes = JSON.parse(sizesValue);
        if (!Array.isArray(data.sizes)) {
          throw new Error("Sizes debe ser un array");
        }
      } catch {
        throw new Error("Formato inválido en sizes");
      }
    }

    if (fields.category) {
      const categoryValue = Array.isArray(fields.category)
        ? fields.category[0]
        : fields.category;
      try {
        data.category = JSON.parse(categoryValue);
        if (!Array.isArray(data.category)) {
          throw new Error("Category debe ser un array");
        }
      } catch {
        throw new Error("Formato inválido en category");
      }
    }

    if (fields.description) {
      data.description = Array.isArray(fields.description)
        ? fields.description[0]
        : fields.description;
    }

    if (files.image) {
      try {
        const existingProduct = await prisma.product.findUnique({
          where: { id },
        });

        if (existingProduct?.imageUrl) {
          const imageKey = existingProduct.imageUrl.split("/").pop();
          if (imageKey) {
            await s3Client.send(
              new DeleteObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME!,
                Key: imageKey,
              })
            );
          }
        }

        const sanitizedFilename = files.image.filename
          .toLowerCase()
          .replace(/\s+/g, "_")
          .replace(/[^a-z0-9_\.-]/g, "");
        const fileKey = `${uuidv4()}-${sanitizedFilename}`;

        await s3Client.send(
          new PutObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME!,
            Key: fileKey,
            Body: files.image.buffer,
            ContentType: files.image.mimetype,
          })
        );

        data.imageUrl = `${process.env.R2_PUBLIC_HOST}/${fileKey}`;
      } catch (imageError) {
        console.error("Error al manejar la imagen:", imageError);
        throw new Error("Error al procesar la imagen");
      }
    }

    // Actualizar producto
    const updatedProduct = await prisma.product.update({
      where: { id },
      data,
    });

    return NextResponse.json({
      message: "Producto actualizado con éxito",
      updatedProduct,
    });
  } catch (error: unknown) {
    // Manejo específico para errores conocidos
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    if (error instanceof Error) {
      console.error("Error al actualizar el producto:", error.message);
      return NextResponse.json(
        { error: "Error interno del servidor", details: error.message },
        { status: 500 }
      );
    }

    console.error("Error desconocido al actualizar el producto:", error);
    return NextResponse.json(
      { error: "Error desconocido", details: String(error) },
      { status: 500 }
    );
  }
}
