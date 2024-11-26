import { filterList } from "@/app/src/data/data.categorys";
import { Slider } from "@/components/ui/Slider/slider";
import { FiSearch } from "react-icons/fi"; // Icono de
import React, { type FC } from "react";

type FiltersProps = {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  priceLimits: [number, number]; // Nuevo prop para los límites dinámicos
};

export const Filters: FC<FiltersProps> = ({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  searchQuery,
  setSearchQuery,
  priceLimits,
}) => {
  return (
    <aside className="w-1/4 p-4 border-r">
      <h2 className="text-xl font-bold mb-4">Filtros</h2>

      {/* Search Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Buscar producto</h3>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border rounded pl-10"
            placeholder="Buscar..."
          />
          <FiSearch className="absolute left-3 top-2.5 text-gray-500" />
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Categoría</h3>
        <ul>
          {filterList.map((filter) => (
            <li
              key={filter.value}
              className={`cursor-pointer ${
                selectedCategory === filter.value ? "font-bold" : ""
              }`}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === filter.value ? null : filter.value
                )
              }
            >
              {filter.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Price Filter */}
      <div>
        <h3 className="font-semibold mb-2">Rango de precio</h3>
        <Slider
          value={priceRange}
          min={priceLimits[0]} // Precio mínimo dinámico
          max={priceLimits[1]} // Precio máximo dinámico
          step={10}
          onValueChange={(value) => setPriceRange([value[0], value[1]])}
          className="w-full"
        />
        <div className="flex justify-between text-sm mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </aside>
  );
};
