import { type NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { ProductRequestBody } from "@/types/type";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body: ProductRequestBody = await req.json();
    const { title, price, sizes, quantity } = body;

    if (!title || price === undefined || !Array.isArray(sizes)) {
      return NextResponse.json(
        { error: "Faltan datos obligatorios: title, price o sizes" },
        { status: 400 }
      );
    }

    const newProduct = await prisma.product.create({
      data: {
        title,
        price,
        sizes,
        quantity: quantity !== undefined ? quantity : null,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error al agregar producto:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
