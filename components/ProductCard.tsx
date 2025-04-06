"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IProducto } from "@/models/Producto/IProducto";
import { AddToCartButton } from "./AddToCartButton";
import { configApp } from "@/helper/constants";

interface ProductCardProps {
  product: IProducto;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link
        href={`${configApp.baseUrl}/productos/${product.id}`}
        className="block"
      >
        <div className="aspect-square relative overflow-hidden bg-muted">
          {product.imagenUrl ? (
            <Image
              src={product.imagenUrl || "/placeholder.svg"}
              alt={""}
              fill
              className="object-cover transition-transform hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="Imagen no disponible"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          {product.stock <= 0 && (
            <Badge variant="destructive" className="absolute top-2 right-2">
              Agotado
            </Badge>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="space-y-1">
          <Link href={`/productos/${product.id}`} className="block">
            <h3 className="font-medium line-clamp-1 hover:underline">
              {product.nombre}
            </h3>
          </Link>
          {product.marca && (
            <p className="text-sm text-muted-foreground">{product.marca}</p>
          )}
          <p className="font-bold">${product.precio.toFixed(2)}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <AddToCartButton product={product} compact />
      </CardFooter>
    </Card>
  );
}
