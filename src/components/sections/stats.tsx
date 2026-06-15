"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

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
          <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-[40rem] max-w-full -translate-x-1/2 bg-laser-radial opacity-70" />

          <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                <div className="font-display text-5xl font-bold leading-none text-gradient-laser sm:text-6xl lg:text-7xl">
                  <Counter stat={stat} />
                </div>
                <p className="mt-4 max-w-[12rem] text-sm leading-snug text-muted-foreground">
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
