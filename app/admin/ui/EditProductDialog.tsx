import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog/dialog";
import { Button } from "@/components/ui/Button/button";
import { Input } from "@/components/ui/Input/input";
import { Checkbox } from "@/components/ui/Checkbox/checkbox";
import { FiEdit } from "react-icons/fi";
import { Label } from "@/components/ui/Label/label";
import { Textarea } from "@/components/ui/TextArea/textarea";
import { filterList } from "@/app/src/data/data.categorys";
import type { EditProductDialogProps, Product } from "@/types/type";

export const EditProductDialog: React.FC<EditProductDialogProps> = ({
  product: initialProduct,
  onUpdateProduct,
}) => {
  const [productState, setProductState] = useState<Product>(initialProduct);
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isFileSizeValid, setIsFileSizeValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProductState((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "discountPrice" || name === "quantity"
          ? parseFloat(value) || null
          : value,
    }));
  };

  const handleSizeChange = (size: string, checked: boolean) => {
    setProductState((prev) => ({
      ...prev,
      sizes: checked
        ? [...prev.sizes, size]
        : prev.sizes.filter((s) => s !== size),
    }));
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    setProductState((prev) => ({
      ...prev,
      category: checked
        ? [...prev.category, category]
        : prev.category.filter((c) => c !== category),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 25 * 1024 * 1024) {
        setIsFileSizeValid(false);
      } else {
        setIsFileSizeValid(true);
        setFile(selectedFile);
      }
    }
  };

  const handleSave = async () => {
    if (!isFileSizeValid) {
      alert("El archivo supera el tamaño máximo permitido de 25 MB.");
      return;
    }

    setIsLoading(true);

    try {
      if (!productState.id) {
        console.error("El ID del producto no está definido.");
        alert("No se puede actualizar un producto sin ID.");
        return;
      }

      const formData = new FormData();
      formData.append("title", productState.title);
      formData.append("price", String(productState.price));
      formData.append("quantity", String(productState.quantity || ""));
      formData.append("sizes", JSON.stringify(productState.sizes));
      formData.append("category", JSON.stringify(productState.category));
      formData.append("description", productState.description || "");
      formData.append("discountPrice", String(productState.discountPrice || ""));
      if (file) {
        formData.append("image", file);
      }

      const response = await fetch(`/api/v1/db/products/${productState.id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Error desconocido al actualizar el producto."
        );
      }

      const updatedProduct = await response.json();
      onUpdateProduct(updatedProduct);
      setIsOpen(false);
    } catch (error) {
      console.error("Error al guardar cambios:", error);
      alert(
        "Ocurrió un error al guardar los cambios. Revisa la consola para más detalles."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    productState.title.trim() !== "" &&
    productState.price > 0 &&
    productState.sizes.length > 0 &&
    isFileSizeValid;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="flex justify-center w-full">
          <FiEdit className="text-gold hover:text-gold/80 transition duration-150 h-4 w-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto max-w-xs sm:max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle>Editar Producto</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Título */}
          <div>
            <Label htmlFor="title">Título</Label>
            <Input
              name="title"
              placeholder="Nombre del producto"
              value={productState.title}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>
          {/* Precio */}
          <div>
            <Label htmlFor="price">Precio</Label>
            <Input
              type="number"
              name="price"
              placeholder="Precio"
              value={productState.price}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>
          {/* Precio con Descuento */}
          <div>
            <Label htmlFor="discountPrice">Precio con Descuento</Label>
            <Input
              type="number"
              name="discountPrice"
              placeholder="Precio con descuento"
              value={productState.discountPrice || ""}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>
          {/* Cantidad */}
          <div>
            <Label htmlFor="quantity">Cantidad</Label>
            <Input
              type="number"
              name="quantity"
              placeholder="Cantidad en stock"
              value={productState.quantity || ""}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>
          {/* Descripción */}
          <div className="md:col-span-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              name="description"
              value={productState.description || ""}
              onChange={handleInputChange}
              placeholder="Ejemplo: Camiseta deportiva color negro"
              className="w-full"
            />
          </div>
          {/* Imagen */}
          <div className="md:col-span-2">
            <Label htmlFor="image">Imagen Actual</Label>
            {productState.imageUrl && (
              <div className="flex justify-center mb-4">
                <img
                  src={productState.imageUrl}
                  alt="Producto actual"
                  className="max-h-32"
                />
              </div>
            )}
            <Label htmlFor="image">Subir Nueva Imagen</Label>
            <div className="flex items-center space-x-4 mt-2">
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleFileChange}
                className="hidden"
              />
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
          </div>
          {/* Categorías */}
          <div className="md:col-span-2">
            <Label>Categorías</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {filterList.map((category) => (
                <div key={category.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.value}`}
                    checked={productState.category.includes(category.value)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category.value, checked === true)
                    }
                  />
                  <Label htmlFor={`category-${category.value}`}>
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          {/* Talles */}
          <div className="md:col-span-2">
            <Label>Talles</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {["S", "M", "L", "XL"].map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox
                    id={`size-${size}`}
                    checked={productState.sizes.includes(size)}
                    onCheckedChange={(checked) =>
                      handleSizeChange(size, checked === true)
                    }
                  />
                  <Label htmlFor={`size-${size}`}>{size}</Label>
                </div>
              ))}
            </div>
          </div>
          {/* Botones */}
          <div className="md:col-span-2 flex justify-end space-x-4">
            <Button
              className="bg-gray-300"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={!isFormValid || isLoading}
              className={`${
                isFormValid ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
            >
              {isLoading ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
