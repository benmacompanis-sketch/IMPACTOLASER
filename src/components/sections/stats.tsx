"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";

import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/effects/reveal";
import { stats, type Stat } from "@/lib/data";

function Counter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, stat.value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, stat.value]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {stat.suffix}
    </span>
  );
}

export function Stats() {
  return (
    <Section id="beneficios" className="py-20 sm:py-24">
      <Reveal>
        <div className="glass-strong glow-border relative overflow-hidden rounded-[2rem] px-6 py-12 sm:px-12">
          <div className="laser-line pointer-events-none absolute inset-x-0 top-0 h-px" />
          {/* breathing top glow (opacity only — keeps the -translate centring) */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-0 h-40 w-[40rem] max-w-full -translate-x-1/2 bg-laser-radial"
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                <div className="font-display text-5xl font-bold leading-none text-gradient-laser sm:text-6xl lg:text-7xl">
                  <Counter stat={stat} />
                </div>

                {/* progress bar fills to the value (100% full · 0% empty) */}
                <div className="mt-4 h-1 w-20 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-laser-gradient shadow-glow-sm"
                    initial={{ width: "0%" }}
                    whileInView={{ width: `${stat.value}%` }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 1.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>

                <p className="mt-3 max-w-[12rem] text-sm leading-snug text-muted-foreground">
                  {stat.label}
                </p>
                {i < stats.length - 1 && (
                  <span className="absolute right-0 top-1/2 hidden h-16 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
