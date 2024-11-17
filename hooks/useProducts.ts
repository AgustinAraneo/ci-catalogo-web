import type { Product } from "@/types/type";
import { useEffect, useState } from "react";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/v1/db/get-products");
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    };

    fetchProducts();
  }, []);

  return { products, setProducts };
};
