"use client";

import { useEffect } from "react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import { Search, Sparkles, Store, Home as HomeIcon, Clock } from "lucide-react";
import { products, collections } from "./data";
import { useViewStore } from "./useViewStore";

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const openProduct = useViewStore((s) => s.openProduct);
  const setView = useViewStore((s) => s.setView);
  const goHome = useViewStore((s) => s.goHome);

  // keyboard shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onOpenChange]);

  function pick(cb: () => void) {
    onOpenChange(false);
    cb();
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search LUMIÈRE NOIR"
      description="Search fragrances, families and pages"
      className="border-gold/20 bg-popover/95 backdrop-blur-xl"
    >
      <CommandInput placeholder="Search a fragrance, family, or page…" />
      <CommandList className="max-h-[420px]">
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Suggestions">
          <CommandItem onSelect={() => pick(() => setView("shop"))} className="gap-3">
            <Store className="h-4 w-4 text-gold" />
            <span>Browse the full boutique</span>
          </CommandItem>
          <CommandItem onSelect={() => pick(() => goHome("collection"))} className="gap-3">
            <Sparkles className="h-4 w-4 text-gold" />
            <span>Signature fragrances</span>
          </CommandItem>
          <CommandItem onSelect={() => pick(() => setView("maison"))} className="gap-3">
            <HomeIcon className="h-4 w-4 text-gold" />
            <span>Visit the Maison</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Fragrances">
          {products.map((p) => (
            <CommandItem
              key={p.id}
              value={`${p.name} ${p.familyLabel} ${p.tagline} ${p.notes.top} ${p.notes.heart} ${p.notes.base}`}
              onSelect={() => pick(() => openProduct(p.id))}
              className="gap-3"
            >
              <span
                className="flex h-7 w-7 items-center justify-center rounded-md text-[0.6rem] font-semibold"
                style={{ background: `${p.accent}22`, color: p.accent }}
              >
                {p.name.charAt(0)}
              </span>
              <div className="flex flex-1 flex-col">
                <span className="font-serif text-sm text-foreground">{p.name}</span>
                <span className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                  {p.familyLabel}
                </span>
              </div>
              <span className="font-sans text-xs text-gold">${p.price}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Olfactory Families">
          {collections.map((c) => (
            <CommandItem
              key={c.id}
              value={`${c.title} ${c.subtitle} ${c.description}`}
              onSelect={() => pick(() => setView("families"))}
              className="gap-3"
            >
              <span
                className="h-3 w-3 rounded-full"
                style={{ background: c.accent }}
              />
              <span className="font-serif text-sm text-foreground">{c.title}</span>
              <span className="text-[0.65rem] text-muted-foreground">— {c.subtitle}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Recent">
          <CommandItem onSelect={() => pick(() => goHome("voices"))} className="gap-3">
            <Clock className="h-4 w-4 text-gold" />
            <span>Patron voices</span>
          </CommandItem>
          <CommandItem onSelect={() => pick(() => goHome("notes"))} className="gap-3">
            <Clock className="h-4 w-4 text-gold" />
            <span>Anatomy of scent</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
