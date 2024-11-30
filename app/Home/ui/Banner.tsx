import { Button } from "@/components/ui/Button/button";
import Link from "next/link";

export const Banner = () => {
  return (
    <>
      <div className="relative h-screen bg-banner-home bg-left bg-no-repeat bg-cover flex items-center lg:bg-center">
        <div className="container mx-auto px-4">
          <div className="pl-5 sm:pl-10 lg:pl-20">
            <span className="text-5xl lg:text-[60px] pl-2 lg:pl-3 font-mrs-saint-delafield text-yellow-600">
              Calidad que se nota
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-tight sm:leading-snug mt-4">
              Estilo y Comodidad
            </h1>
            <p className="max-w-full sm:max-w-md lg:max-w-[465px] text-base sm:text-lg lg:text-[20px] leading-relaxed sm:leading-normal mt-4 font-tenor-sans pl-2 lg:pl-3 pb-4">
              Ropa pensada para vos, con telas que cuidan tu piel y diseños que
              acompañan tu día a día. Aprovechá nuestras ofertas y llevate lo
              mejor.
            </p>
            <Link href="/shop">
              <Button className="text-white font-bold !py-2 h-full !px-8 text-lg font-lato rounded-[8px] bg-primary hover:bg-primary/90 transition-all">
                Ver Productos
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute left-0 top-1/3 w-full flex justify-center">
          <img
            className="w-[80%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[42.4%] h-auto max-w-3xl hidden md:block lg:block"
            src="/assets/img/main-block-decor.png"
            alt=""
          />
        </div>
      </div>
    </>
  );
};
