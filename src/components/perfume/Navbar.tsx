"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "./useCartStore";
import { useViewStore, type View } from "./useViewStore";
import { SearchDialog } from "./SearchDialog";

const links: { label: string; view: View; anchor?: string }[] = [
  { label: "Boutique", view: "shop" },
  { label: "Families", view: "families" },
  { label: "Maison", view: "maison" },
  { label: "Collection", view: "home", anchor: "collection" },
  { label: "Notes", view: "home", anchor: "notes" },
  { label: "Voices", view: "home", anchor: "voices" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const cartCount = useCartStore((s) => s.count());
  const { view, setView, goHome } = useViewStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleNav(l: (typeof links)[number]) {
    setOpen(false);
    if (l.view === "home" && l.anchor) {
      goHome(l.anchor);
    } else {
      setView(l.view);
    }
  }

  function isActive(l: (typeof links)[number]) {
    if (l.view === "home" && l.anchor) return view === "home";
    return view === l.view;
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-500 sm:px-6 lg:px-8",
            scrolled
              ? "my-2 rounded-2xl border border-gold/15 bg-background/70 py-3 backdrop-blur-xl"
              : "my-0 border border-transparent py-5"
          )}
        >
          {/* Logo */}
          <button
            onClick={() => setView("home")}
            className="group flex items-center gap-2"
            aria-label="LUMIÈRE NOIR home"
          >
            <span className="relative flex h-9 w-9 items-center justify-center">
              <span className="absolute inset-0 rotate-45 rounded-md border border-gold/60 transition-transform duration-500 group-hover:rotate-[135deg]" />
              <span className="font-serif text-lg font-semibold text-gold-gradient">
                L
              </span>
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-serif text-base font-medium tracking-[0.25em] text-foreground">
                LUMIÈRE
              </span>
              <span className="font-sans text-[0.55rem] uppercase tracking-[0.5em] text-gold/80">
                Noir
              </span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <button
                key={l.label}
                onClick={() => handleNav(l)}
                className={cn(
                  "group relative px-4 py-2 font-sans text-sm tracking-wide transition-colors",
                  isActive(l)
                    ? "text-gold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {l.label}
                <span
                  className={cn(
                    "absolute inset-x-4 -bottom-0.5 h-px origin-left bg-gradient-to-r from-gold to-transparent transition-transform duration-300",
                    isActive(l) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="hidden h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:flex"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
            <button
              aria-label="Cart"
              onClick={() => setView("cart")}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[0.6rem] font-semibold text-background"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary md:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mx-3 overflow-hidden rounded-2xl border border-gold/15 bg-background/95 backdrop-blur-xl md:hidden"
            >
              <ul className="flex flex-col p-2">
                {links.map((l) => (
                  <li key={l.label}>
                    <button
                      onClick={() => handleNav(l)}
                      className="block w-full rounded-xl px-4 py-3 text-left font-serif text-xl text-foreground/90 transition-colors hover:bg-secondary hover:text-gold"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => {
                      setOpen(false);
                      setSearchOpen(true);
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-4 py-3 text-left font-serif text-xl text-foreground/90 transition-colors hover:bg-secondary hover:text-gold"
                  >
                    <Search className="h-5 w-5" /> Search
                  </button>
                </li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
