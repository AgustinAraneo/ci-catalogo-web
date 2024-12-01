import { Slider } from "@/components/ui/Slider/slider";
import { FiSearch } from "react-icons/fi";
import React, { type FC } from "react";
import { Input } from "@/components/ui/Input/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet/sheet";
import { FilterIcon } from "@/components/icons/FilterIcon";

type FiltersProps = {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  priceLimits: [number, number];
  categoryCounts: Record<string, number>;
  productsLenght: number;
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
  productsLenght,
}) => {
  const totalProducts = productsLenght;

  return (
    <div className="relative md:w-1/4">
      {/* DESKTOP */}
      <aside className="hidden md:flex flex-col gap-10 font-lato">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold font-sans text-xl leading-6">
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
            <h3 className="font-semibold font-sans text-xl leading-6">
              Categoría
            </h3>
            <hr className="w-full h-[3px] bg-gold" />
          </div>
          <ul>
            {/* "Todos" option */}
            <li
              key="all"
              className={`cursor-pointer border-b-[1px] w-[80%] text-base py-4 
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
                className={`cursor-pointer border-b-[1px] w-[80%] text-base py-4 
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
            <h3 className="font-semibold font-sans text-xl leading-6">
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
            <div className="flex justify-between text-sm pt-2 ">
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
      {/* MOBILE */}
      <div className="md:hidden block">
        <Sheet>
          <SheetTrigger className="absolute -top-10 left-6">
            <p
              className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-white shadow-redcoach-lg"
              aria-label="Abrir filtros"
            >
              <FilterIcon className="text-white" />
            </p>
          </SheetTrigger>
          <SheetContent
            side={"left"}
            className="flex flex-col gap-10 font-lato w-[90%]"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold font-sans text-xl leading-6">
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
                <h3 className="font-semibold font-sans text-xl leading-6">
                  Categoría
                </h3>
                <hr className="w-full h-[3px] bg-gold" />
              </div>
              <ul>
                {/* "Todos" option */}
                <li
                  key="all"
                  className={`cursor-pointer border-b-[1px] w-[80%] text-base py-3
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
                    className={`cursor-pointer border-b-[1px] w-[80%] text-base py-3
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
                <h3 className="font-semibold font-sans text-xl leading-6">
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
                <div className="flex justify-between text-sm pt-2 ">
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
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
