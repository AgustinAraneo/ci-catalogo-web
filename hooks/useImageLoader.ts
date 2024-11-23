"use client";
import { useState, useEffect } from "react";
import { fetchImageUrls } from "@/app/src/utils/gitHubActions";

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

    const fetchImages = async () => {
      setLoading(true);
      const urls = await fetchImageUrls(
        validProducts.map(({ id, imageUrl }) => ({ id: id!, imageUrl }))
      );
      setImageUrls((prev) => ({ ...prev, ...urls }));
      setLoading(false);
    };

    fetchImages();
  }, [products]);

  return { imageUrls, loading };
};
