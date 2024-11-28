import React, { useState } from "react";
import { Input } from "@/components/ui/Input/input";
import { Checkbox } from "@/components/ui/Checkbox/checkbox";
import { Button } from "@/components/ui/Button/button";
import { Label } from "@/components/ui/Label/label";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog/dialog";
import type { Product } from "@/types/type";
import { Textarea } from "@/components/ui/TextArea/textarea";

interface ProductFormProps {
  onAddProduct: (newProduct: Product) => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ onAddProduct }) => {
  const [newProduct, setNewProduct] = useState<Product>({
    title: "",
    description: "",
    price: 0,
    discountPrice: null,
    sizes: [],
    quantity: null,
    imageUrl: "",
    category: [],
  });

  const [file, setFile] = useState<File | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "discountPrice"
          ? parseFloat(value) || null
          : value,
    }));
  };

  const handleSizeChange = (size: string, checked: boolean) => {
    setNewProduct((prev) => ({
      ...prev,
      sizes: checked
        ? [...prev.sizes, size]
        : prev.sizes.filter((s) => s !== size),
    }));
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    setNewProduct((prev) => ({
      ...prev,
      category: checked
        ? [...prev.category, category]
        : prev.category.filter((c) => c !== category),
    }));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProduct((prev) => ({
      ...prev,
      quantity: e.target.value ? parseInt(e.target.value) : null,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!file) {
        alert("Debes seleccionar un archivo antes de subirlo.");
        return;
      }

      const formData = new FormData();
      formData.append("title", newProduct.title);
      formData.append("price", newProduct.price.toString());
      if (newProduct.description)
        formData.append("description", newProduct.description);
      if (
        newProduct.discountPrice !== null &&
        newProduct.discountPrice !== undefined
      )
        formData.append("discountPrice", newProduct.discountPrice.toString());
      if (newProduct.quantity !== null && newProduct.quantity !== undefined)
        formData.append("quantity", newProduct.quantity.toString());
      newProduct.sizes.forEach((size) => formData.append("sizes", size));
      newProduct.category.forEach((category) =>
        formData.append("category", category)
      );
      formData.append("image", file);

      // Enviar los datos al endpoint
      const response = await fetch("/api/v1/db/add-product", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const addedProduct = await response.json();
        onAddProduct(addedProduct);
        setNewProduct({
          title: "",
          description: "",
          price: 0,
          discountPrice: null,
          sizes: [],
          quantity: null,
          imageUrl: "",
          category: [],
        });
        setFile(null);
        setIsDialogOpen(false);
      } else {
        const errorData = await response.json();
        alert(`Error al agregar el producto: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      alert("Error al agregar el producto");
    }
  };

  const isFileSizeValid = file ? file.size <= 25 * 1024 * 1024 : true;

  const isFormValid =
    newProduct.title.trim() !== "" &&
    newProduct.price > 0 &&
    newProduct.sizes.length > 0 &&
    isFileSizeValid &&
    file !== null;

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <button
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => setIsDialogOpen(true)}
        >
          Agregar Producto
        </button>
      </DialogTrigger>
      <div className="pt-16 sm:pt-0">
        {/* Ajustamos el padding superior solo para móviles */}
        <DialogContent className="max-h-screen overflow-y-auto max-w-xs sm:max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle>Agregar Producto</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Título */}
            <div>
              <Label htmlFor="title">Título</Label>
              <Input
                type="text"
                id="title"
                name="title"
                value={newProduct.title}
                onChange={handleInputChange}
                placeholder="Ejemplo: Camiseta deportiva"
                className="w-full"
              />
            </div>
            {/* Precio */}
            <div>
              <Label htmlFor="price">Precio</Label>
              <Input
                type="number"
                id="price"
                name="price"
                value={newProduct.price || ""}
                onChange={handleInputChange}
                placeholder="Ejemplo: 199.99"
                min="0"
                className="w-full"
              />
            </div>
            {/* Descripción */}
            <div className="md:col-span-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                name="description"
                value={newProduct.description || ""}
                onChange={handleInputChange}
                placeholder="Ejemplo: Camiseta deportiva color negro"
                className="w-full"
              />
            </div>
            {/* Precio con Descuento */}
            <div>
              <Label htmlFor="discountPrice">Precio con Descuento</Label>
              <Input
                type="number"
                id="discountPrice"
                name="discountPrice"
                value={newProduct.discountPrice || ""}
                onChange={handleInputChange}
                placeholder="Ejemplo: 149.99"
                min="0"
                className="w-full"
              />
            </div>
            {/* Cantidad */}
            <div>
              <Label htmlFor="quantity">Cantidad</Label>
              <Input
                type="number"
                id="quantity"
                name="quantity"
                value={newProduct.quantity ?? ""}
                onChange={handleQuantityChange}
                placeholder="Ejemplo: 10"
                min="0"
                className="w-full"
              />
            </div>
            {/* Imagen */}
            <div className="md:col-span-2">
              <Label htmlFor="image">Imagen</Label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="flex flex-wrap items-center space-x-2 mt-2">
                <Button
                  variant="default"
                  onClick={() => document.getElementById("image")?.click()}
                >
                  Subir Imagen
                </Button>
                <span className="text-gray-600 text-sm">
                  {file ? file.name : "Ningún archivo seleccionado"}
                </span>
              </div>
              {!isFileSizeValid && (
                <p className="text-red-500 text-sm mt-2">
                  El archivo supera el tamaño máximo permitido de 25 MB.
                </p>
              )}
            </div>
            {/* Talles */}
            <div className="md:col-span-2">
              <Label>Talles</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {["S", "M", "L", "XL"].map((size) => (
                  <div key={size} className="flex items-center space-x-2">
                    <Checkbox
                      id={`size-${size}`}
                      checked={newProduct.sizes.includes(size)}
                      onCheckedChange={(checked) =>
                        handleSizeChange(size, checked === true)
                      }
                    />
                    <Label htmlFor={`size-${size}`}>{size}</Label>
                  </div>
                ))}
              </div>
            </div>
            {/* Categorías */}
            <div className="md:col-span-2">
              <Label>Categorías</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {[
                  "Remeras",
                  "Remerones",
                  "Calzas",
                  "Palazos",
                  "Blazers",
                  "Vestidos",
                  "Tops",
                ].map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={newProduct.category.includes(category)}
                      onCheckedChange={(checked) =>
                        handleCategoryChange(category, checked === true)
                      }
                    />
                    <Label htmlFor={`category-${category}`}>{category}</Label>
                  </div>
                ))}
              </div>
            </div>
            {/* Botón */}
            <div className="md:col-span-2">
              <Button
                onClick={handleSubmit}
                disabled={!isFormValid}
                className="w-full sm:w-auto"
              >
                Agregar Producto
              </Button>
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};
