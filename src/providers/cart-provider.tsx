"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCartId } from "@/lib/cart-cookie";

interface CartContextValue {
  cartId: string | null;
  setCartId: (id: string | null) => void;
  isInitialized: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

interface CartProviderProps {
  children: React.ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cartId, setCartId] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize cart ID from cookie on mount
    const storedCartId = getCartId();
    if (storedCartId) {
      setCartId(storedCartId);
    }
    setIsInitialized(true);
  }, []);

  return (
    <CartContext.Provider value={{ cartId, setCartId, isInitialized }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
}
