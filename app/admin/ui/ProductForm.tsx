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

interface ProductFormProps {
  onAddProduct: (newProduct: Product) => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ onAddProduct }) => {
  const [newProduct, setNewProduct] = useState<Product>({
    title: "",
    description: null,
    price: 0,
    discountPrice: null, // Agregar propiedad discountPrice
    sizes: [],
    quantity: null,
    imageUrl: "", // Agregar propiedad imageUrl
    category: [], // Agregar propiedad category
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = () => {
    onAddProduct(newProduct);
    setNewProduct({
      title: "",
      description: null,
      price: 0,
      discountPrice: null,
      sizes: [],
      quantity: null,
      imageUrl: "",
      category: [],
    });
    setIsDialogOpen(false); // Cierra el diálogo al agregar el producto
  };

  const isFormValid =
    newProduct.title.trim() !== "" &&
    newProduct.price > 0 &&
    newProduct.sizes.length > 0;

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
        <div className="space-y-6">
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

          {/* Description */}
          <div>
            <Label htmlFor="title">Descripcion</Label>
            <Input
              type="text"
              id="description"
              name="description"
              value={newProduct.description || ""}
              onChange={handleInputChange}
              placeholder="Ejemplo: Camiseta deportiva color negro"
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

          {/* Precio con descuento */}
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

          {/* Talles */}
          <div>
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
          <div>
            <Label>Categorías</Label>
            <div className="flex flex-wrap gap-4 mt-2">
              {["Camisetas", "Pantalones", "Zapatos", "Accesorios"].map(
                (category) => (
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
                )
              )}
            </div>
          </div>

          {/* Imagen URL */}
          <div>
            <Label htmlFor="imageUrl">Imagen URL</Label>
            <Input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={newProduct.imageUrl}
              onChange={handleInputChange}
              placeholder="Ejemplo: https://mi-sitio.com/imagen.jpg"
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

          {/* Botón */}
          <Button onClick={handleSubmit} disabled={!isFormValid}>
            Agregar Producto
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
