"use client";

import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, RevealGroup, RevealChild } from "@/components/effects/reveal";
import { LaserDemo } from "@/components/sections/laser-demo";
import { benefits } from "@/lib/data";

export function Technology() {
  return (
    <Section id="tecnologia">
      {/* ambient section glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-[1] h-80 w-[60rem] max-w-full -translate-x-1/2 bg-laser-radial opacity-60" />

      <SectionHeading
        eyebrow="La tecnología"
        title="¿Qué es la limpieza láser?"
        description={
          <>
            La limpieza láser elimina únicamente la suciedad, pintura, óxido y
            contaminantes superficiales{" "}
            <span className="text-foreground">sin afectar el material original.</span>{" "}
            Un haz de alta precisión vaporiza la capa contaminante por ablación,
            sin contacto, sin agua y sin químicos.
          </>
        }
      />

      {/* Interactive ablation demo */}
      <Reveal className="mt-16" delay={0.05}>
        <div className="glow-border rounded-3xl p-1.5">
          <LaserDemo />
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          El láser actúa solo sobre lo que está <span className="text-laser-200">por encima</span> del
          material — la superficie original permanece intacta.
        </p>
      </Reveal>

      {/* Benefits grid */}
      <RevealGroup className="mt-20 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4" stagger={0.06}>
        {benefits.map(({ icon: Icon, label }) => (
          <RevealChild key={label}>
            <div className="group relative flex h-full flex-col items-start gap-4 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition-all duration-500 hover:border-laser-500/30 hover:bg-laser-500/[0.04]">
              <div className="flex size-11 items-center justify-center rounded-xl border border-laser-500/20 bg-laser-500/10 text-laser-200 transition-all duration-500 group-hover:scale-110 group-hover:text-white group-hover:shadow-glow-sm">
                <Icon className="size-5" />
              </div>
              <span className="text-sm font-medium leading-snug text-foreground/90">
                {label}
              </span>
              <div className="pointer-events-none absolute -right-6 -top-6 size-20 rounded-full bg-laser-500/0 blur-2xl transition-all duration-500 group-hover:bg-laser-500/20" />
            </div>
          </RevealChild>
        ))}
      </RevealGroup>
    </Section>
  );
}
