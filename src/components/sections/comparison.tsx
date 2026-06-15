"use client";

import { motion } from "framer-motion";
import { Check, X, Zap } from "lucide-react";

import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/effects/reveal";
import { comparison } from "@/lib/data";

export function Comparison() {
  return (
    <Section id="diferencia">
      <SectionHeading
        eyebrow="La diferencia"
        title="No es limpiar. Es no dañar."
        description="Los métodos tradicionales desgastan, mojan y contaminan. El laser trabaja con luz: precisión pura, sin tocar la superficie."
      />

      <div className="relative mt-16 grid items-stretch gap-5 lg:grid-cols-2">
        {/* Traditional */}
        <Reveal>
          <div className="relative h-full overflow-hidden rounded-3xl border border-red-500/15 bg-red-950/10 p-8">
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-red-300/60">
              Métodos tradicionales
            </span>
            <h3 className="mt-2 font-display text-2xl font-semibold text-foreground/80">
              {comparison.traditional.title}
            </h3>
            <ul className="mt-7 space-y-3">
              {comparison.traditional.points.map((p, i) => (
                <motion.li
                  key={p}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  className="flex items-center gap-3 text-foreground/60"
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400">
                    <X className="size-3.5" />
                  </span>
                  <span className="text-[15px] line-through decoration-red-500/30">{p}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Laser */}
        <Reveal delay={0.12}>
          <div className="glow-border relative h-full overflow-hidden rounded-3xl bg-gradient-to-b from-laser-500/[0.08] to-transparent p-8 shadow-glow">
            <div className="laser-line absolute inset-0" />
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-laser-300">
              Tecnología laser
            </span>
            <h3 className="mt-2 flex items-center gap-2 font-display text-2xl font-semibold text-white">
              {comparison.laser.title}
              <Zap className="size-5 text-laser-300" />
            </h3>
            <ul className="mt-7 space-y-3">
              {comparison.laser.points.map((p, i) => (
                <motion.li
                  key={p}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  className="flex items-center gap-3 text-white"
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-laser-500/20 text-laser-200 shadow-glow-sm">
                    <Check className="size-3.5" />
                  </span>
                  <span className="text-[15px] font-medium">{p}</span>
                </motion.li>
              ))}
            </ul>
            <div className="pointer-events-none absolute -bottom-20 -right-10 size-56 rounded-full bg-laser-500/20 blur-[90px]" />
          </div>
        </Reveal>

        {/* VS badge */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
          <div className="glass-strong flex size-14 items-center justify-center rounded-full font-display text-sm font-bold text-laser-200 shadow-glow">
            VS
          </div>
        </div>
      </div>
    </Section>
  );
}
