import React, { useState } from "react";
import { Button } from "@/components/ui/Button/button";
import type { Product } from "@/types/type";
import { ProductForm } from "../ProductForm";
import { EditProductDialog } from "../EditProductDialog";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";

interface HomeMobileButtonsAdminProps {
  onAddProduct: (newProduct: Product) => void;
  onUpdateProduct: (updatedProduct: Product) => void;
}

export const HomeMobileButtonsAdmin: React.FC<HomeMobileButtonsAdminProps> = ({
  onAddProduct,
  onUpdateProduct,
}) => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleCreateClick = () => {
    setIsCreateOpen(true);
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setIsEditOpen(true);
  };

  return (
    <div>
      {/* Botón para Crear Producto */}
      <div className="flex justify-center mb-4">
        <Button
          className="bg-blue-500 text-white py-2 px-4 rounded shadow-lg hover:bg-blue-600 transition"
          onClick={handleCreateClick}
        >
          Agregar Producto
        </Button>
      </div>

      {/* Tarjetas de Productos */}
      <div className="space-y-4">
        {[{
          id: 1,
          title: "Producto 1",
          description: "Descripción del producto",
          price: 100,
          discountPrice: 80, // Precio con descuento
          sizes: ["S", "M"],
          quantity: 10,
          imageUrl: "https://via.placeholder.com/150",
          category: ["Categoría 1"],
        }].map((product) => (
          <div
            key={product.id}
            className="bg-white shadow rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-bold">{product.title}</h3>
              <p className="text-sm text-gray-500">
                Precio: <span className="line-through">${product.price.toFixed(2)}</span> ${product.discountPrice?.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                Categoría: {product.category.join(", ")}
              </p>
            </div>
            <div className="flex space-x-4 items-center">
              {/* Botón de Ver */}
              <button
                className="text-blue-500 hover:text-blue-400"
                onClick={() => console.log("Ver Producto")}
              >
                <FaEye className="w-5 h-5" />
              </button>
              {/* Botón de Editar */}
              <button
                className="text-yellow-500 hover:text-yellow-400"
                onClick={() =>
                    handleEditClick({
                    ...product,
                    id: product.id.toString(), // Convertimos el id a string
                    })
                }
                >
                <FaEdit className="w-5 h-5" />
                </button>

              {/* Botón de Eliminar */}
              <button
                className="text-red-500 hover:text-red-400"
                onClick={() => console.log("Eliminar Producto")}
              >
                <FaTrashAlt className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Diálogo para Crear Producto */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg max-w-[90%] max-h-[90%] overflow-auto p-6">
            <ProductForm
              onAddProduct={(newProduct) => {
                onAddProduct(newProduct);
                setIsCreateOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Diálogo para Editar Producto */}
      {isEditOpen && editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg max-w-[90%] max-h-[90%] overflow-auto p-6">
            <EditProductDialog
              product={editingProduct}
              onUpdateProduct={(updatedProduct) => {
                onUpdateProduct(updatedProduct);
                setIsEditOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
