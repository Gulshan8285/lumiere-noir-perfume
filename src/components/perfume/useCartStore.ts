"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./data";

type CartItem = {
  product: Product;
  qty: number;
};

type CartState = {
  items: CartItem[];
  add: (p: Product) => void;
  remove: (id: string) => void;
  clear: () => void;
  count: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (p) =>
        set((s) => {
          const existing = s.items.find((i) => i.product.id === p.id);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.product.id === p.id ? { ...i, qty: i.qty + 1 } : i
              ),
            };
          }
          return { items: [...s.items, { product: p, qty: 1 }] };
        }),
      remove: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.product.id !== id) })),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((n, i) => n + i.qty, 0),
    }),
    { name: "lumiere-cart" }
  )
);
