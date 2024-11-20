import Link from "next/link";
import { Button } from "../../Button/button";

export const Discount = () => {
  return (
    <div className="relative z-[1] bg-center bg-no-repeat bg-cover bg-banner-discount mb-12">
      <div className="container mx-auto py-[214px] flex justify-end">
        <div className="max-w-[465px] mr-[84px]">
          <span className="text-[60px] pl-[9px] font-mrs-saint-delafield text-[#c89018]">
            Descuentos
          </span>
          <h1 className="text-6xl leading-normal capitalize mt-4">
            ¡Reclama tu <span className="font-bold text-pink-600">50%</span> Off!
          </h1>
          <p className="text-[20px] leading-[1.5] font-tenor-sans pl-[10px] mt-4">
            Nourish your skin with toxin-free cosmetic products. With the offers
            that you can’t refuse.
          </p>
          <Link href="/shop">
            <Button className="text-white font-bold py-2 px-4 mt-[60px] ml-[10px] bg-primary hover:bg-primary/90 rounded-xl">
              Get Now!
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
