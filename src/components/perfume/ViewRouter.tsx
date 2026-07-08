"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useViewStore } from "./useViewStore";
import { Hero } from "./Hero";
import { Marquee } from "./Marquee";
import { FeaturedProducts } from "./FeaturedProducts";
import { Collections } from "./Collections";
import { Story } from "./Story";
import { Notes } from "./Notes";
import { Testimonials } from "./Testimonials";
import { Newsletter } from "./Newsletter";
import { ShopView } from "./ShopView";
import { MaisonView } from "./MaisonView";
import { ProductDetailView } from "./ProductDetailView";
import { CartView } from "./CartView";
import { FamiliesView } from "./FamiliesView";

export function ViewRouter() {
  const { view, productId, homeAnchor, goHome } = useViewStore();
  const scrolledRef = useRef(false);

  // Scroll to top whenever the view changes (except home anchor scrolls)
  useEffect(() => {
    if (view !== "home" || !homeAnchor) {
      window.scrollTo({ top: 0, behavior: "auto" });
      scrolledRef.current = false;
    }
  }, [view, homeAnchor]);

  // Handle home anchor scrolling after the home view renders
  useEffect(() => {
    if (view === "home" && homeAnchor && !scrolledRef.current) {
      scrolledRef.current = true;
      // wait a tick for layout
      const t = setTimeout(() => {
        const el = document.getElementById(homeAnchor);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        // clear the anchor so future home visits start at top
        goHome(undefined);
      }, 80);
      return () => clearTimeout(t);
    }
  }, [view, homeAnchor, goHome]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={view + (productId ?? "")}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {view === "home" && (
          <>
            <Hero />
            <Marquee />
            <FeaturedProducts />
            <Collections />
            <Story />
            <Notes />
            <Testimonials />
            <Newsletter />
          </>
        )}
        {view === "shop" && <ShopView />}
        {view === "maison" && <MaisonView />}
        {view === "families" && <FamiliesView />}
        {view === "cart" && <CartView />}
        {view === "product" && <ProductDetailView productId={productId} />}
      </motion.div>
    </AnimatePresence>
  );
}
