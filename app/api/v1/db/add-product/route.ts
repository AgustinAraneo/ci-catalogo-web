import { type NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import Busboy from "busboy";
import { v4 as uuidv4 } from "uuid";
import { Readable } from "stream";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type") || "";

  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json(
      { error: "Content-Type debe ser multipart/form-data" },
      { status: 400 }
    );
  }

  try {
    console.log("Iniciando parseo del formulario...");
    const formData = await parseFormData(req);
    console.log("Formulario parseado:", formData);

    // Extraer los campos y archivos
    const fields = formData.fields;
    const file = formData.files.image;

    console.log("Campos recibidos:", fields);
    console.log("Archivo recibido:", file);

    const {
      title,
      description,
      price,
      sizes,
      quantity,
      discountPrice,
      category,
    } = fields;

    if (!title || price === undefined || !sizes) {
      console.error("Faltan datos obligatorios");
      return NextResponse.json(
        { error: "Faltan datos obligatorios: title, price o sizes" },
        { status: 400 }
      );
    }

    // Convertir sizes y category a arreglos
    const sizesArray = Array.isArray(sizes) ? sizes : [sizes];
    const categoryArray = category
      ? Array.isArray(category)
        ? category
        : [category]
      : [];

    console.log("Sizes procesados:", sizesArray);
    console.log("Categorías procesadas:", categoryArray);

    // Manejar la carga del archivo
    // Manejar la carga del archivo
    let imageUrl = "";
    if (file) {
      console.log("Procesando archivo para subir a Cloudflare R2...");

      // Sanitizar el nombre del archivo
      const sanitizedFilename = file.filename
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^a-z0-9_\.-]/g, "");

      const fileKey = `${uuidv4()}-${sanitizedFilename}`;

      const s3Client = new S3Client({
        region: "auto",
        endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID!,
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
        },
      });

      const uploadParams = {
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: fileKey,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      console.log("Subiendo archivo con los parámetros:", uploadParams);
      const command = new PutObjectCommand(uploadParams);
      await s3Client.send(command);

      // Codificar el fileKey al construir la URL
      const encodedFileKey = encodeURIComponent(fileKey);
      imageUrl = `https://${process.env.R2_PUBLIC_HOST}/${encodedFileKey}`;
      console.log("Archivo subido exitosamente:", imageUrl);
    }

    // Guardar el producto en la base de datos
    console.log("Guardando producto en la base de datos...");
    const newProduct = await prisma.product.create({
      data: {
        title: title as string,
        description: description || null,
        price: parseFloat(price as string),
        discountPrice: discountPrice
          ? parseFloat(discountPrice as string)
          : null,
        sizes: sizesArray as string[],
        quantity: quantity ? parseInt(quantity as string, 10) : null,
        imageUrl: imageUrl,
        category: categoryArray as string[],
      },
    });

    console.log("Producto guardado exitosamente:", newProduct);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// Definir interfaces para los campos y archivos
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

// Función para parsear el formulario usando Busboy
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
      // Manejar campos que pueden ser arrays
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

    // Convertir el cuerpo de la solicitud a un Node.js Stream
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
