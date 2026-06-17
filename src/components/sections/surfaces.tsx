"use client";

import { motion } from "framer-motion";
import { Layers, Hammer, Boxes } from "lucide-react";

import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/effects/reveal";
import { TiltCard } from "@/components/effects/tilt-card";
import { surfaceGroups } from "@/lib/data";

const groupIcon = [Layers, Hammer, Boxes];

export function Surfaces() {
  return (
    <Section id="superficies">
      <SectionHeading
        eyebrow="Superficies"
        title="Calibrado para cada material"
        description="Ajustamos longitud de onda y potencia según el sustrato. Desde metales nobles hasta piedra histórica y maderas delicadas."
      />

      <div className="mt-16 grid gap-5 lg:grid-cols-3">
        {surfaceGroups.map((group, gi) => {
          const Icon = groupIcon[gi % groupIcon.length];
          return (
            <Reveal key={group.category} delay={gi * 0.1} className="h-full">
              <TiltCard intensity={6} className="h-full">
                <div className="glass-strong relative flex h-full flex-col overflow-hidden rounded-3xl p-7">
                  {/* floating corner icon */}
                  <motion.div
                    className="absolute right-6 top-6 text-laser-300/30"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4 + gi, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Icon className="size-8" />
                  </motion.div>

                  <span className="text-xs font-medium uppercase tracking-[0.25em] text-laser-300/70">
                    {group.caption}
                  </span>
                  <h3 className="mt-2 font-display text-3xl font-semibold text-gradient">
                    {group.category}
                  </h3>

                  {/* pills enter staggered */}
                  <motion.div
                    className="mt-7 flex flex-wrap gap-2.5"
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.045 } } }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                  >
                    {group.items.map((item) => (
                      <motion.span
                        key={item}
                        variants={{
                          hidden: { opacity: 0, scale: 0.85, y: 10 },
                          visible: { opacity: 1, scale: 1, y: 0 },
                        }}
                        whileHover={{ y: -3 }}
                        className="group/pill inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 text-sm text-foreground/85 transition-colors duration-300 hover:border-laser-400/50 hover:bg-laser-500/10 hover:text-white"
                      >
                        <span className="size-1.5 rounded-full bg-laser-400/70 transition-all duration-300 group-hover/pill:bg-laser-200 group-hover/pill:shadow-glow-sm" />
                        {item}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* breathing glow (centred via margin so the scale anim is clean) */}
                  <motion.div
                    className="glow-breathe pointer-events-none absolute -bottom-16 left-1/2 -ml-20 size-40 rounded-full bg-laser-500/10 blur-3xl"
                    animate={{ opacity: [0.45, 0.85, 0.45], scale: [1, 1.12, 1] }}
                    transition={{ duration: 5 + gi, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
