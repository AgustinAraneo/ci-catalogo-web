import Link from "next/link";
import { Button } from "../../Button/button";

export const Banner = () => {
  return (
    <>
      <div className="relative z-[1] h-screen bg-gray-400 bg-center bg-no-repeat bg-cover flex items-center">
        <div className="container mx-auto px-4">
          <div className="pl-20">
            <span className="text-[60px] pl-[9px] font-mrs-saint-delafield text-[#c89018]">
              Calidad que se nota
            </span>
            <h1 className="text-6xl leading-normal">Estilo y Comodidad</h1>
            <p className="max-w-[465px] text-[20px] leading-[1.5] font-tenor-sans pl-[10px]">
              Ropa pensada para vos, con telas que cuidan tu piel y diseños que
              acompañan tu día a día. Aprovechá nuestras ofertas y llevate lo
              mejor.
            </p>
            <Link href="/shop">
              <Button className="text-white font-bold py-2 px-4 mt-4 rounded-xl">
                Ver Productos
              </Button>
            </Link>
          </div>
        </div>
        <img
          className="absolute left-0 top-[36%] w-[42.4%] z-[-1]"
          src="/assets/img/main-block-decor.png"
          alt=""
        />
      </div>
    </>
  );
};
