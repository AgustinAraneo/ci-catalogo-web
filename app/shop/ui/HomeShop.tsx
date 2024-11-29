"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useImageLoader } from "@/hooks/useImageLoader";
import type { ProductNeedId } from "@/types/type";
import { Filters } from "./Filters";
import { ProductList } from "./ProductList";
import { Skeleton } from "@/components/ui/Skeleton/skeleton";

export const HomeShop = () => {
  const [products, setProducts] = useState<ProductNeedId[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductNeedId[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { imageUrls, loading: imagesLoading } = useImageLoader(products);

  const [priceLimits, setPriceLimits] = useState<[number, number]>([0, 10000]);

  useEffect(() => {
    const calculatePriceLimits = () => {
      if (products.length > 0) {
        const prices = products.map((product) => product.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        setPriceLimits([minPrice, maxPrice]);
        setPriceRange([minPrice, maxPrice]);
      }
    };

    calculatePriceLimits();
  }, [products]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/v1/db/get-products");
        if (!response.ok) throw new Error("Error al obtener productos");
        const data: ProductNeedId[] = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let result = products;

      if (selectedCategory) {
        result = result.filter((product) =>
          Array.isArray(product.category)
            ? product.category.includes(selectedCategory)
            : product.category === selectedCategory
        );
      }

      result = result.filter(
        (product) =>
          product.price >= priceRange[0] && product.price <= priceRange[1]
      );

      if (searchQuery) {
        result = result.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setFilteredProducts(result);
    };

    applyFilters();
  }, [products, selectedCategory, priceRange, searchQuery]);

  const getCategoryCounts = (products: ProductNeedId[]) => {
    const categoryCounts: Record<string, number> = {};
    products.forEach((product) => {
      if (Array.isArray(product.category)) {
        product.category.forEach((cat) => {
          categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
        });
      } else if (product.category) {
        categoryCounts[product.category] =
          (categoryCounts[product.category] || 0) + 1;
      }
    });
    return categoryCounts;
  };

  const categoryCounts = useMemo(() => getCategoryCounts(products), [products]);

  if (loading || imagesLoading)
    return (
      <div>
        <div className="block md:hidden relative">
          <div className="w-full px-6 flex flex-col gap-10 py-20 ">
            <Skeleton className="h-[32px] w-[32px] rounded-full absolute top-10 left-6" />
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-[315px] w-full" />
            ))}
          </div>
        </div>
        <div className="hidden py-20 md:flex container mx-auto 2xl:max-w-[1440px]">
          <div className="w-full flex gap-10 ">
            <Skeleton className="h-[550px] w-[371px]" />

            <div className="grid md:grid-cols-3 gap-10 md:w-3/4">
              {Array.from({ length: 9 }).map((_, i) => (
                <Skeleton key={i} className="h-[315px] w-[323px]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );

  if (error)
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="flex container 2xl:max-w-[1440px] mx-auto py-20 md:gap-10">
      <Filters
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        priceLimits={priceLimits}
        categoryCounts={categoryCounts}
      />
      <main className="w-full px-6 md:px-0 md:w-3/4">
        <ProductList products={filteredProducts} imageUrls={imageUrls} />
      </main>
    </div>
  );
};
