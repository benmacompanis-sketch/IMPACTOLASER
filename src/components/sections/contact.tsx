"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, ArrowUpRight, type LucideIcon } from "lucide-react";

import { TextReveal } from "@/components/effects/text-reveal";
import { Reveal, RevealChild, RevealGroup } from "@/components/effects/reveal";
import { TiltCard } from "@/components/effects/tilt-card";
import { CtaButton } from "@/components/shared/cta-button";
import { WhatsappIcon, socialIconMap } from "@/components/brand/social-icons";
import { site, socials, presupuestoHref } from "@/lib/site";

type Dot = { x: number; y: number; size: number; dur: number; delay: number };

type Method = {
  label: string;
  value: string;
  href: string;
  soon: boolean;
  Icon: LucideIcon | ((props: { className?: string }) => JSX.Element);
};

const methods: Method[] = [
  {
    label: "Correo",
    value: site.email,
    href: `mailto:${site.email}`,
    soon: false,
    Icon: Mail,
  },
  ...socials.map((s) => ({
    label: s.label,
    value: s.handle,
    href: s.href,
    soon: s.soon,
    Icon: socialIconMap[s.key],
  })),
];

export function Contact() {
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    setDots(
      Array.from({ length: 30 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        dur: Math.random() * 3 + 2.5,
        delay: Math.random() * 2,
      }))
    );
  }, []);

  return (
    <section id="contacto" className="relative overflow-hidden py-28 sm:py-36">
      {/* depth, glow & particles */}
      <div className="pointer-events-none absolute inset-0 -z-[1]">
        <div className="absolute left-1/2 top-0 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-laser-500/15 blur-[140px] animate-pulse-glow" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-laser-400/10 blur-[100px]" />
        <div className="absolute inset-0 bg-tech-grid opacity-[0.15] mask-fade-edges" />
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

      <div className="container relative">
        {/* Heading */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal y={14} blur={false}>
            <span className="eyebrow mb-7">
              <span className="size-1.5 animate-pulse rounded-full bg-laser-400 shadow-glow-sm" />
              Contacto
            </span>
          </Reveal>
          <h2 className="font-display text-[clamp(2rem,5vw,3.6rem)] font-bold leading-[1.04] tracking-tight">
            <span>
              <TextReveal text="¿TENÉS UNA SUPERFICIE" className="text-gradient" />
            </span>{" "}
            <span>
              <TextReveal text="QUE NECESITA RECUPERARSE?" delay={0.2} className="text-gradient-laser" />
            </span>
          </h2>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Solicitá una evaluación profesional y descubrí cómo la limpieza láser
              puede restaurar y recuperar superficies sin dañarlas.
            </p>
          </Reveal>
        </div>

        {/* Featured WhatsApp panel */}
        <Reveal delay={0.1} className="mx-auto mt-14 max-w-4xl">
          <div className="glow-border glass-strong relative overflow-hidden rounded-[2rem] p-8 shadow-glow sm:p-10">
            <div className="laser-line pointer-events-none absolute inset-x-0 top-0 h-px" />
            <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-[#1faa52]/15 blur-[90px]" />

            <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-between md:text-left">
              <div className="flex items-center gap-5">
                <div className="relative flex size-16 shrink-0 items-center justify-center rounded-2xl bg-[#1faa52] text-white shadow-[0_10px_40px_-8px_rgba(31,170,82,0.8)]">
                  <WhatsappIcon className="size-8" />
                  <span className="absolute inset-0 rounded-2xl bg-[#25D366]/30 blur-md" />
                </div>
                <div className="text-center md:text-left">
                  <p className="text-xs font-medium uppercase tracking-[0.25em] text-laser-300/70">
                    WhatsApp directo
                  </p>
                  <a
                    href={presupuestoHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block font-display text-3xl font-bold text-white transition-colors hover:text-laser-100 sm:text-4xl"
                  >
                    {site.whatsappDisplay}
                  </a>
                  <a
                    href={`tel:${site.phone}`}
                    className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-laser-200"
                  >
                    <Phone className="size-3.5" />
                    Llamar ahora
                  </a>
                </div>
              </div>

              <CtaButton href={presupuestoHref} size="lg" className="w-full md:w-auto">
                <WhatsappIcon className="size-5" />
                Solicitar presupuesto por WhatsApp
              </CtaButton>
            </div>
          </div>
        </Reveal>

        {/* Other methods grid */}
        <RevealGroup
          className="mx-auto mt-6 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
          stagger={0.07}
        >
          {methods.map((m) => {
            const Icon = m.Icon;
            const inner = (
              <div className="group relative flex h-full flex-col items-center gap-3 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 text-center transition-all duration-500 hover:border-laser-500/40 hover:bg-laser-500/[0.05]">
                <div className="flex size-12 items-center justify-center rounded-xl border border-laser-500/20 bg-laser-500/10 text-laser-200 transition-all duration-500 group-hover:scale-110 group-hover:text-white group-hover:shadow-glow-sm">
                  <Icon className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{m.label}</p>
                  <p className="mt-0.5 break-words text-xs text-muted-foreground">
                    {m.value}
                  </p>
                </div>
                {m.soon ? (
                  <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                    Pronto
                  </span>
                ) : (
                  <ArrowUpRight className="size-4 text-laser-300/0 transition-all duration-500 group-hover:text-laser-300" />
                )}
                <div className="pointer-events-none absolute -bottom-8 left-1/2 size-24 -translate-x-1/2 rounded-full bg-laser-500/0 blur-2xl transition-all duration-500 group-hover:bg-laser-500/20" />
              </div>
            );

            return (
              <RevealChild key={m.label} className="h-full">
                {m.soon ? (
                  <div className="h-full cursor-default opacity-70">{inner}</div>
                ) : (
                  <TiltCard intensity={7} glow={false} className="h-full">
                    <a
                      href={m.href}
                      target={m.href.startsWith("http") ? "_blank" : undefined}
                      rel={m.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="block h-full"
                    >
                      {inner}
                    </a>
                  </TiltCard>
                )}
              </RevealChild>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
