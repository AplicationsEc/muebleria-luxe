"use client";

import { useState } from "react";
import { ShoppingCart, Check, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IProducto } from "@/models/Producto/IProducto";
import { useShoppingCart } from "./ShoppingCartProvider";

interface AddToCartButtonProps {
  product: IProducto;
  compact?: boolean;
}

export function AddToCartButton({
  product,
  compact = false,
}: AddToCartButtonProps) {
  const { addToCart, removeFromCart, getItemQuantity } = useShoppingCart();
  const [isAdding, setIsAdding] = useState(false);
  const quantity = getItemQuantity(product.id);
  const isInCart = quantity > 0;

  const handleAddToCart = () => {
    if (product.stock <= 0) return;

    setIsAdding(true);
    addToCart(product);

    setTimeout(() => {
      setIsAdding(false);
    }, 1500);
  };

  if (compact) {
    return (
      <Button
        className="w-full"
        size="sm"
        disabled={product.stock <= 0}
        variant={isInCart ? "outline" : "default"}
        onClick={handleAddToCart}
      >
        {product.stock <= 0 ? (
          "Agotado"
        ) : isAdding ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Añadido
          </>
        ) : isInCart ? (
          <>
            <ShoppingCart className="mr-2 h-4 w-4" />
            En carrito ({quantity})
          </>
        ) : (
          <>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Añadir
          </>
        )}
      </Button>
    );
  }

  return (
    <div className="space-y-4">
      {isInCart ? (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => removeFromCart(product.id)}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-10 text-center font-medium">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={handleAddToCart}
            disabled={product.stock <= quantity}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Button
          className="w-full"
          size="lg"
          disabled={product.stock <= 0}
          onClick={handleAddToCart}
        >
          {product.stock <= 0 ? (
            "Agotado"
          ) : isAdding ? (
            <>
              <Check className="mr-2 h-5 w-5" />
              Añadido al carrito
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Añadir al carrito
            </>
          )}
        </Button>
      )}

      {product.stock > 0 && product.stock <= 5 && (
        <p className="text-sm text-amber-600">
          ¡Solo quedan {product.stock} unidades!
        </p>
      )}
    </div>
  );
}
