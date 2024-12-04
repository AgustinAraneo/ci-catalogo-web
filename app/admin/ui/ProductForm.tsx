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
import type { Product, ProductFormState } from "@/types/type";
import { FaUpload  } from "react-icons/fa";
import { Textarea } from "@/components/ui/TextArea/textarea";
import { filterList } from "@/app/src/data/data.categorys";
import CurrencyInput from "react-currency-input-field";

interface ProductFormProps {
  onAddProduct: (newProduct: Product) => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ onAddProduct }) => {
  const [newProduct, setNewProduct] = useState<ProductFormState>({
    title: "",
    description: "",
    price: "",
    discountPrice: "",
    sizes: [],
    quantity: null,
    imageUrl: "",
    secondaryImages: [],
    category: [],
  });

  const [file, setFile] = useState<File | null>(null);
  const [secondaryFiles, setSecondaryFiles] = useState<File[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
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

  const handleSecondaryFilesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      setSecondaryFiles(Array.from(e.target.files));
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

      // Convertir el precio a número
      const priceValue = parseFloat(
        newProduct.price.replace(/\./g, "").replace(",", ".")
      );
      if (isNaN(priceValue)) {
        alert("El precio no es válido.");
        return;
      }
      formData.append("price", priceValue.toString());

      // Convertir el precio con descuento a número si existe
      if (newProduct.discountPrice) {
        const discountPriceValue = parseFloat(
          newProduct.discountPrice.replace(/\./g, "").replace(",", ".")
        );
        if (isNaN(discountPriceValue)) {
          alert("El precio con descuento no es válido.");
          return;
        }
        formData.append("discountPrice", discountPriceValue.toString());
      }

      if (newProduct.description)
        formData.append("description", newProduct.description);
      if (newProduct.quantity !== null && newProduct.quantity !== undefined)
        formData.append("quantity", newProduct.quantity.toString());
      newProduct.sizes.forEach((size) => formData.append("sizes", size));
      newProduct.category.forEach((category) =>
        formData.append("category", category)
      );
      formData.append("image", file);
      secondaryFiles.forEach((file) =>
        formData.append("secondaryImages", file)
      );

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
          price: "",
          discountPrice: "",
          sizes: [],
          quantity: null,
          imageUrl: "",
          secondaryImages: [],
          category: [],
        });
        setFile(null);
        setSecondaryFiles([]);
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
    newProduct.price !== "" &&
    newProduct.sizes.length > 0 &&
    isFileSizeValid &&
    file !== null;

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <button
          className="pb-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => setIsDialogOpen(true)}
        >
          Agregar Producto
        </button>
      </DialogTrigger>
      <div className="pt-16 sm:pt-0">
        {/* Ajustamos el padding superior solo para móviles */}
        <DialogContent className="max-h-screen overflow-y-auto w-full max-w-4xl mx-auto">
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
              <CurrencyInput
                id="price"
                name="price"
                placeholder="Ejemplo: 2.330,00"
                decimalsLimit={2}
                decimalSeparator=","
                groupSeparator="."
                prefix="$ "
                value={newProduct.price}
                onValueChange={(value) => {
                  setNewProduct((prev) => ({
                    ...prev,
                    price: value || "",
                  }));
                }}
                className="w-full p-2 border rounded-md"
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
              <CurrencyInput
                id="discountPrice"
                name="discountPrice"
                placeholder="Ejemplo: 1.999,99"
                decimalsLimit={2}
                decimalSeparator=","
                groupSeparator="."
                prefix="$ "
                value={newProduct.discountPrice || ""}
                onValueChange={(value) => {
                  setNewProduct((prev) => ({
                    ...prev,
                    discountPrice: value || "",
                  }));
                }}
                className="w-full p-2 border rounded-md"
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
            <Label>Imagen</Label>
            <div
              className={`flex flex-col items-center justify-center w-32 h-32 border ${
                file ? "border-solid" : "border-dashed"
              } border-gray-400 rounded hover:border-blue-500 cursor-pointer`}
              onClick={() => document.getElementById("image")?.click()}
            >
              {file ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Previsualización"
                  className="w-32 h-32 object-cover rounded"
                />
              ) : (
                <>
                  <FaUpload className="text-3xl text-gray-500 hover:text-blue-500" />
                  <span className="text-gray-600 text-sm mt-1">Agregar Imagen</span>
                </>
              )}
            </div>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            {/* Mostrar el nombre del archivo si existe */}
            {file && (
              <div className="flex pl-6 pt-1">
                <span className="text-gray-600 text-sm">{file.name}</span>
              </div>
            )}
            {/* Mostrar mensaje de error si el archivo excede el tamaño permitido */}
            {!isFileSizeValid && (
              <p className="text-red-500 text-sm mt-2">
                El archivo supera el tamaño máximo permitido de 25 MB.
              </p>
            )}
          </div>
          {/* Imágenes Secundarias */}
          <div className="md:col-span-2">
            <div className="flex items-center">
              <Label>Imágenes Secundarias</Label>
              <FaUpload
                className="ml-2 text-1xl cursor-pointer text-gray-500 hover:text-gold"
                onClick={() => document.getElementById("secondaryImages")?.click()}
                title="Agregar imágenes"
              />
            </div>
            <input
              type="file"
              id="secondaryImages"
              name="secondaryImages"
              accept="image/*"
              multiple
              onChange={handleSecondaryFilesChange}
              className="hidden"
            />
            
            {/* Mostrar previsualización de las imágenes secundarias seleccionadas */}
            {secondaryFiles.length > 0 && (
              <div className="flex flex-wrap gap-4 overflow-x-auto mt-4">
                {secondaryFiles.map((file, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Imagen secundaria ${index + 1}`}
                      className="w-32 h-32 object-cover border rounded"
                    />
                    <span className="text-gray-600 text-sm mt-1">{file.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

            {/* Talles */}
            <div className="md:col-span-2">
              <Label>Talles</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {["XS","S", "M", "L", "XL", "XXL"].map((size) => (
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
                {filterList.map((category) => (
                  <div
                    key={category.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`category-${category.value}`}
                      checked={newProduct.category.includes(category.value)}
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
