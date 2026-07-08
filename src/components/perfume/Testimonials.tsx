"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "./SectionHeading";
import { testimonials } from "./data";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (d: number) => {
    setDir(d);
    setIndex((i) => (i + d + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const t = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const active = testimonials[index];

  return (
    <section
      id="voices"
      className="relative overflow-hidden border-y border-gold/10 bg-secondary/20 py-24 lg:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(40% 50% at 20% 50%, rgba(212,162,78,0.10), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Voices"
          title="Whispers from Our Patrons"
        />

        <div className="relative mt-12 min-h-[300px] sm:min-h-[260px]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={active.id}
              custom={dir}
              initial={{ opacity: 0, x: dir * 60, rotateY: dir * 12 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: dir * -60, rotateY: dir * -12 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformStyle: "preserve-3d", perspective: 1000 }}
            >
              <Card className="relative overflow-hidden border-gold/20 bg-card/60 p-8 backdrop-blur-xl sm:p-12">
                <Quote className="absolute -top-2 left-6 h-20 w-20 text-gold/10" />
                <div className="relative">
                  <div className="flex gap-1">
                    {Array.from({ length: active.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="mt-5 font-serif text-2xl font-light italic leading-snug text-foreground sm:text-3xl">
                    "{active.quote}"
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-gold/10 font-serif text-lg text-gold">
                      {active.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-sans text-sm font-medium text-foreground">
                        {active.author}
                      </div>
                      <div className="font-sans text-xs text-muted-foreground">
                        {active.role}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-muted-foreground transition-colors hover:border-gold hover:bg-gold/10 hover:text-gold"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => {
                  setDir(i > index ? 1 : -1);
                  setIndex(i);
                }}
                aria-label={`Go to testimonial ${i + 1}`}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: i === index ? 28 : 8,
                  background:
                    i === index
                      ? "var(--gold)"
                      : "color-mix(in oklch, var(--gold) 30%, transparent)",
                }}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-muted-foreground transition-colors hover:border-gold hover:bg-gold/10 hover:text-gold"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
