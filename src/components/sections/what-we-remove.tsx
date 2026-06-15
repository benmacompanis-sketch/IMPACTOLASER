"use client";

import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealGroup, RevealChild } from "@/components/effects/reveal";
import { TiltCard } from "@/components/effects/tilt-card";
import { removals } from "@/lib/data";

export function WhatWeRemove() {
  return (
    <Section id="que-removemos">
      <SectionHeading
        eyebrow="Qué removemos"
        title="Disolvemos lo que otros no pueden"
        description="Pintura, óxido, grasa o grafitis: el láser separa el contaminante del material sin tocarlo. Esto es lo que eliminamos a diario."
      />

      <RevealGroup
        className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        stagger={0.05}
      >
        {removals.map((item, i) => (
          <RevealChild key={item.title} className="h-full">
            <TiltCard className="h-full">
              <div className="laser-line group relative flex h-full min-h-[14rem] flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.07] bg-card/50 p-6 backdrop-blur-md transition-colors duration-500 hover:border-laser-500/40">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-laser-300/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="size-2 rounded-full bg-laser-400/50 shadow-glow-sm transition-all duration-500 group-hover:bg-laser-300 group-hover:shadow-glow" />
                </div>
                <div className="mt-8">
                  <h3 className="font-display text-2xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                {/* corner glow */}
                <div className="pointer-events-none absolute -bottom-10 -right-10 size-28 rounded-full bg-laser-500/0 blur-3xl transition-all duration-500 group-hover:bg-laser-500/25" />
              </div>
            </TiltCard>
          </RevealChild>
        ))}
      </RevealGroup>
    </Section>
  );
}
