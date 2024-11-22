import Link from "next/link";
import type { SingleProductProps } from "@/types/type";

export const SingleProduct = ({ product }: SingleProductProps) => {
  return (
    <Link href={`/shop/${product.id}`}>
      <div className="relative mx-4 cursor-pointer">
        <div className="relative w-[220px] h-[320px] overflow-hidden mx-auto rounded-lg shadow-md">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="object-fill w-full h-full"
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
    </Link>
  );
};
