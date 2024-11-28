export const revalidate = 0;

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc", 
      },
    });

    if (!products || products.length === 0) {
      return NextResponse.json(
        { message: "No hay productos disponibles." },
        { status: 404 }
      );
    }

    return NextResponse.json(products, {
      status: 200,
      headers: {
        "Cache-Control": "no-store", 
      },
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); 
  }
}
