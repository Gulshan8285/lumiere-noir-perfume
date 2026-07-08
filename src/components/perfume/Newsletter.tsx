"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Particles } from "./Particles";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate a request — no backend needed for demo
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    toast({
      title: "Bienvenue à la Maison",
      description: "Check your inbox for 10% off your first flacon.",
    });
    setEmail("");
  }

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        <Card className="relative overflow-hidden border-gold/25 bg-gradient-to-br from-card/80 to-background/40 p-8 backdrop-blur-xl sm:p-14">
          <Particles count={28} />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/15 blur-3xl"
          />

          <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 font-sans text-[0.7rem] uppercase tracking-[0.3em] text-gold"
              >
                <Mail className="h-3 w-3" />
                Le Cercle Privé
              </motion.span>
              <h2 className="mt-5 font-serif text-4xl font-light leading-tight text-foreground sm:text-5xl">
                <span className="text-gold-gradient">Join the inner circle</span>
              </h2>
              <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">
                Private previews, scent diaries and a complimentary 10% on your
                first flacon. We write rarely, and only with intent.
              </p>
            </div>

            <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="h-12 flex-1 rounded-full border-gold/25 bg-background/60 px-5 font-sans text-sm text-foreground placeholder:text-muted-foreground/60"
              />
              <button
                type="submit"
                disabled={loading}
                className="group inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-gold to-gold-soft px-7 font-sans text-sm font-medium text-background transition-transform duration-300 hover:scale-[1.03] disabled:opacity-60"
              >
                {loading ? "Sending…" : "Subscribe"}
                {!loading && (
                  <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                )}
              </button>
            </form>
          </div>
        </Card>
      </motion.div>
    </section>
  );
}
