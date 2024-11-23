import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog/dialog";
import { Button } from "@/components/ui/Button/button";
import { FiTrash2 } from "react-icons/fi";
import type { DeleteProductDialogProps } from "@/types/type";
import { useState } from "react";
import { deleteImageFromGitHub } from "@/app/src/utils/gitHubActions";

export const DeleteProductDialog: React.FC<DeleteProductDialogProps> = ({
  product,
  onDeleteProduct,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      if (product.imageUrl) {
        await deleteImageFromGitHub(product.imageUrl);
      }

      onDeleteProduct(product.id);

      setIsOpen(false);
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="flex justify-center">
          <FiTrash2 className="text-red-500 hover:text-red-400 h-4 w-4 cursor-pointer transition-all" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>¿Estás seguro de eliminar este producto?</DialogTitle>
        </DialogHeader>
        <div className="flex justify-end space-x-4">
          <Button onClick={handleDelete} className="bg-red-500 text-white">
            Eliminar
          </Button>
          <Button onClick={() => setIsOpen(false)}>Cancelar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
