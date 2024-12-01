import React from "react";
import { Skeleton } from "@/components/ui/Skeleton/skeleton";

export const HomeIndividualSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto flex flex-col items-center px-4 md:px-0">
      <div className="relative flex flex-col md:flex-row items-start space-y-8 md:space-y-0 md:justify-between w-full md:gap-16">
        {/* Imagen principal */}
        <div className="relative w-full md:w-[550px] h-auto overflow-hidden">
          <Skeleton className="w-full h-[55vh] md:h-[500px]" />
          <div className="flex gap-2 mt-4">
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} className="w-16 h-16 rounded" />
            ))}
          </div>
        </div>

        {/* Información del producto */}
        <div className="w-full md:w-[60%] space-y-4">
          <Skeleton className="h-8 w-3/4" /> {/* Título */}
          <Skeleton className="h-6 w-1/4" /> {/* Estado de stock */}
          <Skeleton className="h-4 w-1/2" /> {/* Código */}
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-24" /> {/* Precio con descuento */}
            <Skeleton className="h-8 w-20" /> {/* Precio original */}
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-1/3" /> {/* Título talles */}
            <div className="flex space-x-2">
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} className="h-8 w-12 rounded" />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-1/3" /> {/* Título descripción */}
            <Skeleton className="h-16 w-full" /> {/* Descripción */}
          </div>
          <div className="flex gap-4">
            <Skeleton className="w-[110px] h-12 rounded-md" />{" "}
            {/* Botón Comprar */}
            <Skeleton className="w-[110px] h-12 rounded-md" />{" "}
            {/* Botón Volver */}
          </div>
        </div>
      </div>

      {/* Productos relacionados */}
      <div className="w-full mt-20 text-center">
        <Skeleton className="h-8 w-1/2 mx-auto" /> {/* Título */}
      </div>
      <div className="w-full max-w-5xl pb-12 hidden md:flex flex-row gap-8 justify-center mt-16">
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="w-[290px]  h-[420px] rounded-md" />
        ))}
      </div>
      <div className="w-full max-w-5xl pb-12 md:hidden flex md:flex-row flex-col gap-8 justify-center mt-12">
        {[...Array(1)].map((_, index) => (
          <Skeleton
            key={index}
            className="w-[290px] mx-auto  h-[420px] rounded-md"
          />
        ))}
      </div>
    </div>
  );
};
