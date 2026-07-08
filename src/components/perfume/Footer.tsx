"use client";

import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";

const columns = [
  {
    title: "Maison",
    links: ["Our Story", "The Atelier", "Sustainability", "Careers", "Press"],
  },
  {
    title: "Collection",
    links: ["Signature", "Les Florales", "Les Orientales", "Les Boisées", "Discovery Sets"],
  },
  {
    title: "Client Care",
    links: ["Shipping", "Returns", "Refill Programme", "Contact", "FAQ"],
  },
];

const socials = [Instagram, Twitter, Facebook, Youtube];

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-gold/15 bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2">
            <a href="#top" className="flex items-center gap-2">
              <span className="relative flex h-10 w-10 items-center justify-center">
                <span className="absolute inset-0 rotate-45 rounded-md border border-gold/60" />
                <span className="font-serif text-xl font-semibold text-gold-gradient">
                  L
                </span>
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-serif text-lg font-medium tracking-[0.25em] text-foreground">
                  LUMIÈRE
                </span>
                <span className="font-sans text-[0.55rem] uppercase tracking-[0.5em] text-gold/80">
                  Noir
                </span>
              </span>
            </a>
            <p className="mt-5 max-w-xs font-sans text-sm leading-relaxed text-muted-foreground">
              Rare essences, hand-blended in Grasse since 1924. A maison devoted
              to the art of bottled emotion.
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/20 text-muted-foreground transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-gold">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="group inline-flex items-center font-sans text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <span className="mr-0 h-px w-0 bg-gold transition-all duration-300 group-hover:mr-2 group-hover:w-3" />
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-gold/10 pt-6 sm:flex-row">
          <p className="font-sans text-xs text-muted-foreground">
            © {new Date().getFullYear()} LUMIÈRE NOIR. Crafted in Grasse, France.{" "}
            Created by{" "}
            <a
              href="https://codeorbit.cloud"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold transition-colors hover:text-foreground"
            >
              codeorbit.cloud
            </a>
            .
          </p>
          <div className="flex gap-5 font-sans text-xs text-muted-foreground">
            <a href="#" className="transition-colors hover:text-gold">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-gold">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-gold">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
