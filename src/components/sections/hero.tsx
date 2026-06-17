"use client";

import { Fragment, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, ArrowRight, ChevronDown } from "lucide-react";

import { CtaButton } from "@/components/shared/cta-button";
import { useLenis } from "@/components/providers/smooth-scroll-provider";
import { presupuestoHref } from "@/lib/site";

const subPills = ["Sin agua", "Sin químicos", "Sin abrasivos", "Sin dañar la superficie"];
const line1 = "LIMPIEZA LASER".split(" ");
const line2 = "DE ALTA PRECISIÓN".split(" ");

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const lineWrap: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const wordV: Variants = {
  hidden: { y: "115%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};

const dividerV: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  show: { scaleX: 1, opacity: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};

function Words({ words, gradient }: { words: string[]; gradient: string }) {
  return (
    <motion.span variants={lineWrap} className="block">
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden py-[0.08em] align-bottom">
            <motion.span variants={wordV} className={`m-show inline-block ${gradient}`}>
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </motion.span>
  );
}

export function Hero({ started = true }: { started?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const animateState = started ? "show" : "hidden";

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
    lenis
      ? lenis.scrollTo(el as HTMLElement, { offset: -80 })
      : el.scrollIntoView({ behavior: "smooth" });
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

      <motion.div
        className="relative mx-auto flex max-w-5xl flex-col items-center text-center"
        variants={container}
        initial="hidden"
        animate={animateState}
      >
        {/* Eyebrow */}
        <motion.span variants={fadeUp} className="eyebrow mb-8 m-show">
          <span className="size-1.5 animate-pulse rounded-full bg-laser-400 shadow-glow-sm" />
          Tecnología de limpieza laser industrial
        </motion.span>

        {/* Headline */}
        <h1 className="font-display text-[clamp(2.6rem,8vw,6.2rem)] font-bold leading-[0.98] tracking-tight">
          <Words words={line1} gradient="text-gradient" />
          <Words words={line2} gradient="text-gradient-laser" />
        </h1>

        {/* Animated laser divider */}
        <motion.div
          variants={dividerV}
          className="m-show laser-line my-8 h-px w-[min(34rem,80%)] origin-center bg-gradient-to-r from-transparent via-laser-400/70 to-transparent"
        />

        {/* Subtitle pills */}
        <p className="sr-only">
          Sin agua. Sin químicos. Sin abrasivos. Sin dañar la superficie original.
        </p>
        <motion.div variants={lineWrap} className="flex flex-wrap items-center justify-center gap-2.5">
          {subPills.map((pill) => (
            <motion.span
              key={pill}
              variants={fadeUp}
              className="m-show glass rounded-full px-4 py-2 text-sm font-medium text-foreground/80"
            >
              {pill}
            </motion.span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="m-show mt-11 flex flex-col items-center gap-4 sm:flex-row">
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
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo("#tecnologia")}
        initial="hidden"
        animate={animateState}
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { delay: 1.1, duration: 1 } },
        }}
        className="m-show-op group absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-foreground/40 transition-colors hover:text-foreground/80"
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
