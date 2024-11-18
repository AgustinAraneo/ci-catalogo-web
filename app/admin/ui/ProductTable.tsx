import type { Product, ProductTableProps } from "@/types/type";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table/table";
import { FaEye } from "react-icons/fa";
import { EditProductDialog } from "./EditProductDialog";
import { DeleteProductDialog } from "./DeleteProductDialog";

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onUpdateProduct,
  onDeleteProduct,
}) => {
  return (
    <div className="overflow-x-auto">
      <Table className="font-lato">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] font-semibold text-gray-500">
              Nro. producto
            </TableHead>
            <TableHead className="font-semibold text-gray-500">
              Nombre
            </TableHead>
            <TableHead className="font-semibold text-gray-500">
              Precio
            </TableHead>
            <TableHead className="font-semibold text-gray-500">
              P. oferta
            </TableHead>
            <TableHead className="font-semibold text-gray-500">
              Talles
            </TableHead>
            <TableHead className="font-semibold text-gray-500">
              Categoría
            </TableHead>
            <TableHead className="font-semibold text-gray-500">
              Cantidad
            </TableHead>
            <TableHead className="font-semibold text-gray-500">
              Imagen
            </TableHead>
            <TableHead className="font-semibold text-gray-500 text-center">
              Link
            </TableHead>
            <TableHead className="font-semibold text-gray-500 text-center">
              Modificar
            </TableHead>
            <TableHead className="font-semibold text-gray-500 text-center">
              Eliminar
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length > 0 ? (
            products.map((product: Product) => (
              <TableRow key={product.id} className="text-left">
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>${product.price?.toFixed(2)}</TableCell>
                <TableCell>
                  {product.discountPrice !== null
                    ? `$${product.discountPrice.toFixed(2)}`
                    : "-"}
                </TableCell>
                <TableCell>{product.sizes.join(", ")}</TableCell>
                <TableCell>{product.category.join(", ")}</TableCell>
                <TableCell>
                  {product.quantity !== null ? product.quantity : "-"}
                </TableCell>
                <TableCell className="w-[100px]">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-[50px] h-[50px] object-cover rounded"
                    />
                  ) : (
                    "Sin imagen"
                  )}
                </TableCell>
                <TableCell className="w-[50px]">
                  <a
                    className="text-blue-500 hover:text-blue-400 transition-all flex justify-center"
                    href={`/shop/${product.id}`}
                  >
                    <FaEye className="w-4 h-4" />
                  </a>
                </TableCell>
                <TableCell className="w-[70px]">
                  <EditProductDialog
                    product={product}
                    onUpdateProduct={onUpdateProduct}
                  />
                </TableCell>
                <TableCell className="w-[0px]">
                  <DeleteProductDialog
                    product={product}
                    onDeleteProduct={onDeleteProduct}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="text-center w-full">
                No hay productos disponibles
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
