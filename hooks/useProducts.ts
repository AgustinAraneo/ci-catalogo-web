import { useEffect, useState } from "react";

interface Product {
  id?: string;
  title: string;
  price: number;
  sizes: string[];
  quantity: number | null;
}

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
