"use client";

import { motion } from "framer-motion";
import { Flower2, Droplet, TreePine } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const noteFamilies = [
  {
    icon: Droplet,
    title: "Top Notes",
    french: "Notes de Tête",
    desc: "The first whisper — bright, volatile, fleeting. Citrus, herbs and spice that open the composition.",
    items: ["Bergamot", "Saffron", "Pink Pepper", "Sea Salt", "Galbanum"],
    accent: "#e0c068",
  },
  {
    icon: Flower2,
    title: "Heart Notes",
    french: "Notes de Cœur",
    desc: "The soul of the fragrance — rich florals and resins that bloom after the first breath fades.",
    items: ["Turkish Rose", "Amber", "Jasmine", "Iris", "Fig"],
    accent: "#d4a24e",
  },
  {
    icon: TreePine,
    title: "Base Notes",
    french: "Notes de Fond",
    desc: "The lingering memory — deep woods, musk and resins that trail long after you've gone.",
    items: ["Oud", "Vanilla", "Cedar", "Vetiver", "Oakmoss"],
    accent: "#8a6a3a",
  },
];

export function Notes() {
  return (
    <section
      id="notes"
      className="relative overflow-hidden py-24 lg:py-32"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: ingredients image */}
          <div className="relative">
            <SectionHeading
              align="left"
              eyebrow="The Pyramid"
              title="Anatomy of Scent"
              subtitle="Every fragrance is built in three movements — a pyramid that unfolds over hours."
            />

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
              className="mt-8 overflow-hidden rounded-3xl border border-gold/20"
            >
              <img
                src="/perfumes/ingredients.png"
                alt="Raw perfume ingredients"
                className="h-72 w-full object-cover sm:h-80"
              />
            </motion.div>
          </div>

          {/* Right: notes cards */}
          <div className="flex flex-col gap-5">
            {noteFamilies.map((n, i) => {
              const Icon = n.icon;
              return (
                <motion.div
                  key={n.title}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  whileHover={{ scale: 1.02 }}
                  className="group relative overflow-hidden rounded-2xl border border-gold/15 bg-card/40 p-6 backdrop-blur-sm"
                >
                  <div
                    aria-hidden
                    className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
                    style={{ background: n.accent }}
                  />
                  <div className="relative flex items-start gap-4">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border"
                      style={{
                        borderColor: `${n.accent}55`,
                        background: `${n.accent}15`,
                        color: n.accent,
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-serif text-2xl text-foreground">
                          {n.title}
                        </h3>
                        <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-gold/80">
                          {n.french}
                        </span>
                      </div>
                      <p className="mt-1.5 font-sans text-xs leading-relaxed text-muted-foreground">
                        {n.desc}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {n.items.map((it) => (
                          <span
                            key={it}
                            className="rounded-full border border-gold/15 bg-background/40 px-2.5 py-1 font-sans text-[0.65rem] tracking-wide text-muted-foreground"
                          >
                            {it}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
