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
import type { EditProductDialogProps, Product } from "@/types/type";
import { Textarea } from "@/components/ui/TextArea/textarea";
import {
  deleteOldImageFromGitHub,
  uploadImageToGitHub,
} from "@/app/src/utils/gitHubActions";

export const EditProductDialog: React.FC<EditProductDialogProps> = ({
  product,
  onUpdateProduct,
}) => {
  const [editedProduct, setEditedProduct] = useState<Product>(product);
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isFileSizeValid, setIsFileSizeValid] = useState(true);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "discountPrice"
          ? parseFloat(value) || null
          : value,
    }));
  };

  const handleSizeChange = (size: string, checked: boolean) => {
    setEditedProduct((prev) => ({
      ...prev,
      sizes: checked
        ? [...prev.sizes, size]
        : prev.sizes.filter((s) => s !== size),
    }));
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    setEditedProduct((prev) => ({
      ...prev,
      category: checked
        ? [...prev.category, category]
        : prev.category.filter((c) => c !== category),
    }));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedProduct((prev) => ({
      ...prev,
      quantity: e.target.value ? parseInt(e.target.value) : null,
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
    try {
      if (file) {
        setUploadProgress(0);

        // Eliminar la imagen antigua si existe
        if (editedProduct.imageUrl) {
          await deleteOldImageFromGitHub(editedProduct.imageUrl);
        }

        // Subir la nueva imagen
        const newImageUrl = await uploadImageToGitHub(file);
        editedProduct.imageUrl = newImageUrl;
        setUploadProgress(100);
      }

      onUpdateProduct(editedProduct);
      setIsOpen(false);
    } catch (error) {
      alert(error);
    }
  };

  const isFormValid =
    editedProduct.title.trim() !== "" &&
    editedProduct.price > 0 &&
    editedProduct.sizes.length > 0 &&
    isFileSizeValid;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="flex justify-center w-full">
          <FiEdit className="text-gold hover:text-gold/80 transition duration-150 h-4 w-4" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Producto</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Título */}
          <div>
            <Label htmlFor="title">Título</Label>
            <Input
              name="title"
              placeholder="Nombre del producto"
              value={editedProduct.title}
              onChange={handleInputChange}
            />
          </div>
          {/* Precio */}
          <div>
            <Label htmlFor="price">Precio</Label>
            <Input
              type="number"
              name="price"
              placeholder="Precio"
              value={editedProduct.price}
              onChange={handleInputChange}
            />
          </div>
          {/* Descripción */}
          <div className="md:col-span-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              name="description"
              value={editedProduct.description || ""}
              onChange={handleInputChange}
              placeholder="Ejemplo: Camiseta deportiva color negro"
            />
          </div>
          {/* Precio con Descuento */}
          <div>
            <Label htmlFor="discountPrice">Precio con Descuento</Label>
            <Input
              type="number"
              name="discountPrice"
              placeholder="Precio con descuento"
              value={editedProduct.discountPrice || ""}
              onChange={handleInputChange}
            />
          </div>
          {/* Cantidad */}
          <div>
            <Label htmlFor="quantity">Cantidad</Label>
            <Input
              type="number"
              name="quantity"
              placeholder="Cantidad"
              value={editedProduct.quantity ?? ""}
              onChange={handleQuantityChange}
            />
          </div>
          {/* Subir nueva imagen */}
          <div className="md:col-span-2">
            <Label htmlFor="image">Subir Nueva Imagen</Label>
            <Input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
            />
            {uploadProgress > 0 && (
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}
            {!isFileSizeValid && (
              <p className="text-red-500 text-sm mt-2">
                El archivo supera el tamaño máximo permitido de 25 MB.
              </p>
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
                    checked={editedProduct.sizes.includes(size)}
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
                    checked={editedProduct.category.includes(category)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category, checked === true)
                    }
                  />
                  <Label htmlFor={`category-${category}`}>{category}</Label>
                </div>
              ))}
            </div>
          </div>
          {/* Botones */}
          <div className="md:col-span-2 flex justify-end space-x-4">
            <Button className="bg-gray-300" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={!isFormValid}
              className={`${
                isFormValid ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
            >
              Guardar Cambios
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
