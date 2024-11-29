"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/types/type";
import { HomeIndividualProduct } from "./ui/HomeIndividualProduct";
import { Breadcrumb } from "@/components/ui/Breadcrum/Breadcrumb";
import { Carousel } from "@/components/ui/Carousel/Carousel";
import { InstagramGallery } from "@/app/contact/ui/carrousel contact/CarrouselContact";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/Dialog/dialog";
import { Button } from "@/components/ui/Button/button";
import { useProducts } from "@/hooks/useProducts";

const IndividualItemView = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const {
    products: allProducts,
    loading: productsLoading,
    error: productsError,
  } = useProducts();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/v1/db/products/${params.id}`);
      if (res.ok) {
        const data: Product = await res.json();
        setProduct(data);
      } else {
        setError("Producto no encontrado");
        setIsDialogOpen(true);
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
  }, [params.id]);

  const getRelatedProducts = (
    products: Product[],
    currentProduct: Product | null
  ) => {
    if (!currentProduct || !currentProduct.category) return [];
    return products.filter(
      (p) =>
        p.id !== currentProduct.id &&
        p.category.some((cat) => currentProduct.category.includes(cat))
    );
  };

  const getRandomProducts = (
    products: Product[],
    excludedProducts: Product[],
    count: number
  ) => {
    const availableProducts = products.filter(
      (p) => !excludedProducts.some((ep) => ep.id === p.id)
    );
    const shuffled = [...availableProducts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const relatedProducts = getRelatedProducts(allProducts, product);

  const displayProducts = [
    ...relatedProducts,
    ...getRandomProducts(
      allProducts,
      relatedProducts,
      Math.max(0, 3 - relatedProducts.length)
    ),
  ].slice(0, 3);

  if (loading || productsLoading) {
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
      <div className="container mx-auto flex flex-col items-center py-10 md:py-20 gap-10">
        <div className="w-full max-w-6xl">
          <HomeIndividualProduct product={product} />
        </div>

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 pt-12">
          Productos relacionados
        </h2>
        <div className="w-full max-w-5xl pb-12">
          {displayProducts.length > 0 ? (
            <Carousel products={displayProducts} />
          ) : (
            <p className="text-gray-500 text-center">
              No hay productos disponibles en este momento.
            </p>
          )}
        </div>

        <h2 className="text-2xl font-bold text-center pb-6 text-gray-800">
          También puede interesarte:
        </h2>

        <div className="w-full max-w-6xl">
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
                  router.push("/shop");
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
