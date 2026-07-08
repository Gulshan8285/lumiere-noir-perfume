"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Quote, FlaskConical, Leaf, Award, Recycle, Clock3 } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Particles } from "./Particles";
import { useViewStore } from "./useViewStore";

const timeline = [
  { year: "1924", title: "The First Atelier", text: "Founder Léon Lumière opens a modest workshop in Grasse, blending for a single private client." },
  { year: "1947", title: "Noir d'Ambre", text: "The Maison's signature is born — an amber accord aged one hundred days in oak casks." },
  { year: "1968", title: "The Rose Garden", text: "Acquisition of two hectares of May rose fields above Grasse." },
  { year: "1992", title: "Clean Formulation", text: "LUMIÈRE NOIR becomes one of the first houses to ban animal testing entirely." },
  { year: "2024", title: "A Century of Scent", text: "The centenary coffret is released — seven scents, one hundred years." },
];

const values = [
  { icon: Leaf, title: "Rare Naturals", text: "Sourced from growers we've known for generations." },
  { icon: Award, title: "Hand-Blended", text: "Each batch touched by a single parfumeur, start to finish." },
  { icon: Recycle, title: "Refillable", text: "Lifetime flacons — return for a refill at any boutique." },
  { icon: Clock3, title: "100-Day Rest", text: "Every essence macerates for one hundred days before bottling." },
];

export function MaisonView() {
  const setView = useViewStore((s) => s.setView);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div className="relative pb-24 pt-32">
      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 font-sans text-[0.7rem] uppercase tracking-[0.3em] text-gold"
            >
              <FlaskConical className="h-3 w-3" />
              La Maison · Est. 1924
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-6 font-serif text-6xl font-light leading-[0.95] tracking-tight sm:text-7xl"
            >
              A century
              <br />
              <span className="text-gold-gradient italic">in a bottle</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-6 max-w-md font-sans text-base leading-relaxed text-muted-foreground"
            >
              Born in a sun-warmed atelier in Grasse, LUMIÈRE NOIR began as a
              single obsession: to bottle emotion itself. Four generations have
              since tended that flame.
            </motion.p>
            <button
              onClick={() => setView("shop")}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold-soft px-7 py-3.5 font-sans text-sm font-medium text-background transition-transform duration-300 hover:scale-[1.03]"
            >
              Discover the collection
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-3xl border border-gold/20"
          >
            <img
              src="/perfumes/atelier.png"
              alt="The LUMIÈRE NOIR atelier in Grasse"
              className="h-[420px] w-full object-cover sm:h-[540px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Quote band */}
      <section className="relative mt-24 overflow-hidden border-y border-gold/15 bg-secondary/20 py-20">
        <Particles count={26} />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Quote className="mx-auto h-10 w-10 text-gold/60" />
          <p className="mt-6 font-serif text-3xl font-light italic leading-snug text-foreground sm:text-4xl">
            "A great perfume is not made — it is waited for. We are, above all,
            a house of patience."
          </p>
          <p className="mt-6 font-sans text-[0.7rem] uppercase tracking-[0.3em] text-muted-foreground">
            — Maître Parfumeur, fourth generation
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Craft"
          title="What we hold sacred"
          subtitle="Four principles, unchanged in a hundred years."
        />
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group rounded-2xl border border-gold/15 bg-card/40 p-6 backdrop-blur-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 text-gold transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-serif text-2xl text-foreground">{v.title}</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">
                  {v.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Timeline */}
      <section ref={ref} className="relative overflow-hidden border-y border-gold/10 bg-secondary/20 py-24">
        <motion.div
          aria-hidden
          style={{ y: imgY }}
          className="pointer-events-none absolute inset-0 opacity-30"
        >
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
        </motion.div>
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Heritage" title="A hundred years, distilled" />
          <div className="mt-16 space-y-10">
            {timeline.map((t, i) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-8 ${
                  i % 2 === 0 ? "" : "sm:flex-row-reverse sm:text-right"
                }`}
              >
                <div className="font-serif text-5xl text-gold-gradient sm:w-40 sm:shrink-0">
                  {t.year}
                </div>
                <div className="flex-1 rounded-2xl border border-gold/15 bg-card/40 p-6 backdrop-blur-sm">
                  <h3 className="font-serif text-2xl text-foreground">{t.title}</h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">
                    {t.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="overflow-hidden rounded-3xl border border-gold/20"
          >
            <img
              src="/perfumes/ingredients.png"
              alt="Raw perfume ingredients"
              className="h-80 w-full object-cover sm:h-96"
            />
          </motion.div>
          <div>
            <SectionHeading align="left" eyebrow="Raw Materials" title="Gathered with reverence" />
            <p className="mt-6 font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">
              Our naturals travel from small growers across the Mediterranean,
              Madagascar, and the Atlas. Bergamot from Reggio, rose from our own
              fields, iris aged three years in vellum. Each arrives at the atelier
              and is evaluated, by nose, before it ever touches glass.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { n: "Grasse", l: "Home atelier" },
                { n: "12", l: "Grower partners" },
                { n: "3 yrs", l: "Iris aging" },
                { n: "0", l: "Synthetic musks" },
              ].map((f) => (
                <div
                  key={f.l}
                  className="rounded-2xl border border-gold/15 bg-card/40 p-4"
                >
                  <div className="font-serif text-2xl text-gold-gradient">{f.n}</div>
                  <div className="mt-1 font-sans text-[0.7rem] uppercase tracking-widest text-muted-foreground">
                    {f.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
