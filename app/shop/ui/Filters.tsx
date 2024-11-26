import { Slider } from "@/components/ui/Slider/slider";
import { FiSearch } from "react-icons/fi";
import React, { type FC } from "react";
import { Input } from "@/components/ui/Input/input";

type FiltersProps = {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  priceLimits: [number, number];
  categoryCounts: Record<string, number>;
};

export const Filters: FC<FiltersProps> = ({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  searchQuery,
  setSearchQuery,
  priceLimits,
  categoryCounts,
}) => {
  const totalProducts = Object.values(categoryCounts).reduce(
    (acc, count) => acc + count,
    0
  );

  return (
    <aside className="w-1/4 flex flex-col gap-10 font-lato">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold font-sans text-2xl leading-6">
            Buscar producto
          </h3>
          <hr className="w-full h-[3px] bg-gold" />
        </div>
        <div className="relative">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-7 border rounded pl-10 "
            placeholder="Buscar..."
          />
          <FiSearch className="absolute left-4 top-[22px] text-gray-500" />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold font-sans text-2xl leading-6">
            Categoría
          </h3>
          <hr className="w-full h-[3px] bg-gold" />
        </div>
        <ul>
          {/* "Todos" option */}
          <li
            key="all"
            className={`cursor-pointer border-b-[1px] w-[80%] text-lg py-4 
              ${
                selectedCategory === null
                  ? "font-bold text-gold border-b-gold"
                  : ""
              }`}
            onClick={() => setSelectedCategory(null)}
          >
            Todos{" "}
            <span
              className={`${
                selectedCategory === null
                  ? "font-bold text-gold"
                  : "text-gray-500"
              }`}
            >
              ({totalProducts})
            </span>
          </li>

          {/* Other categories */}
          {Object.entries(categoryCounts).map(([category, count]) => (
            <li
              key={category}
              className={`cursor-pointer border-b-[1px] w-[80%] text-lg py-4 
                ${
                  selectedCategory === category
                    ? "font-bold text-gold border-b-gold"
                    : ""
                }`}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category ? null : category
                )
              }
            >
              {category}{" "}
              <span
                className={`${
                  selectedCategory === category
                    ? "font-bold text-gold"
                    : "text-gray-500"
                }`}
              >
                ({count})
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Filter */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold font-sans text-2xl leading-6">
            Rango de precio
          </h3>
          <hr className="w-full h-[3px] bg-gold" />
        </div>
        <div>
          <Slider
            value={priceRange}
            min={priceLimits[0]}
            max={priceLimits[1]}
            step={10}
            onValueChange={(value) => setPriceRange([value[0], value[1]])}
            className="w-full"
          />
          <div className="flex justify-between text-sm pt-2">
            <span>
              {new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS",
              }).format(priceRange[0])}
            </span>
            <span>
              {new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS",
              }).format(priceRange[1])}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
