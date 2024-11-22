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

  const handleAddProduct = async (newProduct: Product) => {
    const res = await fetch("/api/v1/db/add-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });

    if (res.ok) {
      const addedProduct = await res.json();
      setProducts((prevProducts) => [...prevProducts, addedProduct]);
      toast.success("Producto agregado con éxito", {
        duration: 3000,
        position: "top-center",
      });
    } else {
      toast.error("Error al agregar el producto", {
        duration: 3000,
        position: "top-center",
      });
    }
  };

  const handleUpdateProduct = async (updatedProduct: Product) => {
    const res = await fetch(`/api/v1/db/products/${updatedProduct.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    });

    if (res.ok) {
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === updatedProduct.id ? updatedProduct : p
        )
      );
      toast.success("Producto actualizado con éxito", {
        duration: 3000,
        position: "top-center",
      });
    } else {
      toast.error("Error al actualizar el producto", {
        duration: 3000,
        position: "top-center",
      });
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
