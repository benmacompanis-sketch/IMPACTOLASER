"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle, Mail, MapPin } from "lucide-react";

import { TextReveal } from "@/components/effects/text-reveal";
import { Reveal } from "@/components/effects/reveal";
import { CtaButton } from "@/components/shared/cta-button";
import { site, presupuestoHref } from "@/lib/site";

type Dot = { x: number; y: number; size: number; dur: number; delay: number };

export function FinalCta() {
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    setDots(
      Array.from({ length: 36 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        dur: Math.random() * 3 + 2.5,
        delay: Math.random() * 2,
      }))
    );
  }, []);

  return (
    <section id="empezar" className="relative overflow-hidden py-28 sm:py-36">
      {/* depth + energy */}
      <div className="pointer-events-none absolute inset-0 -z-[1]">
        <div className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-laser-500/20 blur-[140px] animate-pulse-glow" />
        <div className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-laser-400/20 blur-[90px]" />
        <div className="absolute inset-0 bg-tech-grid opacity-30 mask-fade-edges" />
        {dots.map((d, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-laser-200"
            style={{
              left: `${d.x}%`,
              top: `${d.y}%`,
              width: d.size,
              height: d.size,
              boxShadow: "0 0 8px 1px rgba(109,171,255,0.8)",
              animation: `pulse-glow ${d.dur}s ease-in-out ${d.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="container relative flex flex-col items-center text-center">
        <Reveal y={14} blur={false}>
          <span className="eyebrow mb-8">
            <span className="size-1.5 animate-pulse rounded-full bg-laser-400 shadow-glow-sm" />
            Empecemos
          </span>
        </Reveal>

        <h2 className="mx-auto max-w-4xl font-display text-[clamp(2.2rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-tight">
          <span>
            <TextReveal text="¿LISTO PARA RECUPERAR" className="text-gradient" />
          </span>{" "}
          <span>
            <TextReveal text="CUALQUIER SUPERFICIE?" delay={0.2} className="text-gradient-laser" />
          </span>
        </h2>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-7 max-w-xl text-lg text-muted-foreground">
            Descubrí el potencial de la limpieza laser profesional. Contanos qué
            superficie querés recuperar y te asesoramos sin compromiso.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-11 flex flex-col items-center gap-4 sm:flex-row">
            <CtaButton href={presupuestoHref} size="lg">
              Solicitar presupuesto
              <ArrowUpRight className="size-5" />
            </CtaButton>
            <CtaButton
              href={`https://wa.me/${site.whatsapp}`}
              variant="glass"
              size="lg"
              sweep={false}
            >
              <MessageCircle className="size-5" />
              Escribinos por WhatsApp
            </CtaButton>
          </div>
        </Reveal>

        {/* contact methods */}
        <Reveal delay={0.4}>
          <motion.div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2 transition-colors hover:text-laser-200"
            >
              <Mail className="size-4 text-laser-300/70" />
              {site.email}
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="size-4 text-laser-300/70" />
              {site.location}
            </span>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
