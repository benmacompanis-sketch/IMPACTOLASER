"use client";

import { Building2, Landmark, Flame, Cog, type LucideIcon } from "lucide-react";

import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealGroup, RevealChild } from "@/components/effects/reveal";
import { TiltCard } from "@/components/effects/tilt-card";
import { applications } from "@/lib/data";

const groupMeta: Record<string, { icon: LucideIcon }> = {
  Arquitectura: { icon: Building2 },
  Patrimonio: { icon: Landmark },
  Hogar: { icon: Flame },
  Industria: { icon: Cog },
};

export function Applications() {
  return (
    <Section id="aplicaciones">
      <div className="pointer-events-none absolute right-0 top-1/4 -z-[1] h-96 w-96 rounded-full bg-laser-600/10 blur-[120px]" />

      <SectionHeading
        eyebrow="Aplicaciones"
        title="De monumentos históricos a motores"
        description="Una misma tecnología, infinitos escenarios. La limpieza laser se adapta al patrimonio, la arquitectura, el hogar y la industria pesada."
      />

      <RevealGroup
        className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
        stagger={0.04}
      >
        {applications.map((app) => {
          const Icon = groupMeta[app.group]?.icon ?? Cog;
          return (
            <RevealChild key={app.title} className="h-full">
              <TiltCard intensity={8} className="h-full">
                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition-colors duration-500 hover:border-laser-500/40 hover:bg-laser-500/[0.05]">
                  <Icon className="size-6 text-laser-300/80 transition-all duration-500 group-hover:scale-110 group-hover:text-white" />
                  <div className="mt-10">
                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-laser-300/50">
                      {app.group}
                    </span>
                    <h3 className="mt-1 text-base font-medium leading-snug text-foreground/90 group-hover:text-white">
                      {app.title}
                    </h3>
                  </div>
                  {/* underline sweep on hover */}
                  <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-laser-400/0 to-transparent transition-all duration-500 group-hover:via-laser-400/70" />
                  {/* corner glow on hover */}
                  <div className="pointer-events-none absolute -right-8 -top-8 size-20 rounded-full bg-laser-500/0 blur-2xl transition-all duration-500 group-hover:bg-laser-500/25" />
                </div>
              </TiltCard>
            </RevealChild>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
