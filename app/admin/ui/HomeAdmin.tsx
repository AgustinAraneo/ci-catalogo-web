"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ProductForm } from "./ProductForm";
import { ProductTable } from "./ProductTable";
import { LogoutButton } from "./LogoutButton";
import { useProducts } from "@/hooks/useProducts";
import type { Product } from "@/types/type";

export const HomeAdmin = () => {
  const router = useRouter();
  const { products, setProducts } = useProducts();
  const [isLoggedTrue, setIsLoggedTrue] = useState<boolean>(false);
  const [newProduct, setNewProduct] = useState<Product>({
    title: "",
    price: 0,
    sizes: [],
    quantity: null,
  });

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

  const handleAddProduct = async () => {
    const priceNumber =
      typeof newProduct.price === "string"
        ? parseFloat(newProduct.price)
        : newProduct.price;

    const res = await fetch("/api/v1/db/add-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newProduct, price: priceNumber }),
    });

    if (res.ok) {
      const addedProduct = await res.json();
      setProducts((prevProducts) => [...prevProducts, addedProduct]);
      setNewProduct({ title: "", price: 0, sizes: [], quantity: null });
    } else {
      alert("Error al agregar el producto");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewProduct({
      ...newProduct,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    });
  };

  const handleSizeChange = (size: string, checked: boolean) => {
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      sizes: checked
        ? [...prevProduct.sizes, size]
        : prevProduct.sizes.filter((s) => s !== size),
    }));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProduct({
      ...newProduct,
      quantity: e.target.value ? parseInt(e.target.value) : null,
    });
  };

  if (!isLoggedTrue) return null;

  return (
    <div className="container mx-auto p-4 mt-20">
      <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>
      <ProductForm
        newProduct={newProduct}
        onInputChange={handleInputChange}
        onSizeChange={handleSizeChange}
        onQuantityChange={handleQuantityChange}
        onAddProduct={handleAddProduct}
      />
      <ProductTable products={products} />
      <LogoutButton onLogout={handleLogout} />
    </div>
  );
};
