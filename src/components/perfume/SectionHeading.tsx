"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  const isCenter = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        isCenter ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 text-[0.7rem] font-sans font-medium uppercase tracking-[0.35em] text-gold"
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold/70" />
          {eyebrow}
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold/70" />
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="font-serif text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
      >
        <span className="text-gold-gradient">{title}</span>
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className={cn(
            "max-w-xl font-sans text-sm leading-relaxed text-muted-foreground sm:text-base",
            isCenter ? "mx-auto" : ""
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
