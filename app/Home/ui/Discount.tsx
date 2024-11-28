import { Button } from "@/components/ui/Button/button";
import Link from "next/link";

export const Discount = () => {
  return (
    <div className="relative z-10 bg-center bg-cover bg-banner-discount min-h-[80vh]">
      <div className="container mx-auto py-16 sm:py-28 lg:py-52 flex flex-col-reverse lg:flex-row justify-end items-center">
        <div className="max-w-full sm:max-w-lg lg:mr-20 text-center lg:text-left flex flex-col gap-4 bg-white/60 p-4 rounded-md lg:bg-transparent lg:p-0 lg:static lg:transform-none lg:items-start absolute inset-0 m-auto h-fit items-center justify-center">
          <span className="text-3xl sm:text-4xl lg:text-5xl font-mrs-saint-delafield text-yellow-700">
            Envios a todo el país
          </span>
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl leading-tight sm:leading-snug">
              Envíos a toda{" "}
              <span className="font-bold capitalize text-black/80">
                Argentina
              </span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed font-tenor-sans">
              Rápidos y seguros en compras mayoristas y minoristas a todo el
              país.
            </p>
          </div>
          <Link href="/shop">
            <Button className="text-white font-bold !py-2 h-full !px-8 text-lg font-lato rounded-[8px] bg-primary hover:bg-primary/90 transition-all">
              Contactanos
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
