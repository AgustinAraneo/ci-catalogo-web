import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ProductNeedId } from "@/types/type";
import { ProductCard } from "./ProductCard";

type ProductListProps = {
  products: ProductNeedId[];
  imageUrls: Record<string, string | null>;
};

export const ProductList: React.FC<ProductListProps> = ({
  products,
  imageUrls,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      <AnimatePresence>
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className=""
          >
            <ProductCard
              key={product.id}
              product={product}
              imageUrl={imageUrls[product.id] || null}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
