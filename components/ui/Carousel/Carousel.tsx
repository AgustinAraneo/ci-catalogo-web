"use client";
import * as React from "react";
import {
  Carousel as ShadcnCarousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { SingleProduct } from "./SingleProduct";
import type { Product } from "@/types/type";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Carousel = ({ products }: { products: Product[] }) => {
  const [api, setApi] = React.useState<CarouselApi>();

  // Determina el número de columnas según el tamaño de pantalla
  const getGridColumns = () => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width >= 1280) return 5; // xl
      if (width >= 1024) return 4; // lg
      if (width >= 768) return 3; // md
      return 2; // sm
    }
    return 5; // Default to xl
  };

  const [gridColumns, setGridColumns] = React.useState(getGridColumns);

  React.useEffect(() => {
    const handleResize = () => setGridColumns(getGridColumns());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Si hay menos productos que columnas, centra los elementos
  const justifyClass =
    products.length < gridColumns ? "justify-center" : "justify-start";

  return (
    <div className="w-full max-w-7xl mx-auto">
      <ShadcnCarousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className={`flex ${justifyClass}`}>
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <div className="p-1">
                <SingleProduct product={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </ShadcnCarousel>
      <div className="mt-2 flex justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => api?.scrollPrev()}
          aria-label="Producto anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => api?.scrollNext()}
          aria-label="Siguiente producto"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
