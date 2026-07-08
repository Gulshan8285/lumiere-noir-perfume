"use client";

import { motion } from "framer-motion";
import { Plus, Star, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { products, type Product } from "./data";
import { TiltCard } from "./TiltCard";
import { SectionHeading } from "./SectionHeading";
import { useToast } from "@/hooks/use-toast";
import { useCartStore } from "./useCartStore";
import { useViewStore } from "./useViewStore";

export function FeaturedProducts() {
  const featured = products.filter((p) => p.featured);
  const setView = useViewStore((s) => s.setView);

  return (
    <section
      id="collection"
      className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      <SectionHeading
        eyebrow="The Collection"
        title="Signature Fragrances"
        subtitle="Four rare compositions, each a world of its own. Tilt a card — then open it to explore."
      />

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <button
          onClick={() => setView("shop")}
          className="group inline-flex items-center gap-2 rounded-full border border-gold/30 px-7 py-3.5 font-sans text-sm tracking-wide text-foreground transition-colors duration-300 hover:border-gold hover:bg-gold/5"
        >
          View the full boutique
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}

export function ProductCard({ product, index }: { product: Product; index?: number }) {
  const { toast } = useToast();
  const add = useCartStore((s) => s.add);
  const openProduct = useViewStore((s) => s.openProduct);

  function handleAdd(e: React.MouseEvent) {
    e.stopPropagation();
    add(product);
    toast({
      title: "Added to your fragrance tray",
      description: `${product.name} · $${product.price}`,
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index ?? 0) * 0.1 }}
      className="[perspective:1200px]"
    >
      <TiltCard accent={product.accent} className="h-full" max={16}>
        <Card
          onClick={() => openProduct(product.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openProduct(product.id);
            }
          }}
          className="group relative h-full cursor-pointer overflow-hidden border-gold/15 bg-card/60 p-0 backdrop-blur-sm transition-shadow duration-500 hover:border-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
        >
          {/* top tag */}
          <div
            className="pointer-events-none absolute left-4 top-4 z-20 rounded-full border px-3 py-1 font-sans text-[0.6rem] uppercase tracking-[0.2em]"
            style={{
              borderColor: `${product.accent}55`,
              color: product.accent,
              background: `${product.accent}10`,
            }}
          >
            {product.tagline}
          </div>

          {/* image stage */}
          <div
            className="relative flex h-64 items-center justify-center overflow-hidden"
            style={{
              background: `radial-gradient(80% 80% at 50% 40%, ${product.accent}22, transparent 70%)`,
            }}
          >
            <motion.img
              src={product.image}
              alt={product.name}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.08, rotate: -3 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="h-56 w-56 object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
              style={{ transform: "translateZ(40px)" }}
            />
            <div
              className="pointer-events-none absolute -bottom-6 h-10 w-40 rounded-[50%] blur-xl"
              style={{ background: `${product.accent}55` }}
            />
          </div>

          {/* content */}
          <div className="flex flex-col gap-3 p-5" style={{ transform: "translateZ(20px)" }}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-serif text-2xl font-medium leading-tight text-foreground">
                  {product.name}
                </h3>
                <p className="mt-0.5 font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {product.familyLabel}
                </p>
              </div>
              <div className="text-right">
                <div className="font-serif text-xl text-gold">${product.price}</div>
                <div className="mt-0.5 flex items-center justify-end gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-gold text-gold" />
                  ))}
                </div>
              </div>
            </div>

            <p className="font-sans text-xs leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            {/* notes */}
            <div className="grid grid-cols-3 gap-1 rounded-lg border border-gold/10 bg-background/40 p-2 text-center">
              {(["top", "heart", "base"] as const).map((k) => (
                <div key={k}>
                  <div className="font-sans text-[0.55rem] uppercase tracking-widest text-gold/80">
                    {k}
                  </div>
                  <div className="mt-0.5 font-sans text-[0.65rem] leading-tight text-muted-foreground">
                    {product.notes[k]}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleAdd}
              className="group/btn mt-1 inline-flex items-center justify-center gap-2 rounded-full border border-gold/40 bg-gold/5 px-4 py-2.5 font-sans text-xs font-medium uppercase tracking-widest text-gold transition-all duration-300 hover:bg-gold hover:text-background"
            >
              <Plus className="h-3.5 w-3.5 transition-transform group-hover/btn:rotate-90" />
              Add to tray
            </button>
          </div>
        </Card>
      </TiltCard>
    </motion.div>
  );
}
