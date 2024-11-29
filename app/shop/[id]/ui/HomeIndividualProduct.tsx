import React, { useState } from "react";
import { FaWhatsapp, FaInstagram, FaEnvelope } from "react-icons/fa";
import type { Product } from "@/types/type";
import { Button } from "@/components/ui/Button/button";
import { useRouter } from "next/navigation";

type HomeIndividualProductProps = {
  product: Product | null;
};

export const HomeIndividualProduct: React.FC<HomeIndividualProductProps> = ({
  product,
}) => {
  const router = useRouter();

  const imageUrl = product?.imageUrl || "/assets/Productos/fallback-image.jpg";

  const handleBuy = () => {
    if (product) {
      const whatsappMessage = `Hola! \n\nQuería consultarles por el producto: "${product.title}"`;
      window.open(
        `https://wa.me/5491171466601?text=${encodeURIComponent(
          whatsappMessage
        )}`,
        "_blank"
      );
    }
  };

  const inStock = product?.quantity && product.quantity > 0;

  // Image zoom state
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => setIsZoomed(true);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const handleMouseLeave = () => setIsZoomed(false);

  return (
    <div className="container mx-auto  flex flex-col items-center px-4 md:px-0">
      <div className="relative flex flex-col md:flex-row items-start space-y-8 md:space-y-0 md:justify-between w-full">
        <div
          className="relative w-full md:w-2/3 h-auto overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {product?.discountPrice && (
            <div className="absolute top-2 left-2  bg-red-500 text-white px-3 py-1 text-sm rounded font-lato z-[10]">
              SALE
            </div>
          )}
          <img
            src={imageUrl}
            alt={product?.title || "Producto"}
            className={`w-full h-auto object-cover object-center transition-transform duration-300 w-full md:w-[550px] h-[55vh] md:h-[500px] ${
              isZoomed ? "scale-150" : "scale-100"
            }`}
            style={{
              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
            }}
          />
        </div>

        <div className="w-full md:w-[60%]">
          <h1 className="text-3xl font-bold mb-4">{product?.title}</h1>
          <p
            className={`text-xl font-semibold ${
              inStock ? "text-green-600" : "text-red-600"
            } pb-2`}
          >
            {inStock ? "EN STOCK" : "SIN STOCK"}
          </p>
          <p className="text-gray-500 pb-4 break-words">
            Código: {product?.id}
          </p>

          <div className="flex gap-2 font-lato">
            {product?.discountPrice && (
              <p className="text-lg font-bold text-black-primary">
                {new Intl.NumberFormat("es-AR", {
                  style: "currency",
                  currency: "ARS",
                }).format(product?.discountPrice)}
              </p>
            )}
            <p
              className={`text-lg font-bold ${
                product?.discountPrice
                  ? "line-through text-gray-500"
                  : "text-black-primary"
              }`}
            >
              {new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS",
              }).format(product?.price ?? 0)}
            </p>
          </div>

          <div className="mb-6">
            <p className="font-bold mb-2">Talles:</p>
            <div className="flex space-x-2">
              {product?.sizes.map((size, index) => (
                <button
                  key={index}
                  className="p-2 border border-gray-300 rounded hover:border-black"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {product?.description && (
            <div className="mb-6">
              <p className="font-bold mb-2">Descripción:</p>
              <p className="text-gray-700">{product.description}</p>
            </div>
          )}

          {/* Social Media Links */}
          <div className="mb-6 flex items-center space-x-4">
            <p className="font-bold">Síguenos en nuestras redes:</p>
            <div className="flex space-x-2">
              <div className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
                <a
                  href="https://wa.me/5491171466601"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="text-2xl text-green-600 hover:text-green-800" />
                </a>
              </div>
              <div className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
                <a
                  href="https://www.instagram.com/chinitha_fine"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="text-2xl text-pink-500 hover:text-pink-700" />
                </a>
              </div>
              <div className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
                <a href="mailto:izquierdoceleste65@gmail.com">
                  <FaEnvelope className="text-2xl text-gray-600 hover:text-gray-800" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex gap-4 items-center pt-4">
            <Button
              variant="default"
              className="relative w-[110px] inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white bg-black rounded-md transition duration-300 overflow-hidden group"
              onClick={handleBuy}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-yellow-500 to-yellow-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
              <span className="relative z-10">
                {inStock ? "Comprar" : "Consultar disponibilidad"}
              </span>
            </Button>

            <Button
              variant="outline"
              className="relative w-[110px] inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-black border border-black rounded overflow-hidden group transition-all"
              onClick={() => router.push("/shop")}
            >
              <span className="absolute inset-0 bg-gray-700 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
              <span className="relative z-10 group-hover:text-white">
                Volver
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
