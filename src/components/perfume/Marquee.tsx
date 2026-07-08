"use client";

const items = [
  "Hand-blended in Grasse",
  "No animal testing",
  "Rare naturals",
  "Refillable flacons",
  "100 years of craft",
  "Vegan & clean",
  "Artisanal maceration",
];

export function Marquee() {
  return (
    <section
      id="marquee"
      aria-hidden
      className="relative border-y border-gold/15 bg-gradient-to-r from-background via-secondary/40 to-background py-5"
    >
      <div className="flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
          {[...items, ...items].map((it, i) => (
            <span
              key={i}
              className="flex items-center gap-10 font-serif text-xl italic text-muted-foreground/80"
            >
              {it}
              <span className="text-gold">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
