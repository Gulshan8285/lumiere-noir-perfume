"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** max tilt in degrees */
  max?: number;
  /** glare enabled */
  glare?: boolean;
  accent?: string;
};

export function TiltCard({
  children,
  className,
  max = 14,
  glare = true,
  accent = "#d4a24e",
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const rotateY = useTransform(sx, [0, 1], [-max, max]);

  const glareX = useTransform(sx, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(sy, [0, 1], ["0%", "100%"]);
  const glareBg = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.35), transparent 45%)`
  );

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set(px);
    y.set(py);
  }

  function reset() {
    x.set(0.5);
    y.set(0.5);
    setHovering(false);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={reset}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative [perspective:1200px] transition-shadow duration-500",
        className
      )}
    >
      {/* glow ring */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-500"
        style={{
          opacity: hovering ? 0.9 : 0,
          background: `radial-gradient(60% 60% at 50% 40%, ${accent}33, transparent 70%)`,
        }}
      />
      <div style={{ transform: "translateZ(0)" }} className="relative h-full">
        {children}
        {glare && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-screen"
            style={{
              opacity: hovering ? 0.55 : 0,
              background: glareBg,
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
