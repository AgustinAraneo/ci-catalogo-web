import Link from "next/link";
import type { SingleProductProps } from "@/types/type";

export const SingleProduct = ({ product }: SingleProductProps) => {
  const isPlaceholder = product.id?.startsWith("placeholder") ?? false;
  const isOnSale =
    product.discountPrice && product.discountPrice < product.price;

  const ProductContent = (
    <div
      className={`relative mx-4 ${
        isPlaceholder ? "cursor-not-allowed opacity-60" : "cursor-pointer"
      }`}
    >
      <div className="relative w-[290px] h-[420px] overflow-hidden mx-auto rounded-lg shadow-md">
        {isPlaceholder && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-3 py-1 text-sm rounded z-[10]">
            PRÓXIMAMENTE
          </div>
        )}
        {!isPlaceholder && isOnSale && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 text-sm rounded z-[10]">
            SALE
          </div>
        )}
        <img
          src={product.imageUrl}
          alt={product.title}
          className="object-cover w-full h-full shadow-redcoach-lg transition-transform duration-300 transform hover:scale-105 hover:translate-x-1 hover:translate-y-1"
        />
      </div>
      <div className="text-center">
        <h2 className="text-xl font-semibold pt-6">{product.title}</h2>
        <h4 className="text-gray-500 pb-2">
          {isPlaceholder ? "Nuevos productos en camino" : product.description}
        </h4>
        {!isPlaceholder && (
          <div className="flex gap-2 justify-center font-lato">
            {product.discountPrice && (
              <p className="text-lg font-bold text-black-primary">
                {new Intl.NumberFormat("es-AR", {
                  style: "currency",
                  currency: "ARS",
                }).format(product.discountPrice)}
              </p>
            )}
            <p
              className={`text-lg font-bold ${
                product.discountPrice
                  ? "line-through text-gray-500"
                  : "text-black-primary"
              }`}
            >
              {new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS",
              }).format(product.price)}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return isPlaceholder ? (
    ProductContent
  ) : (
    <Link href={`/shop/${product.id}`}>{ProductContent}</Link>
  );
};
