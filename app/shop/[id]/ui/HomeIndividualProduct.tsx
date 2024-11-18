"use client";
import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaInstagram, FaEnvelope } from "react-icons/fa";
import type { Product } from "@/types/type";

type HomeIndividualProductProps = {
  product: Product | null;
};

const HomeIndividualProduct: React.FC<HomeIndividualProductProps> = ({ product }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (product) {
      setLoading(false);
    }
  }, [product]);

  const handleBuy = () => {
    const whatsappMessage = `Hola! \n\nQuería consultarles por el producto: "${product?.title}"`;
    window.open(
      `https://wa.me/5491171466601?text=${encodeURIComponent(whatsappMessage)}`,
      "_blank"
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen container mx-auto p-8 mt-10">
        <div className="flex flex-col md:flex-row items-start space-y-8 md:space-y-0 md:space-x-8">
          <div className="w-full md:w-1/3 bg-gray-300 h-64 rounded animate-pulse"></div>
          <div className="w-full md:w-1/2 space-y-4">
            <div className="h-8 bg-gray-300 rounded w-3/4 animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded w-1/4 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded w-1/3 animate-pulse"></div>
            <div className="flex space-x-2">
              <div className="h-8 bg-gray-300 rounded w-12 animate-pulse"></div>
              <div className="h-8 bg-gray-300 rounded w-12 animate-pulse"></div>
              <div className="h-8 bg-gray-300 rounded w-12 animate-pulse"></div>
            </div>
            <div className="h-12 bg-gray-300 rounded w-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  const inStock = product && product.quantity && product.quantity > 0;

  return (   
    
    <div className="container mx-auto p-8 mt-10">      
      <div className="relative flex flex-col md:flex-row items-start space-y-8 md:space-y-0 md:space-x-8 border rounded-lg shadow-lg p-6">
        {product?.discountPrice && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded">
            SALE
          </div>
        )}

        <div className="w-full md:w-1/3">
          <img
            src={product?.imageUrl}
            alt={product?.title}
            className="w-full h-auto object-cover rounded"
          />
        </div>

        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product?.title}</h1>
          <p className={`text-xl font-semibold ${inStock ? "text-green-600" : "text-red-600"} mb-2`}>
            {inStock ? "EN STOCK" : "SIN STOCK"}
          </p>
          <p className="text-gray-500 mb-4">Código: {product?.id}</p>

         <div className="flex items-center mb-4">
          {product?.discountPrice && (
            <p className="line-through text-gray-400 mr-2">${product?.price.toFixed(2)}</p>
          )}
          <p className="text-2xl font-bold text-black">
            ${product?.discountPrice ? product?.discountPrice.toFixed(2) : product?.price.toFixed(2)}
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

          <div className="mb-6">
            <p className="font-bold mb-2">Síguenos en nuestras redes:</p>
            <div className="flex space-x-4">
              <a href="https://wa.me/5491171466601" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="text-2xl text-green-600 hover:text-green-800" />
              </a>
              <a href="https://www.instagram.com/chinitha_fine" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-2xl text-pink-500 hover:text-pink-700" />
              </a>
              <a href="mailto:izquierdoceleste65@gmail.com">
                <FaEnvelope className="text-2xl text-gray-600 hover:text-gray-800" />
              </a>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleBuy}
              className="bg-black text-white p-3 rounded flex-1 hover:bg-gold transition"
            >
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeIndividualProduct;
