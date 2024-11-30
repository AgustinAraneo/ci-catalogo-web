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

  const handleUpdateProduct = async (
    updatedProduct: Product,
    file?: File,
    secondaryFiles?: { [index: number]: File },
    newSecondaryFiles?: File[]
  ): Promise<Product> => {
    try {
      if (!updatedProduct.id) {
        toast.error("El producto no tiene un ID válido.", {
          duration: 3000,
          position: "top-center",
        });
      }

      const formData = new FormData();
      formData.append("title", updatedProduct.title || "");
      formData.append("price", String(updatedProduct.price || ""));
      formData.append(
        "quantity",
        updatedProduct.quantity != null ? String(updatedProduct.quantity) : ""
      );
      formData.append("sizes", JSON.stringify(updatedProduct.sizes || []));
      formData.append(
        "category",
        JSON.stringify(updatedProduct.category || [])
      );
      formData.append("description", updatedProduct.description || "");
      formData.append(
        "discountPrice",
        updatedProduct.discountPrice != null
          ? String(updatedProduct.discountPrice)
          : ""
      );
      if (file) {
        formData.append("image", file);
      }

      if (secondaryFiles) {
        Object.entries(secondaryFiles).forEach(([index, file]) => {
          formData.append(`secondaryImage-${index}`, file);
        });
      }

      if (newSecondaryFiles && newSecondaryFiles.length > 0) {
        newSecondaryFiles.forEach((file, index) => {
          formData.append(`newSecondaryImage-${index}`, file);
        });
      }

      const res = await fetch(`/api/v1/db/products/${updatedProduct.id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(
          (errorData && errorData.error) ||
            "Error desconocido al actualizar el producto."
        );
      }

      const responseData = await res.json();
      const productFromServer = responseData.updatedProduct || responseData;

      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === updatedProduct.id ? productFromServer : p
        )
      );

      toast.success("Producto actualizado con éxito", {
        duration: 3000,
        position: "top-center",
      });
      return productFromServer;
    } catch (error) {
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
      throw error;
    }
  };

  const handleDeleteProduct = async (productId: string | undefined) => {
    if (!productId) {
      toast.error("Producto no encontrado", {
        duration: 3000,
        position: "top-center",
      });
      throw new Error("Producto no encontrado");
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
      const errorData = await res.json().catch(() => null);
      const errorMessage =
        (errorData && errorData.error) ||
        "Error desconocido al eliminar el producto.";
      toast.error(errorMessage, {
        duration: 3000,
        position: "top-center",
      });
      throw new Error(errorMessage);
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
