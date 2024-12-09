import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { SingleProductProps } from "@/types/type";

export const SingleProduct = ({
  product,
  isMobile = false,
}: SingleProductProps & { isMobile?: boolean }) => {
  const isPlaceholder = product.id?.startsWith("placeholder") ?? false;
  const isOnSale =
    product.discountPrice && product.discountPrice < product.price;

  const sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw";

  const ProductImage = (
    <div className="relative w-full aspect-[3/4] overflow-hidden">
      {isPlaceholder && (
        <Badge variant="secondary" className="absolute top-2 right-2 z-10">
          PRÓXIMAMENTE
        </Badge>
      )}
      {!isPlaceholder && isOnSale && (
        <Badge variant="destructive" className="absolute top-2 left-2 z-10">
          SALE
        </Badge>
      )}
      <div className="relative w-full h-full">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={isPlaceholder ? "Próximamente" : product.title}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-300 transform hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 italic">Sin imagen</span>
          </div>
        )}
      </div>
    </div>
  );

  const ProductDetails = (
    <>
      <h2
        className="text-lg font-semibold mb-2 overflow-hidden line-clamp-2"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
      >
        {product.title}
      </h2>
      <p
        className="text-sm text-gray-500 mb-2 overflow-hidden line-clamp-2"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
      >
        {isPlaceholder ? "\u00A0" : product.description}
      </p>
      {!isPlaceholder && (
        <div className="flex justify-between items-center w-full mt-2">
          <div className="flex gap-2 items-center">
            {product.discountPrice && (
              <p className="text-base font-bold text-black-primary">
                {new Intl.NumberFormat("es-AR", {
                  style: "currency",
                  currency: "ARS",
                }).format(product.discountPrice)}
              </p>
            )}
            <p
              className={`text-base font-bold ${
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
        </div>
      )}
    </>
  );

  if (isMobile) {
    return (
      <div className="w-full">
        <Link href={`/shop/${product.id}`} className="block w-full">
          {ProductImage}
        </Link>
        {!isPlaceholder && <div className="p-4">{ProductDetails}</div>}
      </div>
    );
  }

  const ProductContent = (
    <Card
      className={`w-full h-[500px] flex flex-col ${
        isPlaceholder ? "opacity-60" : ""
      }`}
    >
      <CardContent className="p-0">{ProductImage}</CardContent>
      <CardFooter className="flex flex-col items-start p-4 h-[180px] justify-between">
        <div className="w-full flex flex-col justify-between h-full">
          {ProductDetails}
        </div>
      </CardFooter>
    </Card>
  );

  return isPlaceholder ? (
    ProductContent
  ) : (
    <Link href={`/shop/${product.id}`} className="w-full h-full">
      {ProductContent}
    </Link>
  );
};
