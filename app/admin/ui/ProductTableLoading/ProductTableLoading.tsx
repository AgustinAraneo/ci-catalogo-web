import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table/table";

export const ProductTableLoading: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <Table className="font-lato">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] font-semibold text-gray-500">
              Nro. producto
            </TableHead>
            <TableHead className="font-semibold text-gray-500">Nombre</TableHead>
            <TableHead className="font-semibold text-gray-500">Precio</TableHead>
            <TableHead className="font-semibold text-gray-500">P. oferta</TableHead>
            <TableHead className="font-semibold text-gray-500">Talles</TableHead>
            <TableHead className="font-semibold text-gray-500">Categoría</TableHead>
            <TableHead className="font-semibold text-gray-500">Cantidad</TableHead>
            <TableHead className="font-semibold text-gray-500">Imagen</TableHead>
            <TableHead className="font-semibold text-gray-500 text-center">Link</TableHead>
            <TableHead className="font-semibold text-gray-500 text-center">Modificar</TableHead>
            <TableHead className="font-semibold text-gray-500 text-center">Eliminar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              {Array.from({ length: 11 }).map((__, cellIndex) => (
                <TableCell key={cellIndex}>
                  <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
