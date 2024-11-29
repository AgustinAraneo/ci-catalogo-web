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

export const DeleteProductDialog: React.FC<DeleteProductDialogProps> = ({
  product,
  onDeleteProduct,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await onDeleteProduct(product.id);
      setIsOpen(false);
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert("Ocurrió un error al eliminar el producto. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
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
          <Button
            onClick={handleDelete}
            className="bg-red-500 text-white hover:bg-red-600"
            disabled={isLoading}
          >
            {isLoading ? "Eliminando..." : "Eliminar"}
          </Button>
          <Button
            onClick={() => setIsOpen(false)}
            className="hover:bg-gray-200"
            disabled={isLoading}
          >
            Cancelar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
