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

export const DeleteProductDialog: React.FC<DeleteProductDialogProps> = ({
  product,
  onDeleteProduct,
}) => {
  return (
    <Dialog>
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
            onClick={() => onDeleteProduct(product.id)}
            className="bg-red-500"
          >
            Eliminar
          </Button>
          <Button>Cancelar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
