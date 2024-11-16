import type { Product } from "@/types/type";
import React from "react";

interface ProductTableProps {
  products: Product[];
}

export const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Nombre</th>
            <th className="px-4 py-2 border">Precio</th>
            <th className="px-4 py-2 border">Talles</th>
            <th className="px-4 py-2 border">Cantidad</th>
            <th className="px-4 py-2 border">Link</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id} className="text-center">
                <td className="px-4 py-2 border">{product.id}</td>
                <td className="px-4 py-2 border">{product.title}</td>
                <td className="px-4 py-2 border">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-4 py-2 border">{product.sizes.join(", ")}</td>
                <td className="px-4 py-2 border">
                  {product.quantity !== null ? product.quantity : "No definido"}
                </td>
                <td className="px-4 py-2 border">
                  <a className="text-blue-500" href={`/shop/${product.id}`}>
                    Link
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="px-4 py-2 border">
                No hay productos disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
