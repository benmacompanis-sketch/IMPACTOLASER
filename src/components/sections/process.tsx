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

  return (
    <Section id="proceso">
      <SectionHeading
        eyebrow="El proceso"
        title="Cuatro pasos hacia el resultado"
        description="Un método controlado de principio a fin, pensado para entregar la superficie original recuperada."
      />

      <div ref={ref} className="relative mt-20">
        {/* connecting line — desktop (horizontal) */}
        <div className="absolute left-0 right-0 top-7 hidden h-px bg-white/10 lg:block">
          <motion.div
            style={{ scaleX: progress }}
            className="h-full origin-left bg-laser-gradient shadow-glow"
          />
        </div>
        {/* connecting line — mobile (vertical) */}
        <div className="absolute bottom-2 left-7 top-2 w-px bg-white/10 lg:hidden">
          <motion.div
            style={{ scaleY: progress }}
            className="h-full w-full origin-top bg-laser-gradient shadow-glow"
          />
        </div>

        <RevealGroup className="grid gap-10 lg:grid-cols-4 lg:gap-6" stagger={0.12}>
          {processSteps.map((step, i) => {
            const Icon = stepIcons[i % stepIcons.length];
            const isLast = i === processSteps.length - 1;
            return (
              <RevealChild key={step.step} className="group relative">
                <div className="flex items-start gap-5 lg:flex-col lg:items-stretch">
                  {/* node — draws in with a spring pop */}
                  <motion.div
                    initial={{ scale: 0.3, rotate: -25, opacity: 0 }}
                    whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ type: "spring", stiffness: 220, damping: 16, delay: i * 0.12 }}
                    className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-2xl border border-laser-500/30 bg-ink-700 text-laser-200 shadow-glow-sm transition-all duration-500 group-hover:scale-105 group-hover:text-white group-hover:shadow-glow"
                  >
                    <Icon className="size-6" />
                    <span className="absolute inset-0 -z-10 rounded-2xl bg-laser-500/10 blur-md" />
                    {/* pulsing halo on the final step */}
                    {isLast && (
                      <motion.span
                        className="absolute inset-0 rounded-2xl border border-laser-300/70"
                        animate={{ scale: [1, 1.45], opacity: [0.7, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                      />
                    )}
                  </motion.div>
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
