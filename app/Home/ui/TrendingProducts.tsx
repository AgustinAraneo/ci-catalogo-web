"use client";

import React, { useEffect, useState } from "react";
import type { Product } from "@/types/type";
import { filterList } from "@/app/src/data/data.categorys";
import { Carousel } from "@/components/ui/Carousel/Carousel";

export const TrendingProducts = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filterItem, setFilterItem] = useState("Remeras");
  const [loading, setLoading] = useState(true); // Estado para el skeleton

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Inicia la carga
        const response = await fetch("/api/v1/db/get-products");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const productsWithImages = await Promise.all(
          data.map(async (product: Product) => {
            if (product.imageUrl) {
              try {
                const imageResponse = await fetch(
                  `https://api.github.com/repos/Nehros-admin/ci-catalog-photos/contents/${product.imageUrl}`,
                  {
                    method: "GET",
                    headers: {
                      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
                      "Content-Type": "application/json",
                    },
                    cache: "no-store",
                  }
                );

                if (!imageResponse.ok) {
                  throw new Error(
                    `HTTP error! status: ${imageResponse.status}`
                  );
                }

                const imageData = await imageResponse.json();
                const downloadUrl = imageData.download_url;

                if (downloadUrl) {
                  product.imageUrl = downloadUrl;
                } else {
                  console.error(
                    "No se encontró la URL de descarga para la imagen:",
                    product.imageUrl
                  );
                }
              } catch (error) {
                console.error(
                  "Error al obtener la imagen desde GitHub:",
                  error
                );
              }
            }
            return product;
          })
        );

        setAllProducts(productsWithImages);

        const filteredProducts = productsWithImages.filter((product: Product) =>
          product.category.includes(filterItem)
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      } finally {
        setLoading(false);
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

  return (
    <section className="overflow-x-hidden pt-20 pb-16">
      <div className="text-center pb-8 px-4">
        <h2 className="font-mrs-saint-delafield text-6xl sm:text-6xl text-gold pb-5">
          Los más buscados
        </h2>
        <p className="max-w-xl mx-auto text-gray-600">
          Nourish your skin with toxin-free cosmetic products. With offers that
          you can&apos;t refuse.
        </p>
      </div>
      <div className="px-4">
        <ul className="flex justify-center pb-6 flex-wrap p-2">
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
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="w-full h-48 bg-gray-200 animate-pulse rounded p-2"
                ></div>
              ))}
            </div>
          ) : (
            <Carousel products={products} />
          )}
        </div>
      </div>
    </section>
  );
};
