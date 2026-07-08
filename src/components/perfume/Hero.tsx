"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Particles } from "./Particles";

export function Hero() {
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const sx = useSpring(mvX, { stiffness: 120, damping: 18 });
  const sy = useSpring(mvY, { stiffness: 120, damping: 18 });

  // Bottle subtle rotation following pointer
  const bottleRotateY = useTransform(sx, [-0.5, 0.5], [-18, 18]);
  const bottleRotateX = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const bottleX = useTransform(sx, [-0.5, 0.5], [-14, 14]);

  // Parallax for decorative rings
  const ring1Y = useTransform(sy, [-0.5, 0.5], [18, -18]);
  const ring2Y = useTransform(sy, [-0.5, 0.5], [-26, 26]);
  const auraScale = useTransform(sy, [-0.5, 0.5], [1.05, 0.95]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mvX.set(x);
      mvY.set(y);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, [mvX, mvY]);

  const words = ["The", "Art", "of", "Scent"];

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-background pt-28"
    >
      {/* Ambient gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 70% 30%, rgba(212,162,78,0.18), transparent 60%), radial-gradient(50% 50% at 10% 80%, rgba(180,90,40,0.12), transparent 60%)",
        }}
      />
      <Particles count={36} />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-2 lg:gap-4 lg:px-8 lg:pb-24">
        {/* Left: copy */}
        <div className="relative z-10 order-2 lg:order-1">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 font-sans text-[0.7rem] uppercase tracking-[0.3em] text-gold"
          >
            <Sparkles className="h-3 w-3" />
            Maison de Parfum · Est. 1924
          </motion.span>

          <h1 className="mt-6 font-serif text-6xl font-light leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
            {words.map((w, i) => (
              <motion.span
                key={w}
                initial={{ opacity: 0, y: 40, rotateX: -40 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mr-4 inline-block [transform-style:preserve-3d]"
              >
                {i === 2 ? (
                  <span className="-mx-2 inline-block px-2 text-gold-gradient italic">
                    {w}
                  </span>
                ) : (
                  w
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-7 max-w-md font-sans text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Rare essences, hand-blended in our Grasse atelier. Each flacon is a
            quiet revolution — bottled emotion, distilled to its most luminous
            form.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#collection"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-gold to-gold-soft px-7 py-3.5 font-sans text-sm font-medium tracking-wide text-background transition-transform duration-300 hover:scale-[1.03]"
            >
              <span className="relative z-10">Discover the Collection</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-500 group-hover:translate-x-full"
              />
            </a>
            <a
              href="#story"
              className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-7 py-3.5 font-sans text-sm tracking-wide text-foreground transition-colors duration-300 hover:border-gold hover:bg-gold/5"
            >
              Our Maison
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="mt-12 flex gap-8 border-t border-gold/10 pt-6"
          >
            {[
              { n: "100", l: "Years of craft" },
              { n: "21", l: "Signature scents" },
              { n: "0", l: "Animal testing" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-serif text-3xl font-light text-gold-gradient">
                  {s.n}
                </div>
                <div className="mt-1 font-sans text-[0.7rem] uppercase tracking-widest text-muted-foreground">
                  {s.l}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: 3D bottle scene */}
        <div className="relative order-1 flex items-center justify-center lg:order-2 lg:h-[560px]">
          <div
            className="relative h-[340px] w-[340px] sm:h-[440px] sm:w-[440px] lg:h-[560px] lg:w-[560px]"
            style={{ perspective: "1400px" }}
          >
            {/* Aura */}
            <motion.div
              style={{ scale: auraScale }}
              aria-hidden
              className="absolute inset-0 rounded-full blur-3xl"
            >
              <div className="h-full w-full rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(212,162,78,0.55),rgba(212,162,78,0.12)_45%,transparent_70%)]" />
            </motion.div>

            {/* Decorative rings */}
            <motion.div
              style={{ y: ring1Y }}
              aria-hidden
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="animate-spin-slow h-[330px] w-[330px] rounded-full border border-dashed border-gold/25 sm:h-[420px] sm:w-[420px] lg:h-[520px] lg:w-[520px]" />
            </motion.div>
            <motion.div
              style={{ y: ring2Y }}
              aria-hidden
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="animate-spin-slow-reverse h-[260px] w-[260px] rounded-full border border-gold/15 sm:h-[340px] sm:w-[340px] lg:h-[420px] lg:w-[420px]" />
            </motion.div>

            {/* Orbiting dot */}
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 animate-spin-slow sm:h-[420px] sm:w-[420px] lg:h-[520px] lg:w-[520px]"
            >
              <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_12px_3px_rgba(212,162,78,0.7)]" />
            </motion.div>

            {/* Bottle */}
            <motion.div
              style={{
                rotateY: bottleRotateY,
                rotateX: bottleRotateX,
                x: bottleX,
                transformStyle: "preserve-3d",
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.img
                src="/perfumes/hero-amber.png"
                alt="Noir d'Ambre signature perfume bottle"
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 h-[300px] w-[300px] object-contain drop-shadow-[0_30px_60px_rgba(212,162,78,0.35)] sm:h-[380px] sm:w-[380px] lg:h-[460px] lg:w-[460px]"
              />
              {/* Reflection */}
              <motion.div
                aria-hidden
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="absolute bottom-2 h-10 w-40 rounded-[50%] bg-gold/30 blur-xl"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#marquee"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground md:flex"
      >
        <span className="font-sans text-[0.6rem] uppercase tracking-[0.3em]">
          Scroll
        </span>
        <span className="relative flex h-9 w-5 justify-center rounded-full border border-gold/30">
          <motion.span
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold"
          />
        </span>
      </motion.a>
    </section>
  );
}
