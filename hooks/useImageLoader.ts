"use client";
import { useState, useEffect } from "react";

export const useImageLoader = (
  products: { id?: string; imageUrl?: string }[]
) => {
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const validProducts = products.filter(
      (product) => product.id && product.imageUrl
    );

    if (validProducts.length === 0) {
      setLoading(false);
      return;
    }

    const loadImages = () => {
      setLoading(true);

      const urls = validProducts.reduce<Record<string, string>>((acc, product) => {
        if (product.id && product.imageUrl) {
          acc[product.id] = product.imageUrl;
        }
        return acc;
      }, {});

      setImageUrls(urls);
      setLoading(false);
    };

    loadImages();
  }, [products]);

  return { imageUrls, loading };
};
