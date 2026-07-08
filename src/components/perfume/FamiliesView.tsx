"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { collections, products } from "./data";
import { SectionHeading } from "./SectionHeading";
import { ProductCard } from "./FeaturedProducts";
import { useViewStore } from "./useViewStore";

export function FamiliesView() {
  const setView = useViewStore((s) => s.setView);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-32 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Olfactory Families"
        title="Houses of Scent"
        subtitle="Three families, eight compositions. Each family is a world — explore the fragrances within."
      />

      <div className="mt-16 space-y-24">
        {collections.map((c, ci) => {
          const familyProducts = products.filter((p) => p.family === c.family);
          return (
            <section key={c.id} className="relative">
              {/* Family header */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7 }}
                className="relative overflow-hidden rounded-3xl border p-8 sm:p-12"
                style={{
                  background: `linear-gradient(160deg, ${c.accent}22, rgba(0,0,0,0.4))`,
                  borderColor: `${c.accent}44`,
                }}
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full opacity-40 blur-3xl" style={{ background: c.accent }} />
                <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <span
                      className="font-sans text-[0.65rem] uppercase tracking-[0.3em]"
                      style={{ color: c.accent }}
                    >
                      0{ci + 1} — {c.count}
                    </span>
                    <h2 className="mt-2 font-serif text-5xl font-light text-foreground sm:text-6xl">
                      {c.title}
                    </h2>
                    <p className="mt-1 font-sans text-sm italic text-muted-foreground">
                      {c.subtitle}
                    </p>
                    <p className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-muted-foreground">
                      {c.description}
                    </p>
                  </div>
                  <div className="relative h-32 w-32 shrink-0 sm:h-40 sm:w-40">
                    <div className="absolute inset-0 rounded-full blur-2xl" style={{ background: `${c.accent}44` }} />
                    <img
                      src={c.image}
                      alt={c.title}
                      className="relative h-full w-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Products in family */}
              {familyProducts.length > 0 ? (
                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {familyProducts.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} />
                  ))}
                </div>
              ) : (
                <p className="mt-8 font-sans text-sm text-muted-foreground">
                  Coming soon to this family.
                </p>
              )}
            </section>
          );
        })}
      </div>

      <div className="mt-20 flex justify-center">
        <button
          onClick={() => setView("shop")}
          className="group inline-flex items-center gap-2 rounded-full border border-gold/30 px-7 py-3.5 font-sans text-sm tracking-wide text-foreground transition-colors duration-300 hover:border-gold hover:bg-gold/5"
        >
          View all fragrances
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
