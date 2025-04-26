"use client";

import { ShoppingCartIcon as CartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useShoppingCart } from "./ShoppingCartProvider";
import { ModalFinalizarCompra } from "./Compras/Modal/ModalFinalizarCompra";
import { useState } from "react";
import { configApp } from "@/helper/constants";

export function ShoppingCart() {
  const {
    isOpen,
    closeCart,
    cartItems,
    cartQuantity,
    addToCart,
    openCart,
    removeFromCart,
  } = useShoppingCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.precio * item.quantity,
    0
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = async (datos: {
    nombre: string;
    email?: string;
    telefono?: string;
  }) => {
    const usuAgente = localStorage.getItem("usuAgente");

    // Lista de IDs de productos
    const idsProductos = cartItems.map((item) => item.product.id);

    // Armamos la URL
    const baseUrl = configApp.urlAppProd + "?usu_agente=" + usuAgente;
    const idsArrayString = `[${idsProductos.join(",")}]`; // ej: [1,2,3,56]

    const urlConProductos = `${baseUrl}?usu_agente=${
      usuAgente || ""
    }&ids=${encodeURIComponent(idsArrayString)}`;

    // Ahora armamos el mensaje que incluye esa URL
    const mensaje = `
    ${configApp.nombreEmpresa}
    Hola, soy ${datos.nombre}.
    Email: ${datos.email || "No proporcionado"}.
    Teléfono: ${datos.telefono || "No proporcionado"}.
    Agente: ${usuAgente || "No asignado"}.
    Estoy interesado en los productos:
    ${urlConProductos}
    `;

    // Codificar el mensaje para URL de WhatsApp
    const mensajeCodificado = encodeURIComponent(mensaje);

    // Número de destino sacado del ENV
    const telefonoDestino = process.env.NEXT_PUBLIC_WHATSAPP_NUMERO; // ejemplo: "593987159087"

    const urlWhatsapp = `https://wa.me/${telefonoDestino}?text=${mensajeCodificado}`;

    window.open(urlWhatsapp, "_blank");
  };

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        console.log("🌀 onOpenChange triggered:", open);
        if (!open) closeCart();
        else openCart(); // <-- asegura que se mantiene abierto
      }}
    >
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg md:bottom-8 md:right-8 z-50"
          onClick={openCart}
        >
          <div className="relative">
            <CartIcon className="h-5 w-5" />
            {cartQuantity > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {cartQuantity}
              </span>
            )}
          </div>
        </Button>
      </SheetTrigger>

      <SheetContent className="flex w-full flex-col sm:max-w-lg p-5">
        <SheetHeader className="px-1">
          <div className="flex items-center justify-between">
            <SheetTitle>Carrito de compras</SheetTitle>
          </div>
        </SheetHeader>

        {cartQuantity === 0 ? (
          <div className="flex h-full flex-col items-center justify-center space-y-4">
            <CartIcon className="h-12 w-12 text-muted-foreground" />
            <div className="text-center">
              <h3 className="text-lg font-medium">Tu carrito está vacío</h3>
              <p className="text-muted-foreground">
                Parece que no has añadido ningún producto a tu carrito todavía.
              </p>
            </div>
            <Button onClick={closeCart} asChild>
              <Link href="/">Explorar productos</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-6">
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center space-x-4"
                  >
                    <div className="relative h-16 w-16 overflow-hidden rounded-md bg-muted">
                      {item.product.imagenUrl ? (
                        <Image
                          src={item.product.imagenUrl || "/placeholder.svg"}
                          alt={item.product.nombre}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <Image
                          src="/placeholder.svg?height=64&width=64"
                          alt="Imagen no disponible"
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <Link
                        href={`/productos/${item.product.id}`}
                        className="font-medium hover:underline"
                        onClick={closeCart}
                      >
                        {item.product.nombre}
                      </Link>
                      <div className="text-sm text-muted-foreground">
                        ${item.product.precio.toFixed(2)} x {item.quantity}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <span className="sr-only">Eliminar uno</span>
                        <span>-</span>
                      </Button>
                      <span className="w-4 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => addToCart(item.product)}
                        disabled={item.quantity >= item.product.stock}
                      >
                        <span className="sr-only">Añadir uno</span>
                        <span>+</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Envío</span>
                  <span>Calculado al finalizar</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between font-medium">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <Button
                className="w-full"
                size="lg"
                onClick={() => setIsModalOpen(true)}
              >
                Finalizar compra
              </Button>
              <Button variant="outline" className="w-full" onClick={closeCart}>
                Continuar comprando
              </Button>
            </div>
          </>
        )}
      </SheetContent>
      {isModalOpen && (
        <ModalFinalizarCompra
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirm}
          total={totalPrice}
        />
      )}
    </Sheet>
  );
}
