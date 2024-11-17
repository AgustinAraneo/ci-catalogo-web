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

  return (
    <Dialog>
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
                  price: parseFloat(e.target.value) || 0,
                })
              }
            />
          </div>
          <Button onClick={() => onUpdateProduct(editedProduct)}>
            Guardar Cambios
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
