"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { IProducto } from "@/models/Producto/IProducto";
import { AddToCartButton } from "./AddToCartButton";
import { configApp } from "@/helper/constants";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: IProducto;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();

  const goToPage = () => {
    router.push(`${configApp.baseUrl}/productos?proUuid=${product.proUuId}`);
  };
  return (
    <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-1 rounded-md">
      <div
        className="aspect-square relative overflow-hidden bg-muted cursor-pointer rounded-tl-md rounded-tr-md"
        onClick={goToPage}
      >
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
      </div>
      {product.stock <= 0 && (
        <Badge variant="destructive" className="absolute top-2 right-2">
          Agotado
        </Badge>
      )}
      <div className="space-y-1 p-2">
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
      <AddToCartButton product={product} compact />
    </div>
  );
}
