"use client";

import React from "react";
import { FaInstagram } from "react-icons/fa";

export const InstagramGallery = () => {
  const images = [
    "bg-banner-trending-4",
    "bg-banner-trending-5",
    "bg-banner-trending-6",
    "bg-banner-trending-7",
    "bg-banner-trending-8",
    "bg-banner-trending-9",
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {images.map((bgClass, index) => (
        <div
          key={index}
          className={`relative group overflow-hidden h-64 ${bgClass} bg-cover bg-center flex items-center justify-center`}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <FaInstagram className="text-white text-4xl" />
          </div>
        </div>
      ))}
    </div>
  );
};
