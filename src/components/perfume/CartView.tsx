"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ShoppingBag, ArrowRight, Plus, Minus } from "lucide-react";
import { useCartStore } from "./useCartStore";
import { useViewStore } from "./useViewStore";
import { useToast } from "@/hooks/use-toast";

export function CartView() {
  const items = useCartStore((s) => s.items);
  const remove = useCartStore((s) => s.remove);
  const clear = useCartStore((s) => s.clear);
  const setView = useViewStore((s) => s.setView);
  const { toast } = useToast();

  const subtotal = items.reduce((n, i) => n + i.product.price * i.qty, 0);
  const shipping = subtotal > 0 ? 0 : 0; // complimentary
  const total = subtotal + shipping;

  function checkout() {
    toast({
      title: "Merci for your order",
      description: `A confirmation has been sent. Total: $${total}`,
    });
    clear();
    setView("home");
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 pt-32 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/30 bg-gold/5 text-gold"
        >
          <ShoppingBag className="h-8 w-8" />
        </motion.div>
        <h1 className="mt-6 font-serif text-4xl font-light text-foreground">
          Your tray is empty
        </h1>
        <p className="mt-3 font-sans text-sm text-muted-foreground">
          Discover a fragrance to begin your story.
        </p>
        <button
          onClick={() => setView("shop")}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold-soft px-7 py-3.5 font-sans text-sm font-medium text-background transition-transform duration-300 hover:scale-[1.03]"
        >
          Browse the boutique
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 pb-24 pt-32 sm:px-6 lg:px-8">
      <h1 className="font-serif text-5xl font-light text-foreground">
        Your <span className="text-gold-gradient">fragrance tray</span>
      </h1>
      <p className="mt-3 font-sans text-sm text-muted-foreground">
        {items.length} {items.length === 1 ? "item" : "items"} · complimentary shipping
      </p>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_1fr]">
        {/* Items */}
        <div className="flex flex-col gap-4">
          <AnimatePresence initial={false}>
            {items.map((item) => (
              <motion.div
                key={item.product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-4 rounded-2xl border border-gold/15 bg-card/40 p-4 backdrop-blur-sm"
              >
                <div
                  className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl"
                  style={{
                    background: `radial-gradient(70% 70% at 50% 40%, ${item.product.accent}33, transparent 70%)`,
                  }}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-16 w-16 object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-xl text-foreground">
                    {item.product.name}
                  </h3>
                  <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground">
                    {item.product.familyLabel} · {item.product.size}
                  </p>
                  <div className="mt-2 flex items-center gap-1 rounded-full border border-gold/20 p-0.5 w-fit">
                    <span className="px-3 font-sans text-xs text-muted-foreground">
                      Qty {item.qty}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-serif text-xl text-gold">
                    ${item.product.price * item.qty}
                  </div>
                  <button
                    onClick={() => remove(item.product.id)}
                    aria-label={`Remove ${item.product.name}`}
                    className="mt-2 inline-flex items-center gap-1 font-sans text-[0.65rem] uppercase tracking-widest text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <button
            onClick={clear}
            className="self-start font-sans text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-destructive"
          >
            Clear tray
          </button>
        </div>

        {/* Summary */}
        <div className="h-fit rounded-2xl border border-gold/20 bg-card/40 p-6 backdrop-blur-sm">
          <h2 className="font-serif text-2xl text-foreground">Summary</h2>
          <div className="mt-5 space-y-3 font-sans text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span className="text-foreground">${subtotal}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span className="text-gold">Complimentary</span>
            </div>
            <div className="my-3 h-px bg-gold/15" />
            <div className="flex justify-between">
              <span className="font-serif text-lg text-foreground">Total</span>
              <span className="font-serif text-2xl text-gold">${total}</span>
            </div>
          </div>
          <button
            onClick={checkout}
            className="mt-6 w-full rounded-full bg-gradient-to-r from-gold to-gold-soft py-3.5 font-sans text-sm font-medium text-background transition-transform duration-300 hover:scale-[1.02]"
          >
            Proceed to checkout
          </button>
          <button
            onClick={() => setView("shop")}
            className="mt-3 w-full rounded-full border border-gold/30 py-3 font-sans text-xs uppercase tracking-widest text-foreground transition-colors hover:bg-gold/5"
          >
            Continue shopping
          </button>
        </div>
      </div>
    </div>
  );
}
