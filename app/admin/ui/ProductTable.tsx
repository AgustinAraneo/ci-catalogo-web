import type { Product } from "@/types/type";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table/table";

interface ProductTableProps {
  products: Product[];
}

export const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nro. producto</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Talles</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Link</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length > 0 ? (
            products.map((product) => (
              <TableRow key={product.id} className="text-left">
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>${product.price?.toFixed(2)}</TableCell>
                <TableCell>{product.sizes.join(", ")}</TableCell>
                <TableCell>
                  {product.quantity !== null ? product.quantity : "No definido"}
                </TableCell>
                <TableCell>
                  <a className="text-blue-500" href={`/shop/${product.id}`}>
                    Link
                  </a>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No hay productos disponibles
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
