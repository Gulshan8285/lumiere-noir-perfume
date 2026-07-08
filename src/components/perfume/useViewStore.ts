"use client";

import { create } from "zustand";

export type View =
  | "home"
  | "shop"
  | "maison"
  | "product"
  | "cart"
  | "families";

type ViewState = {
  view: View;
  productId: string | null;
  /** when returning home, optionally scroll to this section id */
  homeAnchor: string | null;
  setView: (v: View) => void;
  openProduct: (id: string) => void;
  goHome: (anchor?: string) => void;
};

export const useViewStore = create<ViewState>((set) => ({
  view: "home",
  productId: null,
  homeAnchor: null,
  setView: (view) =>
    set({ view, homeAnchor: view === "home" ? null : null }),
  openProduct: (productId) => set({ view: "product", productId }),
  goHome: (anchor) => set({ view: "home", homeAnchor: anchor ?? null }),
}));
