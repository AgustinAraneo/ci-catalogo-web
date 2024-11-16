import React from "react";
import { Input } from "@/components/ui/Input/input";
import { Checkbox } from "@/components/ui/Checkbox/checkbox";
import { Button } from "@/components/ui/Button/button";
import { Label } from "@/components/ui/Label/label";
import type { Product } from "@/types/type";

interface ProductFormProps {
  newProduct: Product;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSizeChange: (size: string, checked: boolean) => void;
  onQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddProduct: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  newProduct,
  onInputChange,
  onSizeChange,
  onQuantityChange,
  onAddProduct,
}) => {
  // Validar si el formulario está completo
  const isFormValid =
    newProduct.title.trim() !== "" &&
    newProduct.price > 0 &&
    newProduct.sizes.length > 0;

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 space-y-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Agregar Producto
      </h2>

      {/* Título */}
      <div>
        <Label htmlFor="title" className="text-gray-700 font-medium">
          Título
        </Label>
        <Input
          type="text"
          id="title"
          name="title"
          placeholder="Ejemplo: Camiseta deportiva"
          value={newProduct.title}
          onChange={onInputChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Precio */}
      <div>
        <Label htmlFor="price" className="text-gray-700 font-medium">
          Precio
        </Label>
        <Input
          type="number"
          id="price"
          name="price"
          placeholder="Ejemplo: 199.99"
          value={newProduct.price === 0 ? "" : newProduct.price ?? ""}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            if (value >= 0 || e.target.value === "") {
              onInputChange(e);
            }
          }}
          min="0"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Talles */}
      <div>
        <Label className="text-gray-700 font-medium">Talles</Label>
        <div className="flex flex-wrap gap-4 mt-2">
          {["S", "M", "L", "XL"].map((size) => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox
                id={`size-${size}`}
                checked={newProduct.sizes.includes(size)}
                onCheckedChange={(checked) =>
                  onSizeChange(size, checked === true)
                }
                className="text-blue-500 focus:ring-blue-500"
              />
              <Label htmlFor={`size-${size}`} className="text-gray-600">
                {size}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Cantidad */}
      <div>
        <Label htmlFor="quantity" className="text-gray-700 font-medium">
          Cantidad
        </Label>
        <Input
          type="number"
          id="quantity"
          name="quantity"
          placeholder="Cantidad"
          value={newProduct.quantity ?? ""}
          onChange={onQuantityChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Botón */}
      <div className="text-center">
        <Button
          onClick={onAddProduct}
          disabled={!isFormValid} // Deshabilitar si el formulario no es válido
          className={`px-4 py-2 font-semibold rounded-lg shadow-md focus:ring-2 focus:ring-offset-2 ${
            isFormValid
              ? "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Agregar Producto
        </Button>
      </div>
    </div>
  );
};
