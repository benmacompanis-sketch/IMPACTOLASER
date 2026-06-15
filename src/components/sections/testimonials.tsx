"use client";

import { Quote, Star, BadgeCheck } from "lucide-react";

import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealChild, RevealGroup } from "@/components/effects/reveal";
import { TiltCard } from "@/components/effects/tilt-card";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  return (
    <Section id="testimonios">
      <SectionHeading
        eyebrow="Confianza"
        title="Resultados que hablan solos"
        description="Patrimonio, industria y hogares eligen la limpieza láser por una razón: recuperan lo original sin arriesgarlo."
      />

      <RevealGroup className="mt-16 grid gap-5 md:grid-cols-2" stagger={0.1}>
        {testimonials.map((t) => (
          <RevealChild key={t.author} className="h-full">
            <TiltCard intensity={5} className="h-full">
              <figure className="glass relative flex h-full flex-col overflow-hidden rounded-3xl p-8">
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5" aria-label="5 de 5 estrellas">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="size-4 fill-laser-300 text-laser-300" />
                    ))}
                  </div>
                  <Quote className="size-9 text-laser-400/30" />
                </div>
                <blockquote className="mt-5 flex-1 text-lg leading-relaxed text-foreground/90">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-full border border-laser-500/30 bg-laser-500/10 font-display text-sm font-semibold text-laser-100">
                    {t.initials}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 font-medium text-white">
                      {t.author}
                      <BadgeCheck className="size-4 text-laser-300" />
                    </div>
                    <div className="text-sm text-muted-foreground">{t.role}</div>
                  </div>
                </figcaption>
                <div className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-laser-500/10 blur-3xl" />
              </figure>
            </TiltCard>
          </RevealChild>
        ))}
      </RevealGroup>
    </Section>
  );
}
