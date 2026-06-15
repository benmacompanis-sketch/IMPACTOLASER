"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, ChevronDown } from "lucide-react";

import { TextReveal } from "@/components/effects/text-reveal";
import { Reveal } from "@/components/effects/reveal";
import { CtaButton } from "@/components/shared/cta-button";
import { useLenis } from "@/components/providers/smooth-scroll-provider";
import { presupuestoHref } from "@/lib/site";

const subPills = ["Sin agua", "Sin químicos", "Sin abrasivos", "Sin dañar la superficie"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();

  const handleSpotlight = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (!el) return;
    lenis ? lenis.scrollTo(el as HTMLElement, { offset: -80 }) : el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      ref={ref}
      onMouseMove={handleSpotlight}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 pt-28 pb-20"
    >
      {/* Mouse spotlight + ambient orbs */}
      <div className="spotlight pointer-events-none absolute inset-0 -z-[1]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-[1] h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-laser-500/10 blur-[120px] animate-pulse-glow" />
      <div className="pointer-events-none absolute right-[12%] top-[22%] -z-[1] h-64 w-64 rounded-full bg-laser-400/10 blur-[90px]" />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
        {/* Eyebrow */}
        <Reveal y={16} blur={false}>
          <span className="eyebrow mb-8">
            <span className="size-1.5 animate-pulse rounded-full bg-laser-400 shadow-glow-sm" />
            Tecnología de limpieza laser industrial
          </span>
        </Reveal>

        {/* Headline */}
        <h1 className="font-display text-[clamp(2.6rem,8vw,6.2rem)] font-bold leading-[0.98] tracking-tight">
          <span className="block">
            <TextReveal text="LIMPIEZA LASER" className="text-gradient" />
          </span>
          <span className="block">
            <TextReveal text="DE ALTA PRECISIÓN" delay={0.25} className="text-gradient-laser" />
          </span>
        </h1>

        {/* Animated laser divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="laser-line my-8 h-px w-[min(34rem,80%)] origin-center bg-gradient-to-r from-transparent via-laser-400/70 to-transparent"
        />

        {/* Subtitle pills */}
        <Reveal delay={0.5}>
          <p className="sr-only">
            Sin agua. Sin químicos. Sin abrasivos. Sin dañar la superficie original.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {subPills.map((pill, i) => (
              <motion.span
                key={pill}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.08, duration: 0.6 }}
                className="glass rounded-full px-4 py-2 text-sm font-medium text-foreground/80"
              >
                {pill}
              </motion.span>
            ))}
          </div>
        </Reveal>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-11 flex flex-col items-center gap-4 sm:flex-row"
        >
          <CtaButton href={presupuestoHref} size="lg">
            Solicitar presupuesto
            <ArrowUpRight className="size-5" />
          </CtaButton>
          <CtaButton
            variant="outline"
            size="lg"
            magnetic
            sweep={false}
            onClick={() => scrollTo("#aplicaciones")}
          >
            Ver aplicaciones
            <ArrowRight className="size-5" />
          </CtaButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo("#tecnologia")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="group absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-foreground/40 transition-colors hover:text-foreground/80"
        aria-label="Desplazarse a tecnología"
      >
        <span>Descubrí más</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="size-4" />
        </motion.span>
      </motion.button>
    </section>
  );
}
