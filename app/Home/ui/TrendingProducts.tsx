"use client";

import React, { useEffect, useState } from "react";
import type { Product } from "@/types/type";
import { Carousel } from "@/components/ui/Carousel/Carousel";
import { useProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

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
      setProducts(filteredProducts);
      setLoading(false);
    }
  }, [filterItem, allProducts]);

  return (
    <section className="overflow-x-hidden pt-20 pb-16">
      <div className="text-center pb-8 px-4">
        <h2 className="font-mrs-saint-delafield text-6xl sm:text-6xl text-gold pb-5">
          Los más buscados
        </h2>
        <p className="max-w-xl mx-auto text-gray-900 font-medium">
          ¡No te pierdas los productos más deseados y las ofertas que están
          arrasando! Descubre lo que todos quieren ahora mismo.
        </p>
      </div>
      <div className="px-4">
        <ul className="flex justify-center pb-6 flex-wrap p-2">
          {categoriesWithProducts.map((category) => (
            <li key={category} className="mx-1 my-1">
              <Button
                onClick={() => setFilterItem(category)}
                variant={category === filterItem ? "default" : "outline"}
                className="w-32"
              >
                {category}
              </Button>
            </li>
          ))}
        </ul>
        <div className="mx-auto max-w-7xl overflow-hidden px-4">
          {loading ? (
            <div className="flex flex-col gap-6">
              <div className="flex gap-4 justify-center">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="w-[128px] h-[42px]" />
                ))}
              </div>
              <div>
                <div className="sm:hidden">
                  <Skeleton className="w-[340px] h-[420px]" />
                </div>
                <div className="hidden sm:grid sm:grid-cols-4 gap-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton key={index} className="w-full h-[400px]" />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <Carousel products={products} />
          )}
        </div>
      </div>
    </section>
  );
};
