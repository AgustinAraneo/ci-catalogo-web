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

  const deleteImageFromGitHub = async (fileName: string) => {
    if (!fileName) return;

    try {
      // Obtiene el SHA del archivo para poder eliminarlo
      const response = await fetch(
        `https://api.github.com/repos/Nehros-admin/ci-catalog-photos/contents/${fileName}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error("Error al obtener la información del archivo para eliminarlo");
        return;
      }

      const data = await response.json();
      const sha = data.sha; // Obtiene el SHA del archivo

      // Elimina el archivo de GitHub
      await fetch(
        `https://api.github.com/repos/Nehros-admin/ci-catalog-photos/contents/${fileName}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: "Eliminación de imagen asociada al producto desde Next.js",
            sha,
          }),
        }
      );
    } catch (error) {
      console.error("Error al eliminar la imagen de GitHub:", error);
    }
  };

  const handleDelete = async () => {
    // Elimina la imagen del producto de GitHub
    if (product.imageUrl) {
      await deleteImageFromGitHub(product.imageUrl);
    }

    // Llama a la función de eliminación del producto
    onDeleteProduct(product.id);
    setIsOpen(false);
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
