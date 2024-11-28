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

  const imageUrl =
    product?.imageUrl || "/assets/Productos/fallback-image.jpg";

  const handleBuy = () => {
    if (product) {
      const whatsappMessage = `Hola! \n\nQuería consultarles por el producto: "${product.title}"`;
      window.open(
        `https://wa.me/5491171466601?text=${encodeURIComponent(whatsappMessage)}`,
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
    <div className="container mx-auto p-8 pt-10 flex flex-col items-center">
      <div className="relative flex flex-col md:flex-row items-start space-y-8 md:space-y-0 md:space-x-8 p-6">
        <div
          className="relative w-full md:w-2/3 h-auto overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {product?.discountPrice && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 text-sm rounded font-lato">
              SALE
            </div>
          )}
          <img
            src={imageUrl}
            alt={product?.title || "Producto"}
            className={`w-full h-auto object-cover transition-transform duration-300 ${
              isZoomed ? "scale-150" : "scale-100"
            }`}
            style={{
              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
            }}
          />
        </div>

        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product?.title}</h1>
          <p
            className={`text-xl font-semibold ${
              inStock ? "text-green-600" : "text-red-600"
            } mb-2`}
          >
            {inStock ? "EN STOCK" : "SIN STOCK"}
          </p>
          <p className="text-gray-500 pb-4 break-words">
            Código: {product?.id}
          </p>

          <div className="flex items-center mb-4">
            {product?.discountPrice && (
              <p className="line-through text-gray-400 mr-2">
                ${product.price.toFixed(2)}
              </p>
            )}
            <p className="text-2xl font-bold text-black">
              $
              {product?.discountPrice
                ? product.discountPrice.toFixed(2)
                : product?.price.toFixed(2)}
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

          <div className="flex justify-start mt-4 space-x-2">
            <Button
              variant="default"
              className="bg-black text-white px-6 py-2 rounded-md text-sm hover:bg-yellow-500 hover:text-black transition-all"
              onClick={handleBuy}
            >
              {inStock ? "Comprar" : "Consultar disponibilidad"}
            </Button>

            <Button
              variant="outline"
              className="bg-white border border-black text-black hover:bg-gray-200 hover:text-black transition-all px-6 py-2 rounded"
              onClick={() => router.push("/shop")}
            >
              Volver
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
