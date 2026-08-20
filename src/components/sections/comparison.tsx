"use client";

import { motion, type Variants } from "framer-motion";
import { Check, X, Zap } from "lucide-react";

import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/effects/reveal";
import { TiltCard } from "@/components/effects/tilt-card";
import { comparison } from "@/lib/data";

const listContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const rowFrom = (dir: number): Variants => ({
  hidden: { opacity: 0, x: dir * 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
});

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
          <TiltCard intensity={5} glow={false} className="h-full">
            <div className="relative h-full overflow-hidden rounded-3xl border border-red-500/15 bg-red-950/10 p-8">
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-red-300/60">
                Métodos tradicionales
              </span>
              <h3 className="mt-2 font-display text-2xl font-semibold text-foreground/80">
                {comparison.traditional.title}
              </h3>

              <motion.ul
                className="mt-7 space-y-1"
                variants={listContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                {comparison.traditional.points.map((p) => (
                  <motion.li
                    key={p}
                    variants={rowFrom(-1)}
                    whileHover={{ x: 6 }}
                    className="m-show group flex items-center gap-3 rounded-xl px-3 py-2 transition-colors duration-300 hover:bg-red-500/[0.07]"
                  >
                    <motion.span
                      whileHover={{ rotate: 90, scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="flex size-6 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400"
                    >
                      <X className="size-3.5" />
                    </motion.span>
                    <span className="text-[15px] text-foreground/55 line-through decoration-red-500/30 transition-colors duration-300 group-hover:text-foreground/75">
                      {p}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </TiltCard>
        </Reveal>

        {/* Laser */}
        <Reveal delay={0.12}>
          <TiltCard intensity={5} className="h-full">
            <div className="glow-border relative h-full overflow-hidden rounded-3xl bg-gradient-to-b from-laser-500/[0.08] to-transparent p-8 shadow-glow">
              <div className="laser-line absolute inset-0" />

              {/* continuous breathing glow */}
              <motion.div
                aria-hidden
                className="glow-breathe pointer-events-none absolute -bottom-20 -right-10 size-56 rounded-full bg-laser-500/20 blur-[90px]"
                animate={{ opacity: [0.4, 0.85, 0.4], scale: [1, 1.15, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />

              <span className="relative text-xs font-medium uppercase tracking-[0.25em] text-laser-300">
                Tecnología laser
              </span>
              <h3 className="relative mt-2 flex items-center gap-2 font-display text-2xl font-semibold text-white">
                {comparison.laser.title}
                <motion.span
                  animate={{ rotate: [0, 12, -8, 0], scale: [1, 1.15, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Zap className="size-5 fill-laser-300/30 text-laser-300" />
                </motion.span>
              </h3>

              <motion.ul
                className="relative mt-7 space-y-1"
                variants={listContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                {comparison.laser.points.map((p) => (
                  <motion.li
                    key={p}
                    variants={rowFrom(1)}
                    whileHover={{ x: 6 }}
                    className="m-show group flex items-center gap-3 rounded-xl px-3 py-2 transition-colors duration-300 hover:bg-laser-500/10"
                  >
                    <motion.span
                      whileHover={{ scale: 1.25 }}
                      transition={{ type: "spring", stiffness: 320, damping: 14 }}
                      className="flex size-6 shrink-0 items-center justify-center rounded-full bg-laser-500/20 text-laser-200 shadow-glow-sm transition-shadow duration-300 group-hover:shadow-glow"
                    >
                      <Check className="size-3.5" />
                    </motion.span>
                    <span className="text-[15px] font-medium text-white">{p}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </TiltCard>
        </Reveal>

        {/* VS badge — rotating ring + pulse */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
          <div className="relative flex size-16 items-center justify-center">
            <motion.span
              className="absolute inset-0 rounded-full border border-dashed border-laser-400/50"
              animate={{ rotate: 360 }}
              transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
            />
            <motion.span
              className="absolute inset-1 rounded-full border border-laser-300/20"
              animate={{ rotate: -360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="glass-strong relative flex size-12 items-center justify-center rounded-full font-display text-sm font-bold text-laser-200"
              animate={{ boxShadow: [
                "0 0 18px -4px rgba(47,139,255,0.4)",
                "0 0 34px -2px rgba(47,139,255,0.75)",
                "0 0 18px -4px rgba(47,139,255,0.4)",
              ] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            >
              VS
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  );
}
