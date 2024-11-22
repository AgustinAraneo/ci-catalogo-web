import Link from "next/link";
import { Button } from "../../Button/button";

export const Discount = () => {
  return (
    <div className="relative z-10 bg-center bg-no-repeat bg-cover bg-banner-discount mb-12">
      <div className="container mx-auto py-16 sm:py-28 lg:py-52 flex flex-col-reverse lg:flex-row justify-end items-center">
        <div className="max-w-full sm:max-w-lg lg:mr-20 text-center lg:text-left">
          <span className="text-4xl sm:text-5xl lg:text-6xl font-mrs-saint-delafield text-yellow-600">
            Descuentos
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl leading-tight sm:leading-snug capitalize mt-4">
            ¡Reclama tu <span className="font-bold text-pink-600">50%</span> Off!
          </h1>
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed font-tenor-sans mt-4">
            Nourish your skin with toxin-free cosmetic products. With the offers
            that you can’t refuse.
          </p>
          <Link href="/shop">
            <Button className="text-white font-bold py-2 px-4 mt-6 sm:mt-10 lg:mt-16 bg-primary hover:bg-primary/90 rounded-xl">
              Get Now!
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
