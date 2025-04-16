"use client";

import type React from "react";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { productosApi } from "@/api/productos";

export function SearchFilters() {
  //const router = useRouter();
  const searchParams = useSearchParams();

  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("categoria") || ""
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([
    searchParams.get("precioMin")
      ? Number.parseFloat(searchParams.get("precioMin")!)
      : 0,
    searchParams.get("precioMax")
      ? Number.parseFloat(searchParams.get("precioMax")!)
      : 1000,
  ]);

  useEffect(() => {
    const loadCategories = async () => {
      const categoriesList = await productosApi.getCategories();
      setCategories(categoriesList);
    };

    loadCategories();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters();
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? "" : category);
    updateFilters(category === selectedCategory ? "" : category);
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const updateFilters = (category = selectedCategory) => {
    const params = new URLSearchParams();

    if (searchQuery) {
      params.set("q", searchQuery);
    }

    if (category) {
      params.set("categoria", category);
    }

    params.set("precioMin", priceRange[0].toString());
    params.set("precioMax", priceRange[1].toString());

    //router.push(`/?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setPriceRange([0, 1000]);
    //router.push("/");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Filtros</h2>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar productos..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Buscar
          </Button>
        </form>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium mb-3">Categorías</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">Rango de precio</h3>
          <div className="text-sm text-muted-foreground">
            ${priceRange[0]} - ${priceRange[1]}
          </div>
        </div>
        <Slider
          defaultValue={priceRange}
          min={0}
          max={1000}
          step={10}
          value={priceRange}
          onValueChange={handlePriceChange}
          onValueCommit={() => updateFilters()}
          className="my-6"
        />
      </div>

      <Button variant="outline" className="w-full" onClick={clearFilters}>
        Limpiar filtros
      </Button>
    </div>
  );
}
