import React from "react";
import type { Product } from "@/types/type";

type SingleProductProps = {
  product: Product;
};

export const SingleProduct = ({ product }: SingleProductProps) => {
  return (
    <div className="relative mx-4">
      <div className="relative w-[200px] h-[120px] overflow-hidden mx-auto">
        <img
          src={product.imageUrl}
          width={200}
          height={120}
          alt={product.title}
          className="object-cover w-full h-full transition-transform duration-500"
        />
      </div>
      <div className="text-center mt-4">
        <h2 className="text-base capitalize text-gray-800 mb-1 font-serif">
          {product.title}
        </h2>
        <h4 className="text-sm text-gray-600 mb-1 font-serif">
          {product.description}
        </h4>
        <div className="flex items-center justify-center text-sm font-semibold text-gray-600">
          {product.discountPrice && (
            <span className="text-gray-400 line-through mr-2 font-normal">
              ${product.price}
            </span>
          )}
          <span>${product.discountPrice || product.price}</span>
        </div>
      </div>
    </div>
  );
};
