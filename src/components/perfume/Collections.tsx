"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, RotateCw } from "lucide-react";
import { collections } from "./data";
import { SectionHeading } from "./SectionHeading";
import { useViewStore } from "./useViewStore";

export function Collections() {
  const setView = useViewStore((s) => s.setView);

  return (
    <section
      id="families"
      className="relative overflow-hidden border-y border-gold/10 bg-secondary/20 py-24 lg:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(40% 40% at 80% 20%, rgba(212,162,78,0.10), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Olfactory Families"
          title="Three Houses of Scent"
          subtitle="Each family is a chapter. Tap a card to reveal its soul."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {collections.map((c, i) => (
            <FlipCard
              key={c.id}
              index={i}
              title={c.title}
              subtitle={c.subtitle}
              description={c.description}
              image={c.image}
              accent={c.accent}
              count={c.count}
              onExplore={() => setView("families")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FlipCard({
  index,
  title,
  subtitle,
  description,
  image,
  accent,
  count,
  onExplore,
}: {
  index: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  accent: string;
  count: string;
  onExplore: () => void;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="group h-[440px] [perspective:1600px]"
    >
      <button
        type="button"
        onClick={() => setFlipped((v) => !v)}
        aria-label={`${title} — tap to ${flipped ? "close" : "reveal"}`}
        className="block h-full w-full text-left [transform-style:preserve-3d] transition-transform duration-700 group-hover:[transform:rotateY(180deg)]"
        style={{
          transform: flipped ? "rotateY(180deg)" : undefined,
        }}
      >
        {/* Front */}
        <div className="backface-hidden absolute inset-0 flex flex-col justify-end overflow-hidden rounded-3xl border border-gold/15">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={image}
              alt={title}
              className="h-72 w-72 object-contain opacity-90 transition-transform duration-700 group-hover:scale-110 drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
            />
          </div>
          <div className="pointer-events-none absolute left-6 top-6">
            <span
              className="font-sans text-[0.6rem] uppercase tracking-[0.3em]"
              style={{ color: accent }}
            >
              0{index + 1} — {count}
            </span>
          </div>
          <div className="pointer-events-none absolute right-6 top-6 flex items-center gap-1.5 rounded-full border border-gold/20 bg-background/40 px-3 py-1 font-sans text-[0.6rem] uppercase tracking-[0.2em] text-gold/80 backdrop-blur">
            <RotateCw className="h-3 w-3" />
            Tap
          </div>
          <div className="relative z-10 p-7">
            <h3 className="font-serif text-4xl font-light text-foreground">
              {title}
            </h3>
            <p className="mt-1 font-sans text-sm italic text-muted-foreground">
              {subtitle}
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 font-sans text-[0.65rem] uppercase tracking-[0.2em] text-gold">
              Tap to reveal
              <ArrowUpRight className="h-3 w-3" />
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="backface-hidden absolute inset-0 flex flex-col justify-between overflow-hidden rounded-3xl border p-7 [transform:rotateY(180deg)]"
          style={{
            borderColor: `${accent}55`,
            background: `linear-gradient(160deg, ${accent}22, rgba(0,0,0,0.7))`,
          }}
        >
          <div>
            <span
              className="font-sans text-[0.6rem] uppercase tracking-[0.3em]"
              style={{ color: accent }}
            >
              The Essence
            </span>
            <h3 className="mt-2 font-serif text-3xl font-light text-foreground">
              {title}
            </h3>
          </div>
          <p className="font-sans text-sm leading-relaxed text-foreground/80">
            {description}
          </p>
          <span
            onClick={(e) => {
              e.stopPropagation();
              onExplore();
            }}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/40 bg-background/40 px-5 py-3 font-sans text-xs uppercase tracking-widest text-foreground transition-colors hover:bg-gold hover:text-background"
          >
            Explore the family
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </button>
    </motion.div>
  );
}
