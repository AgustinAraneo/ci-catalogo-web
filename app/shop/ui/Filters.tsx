import { filterList } from "@/app/src/data/data.categorys";
import React, { type FC } from "react";

type FiltersProps = {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
};

export const Filters: FC<FiltersProps> = ({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
}) => {
  return (
    <aside className="w-1/4 p-4 border-r">
      <h2 className="text-xl font-bold mb-4">Filtros</h2>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Categoría</h3>
        <select
          className="w-full p-2 border rounded"
          value={selectedCategory || ""}
          onChange={(e) => setSelectedCategory(e.target.value || null)}
        >
          <option value="">Todas</option>
          {filterList.map((filter) => (
            <option key={filter.value} value={filter.value}>
              {filter.name}
            </option>
          ))}
        </select>
      </div>

      {/* Price Filter */}
      <div>
        <h3 className="font-semibold mb-2">Rango de precio</h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Mín."
            className="w-1/2 p-2 border rounded"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([+e.target.value || 0, priceRange[1]])
            }
          />
          <input
            type="number"
            placeholder="Máx."
            className="w-1/2 p-2 border rounded"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], +e.target.value || 10000])
            }
          />
        </div>
      </div>
    </aside>
  );
};
