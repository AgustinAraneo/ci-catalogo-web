"use client";
import React, { useEffect, useState } from "react";
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

  const { imageUrls, loading: imagesLoading } = useImageLoader(products);

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

      if (selectedCategory) {
        result = result.filter(
          (product) =>
            Array.isArray(product.category)
              ? product.category.includes(selectedCategory) // Verifica si incluye la categoría seleccionada
              : product.category === selectedCategory // Si no es un array, usa comparación directa
        );
      }

      result = result.filter(
        (product) =>
          product.price >= priceRange[0] && product.price <= priceRange[1]
      );

      setFilteredProducts(result);
    };

    applyFilters();
  }, [products, selectedCategory, priceRange]);

  if (loading || imagesLoading)
    return <div className="text-center py-10">Cargando productos...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="flex">
      <Filters
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />
      <main className="w-3/4 p-4">
        <h1 className="text-3xl font-bold text-center mb-6">Productos</h1>
        <ProductList products={filteredProducts} imageUrls={imageUrls} />
      </main>
    </div>
  );
};
