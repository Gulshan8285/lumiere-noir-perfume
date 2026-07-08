"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, Search, X, Gift } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { products, families, discoverySet } from "./data";
import { ProductCard } from "./FeaturedProducts";
import { SectionHeading } from "./SectionHeading";
import { useToast } from "@/hooks/use-toast";
import { useCartStore } from "./useCartStore";
import { useViewStore } from "./useViewStore";
import { cn } from "@/lib/utils";

type Sort = "featured" | "price-asc" | "price-desc" | "name";

export function ShopView() {
  const [family, setFamily] = useState<string>("all");
  const [sort, setSort] = useState<Sort>("featured");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = products.filter((p) =>
      family === "all" ? true : p.family === family
    );
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.familyLabel.toLowerCase().includes(q) ||
          p.notes.top.toLowerCase().includes(q) ||
          p.notes.heart.toLowerCase().includes(q) ||
          p.notes.base.toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "name":
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        list = [...list].sort(
          (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
        );
    }
    return list;
  }, [family, sort, query]);

  return (
    <div className="relative px-4 pb-24 pt-32 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="La Boutique"
          title="The Full Collection"
          subtitle="Eight rare compositions and a discovery coffret. Filter by family, search by note."
        />

        {/* Toolbar */}
        <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Family pills */}
          <div className="flex flex-wrap items-center gap-2">
            <SlidersHorizontal className="mr-1 h-4 w-4 text-gold" />
            {families.map((f) => (
              <button
                key={f.id}
                onClick={() => setFamily(f.id)}
                className={cn(
                  "rounded-full border px-4 py-2 font-sans text-xs uppercase tracking-widest transition-all duration-300",
                  family === f.id
                    ? "border-gold bg-gold text-background"
                    : "border-gold/25 text-muted-foreground hover:border-gold/60 hover:text-foreground"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Search + sort */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by note or name…"
                className="h-10 w-full rounded-full border border-gold/25 bg-background/60 pl-9 pr-9 font-sans text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none sm:w-64"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Select value={sort} onValueChange={(v) => setSort(v as Sort)}>
              <SelectTrigger className="h-10 w-full rounded-full border-gold/25 bg-background/60 font-sans text-xs uppercase tracking-widest sm:w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-gold/20 bg-popover/95 backdrop-blur-xl">
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price · Low to High</SelectItem>
                <SelectItem value="price-desc">Price · High to Low</SelectItem>
                <SelectItem value="name">Alphabetical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Result count */}
        <p className="mt-6 font-sans text-xs uppercase tracking-[0.25em] text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "fragrance" : "fragrances"}
          {family !== "all" && ` · ${families.find((f) => f.id === family)?.label}`}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center gap-3 text-center">
            <Search className="h-10 w-10 text-gold/40" />
            <p className="font-serif text-2xl text-foreground">No fragrances match.</p>
            <button
              onClick={() => {
                setFamily("all");
                setQuery("");
              }}
              className="mt-2 rounded-full border border-gold/30 px-5 py-2 font-sans text-xs uppercase tracking-widest text-gold hover:bg-gold hover:text-background"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Discovery set banner */}
        <DiscoveryBanner />
      </div>
    </div>
  );
}

function DiscoveryBanner() {
  const { toast } = useToast();
  const add = useCartStore((s) => s.add);
  const openProduct = useViewStore((s) => s.openProduct);

  function handleAdd() {
    add({
      id: discoverySet.id,
      name: discoverySet.name,
      tagline: discoverySet.tagline,
      family: "Oriental",
      familyLabel: "Discovery Coffret",
      price: discoverySet.price,
      image: discoverySet.image,
      accent: discoverySet.accent,
      size: "7 × 2ml",
      notes: { top: "All seven", heart: "houses", base: "of scent" },
      description: discoverySet.description,
      longDescription: discoverySet.description,
      intensity: 3,
      longevity: 8,
      bestFor: "Gifting",
    });
    toast({
      title: "Added to your fragrance tray",
      description: `${discoverySet.name} · $${discoverySet.price}`,
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7 }}
      className="mt-16 grid grid-cols-1 items-center gap-8 overflow-hidden rounded-3xl border border-gold/20 bg-gradient-to-br from-card/60 to-background/40 p-8 backdrop-blur-sm lg:grid-cols-[1.2fr_1fr] lg:p-12"
    >
      <div className="flex items-center gap-6">
        <div className="relative hidden h-44 w-44 shrink-0 items-center justify-center sm:flex">
          <div className="absolute inset-0 rounded-full bg-gold/15 blur-2xl" />
          <img
            src={discoverySet.image}
            alt={discoverySet.name}
            className="relative h-40 w-40 object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
          />
        </div>
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 font-sans text-[0.65rem] uppercase tracking-[0.25em] text-gold">
            <Gift className="h-3 w-3" />
            The Coffret
          </span>
          <h3 className="mt-3 font-serif text-3xl font-light text-foreground sm:text-4xl">
            {discoverySet.name}
          </h3>
          <p className="mt-3 max-w-md font-sans text-sm leading-relaxed text-muted-foreground">
            {discoverySet.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {discoverySet.includes.slice(0, 4).map((n) => (
              <span
                key={n}
                className="rounded-full border border-gold/15 bg-background/40 px-2.5 py-1 font-sans text-[0.65rem] text-muted-foreground"
              >
                {n}
              </span>
            ))}
            <span className="rounded-full border border-gold/15 bg-background/40 px-2.5 py-1 font-sans text-[0.65rem] text-muted-foreground">
              +3 more
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start gap-4 lg:items-end">
        <div className="font-serif text-4xl text-gold-gradient">
          ${discoverySet.price}
        </div>
        <p className="font-sans text-xs text-muted-foreground lg:text-right">
          Redeemable against a full-size bottle.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleAdd}
            className="rounded-full bg-gradient-to-r from-gold to-gold-soft px-7 py-3 font-sans text-sm font-medium text-background transition-transform duration-300 hover:scale-[1.03]"
          >
            Add to tray
          </button>
          <button
            onClick={() => openProduct("noir-amber")}
            className="rounded-full border border-gold/30 px-7 py-3 font-sans text-sm text-foreground transition-colors hover:border-gold hover:bg-gold/5"
          >
            Discover
          </button>
        </div>
      </div>
    </motion.div>
  );
}
