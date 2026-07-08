"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowLeft,
  Plus,
  Minus,
  Star,
  Clock,
  Sparkles,
  Thermometer,
  Calendar,
  ShoppingBag,
} from "lucide-react";
import { products } from "./data";
import { useCartStore } from "./useCartStore";
import { useViewStore } from "./useViewStore";
import { useToast } from "@/hooks/use-toast";
import { TiltCard } from "./TiltCard";
import { ProductCard } from "./FeaturedProducts";

export function ProductDetailView({ productId }: { productId: string | null }) {
  const product = products.find((p) => p.id === productId) ?? products[0];
  const setView = useViewStore((s) => s.setView);
  const openProduct = useViewStore((s) => s.openProduct);

  return (
    <div className="relative px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Back */}
        <button
          onClick={() => setView("shop")}
          className="group mb-8 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to boutique
        </button>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image stage */}
          <BottleStage product={product} />

          {/* Details */}
          <div>
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1 font-sans text-[0.65rem] uppercase tracking-[0.25em]"
                style={{
                  borderColor: `${product.accent}55`,
                  color: product.accent,
                  background: `${product.accent}10`,
                }}
              >
                {product.tagline} · {product.familyLabel}
              </span>
              <h1 className="mt-5 font-serif text-5xl font-light leading-[1] text-foreground sm:text-6xl">
                {product.name}
              </h1>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <span className="font-sans text-xs text-muted-foreground">
                  248 reviews
                </span>
              </div>

              <p className="mt-6 max-w-md font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">
                {product.longDescription}
              </p>

              {/* meta */}
              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Meta icon={Sparkles} label="Intensity" value={`${product.intensity}/5`} />
                <Meta icon={Clock} label="Longevity" value={`${product.longevity}h`} />
                <Meta icon={Thermometer} label="Sillage" value={product.intensity >= 4 ? "Heavy" : "Moderate"} />
                <Meta icon={Calendar} label="Best for" value={product.bestFor} />
              </div>

              {/* price + qty + add */}
              <BuyBar product={product} />

              {/* notes pyramid */}
              <div className="mt-10">
                <h3 className="font-sans text-[0.7rem] uppercase tracking-[0.3em] text-gold">
                  The Olfactory Pyramid
                </h3>
                <div className="mt-4 space-y-3">
                  <NoteRow label="Top Notes" french="Notes de Tête" value={product.notes.top} accent={product.accent} width="100%" />
                  <NoteRow label="Heart Notes" french="Notes de Cœur" value={product.notes.heart} accent={product.accent} width="80%" />
                  <NoteRow label="Base Notes" french="Notes de Fond" value={product.notes.base} accent={product.accent} width="60%" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related */}
        <div className="mt-24">
          <div className="flex items-end justify-between">
            <h2 className="font-serif text-3xl font-light text-foreground sm:text-4xl">
              <span className="text-gold-gradient">You may also love</span>
            </h2>
            <button
              onClick={() => setView("shop")}
              className="font-sans text-xs uppercase tracking-widest text-gold hover:underline"
            >
              View all
            </button>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products
              .filter((p) => p.id !== product.id)
              .slice(0, 3)
              .map((p, i) => (
                <div key={p.id} onClick={() => openProduct(p.id)}>
                  <ProductCard product={p} index={i} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Meta({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-gold/15 bg-card/40 p-3">
      <Icon className="h-4 w-4 text-gold" />
      <div className="mt-2 font-sans text-[0.6rem] uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className="mt-0.5 font-serif text-sm text-foreground">{value}</div>
    </div>
  );
}

function NoteRow({
  label,
  french,
  value,
  accent,
  width,
}: {
  label: string;
  french: string;
  value: string;
  accent: string;
  width: string;
}) {
  return (
    <div
      className="overflow-hidden rounded-xl border border-gold/15 p-4"
      style={{
        background: `linear-gradient(90deg, ${accent}1a, transparent)`,
        width,
      }}
    >
      <div className="flex items-baseline justify-between">
        <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-foreground">
          {label}
        </span>
        <span className="font-sans text-[0.6rem] italic text-muted-foreground">
          {french}
        </span>
      </div>
      <div className="mt-1 font-serif text-lg text-foreground">{value}</div>
    </div>
  );
}

function BuyBar({
  product,
}: {
  product: (typeof products)[number];
}) {
  const [qty, setQty] = useState(1);
  const add = useCartStore((s) => s.add);
  const { toast } = useToast();

  function handleAdd() {
    for (let i = 0; i < qty; i++) add(product);
    toast({
      title: "Added to your fragrance tray",
      description: `${qty} × ${product.name} · $${product.price * qty}`,
    });
  }

  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="font-serif text-4xl text-gold-gradient">
        ${product.price}
      </div>
      <div className="flex items-center gap-1 rounded-full border border-gold/25 bg-background/40 p-1">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          aria-label="Decrease quantity"
          className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-8 text-center font-serif text-lg text-foreground">
          {qty}
        </span>
        <button
          onClick={() => setQty((q) => q + 1)}
          aria-label="Increase quantity"
          className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <button
        onClick={handleAdd}
        className="group relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-gold to-gold-soft px-8 py-3.5 font-sans text-sm font-medium text-background transition-transform duration-300 hover:scale-[1.02] sm:flex-none"
      >
        <ShoppingBag className="h-4 w-4" />
        Add to tray · ${product.price * qty}
      </button>
    </div>
  );
}

function BottleStage({
  product,
}: {
  product: (typeof products)[number];
}) {
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const sx = useSpring(mvX, { stiffness: 120, damping: 18 });
  const sy = useSpring(mvY, { stiffness: 120, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-16, 16]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      mvX.set((e.clientX - rect.left) / rect.width - 0.5);
      mvY.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, [mvX, mvY]);

  return (
    <div className="relative">
      <TiltCard accent={product.accent} max={8}>
        <div
          ref={ref}
          className="relative flex h-[440px] items-center justify-center overflow-hidden rounded-3xl border border-gold/20 sm:h-[560px]"
          style={{
            background: `radial-gradient(70% 60% at 50% 45%, ${product.accent}26, transparent 70%), linear-gradient(160deg, rgba(255,255,255,0.03), rgba(0,0,0,0.3))`,
          }}
        >
          {/* rotating ring */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="animate-spin-slow h-80 w-80 rounded-full border border-dashed border-gold/20 sm:h-[420px] sm:w-[420px]" />
          </div>
          <motion.img
            key={product.id}
            src={product.image}
            alt={product.name}
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              rotateY,
              rotateX,
              transformStyle: "preserve-3d",
            }}
            className="relative z-10 h-72 w-72 object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)] sm:h-96 sm:w-96"
          />
          <div
            className="pointer-events-none absolute bottom-6 h-10 w-48 rounded-[50%] blur-xl"
            style={{ background: `${product.accent}66` }}
          />
        </div>
      </TiltCard>
    </div>
  );
}
