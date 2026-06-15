"use client";

import { Reveal } from "@/components/effects/reveal";
import { CtaButton } from "@/components/shared/cta-button";
import { WhatsappIcon } from "@/components/brand/social-icons";
import { presupuestoHref } from "@/lib/site";

/**
 * Mid-funnel WhatsApp CTA band — keeps the primary conversion action one
 * tap away without waiting for the final section.
 */
export function WhatsappCtaBand() {
  return (
    <section className="relative py-12 sm:py-16">
      <div className="container">
        <Reveal>
          <div className="glass-strong glow-border relative flex flex-col items-center gap-6 overflow-hidden rounded-3xl px-6 py-9 text-center sm:px-10 md:flex-row md:justify-between md:text-left">
            <div className="laser-line pointer-events-none absolute inset-x-0 top-0 h-px" />
            <div className="pointer-events-none absolute -left-10 top-1/2 size-48 -translate-y-1/2 rounded-full bg-laser-500/15 blur-3xl" />

            <div className="relative flex items-center gap-5">
              <div className="hidden size-14 shrink-0 items-center justify-center rounded-2xl bg-[#1faa52]/15 text-[#36d971] shadow-glow-sm sm:flex">
                <WhatsappIcon className="size-7" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">
                  Cada superficie tiene una segunda oportunidad.
                </h3>
                <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                  Contanos qué necesitás recuperar y te respondemos al instante por WhatsApp.
                </p>
              </div>
            </div>

            <div className="relative shrink-0">
              <CtaButton href={presupuestoHref} size="lg">
                <WhatsappIcon className="size-5" />
                Solicitar presupuesto
              </CtaButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
