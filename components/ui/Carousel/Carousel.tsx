import React, { useState, useEffect } from "react";
import { SingleProduct } from "./SingleProduct";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import type { Product } from "@/types/type";

export const Carousel = ({ products }: { products: Product[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productsPerView, setProductsPerView] = useState(4);
  const totalProducts = products.length;

  const itemWidth = 295;
  const itemMargin = 16;
  const itemTotalWidth = itemWidth + itemMargin * 2;

  const updateProductsPerView = () => {
    const width = window.innerWidth;
    const possibleProductsPerView = Math.floor(width / itemTotalWidth);
    setProductsPerView(Math.max(1, possibleProductsPerView));
  };

  useEffect(() => {
    updateProductsPerView();
    window.addEventListener("resize", updateProductsPerView);
    return () => window.removeEventListener("resize", updateProductsPerView);
  }, []);

  useEffect(() => {
    if (currentIndex > totalProducts - productsPerView) {
      setCurrentIndex(Math.max(totalProducts - productsPerView, 0));
    }
  }, [productsPerView, totalProducts]);

  const nextSlide = () => {
    if (currentIndex < totalProducts - productsPerView) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="relative">
      {totalProducts > productsPerView && currentIndex > 0 && (
        <button
          aria-label="Anterior"
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-200 focus:outline-none"
          onClick={prevSlide}
        >
          <FaChevronLeft className="text-gray-800" />
        </button>
      )}

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * itemTotalWidth}px)`,
            width: `${totalProducts * itemTotalWidth}px`,
          }}
        >
          {products.map((product: Product) => (
            <div
              key={product.id}
              className="flex-shrink-0"
              style={{ width: `${itemTotalWidth}px` }}
            >
              <SingleProduct product={product} />
            </div>
          ))}
        </div>
      </div>

      {totalProducts > productsPerView &&
        currentIndex < totalProducts - productsPerView && (
          <button
            aria-label="Siguiente"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-200 focus:outline-none"
            onClick={nextSlide}
          >
            <FaChevronRight className="text-gray-800" />
          </button>
        )}
    </div>
  );
};
