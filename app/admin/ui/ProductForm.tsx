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
import { uploadImageToGitHub } from "@/app/src/utils/gitHubActions";

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
  const [uploadProgress, setUploadProgress] = useState(0);

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

      setUploadProgress(0);
      const imageUrl = await uploadImageToGitHub(file);
      if (imageUrl) {
        onAddProduct({ ...newProduct, imageUrl });
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
      }
    } catch (error) {
      alert(error);
    }
  };

  const isFileSizeValid = file ? file.size <= 25 * 1024 * 1024 : true;

  const isFormValid =
    newProduct.title.trim() !== "" &&
    newProduct.price > 0 &&
    newProduct.sizes.length > 0 &&
    isFileSizeValid;

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar Producto</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            />
          </div>
          {/* Botón de carga de imagen */}
          <div className="md:col-span-2">
          <Label htmlFor="image">Imagen</Label>
          <div className="flex items-center space-x-4 mt-2">
            {/* Input de archivo oculto */}
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              className="hidden"
            />
            {/* Botón estilizado con shadcn */}
            <Button
              variant="default"
              onClick={() => document.getElementById("image")?.click()}
            >
              Subir Imagen
            </Button>
            {/* Texto indicando el archivo seleccionado */}
            <span className="text-gray-600 text-sm">
              {file ? file.name : "Ningún archivo seleccionado"}
            </span>
          </div>
          {uploadProgress > 0 && (
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}
        </div>
          {/* Talles */}
          <div className="md:col-span-2">
            <Label>Talles</Label>
            <div className="flex flex-wrap gap-4 mt-2">
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
            <div className="flex flex-wrap gap-4 mt-2">
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
            <Button onClick={handleSubmit} disabled={!isFormValid}>
              Agregar Producto
            </Button>
            {!isFileSizeValid && (
              <p className="text-red-500 text-sm mt-2">
                El archivo supera el tamaño máximo permitido de 25 MB.
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
