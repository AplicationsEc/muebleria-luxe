"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ShoppingCartProvider } from "@/components/ShoppingCartProvider";
import { AddToCartButton } from "@/components/AddToCartButton";
import { productosApi } from "@/api/productos";
import { useEffect, useState } from "react";
import { IProducto } from "@/models/Producto/IProducto";
import { useSearchParams } from "next/navigation";

const ProductPage = () => {
  const searchParams = useSearchParams();
  const proIdParam = searchParams.get("proId");
  const proId = proIdParam ? parseInt(proIdParam, 10) : null;
  const usuAgente = localStorage.getItem("usuAgente");
  const [product, setProduct] = useState<IProducto | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (proId) {
        const productData = await productosApi.getProductoById(proId);
        if (!productData) return; // manejar 404 manualmente si hace falta
        setProduct(productData);
      }
    };

    fetchProduct();
  }, [proId]);

  if (!product) {
    return (
      <ShoppingCartProvider>
        <div>Buscando...</div>
      </ShoppingCartProvider>
    );
  } else {
    return (
      <ShoppingCartProvider>
        <div className="container max-h-[90vh] px-4 py-8">
          <Link
            href={`/muebleria-luxe?usu_agente=${usuAgente}`}
            className="inline-flex items-center mb-6"
          >
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Volver al catálogo
            </Button>
          </Link>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted max-h-[75vh]">
              {product.imagenUrl ? (
                <Image
                  src={product.imagenUrl || "/placeholder.svg"}
                  alt={product.nombre}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="Imagen no disponible"
                  fill
                  className="object-cover"
                  sizes="(max-width: 508px) 80vw, 50vw"
                />
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">{product.nombre}</h1>
                {product.marca && (
                  <p className="text-muted-foreground">
                    Marca: {product.marca}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold">
                  ${product.precio.toFixed(2)}
                </p>
                <p
                  className={`${
                    product.stock > 0 ? "text-green-600" : "text-red-600"
                  } font-medium`}
                >
                  {product.stock > 0 ? `${product.stock} en stock` : "Agotado"}
                </p>
              </div>

              {product.descripcion && (
                <div>
                  <h2 className="text-lg font-semibold mb-2">Descripción</h2>
                  <p className="text-muted-foreground">{product.descripcion}</p>
                </div>
              )}

              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Especificaciones</h2>
                <div className="grid grid-cols-2 gap-4">
                  {product.modelo && (
                    <div>
                      <p className="text-sm text-muted-foreground">Modelo</p>
                      <p>{product.modelo}</p>
                    </div>
                  )}
                  {product.categoria && (
                    <div>
                      <p className="text-sm text-muted-foreground">Categoría</p>
                      <p>{product.categoria}</p>
                    </div>
                  )}
                  {product.tamaño && (
                    <div>
                      <p className="text-sm text-muted-foreground">Tamaño</p>
                      <p>{product.tamaño}</p>
                    </div>
                  )}
                  {(product.alto || product.ancho || product.largo) && (
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Dimensiones
                      </p>
                      <p>
                        {product.alto && `Alto: ${product.alto}cm`}
                        {product.ancho && ` Ancho: ${product.ancho}cm`}
                        {product.largo && ` Largo: ${product.largo}cm`}
                      </p>
                    </div>
                  )}
                  {(product.color1 || product.color2 || product.color3) && (
                    <div>
                      <p className="text-sm text-muted-foreground">Colores</p>
                      <p>
                        {product.color1 && `${product.color1}`}
                        {product.color2 && ` - ${product.color2}`}
                        {product.color3 && ` - ${product.color3}`}
                      </p>
                    </div>
                  )}
                  {product.peso && (
                    <div>
                      <p className="text-sm text-muted-foreground">Peso</p>
                      <p>{product.peso}kg</p>
                    </div>
                  )}
                </div>
              </div>

              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </ShoppingCartProvider>
    );
  }
};

export default ProductPage;
