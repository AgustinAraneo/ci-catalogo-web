"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  title: string;
  price: number;
  sizes: string[];
  quantity: number | null;
}

// TODO: SEPARAR LOGICA DEL CLIENTE, PARA QUE SEA SOLO SSR

export const IndividualItemViem = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/v1/db/products/${params.id}`);
        if (res.ok) {
          const data: Product = await res.json();
          setProduct(data);
        } else {
          alert("Producto no encontrado");
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
        alert("Error al cargar el producto");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]); // Dependemos del `id` para que se vuelva a ejecutar si cambia

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div className="container mx-auto p-4 mt-20">
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      <div className="mb-4">
        <p>
          <strong>Precio:</strong> ${product.price.toFixed(2)}
        </p>
        <p>
          <strong>Talles:</strong> {product.sizes.join(", ")}
        </p>
        <p>
          <strong>Cantidad:</strong>{" "}
          {product.quantity !== null ? product.quantity : "No definido"}
        </p>
      </div>

      <button
        onClick={() => router.push("/admin")}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Volver
      </button>
    </div>
  );
};

export default IndividualItemViem;
