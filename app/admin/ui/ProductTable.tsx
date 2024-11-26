import type { Product, ProductTableProps } from "@/types/type";
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
import { ProductTableLoading } from "./ProductTableLoading/ProductTableLoading";
import { useImageLoader } from "@/hooks/useImageLoader";

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onUpdateProduct,
  onDeleteProduct,
}) => {
  const { imageUrls, loading } = useImageLoader(products);

  if (loading) {
    return <ProductTableLoading />;
  }

  return (
    <div>
      {/* Tabla para pantallas grandes */}
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
            {products.map((product: Product) => (
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
                <img
                  src={
                    product.id && typeof product.id === "string" && imageUrls[product.id]
                      ? imageUrls[product.id]
                      : "/assets/Productos/fallback-image.jpg"
                  }
                  alt={product.title || "Imagen por defecto"}
                  className="w-[50px] h-[50px] object-cover rounded"
                />
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
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Tarjetas para dispositivos móviles */}
      <div className="block sm:hidden">
        {products.map((product: Product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 mb-4 bg-white shadow-md"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg">{product.title}</h2>
            </div>
            <p className="text-gray-500 text-sm">
              Nro. producto: <span className="text-gray-700">{product.id}</span>
            </p>
            <p className="text-gray-500 text-sm">
              Precio: <span className="text-gray-700">${product.price?.toFixed(2)}</span>
            </p>
            <p className="text-gray-500 text-sm">
              Precio oferta:{" "}
              <span className="text-gray-700">
                {product.discountPrice !== null
                  ? `$${product.discountPrice.toFixed(2)}`
                  : "-"}
              </span>
            </p>
            <p className="text-gray-500 text-sm">
              Talles: <span className="text-gray-700">{product.sizes.join(", ")}</span>
            </p>
            <p className="text-gray-500 text-sm">
              Categoría:{" "}
              <span className="text-gray-700">{product.category.join(", ")}</span>
            </p>
            <p className="text-gray-500 text-sm">
              Cantidad:{" "}
              <span className="text-gray-700">
                {product.quantity !== null ? product.quantity : "-"}
              </span>
            </p>
            <div className="mt-2 flex justify-between items-center">
              <div className="w-[50px] h-[50px]">
              <img
                  src={
                    product.id && typeof product.id === "string" && imageUrls[product.id]
                      ? imageUrls[product.id]
                      : "/assets/Productos/fallback-image.jpg"
                  }
                  alt={product.title || "Imagen por defecto"}
                  className="w-full h-full object-cover rounded"
                />

              </div>
              <div className="flex space-x-2 justify-end items-center">
                <a
                  className="text-blue-500 hover:text-blue-400 transition-all"
                  href={`/shop/${product.id}`}
                >
                  <FaEye className="w-6 h-6" />
                </a>
                <EditProductDialog
                  product={product}
                  onUpdateProduct={onUpdateProduct}
                />
                <DeleteProductDialog
                  product={product}
                  onDeleteProduct={onDeleteProduct}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

