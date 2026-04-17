"use client";

import { useState, useCallback } from "react";
import type { Product, ProductVariant, CartItem } from "@/types/product";

const CART_KEY = "oceanahemp_cart";

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  const addItem = useCallback(
    (product: Product, variant: ProductVariant, isSubscription: boolean) => {
      setItems((prev) => {
        const existing = prev.find(
          (i) => i.variant.id === variant.id && i.isSubscription === isSubscription
        );
        let next: CartItem[];
        if (existing) {
          next = prev.map((i) =>
            i.variant.id === variant.id && i.isSubscription === isSubscription
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        } else {
          next = [...prev, { product, variant, quantity: 1, isSubscription }];
        }
        saveCart(next);
        return next;
      });
    },
    []
  );

  const removeItem = useCallback((variantId: string, isSubscription: boolean) => {
    setItems((prev) => {
      const next = prev.filter(
        (i) => !(i.variant.id === variantId && i.isSubscription === isSubscription)
      );
      saveCart(next);
      return next;
    });
  }, []);

  const updateQuantity = useCallback(
    (variantId: string, isSubscription: boolean, quantity: number) => {
      setItems((prev) => {
        const next = prev.map((i) =>
          i.variant.id === variantId && i.isSubscription === isSubscription
            ? { ...i, quantity: Math.max(0, quantity) }
            : i
        ).filter((i) => i.quantity > 0);
        saveCart(next);
        return next;
      });
    },
    []
  );

  const clearCart = useCallback(() => {
    setItems([]);
    saveCart([]);
  }, []);

  const subtotal = items.reduce((sum, i) => sum + i.variant.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return { items, addItem, removeItem, updateQuantity, clearCart, subtotal, itemCount };
}
