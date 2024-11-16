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
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Nuevo Producto</h2>

      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          type="text"
          id="title"
          name="title"
          placeholder="Título"
          value={newProduct.title}
          onChange={onInputChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Precio</Label>
        <Input
          type="number"
          id="price"
          name="price"
          placeholder="Precio"
          value={newProduct.price}
          onChange={onInputChange}
        />
      </div>

      <div className="space-y-2">
        <Label>Talles</Label>
        <div className="flex space-x-4">
          {["S", "M", "L", "XL"].map((size) => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox
                id={`size-${size}`}
                checked={newProduct.sizes.includes(size)}
                onCheckedChange={(checked) =>
                  onSizeChange(size, checked === true)
                }
              />
              <Label htmlFor={`size-${size}`}>{size}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="quantity">Cantidad</Label>
        <Input
          type="number"
          id="quantity"
          name="quantity"
          placeholder="Cantidad"
          value={newProduct.quantity ?? ""}
          onChange={onQuantityChange}
        />
      </div>

      <Button onClick={onAddProduct} className="bg-blue-500">
        Agregar Producto
      </Button>
    </div>
  );
};
