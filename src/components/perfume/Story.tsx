"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <section
      id="story"
      ref={ref}
      className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Image card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="group relative overflow-hidden rounded-3xl border border-gold/20">
            <motion.img
              src="/perfumes/atelier.png"
              alt="The LUMIÈRE NOIR atelier in Grasse"
              style={{ y: imgY, scale: imgScale }}
              className="h-[420px] w-full object-cover sm:h-[520px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

            {/* floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="absolute bottom-6 left-6 right-6 flex items-center gap-4 rounded-2xl border border-gold/20 bg-background/70 p-5 backdrop-blur-xl sm:right-auto"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
                <Quote className="h-5 w-5" />
              </div>
              <div>
                <p className="font-serif text-lg italic leading-snug text-foreground">
                  "Patience is the first ingredient of every great perfume."
                </p>
                <p className="mt-1 font-sans text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                  — Maître Parfumeur, LUMIÈRE NOIR
                </p>
              </div>
            </motion.div>
          </div>

          {/* decorative corner */}
          <div className="absolute -right-3 -top-3 h-20 w-20 rotate-12 rounded-2xl border border-gold/30 bg-gold/5 backdrop-blur" />
        </motion.div>

        {/* Copy */}
        <div>
          <SectionHeading
            align="left"
            eyebrow="La Maison"
            title="A Century in a Bottle"
          />
          <div className="mt-6 space-y-4 font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Born in a sun-warmed atelier in Grasse in 1924, LUMIÈRE NOIR began
              as a single obsession: to bottle emotion itself. Four generations
              of parfumeurs have since tended that flame.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We still macerate each essence for a hundred days, hand-blend in
              small batches, and rest every flacon in our cellar of oak and
              glass. Slow, deliberate, unrepeatable.
            </motion.p>
          </div>

          {/* feature cards */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { n: "100+", l: "Days maceration" },
              { n: "Grasse", l: "Hand-blended origin" },
              { n: "Vegan", l: "Clean formulation" },
              { n: "Refill", l: "Lifetime flacons" },
            ].map((f, i) => (
              <motion.div
                key={f.l}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                className="rounded-2xl border border-gold/15 bg-card/40 p-4 backdrop-blur"
              >
                <div className="font-serif text-2xl text-gold-gradient">{f.n}</div>
                <div className="mt-1 font-sans text-[0.7rem] uppercase tracking-widest text-muted-foreground">
                  {f.l}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
