"use client";

import React, { useEffect, useState } from "react";
import { Carousel } from "../../Carousel/Carousel";
import type { Product } from "@/types/type";

export const TrendingProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [filterItem, setFilterItem] = useState("Remeras");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/v1/db/get-products");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAllProducts(data);

        const filteredProducts = data.filter((product: Product) =>
          product.category.includes(filterItem)
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filteredProducts = allProducts.filter((product: Product) =>
      product.category.includes(filterItem)
    );
    setProducts(filteredProducts);
  }, [filterItem, allProducts]);

  const filterList = [
    { name: "Remeras", value: "Remeras" },
    { name: "Calzas", value: "Calzas" },
    { name: "Palazos", value: "Palazos" },
    { name: "Remerones", value: "Remerones" },
    { name: "Blazers", value: "Blazers" },
    { name: "Tops", value: "Tops" },
    { name: "Vestidos", value: "Vestidos" },
  ];

  return (
    <section className="overflow-x-hidden pt-20 pb-16">
      <div className="text-center mb-8 px-4">
        <h2 className="font-mrs-saint-delafield text-4xl sm:text-5xl text-gold mb-4">
          Los más buscados
        </h2>
        <p className="max-w-xl mx-auto text-gray-600">
          Nourish your skin with toxin-free cosmetic products. With offers that
          you can&apos;t refuse.
        </p>
      </div>
      <div className="px-4">
        <ul className="flex justify-center mb-6 flex-wrap">
          {filterList.map((item) => (
            <li key={item.value} className="mx-1 my-1">
              <button
                onClick={() => setFilterItem(item.value)}
                className={`px-4 py-2 border text-sm sm:text-base rounded ${
                  item.value === filterItem
                    ? "bg-pink-600 text-white border-pink-600"
                    : "bg-gray-100 text-gray-700 border-gray-200"
                } hover:opacity-80`}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
        <div className="mx-auto max-w-7xl overflow-hidden">
          <Carousel products={products} />
        </div>
      </div>
    </section>
  );
};
