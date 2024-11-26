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
    <div>
      {/* Loading para pantallas grandes */}
      <div className="hidden sm:block overflow-x-auto">
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

      {/* Loading para pantallas pequeñas */}
      <div className="block sm:hidden">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 mb-4 bg-white shadow-md animate-pulse"
          >
            <div className="flex items-center justify-between">
              <div className="h-6 bg-gray-300 rounded w-1/3"></div>
              <div className="h-6 bg-gray-300 rounded w-10"></div>
            </div>
            <div className="mt-2">
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
