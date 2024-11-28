"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/types/type";
import { HomeIndividualProduct } from "./ui/HomeIndividualProduct";
import { Breadcrumb } from "@/components/ui/Breadcrum/Breadcrumb";
import { InstagramGallery } from "@/app/contact/ui/carrousel contact/CarrouselContact";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/Dialog/dialog";
import { Button } from "@/components/ui/Button/button";

const IndividualItemView = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  // Función para cargar el producto
  const fetchProduct = async () => {
    setLoading(true);
    setError(null); // Limpia el estado de error antes de intentar cargar
    try {
      const res = await fetch(`/api/v1/db/products/${params.id}`);
      if (res.ok) {
        const data: Product = await res.json();
        setProduct(data);
      } else {
        setError("Producto no encontrado");
        setIsDialogOpen(true); // Abre el diálogo si no se encuentra el producto
      }
    } catch (err) {
      console.error("Error al obtener el producto:", err);
      setError("Error al cargar el producto");
      setIsDialogOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchProduct();
    }
  }, [params.id]); // Solo depende de `params.id`

  if (loading) {
    return (
      <div>
        <Breadcrumb page="Productos" />
        <div className="min-h-screen container mx-auto p-8 mt-10">
          <div className="flex flex-col md:flex-row items-start space-y-8 md:space-y-0 md:space-x-8">
            <div className="w-full md:w-1/3 bg-gray-300 h-64 rounded animate-pulse"></div>
            <div className="w-full md:w-1/2 space-y-4">
              <div className="h-8 bg-gray-300 rounded w-3/4 animate-pulse"></div>
              <div className="h-6 bg-gray-300 rounded w-1/4 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
              <div className="h-6 bg-gray-300 rounded w-1/3 animate-pulse"></div>
              <div className="flex space-x-2">
                <div className="h-8 bg-gray-300 rounded w-12 animate-pulse"></div>
                <div className="h-8 bg-gray-300 rounded w-12 animate-pulse"></div>
                <div className="h-8 bg-gray-300 rounded w-12 animate-pulse"></div>
              </div>
              <div className="h-12 bg-gray-300 rounded w-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb page="Productos" />
      <div className="container mx-auto flex flex-col items-center p-7 pb-20">
        <div className="w-full max-w-5xl">
          <HomeIndividualProduct product={product} />
        </div>

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          También puede interesarte:
        </h2>

        <div className="w-full max-w-5xl">
          <InstagramGallery />
        </div>
      </div>

      {error && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Error</DialogTitle>
            </DialogHeader>
            <p className="text-red-500">{error}</p>
            <DialogFooter>
              <Button
                onClick={() => {
                  setIsDialogOpen(false);
                  router.push("/shop"); // Redirige al usuario si hay error
                }}
                className="bg-blue-500 text-white"
              >
                Volver a Productos
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default IndividualItemView;
