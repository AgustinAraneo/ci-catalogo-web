import type { Product } from "@/types/type";
import { useEffect, useState } from "react";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      try {
        setLoading(true); 
        setError(null); 

        const res = await fetch("/api/v1/db/get-products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Error al obtener productos: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("La respuesta del servidor no es válida.");
        }

        setProducts(data);
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Error desconocido al cargar productos"
        );
      } finally {
        setLoading(false); 
      }
    };

    fetchProducts();
  }, []);

  return { products, setProducts, loading, error };
};
