import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ProductNeedId } from "@/types/type";
import { ProductCard } from "./ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination/pagination";

type ProductListProps = {
  products: ProductNeedId[];
  imageUrls: Record<string, string | null>;
};

export const ProductList: React.FC<ProductListProps> = ({
  products,
  imageUrls,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageChangeKey, setPageChangeKey] = useState(0);
  const pageSize = 9;

  const totalPages = Math.ceil(products.length / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setPageChangeKey((prev) => prev + 1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  const startIndex = (currentPage - 1) * pageSize;
  const currentProducts = products.slice(startIndex, startIndex + pageSize);

  const getPaginationGroup = () => {
    const pagesToShow = 5;
    const startPage = Math.max(
      1,
      Math.min(
        currentPage - Math.floor(pagesToShow / 2),
        totalPages - pagesToShow + 1
      )
    );
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      let isScrolling = false;
      let animationFrameId: number;

      const scrollToTop = () => {
        const duration = 1500;
        const start = window.scrollY;
        const startTime = performance.now();

        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

        const scroll = (currentTime: number) => {
          if (isScrolling) return;

          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / duration, 1);
          const ease = easeOutCubic(progress);

          window.scrollTo(0, start * (1 - ease));

          if (timeElapsed < duration) {
            animationFrameId = requestAnimationFrame(scroll);
          }
        };

        animationFrameId = requestAnimationFrame(scroll);
      };

      const onUserScroll = () => {
        isScrolling = true;
        window.removeEventListener("wheel", onUserScroll);
        window.removeEventListener("touchmove", onUserScroll);
        window.removeEventListener("keydown", onUserKeyDown);
        cancelAnimationFrame(animationFrameId);
      };

      const onUserKeyDown: EventListener = (event) => {
        const keyboardEvent = event as KeyboardEvent;
        if (
          [
            "ArrowUp",
            "ArrowDown",
            "PageUp",
            "PageDown",
            "Home",
            "End",
            " ",
          ].includes(keyboardEvent.key)
        ) {
          onUserScroll();
        }
      };

      window.addEventListener("wheel", onUserScroll);
      window.addEventListener("touchmove", onUserScroll);
      window.addEventListener("keydown", onUserKeyDown);

      scrollToTop();

      return () => {
        window.removeEventListener("wheel", onUserScroll);
        window.removeEventListener("touchmove", onUserScroll);
        window.removeEventListener("keydown", onUserKeyDown);
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, [pageChangeKey]);

  return (
    <>
      <motion.div
        key={pageChangeKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <AnimatePresence>
            {currentProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard
                  product={product}
                  imageUrl={imageUrls[product.id] || null}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />
              </PaginationItem>

              {currentPage > Math.floor((5 - 1) / 2) + 1 && (
                <>
                  <PaginationItem>
                    <PaginationLink onClick={() => handlePageChange(1)}>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                </>
              )}

              {getPaginationGroup().map((item) => (
                <PaginationItem key={item}>
                  <PaginationLink
                    isActive={currentPage === item}
                    onClick={() => handlePageChange(item)}
                  >
                    {item}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {currentPage < totalPages - Math.floor((5 - 1) / 2) && (
                <>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => handlePageChange(totalPages)}
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
};
