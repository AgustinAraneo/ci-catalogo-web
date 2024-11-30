// app/api/v1/db/products/[id]/route.ts

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

// Tipos e interfaces utilizados
interface FormFields {
  title?: string;
  description?: string;
  price?: string;
  sizes?: string;
  quantity?: string;
  discountPrice?: string;
  category?: string;
  [key: string]: undefined | string;
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

// Función para parsear form-data en el handler PUT
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
      fields[fieldname] = val;
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

// Handler para GET: Obtener un producto por ID
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

// Handler para PUT: Actualizar un producto por ID
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

    const { fields, files } = await parseFormData(req);

    // Obtener el producto existente
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    const data: Partial<ProductRequestBody> = {};

    // Validar y asignar campos
    if (fields.title) {
      data.title = fields.title;
    }

    if (fields.price) {
      const parsedPrice = parseFloat(fields.price);
      if (isNaN(parsedPrice)) {
        throw new Error("El precio no es válido");
      }
      data.price = parsedPrice;
    }

    if (fields.discountPrice !== undefined) {
      if (fields.discountPrice === "") {
        data.discountPrice = null;
      } else {
        const parsedDiscountPrice = parseFloat(fields.discountPrice);
        if (!isNaN(parsedDiscountPrice)) {
          data.discountPrice = parsedDiscountPrice;
        } else {
          throw new Error("El precio de descuento no es válido");
        }
      }
    }

    if (fields.quantity !== undefined) {
      if (fields.quantity === "") {
        data.quantity = null;
      } else {
        const parsedQuantity = parseInt(fields.quantity, 10);
        if (!isNaN(parsedQuantity)) {
          data.quantity = parsedQuantity;
        } else {
          throw new Error("La cantidad no es válida");
        }
      }
    }

    if (fields.sizes) {
      try {
        data.sizes = JSON.parse(fields.sizes);
        if (!Array.isArray(data.sizes)) {
          throw new Error("Sizes debe ser un array");
        }
      } catch {
        throw new Error("Formato inválido en sizes");
      }
    }

    if (fields.category) {
      try {
        data.category = JSON.parse(fields.category);
        if (!Array.isArray(data.category)) {
          throw new Error("Category debe ser un array");
        }
      } catch {
        throw new Error("Formato inválido en category");
      }
    }

    if (fields.description) {
      data.description = fields.description;
    }

    // Procesar imagen principal si se proporciona
    if (files.image) {
      try {
        if (existingProduct.imageUrl) {
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

    // Procesar imágenes secundarias
    if (existingProduct.secondaryImages) {
      data.secondaryImages = [...existingProduct.secondaryImages];
    } else {
      data.secondaryImages = [];
    }

    for (const key in files) {
      const match = key.match(/^secondaryImage-(\d+)$/);
      if (match) {
        const index = parseInt(match[1], 10);
        const file = files[key];

        // Eliminar la imagen antigua del bucket si existe
        const oldImageUrl = existingProduct.secondaryImages
          ? existingProduct.secondaryImages[index]
          : null;
        if (oldImageUrl) {
          const imageKey = oldImageUrl.split("/").pop();
          if (imageKey) {
            await s3Client.send(
              new DeleteObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME!,
                Key: imageKey,
              })
            );
          }
        }

        // Subir la nueva imagen
        const sanitizedFilename = file.filename
          .toLowerCase()
          .replace(/\s+/g, "_")
          .replace(/[^a-z0-9_\.-]/g, "");
        const fileKey = `${uuidv4()}-${sanitizedFilename}`;

        await s3Client.send(
          new PutObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME!,
            Key: fileKey,
            Body: file.buffer,
            ContentType: file.mimetype,
          })
        );

        const newImageUrl = `${process.env.R2_PUBLIC_HOST}/${fileKey}`;

        // Actualizar el array de secondaryImages
        data.secondaryImages[index] = newImageUrl;
      }
    }
    for (const key in files) {
      const match = key.match(/^newSecondaryImage-(\d+)$/);
      if (match) {
        const file = files[key];

        // Subir la nueva imagen
        const sanitizedFilename = file.filename
          .toLowerCase()
          .replace(/\s+/g, "_")
          .replace(/[^a-z0-9_\.-]/g, "");
        const fileKey = `${uuidv4()}-${sanitizedFilename}`;

        await s3Client.send(
          new PutObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME!,
            Key: fileKey,
            Body: file.buffer,
            ContentType: file.mimetype,
          })
        );

        const newImageUrl = `${process.env.R2_PUBLIC_HOST}/${fileKey}`;

        // Agregar la nueva imagen al array de secondaryImages
        data.secondaryImages.push(newImageUrl);
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

// Handler para DELETE: Eliminar un producto por ID
export async function DELETE(
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

    // Obtener el producto existente
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    // Eliminar imagen principal del bucket S3
    if (existingProduct.imageUrl) {
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

    // Eliminar imágenes secundarias del bucket S3
    if (
      existingProduct.secondaryImages &&
      existingProduct.secondaryImages.length > 0
    ) {
      for (const imageUrl of existingProduct.secondaryImages) {
        const imageKey = imageUrl.split("/").pop();
        if (imageKey) {
          await s3Client.send(
            new DeleteObjectCommand({
              Bucket: process.env.R2_BUCKET_NAME!,
              Key: imageKey,
            })
          );
        }
      }
    }

    // Eliminar el producto de la base de datos
    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Producto eliminado con éxito" },
      { status: 200 }
    );
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
      console.error("Error al eliminar el producto:", error.message);
      return NextResponse.json(
        { error: "Error interno del servidor", details: error.message },
        { status: 500 }
      );
    }

    console.error("Error desconocido al eliminar el producto:", error);
    return NextResponse.json(
      { error: "Error desconocido", details: String(error) },
      { status: 500 }
    );
  }
}
