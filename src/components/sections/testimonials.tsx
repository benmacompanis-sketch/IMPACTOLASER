"use client";

import { Quote } from "lucide-react";

import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { testimonials, type Testimonial } from "@/lib/data";

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="mr-5 flex w-[min(85vw,380px)] shrink-0 flex-col rounded-3xl border border-white/[0.07] bg-card/50 p-7 backdrop-blur-md transition-colors duration-300 hover:border-laser-500/30">
      <div className="flex items-center justify-between">
        <Quote className="size-8 text-laser-400/30" />
      </div>
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground/90">
        “{t.quote}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-full border border-laser-500/30 bg-laser-500/10 font-display text-sm font-semibold text-laser-100">
          {t.initials}
        </div>
        <div>
          <div className="flex items-center gap-1.5 text-sm font-medium text-white">
            {t.author}
          </div>
          <div className="text-xs text-muted-foreground">{t.role}</div>
        </div>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  if (testimonials.length === 0) return null;

  // duplicated so the track can loop seamlessly (-50% === one full set)
  const loop = [...testimonials, ...testimonials];

  return (
    <Section id="testimonios">
      <SectionHeading
        eyebrow="Confianza"
        title="Resultados que hablan solos"
        description="Patrimonio, industria y hogares eligen la limpieza laser por una razón: recuperan lo original sin arriesgarlo."
      />

      <div className="group relative mt-16 overflow-hidden mask-fade-edges">
        <div className="flex w-max animate-marquee will-change-transform group-hover:[animation-play-state:paused]">
          {loop.map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground/70">
        Pasá el mouse para pausar
      </p>
    </Section>
  );
}
