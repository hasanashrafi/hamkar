"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  CART_EVENT,
  addToCart,
  cartCount,
  cartTotal,
  clearCart,
  getCart,
  removeFromCart,
  updateCartKg,
} from "@/lib/cart";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const sync = () => setItems(getCart());
    sync();
    window.addEventListener(CART_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CART_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const value = useMemo(
    () => ({
      items,
      count: cartCount(items),
      total: cartTotal(items),
      add: (product, kg) => setItems(addToCart(product, kg)),
      updateKg: (productId, kg) => setItems(updateCartKg(productId, kg)),
      remove: (productId) => setItems(removeFromCart(productId)),
      clear: () => {
        clearCart();
        setItems([]);
      },
    }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
