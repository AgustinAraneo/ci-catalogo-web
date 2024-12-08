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
import { HomeIndividualSkeleton } from "./ui/HomeIndividualSkeleton";

const IndividualItemView = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { products: allProducts, loading: productsLoading } = useProducts();
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
        <div className="container mx-auto flex flex-col items-center py-10 md:py-20 gap-10 min-h-screen">
          <div className="w-full max-w-6xl mx-auto">
            <HomeIndividualSkeleton />
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

        <h2 className="text-2xl font-bold text-center text-gray-800 pt-12">
          Productos relacionados
        </h2>
        <div className="w-full max-w-7xl pb-12">
          {displayProducts.length > 0 ? (
            <Carousel products={displayProducts} />
          ) : (
            <p className="text-gray-500 text-center">
              No hay productos disponibles en este momento.
            </p>
          )}
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
      <InstagramGallery />
    </div>
  );
};

export default IndividualItemView;
