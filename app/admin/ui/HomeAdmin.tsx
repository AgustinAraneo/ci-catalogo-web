"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProductTable } from "./ProductTable";
import { LogoutButton } from "./LogoutButton";
import { useProducts } from "@/hooks/useProducts";
import { ProductForm } from "./ProductForm";
import { toast } from "sonner";
import type { Product } from "@/types/type";

export const HomeAdmin = () => {
  const router = useRouter();
  const { products, setProducts } = useProducts();
  const [isLoggedTrue, setIsLoggedTrue] = useState<boolean>(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setIsLoggedTrue(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  const handleAddProduct = (addedProduct: Product) => {
    setProducts((prevProducts) => [...prevProducts, addedProduct]);
    toast.success("Producto agregado con éxito", {
      duration: 3000,
      position: "top-center",
    });
  };

  const handleUpdateProduct = async (updatedProduct: Product, file?: File) => {
    try {
      // Verifica que el ID sea válido
      if (!updatedProduct.id) {
        toast.error("El producto no tiene un ID válido.");
        return;
      }
  
      // Crear el FormData con validaciones
      const formData = new FormData();
      if (updatedProduct.title) formData.append("title", updatedProduct.title);
      if (updatedProduct.price) formData.append("price", String(updatedProduct.price));
      if (updatedProduct.quantity !== null && updatedProduct.quantity !== undefined) {
        formData.append("quantity", String(updatedProduct.quantity));
      }
      if (updatedProduct.sizes) formData.append("sizes", JSON.stringify(updatedProduct.sizes));
      if (updatedProduct.category) formData.append("category", JSON.stringify(updatedProduct.category));
      if (updatedProduct.description) formData.append("description", updatedProduct.description);
      if (
        updatedProduct.discountPrice !== null &&
        updatedProduct.discountPrice !== undefined
      ) {
        formData.append("discountPrice", String(updatedProduct.discountPrice));
      }
  
      // Adjuntar imagen si existe
      if (file) {
        formData.append("image", file);
      }
  
      // Realizar la solicitud PUT
      const res = await fetch(`/api/v1/db/products/${updatedProduct.id}`, {
        method: "PUT",
        body: formData,
      });
  
      // Manejo de la respuesta
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error desconocido al actualizar el producto.");
      }
  
      // Actualizar el producto en el estado local
      const productFromServer = await res.json();
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === updatedProduct.id ? productFromServer : p
        )
      );
  
      // Mostrar mensaje de éxito
      toast.success("Producto actualizado con éxito", {
        duration: 3000,
        position: "top-center",
      });
    } catch (error) {
      // Manejo de errores con tipado seguro
      if (error instanceof Error) {
        console.error("Error al actualizar el producto:", error.message);
        toast.error(error.message, {
          duration: 3000,
          position: "top-center",
        });
      } else {
        console.error("Error desconocido al actualizar el producto:", error);
        toast.error("Error inesperado al actualizar el producto", {
          duration: 3000,
          position: "top-center",
        });
      }
    }
  };
  

  const handleDeleteProduct = async (productId: string | undefined) => {
    if (!productId) {
      toast.error("Producto no encontrado");
      return;
    }

    const res = await fetch(`/api/v1/db/products/${productId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
      toast.success("Producto eliminado con éxito", {
        duration: 3000,
        position: "top-center",
      });
    } else {
      toast.error("Error al eliminar el producto", {
        duration: 3000,
        position: "top-center",
      });
    }
  };

  if (!isLoggedTrue) return null;

  return (
    <div className="container mx-auto p-4 mt-20 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>

      <ProductForm onAddProduct={handleAddProduct} />

      <ProductTable
        products={products}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
      />
      <LogoutButton onLogout={handleLogout} />
    </div>
  );
};
