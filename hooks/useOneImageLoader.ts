"use client";
import { useState, useEffect } from "react";
import { fetchImageUrls } from "@/app/src/utils/gitHubActions";

export const useImageLoader = (
  products: { id: string; imageUrl?: string }[]
) => {
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (products.length === 0) {
      setLoading(false);
      return;
    }

    const fetchImages = async () => {
      setLoading(true);
      const urls = await fetchImageUrls(
        products.map(({ id, imageUrl }) => ({ id, imageUrl }))
      );
      setImageUrls(urls);
      setLoading(false);
    };

    fetchImages();
  }, [products]);

  return { imageUrls, loading };
};
