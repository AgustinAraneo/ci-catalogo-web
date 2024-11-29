"use client";

import React, { useEffect, useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { Skeleton } from "@/components/ui/Skeleton/skeleton";

interface Product {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  category?: string | string[];
}

export const InstagramGallery: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/v1/db/get-products");
        if (!response.ok) {
          throw new Error("Error al obtener productos");
        }

        const data: Product[] = await response.json();

        setProducts(data.slice(0, 6));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-64 w-full" />
        ))}
      </div>
    );

  if (error)
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0">
      {products.map((product) => (
        <div
          key={product.id}
          className="relative group overflow-hidden h-64 flex items-center justify-center"
          style={{
            backgroundImage: `url(${product.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center", 
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <a
              href="https://www.instagram.com/chinitha_fine"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-white text-4xl" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};
