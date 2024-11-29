"use client";

import React, { useEffect, useState } from "react";
import type { Product } from "@/types/type";
import { Carousel } from "@/components/ui/Carousel/Carousel";
import { useProducts } from "@/hooks/useProducts";

export const TrendingProducts = () => {
  const { products: allProducts } = useProducts();
  const [products, setProducts] = useState<Product[]>([]);
  const [categoriesWithProducts, setCategoriesWithProducts] = useState<
    string[]
  >([]);
  const [filterItem, setFilterItem] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (allProducts.length > 0) {
      const uniqueCategories = new Set<string>();
      allProducts.forEach((product: Product) => {
        product.category.forEach((cat: string) => uniqueCategories.add(cat));
      });

      setCategoriesWithProducts(Array.from(uniqueCategories));
      const initialCategory = Array.from(uniqueCategories)[0] || "";
      setFilterItem(initialCategory);

      const filteredProducts = allProducts.filter((product: Product) =>
        product.category.includes(initialCategory)
      );
      setProducts(filteredProducts);
      setLoading(false);
    }
  }, [allProducts]);

  useEffect(() => {
    if (allProducts.length > 0) {
      const filteredProducts = allProducts.filter((product: Product) =>
        product.category.includes(filterItem)
      );
      if (filteredProducts.length < 3) {
        const placeholders = Array.from(
          { length: 4 - filteredProducts.length },
          (_, index) => {
            const randomProduct =
              filteredProducts[index % filteredProducts.length];
            return {
              ...randomProduct,
              id: `placeholder-${index}`,
              title: "PRÓXIMAMENTE",
              description: "Nuevos productos en camino",
              price: 0,
              discountPrice: 0,
            };
          }
        );
        setProducts([...filteredProducts, ...placeholders]);
      } else {
        setProducts(filteredProducts);
      }

      setLoading(false);
    }
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
          {categoriesWithProducts.map((category) => (
            <li key={category} className="mx-1 my-1">
              <button
                onClick={() => setFilterItem(category)}
                className={`px-4 py-2 border text-sm sm:text-base rounded w-32 ${
                  category === filterItem
                    ? "bg-pink-600 text-white border-pink-600"
                    : "bg-gray-100 text-gray-700 border-gray-200"
                } hover:opacity-80`}
              >
                {category}
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
