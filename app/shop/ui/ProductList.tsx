import React, { type FC } from "react";
import { ProductCard } from "./ProductCard";
import type { ProductNeedId } from "@/types/type";

type ProductListProps = {
  products: ProductNeedId[];
  imageUrls: Record<string, string | null>;
};

export const ProductList: FC<ProductListProps> = ({ products, imageUrls }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          imageUrl={imageUrls[product.id] || null}
        />
      ))}
    </div>
  );
};
