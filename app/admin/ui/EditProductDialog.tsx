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
import { FiEdit } from "react-icons/fi";
import type { EditProductDialogProps, Product } from "@/types/type";

export const EditProductDialog: React.FC<EditProductDialogProps> = ({
  product,
  onUpdateProduct,
}) => {
  const [editedProduct, setEditedProduct] = useState<Product>(product);
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    onUpdateProduct(editedProduct);
    setIsOpen(false);
  };

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
        <div className="space-y-4">
          <div>
            <Input
              name="title"
              placeholder="Nombre del producto"
              value={editedProduct.title}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  title: e.target.value,
                })
              }
            />
          </div>
          <div>
            <Input
              type="number"
              placeholder="Precio"
              value={editedProduct.price}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  price: parseFloat(e.target.value),
                })
              }
            />
          </div>
          <div className="flex justify-end space-x-4">
            <Button className="bg-gray-300" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-blue-500 text-white">
              Guardar Cambios
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
