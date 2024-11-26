"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useImageLoader } from "@/hooks/useImageLoader";
import type { ProductNeedId } from "@/types/type";
import { Filters } from "./Filters";
import { ProductList } from "./ProductList";

export const HomeShop = () => {
  const [products, setProducts] = useState<ProductNeedId[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductNeedId[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { imageUrls, loading: imagesLoading } = useImageLoader(products);

  // Calcula el precio mínimo y máximo de los productos filtrados
  const [priceLimits, setPriceLimits] = useState<[number, number]>([0, 10000]);

  useEffect(() => {
    const calculatePriceLimits = () => {
      if (products.length > 0) {
        const prices = products.map((product) => product.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        setPriceLimits([minPrice, maxPrice]);

        // Si el rango actual está fuera de los nuevos límites, lo ajustamos
        setPriceRange([minPrice, maxPrice]);
      }
    };

    calculatePriceLimits();
  }, [products]); // Dependemos solo de `products`

  // Fetch products
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

      // Filtro por categoría
      if (selectedCategory) {
        result = result.filter((product) =>
          Array.isArray(product.category)
            ? product.category.includes(selectedCategory)
            : product.category === selectedCategory
        );
      }

      // Filtro por rango de precios
      result = result.filter(
        (product) =>
          product.price >= priceRange[0] && product.price <= priceRange[1]
      );

      // Filtro por búsqueda
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
    return <div className="text-center py-10">Cargando productos...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="flex container mx-auto py-20 gap-8">
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
      <main className="w-3/4">
        <ProductList products={filteredProducts} imageUrls={imageUrls} />
      </main>
    </div>
  );
};
