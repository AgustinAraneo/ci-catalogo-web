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
                {product.id && imageUrls[product.id] ? (
                  <img
                    src={imageUrls[product.id]!}
                    alt={product.title}
                    className="w-[50px] h-[50px] object-cover rounded"
                  />
                ) : (
                  <p className="text-gray-500 italic">Sin imagen</p>
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
