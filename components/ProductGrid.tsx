"use client";

import { getProducts } from "@/api/productos";
import { IProducto } from "@/models/Producto/IProducto";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const [products, setProducts] = useState<IProducto[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  const category = searchParams.get("categoria");
  const query = searchParams.get("q");
  const minPrice = searchParams.get("precioMin")
    ? Number.parseFloat(searchParams.get("precioMin")!)
    : undefined;
  const maxPrice = searchParams.get("precioMax")
    ? Number.parseFloat(searchParams.get("precioMax")!)
    : undefined;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts();

        // Filter products based on search parameters
        let filteredProducts = [...data];

        if (category) {
          filteredProducts = filteredProducts.filter(
            (p) => p.categoria === category
          );
        }

        if (query) {
          const searchLower = query.toLowerCase();
          filteredProducts = filteredProducts.filter(
            (p) =>
              p.nombre.toLowerCase().includes(searchLower) ||
              (p.descripcion &&
                p.descripcion.toLowerCase().includes(searchLower)) ||
              (p.marca && p.marca.toLowerCase().includes(searchLower))
          );
        }

        if (minPrice !== undefined) {
          filteredProducts = filteredProducts.filter(
            (p) => p.precio >= minPrice
          );
        }

        if (maxPrice !== undefined) {
          filteredProducts = filteredProducts.filter(
            (p) => p.precio <= maxPrice
          );
        }

        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, query, minPrice, maxPrice]);

  if (loading) {
    return <div className="text-center py-10">Cargando productos...</div>;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-medium mb-2">
          No se encontraron productos
        </h2>
        <p className="text-muted-foreground">
          Intenta con otros filtros de búsqueda
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
