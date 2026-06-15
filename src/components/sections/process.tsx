"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ScanSearch, SlidersHorizontal, Zap, BadgeCheck, type LucideIcon } from "lucide-react";

import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealChild, RevealGroup } from "@/components/effects/reveal";
import { processSteps } from "@/lib/data";

const stepIcons: LucideIcon[] = [ScanSearch, SlidersHorizontal, Zap, BadgeCheck];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const scaleX = useTransform(progress, [0, 1], [0, 1]);

  return (
    <Section id="proceso">
      <SectionHeading
        eyebrow="El proceso"
        title="Cuatro pasos hacia el resultado"
        description="Un método controlado de principio a fin, pensado para entregar la superficie original recuperada."
      />

      <div ref={ref} className="relative mt-20">
        {/* connecting line (desktop) */}
        <div className="absolute left-0 right-0 top-7 hidden h-px bg-white/10 lg:block">
          <motion.div
            style={{ scaleX }}
            className="h-full origin-left bg-laser-gradient shadow-glow"
          />
        </div>

        <RevealGroup
          className="grid gap-10 lg:grid-cols-4 lg:gap-6"
          stagger={0.12}
        >
          {processSteps.map((step, i) => {
            const Icon = stepIcons[i % stepIcons.length];
            return (
              <RevealChild key={step.step} className="group relative">
                <div className="flex items-start gap-5 lg:flex-col lg:items-stretch">
                  {/* node */}
                  <div className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-2xl border border-laser-500/30 bg-ink-700 text-laser-200 shadow-glow-sm transition-all duration-500 group-hover:scale-105 group-hover:text-white group-hover:shadow-glow">
                    <Icon className="size-6" />
                    <span className="absolute inset-0 -z-10 rounded-2xl bg-laser-500/10 blur-md" />
                  </div>
                  <div className="lg:mt-7">
                    <span className="font-mono text-xs tracking-[0.2em] text-laser-300/60">
                      PASO {step.step}
                    </span>
                    <h3 className="mt-1 font-display text-xl font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </RevealChild>
            );
          })}
        </RevealGroup>
      </div>
    </Section>
  );
}
