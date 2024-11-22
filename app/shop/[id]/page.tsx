"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/types/type";
import { HomeIndividualProduct } from "./ui/HomeIndividualProduct";
import { Breadcrumb } from "@/components/ui/Breadcrum/Breadcrumb";
import { InstagramGallery } from "@/app/contact/ui/carrousel contact/CarrouselContact";

const IndividualItemView = ({ params }: { params: { id: string } }) => {
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
  }, [params.id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div>
      <Breadcrumb page="Productos" />
      <div className="container mx-auto p-7 pb-20">
        <HomeIndividualProduct product={product} />
        <button
          onClick={() => router.push("/admin")}
          className="bg-black text-white p-2 rounded"
        >
          Volver
        </button>
      </div>
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800 pb-5">
        También puede interesarte:
      </h2>
      <InstagramGallery />
    </div>
  );
};

export default IndividualItemView;
