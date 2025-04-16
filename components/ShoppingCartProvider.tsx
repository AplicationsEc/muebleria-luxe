"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { IProducto } from "@/models/Producto/IProducto";
import { ShoppingCart } from "./ShoppingCart";

type CartItem = {
  product: IProducto;
  quantity: number;
};

interface ShoppingCartContextType {
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  addToCart: (product: IProducto) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
}

const ShoppingCartContext = createContext<ShoppingCartContextType | null>(null);

export function useShoppingCart() {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error(
      "useShoppingCart must be used within a ShoppingCartProvider"
    );
  }
  return context;
}

export function ShoppingCartProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("shopping-cart");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const cartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  function openCart() {
    setIsOpen(true);
  }

  function closeCart() {
    setIsOpen(false);
  }

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.product.id === id)?.quantity || 0;
  }

  function addToCart(product: IProducto) {
    setCartItems((currItems) => {
      const existingItem = currItems.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return currItems.map((item) => {
          if (item.product.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      } else {
        return [...currItems, { product, quantity: 1 }];
      }
    });

    // Open cart when adding a new item
    if (getItemQuantity(product.id) === 0) {
      openCart();
    }
  }

  function removeFromCart(id: number) {
    setCartItems((currItems) => {
      const existingItem = currItems.find((item) => item.product.id === id);

      if (existingItem?.quantity === 1) {
        return currItems.filter((item) => item.product.id !== id);
      } else if (existingItem) {
        return currItems.map((item) => {
          if (item.product.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      } else {
        return currItems;
      }
    });
  }
  return (
    <ShoppingCartContext.Provider
      value={{
        isOpen,
        openCart,
        closeCart,
        getItemQuantity,
        addToCart,
        removeFromCart,
        cartQuantity,
        cartItems,
      }}
    >
      {children}
      <ShoppingCart />
    </ShoppingCartContext.Provider>
  );
}
