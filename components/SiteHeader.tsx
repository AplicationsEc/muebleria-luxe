"use client";
import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { configApp } from "@/helper/constants";
import { useShoppingCart } from "./ShoppingCartProvider";

export function SiteHeader() {
  const { openCart } = useShoppingCart();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">{configApp.nombreEmpresa}</span>
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={openCart}
          >
            <ShoppingCartIcon className="h-5 w-5" />
            <span className="sr-only">Carrito</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
