import React, { type FC } from "react";
import Link from "next/link";
import type { Product } from "@/types/type";

type ProductCardProps = {
  product: Product;
  imageUrl: string | null;
};

export const ProductCard: FC<ProductCardProps> = ({ product, imageUrl }) => {
  return (
    <Link href={`/shop/${product.id}`}>
      <div>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full h-[315px] object-cover rounded-md mb-4 transition-transform duration-300 transform hover:scale-105 hover:translate-x-1 hover:translate-y-1"
          />
        ) : (
          <p className="text-gray-500 italic mb-4">Sin imagen</p>
        )}
        <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
        <p className="text-gray-500 mb-2">{product.category}</p>
        <div className="flex gap-2">
          <p
            className={`text-lg font-bold ${
              product.discountPrice
                ? "line-through text-gray-500"
                : "text-blue-600"
            }`}
          >
            {new Intl.NumberFormat("es-AR", {
              style: "currency",
              currency: "ARS",
            }).format(product.price)}
          </p>
          {product.discountPrice && (
            <p className="text-lg font-bold text-green-500">
              {new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS",
              }).format(product.discountPrice)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
