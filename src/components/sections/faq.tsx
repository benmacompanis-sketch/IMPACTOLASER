"use client";

import { motion } from "framer-motion";

import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/data";
import { REVEAL_VIEWPORT_MARGIN } from "@/lib/motion";

export function Faq() {
  return (
    <Section id="faq" className="py-24 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading
          align="left"
          eyebrow="Preguntas frecuentes"
          title="Lo que más nos preguntan"
          description="Cómo funciona la limpieza laser y qué cuidados hay que tener."
          className="lg:sticky lg:top-28 lg:self-start"
        />

        <Accordion type="single" collapsible className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="m-show"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: REVEAL_VIEWPORT_MARGIN }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              <AccordionItem value={`item-${i}`}>
                <AccordionTrigger>
                  <span className="flex items-center gap-4">
                    <span className="font-mono text-xs text-laser-300/80 transition-colors group-hover:text-laser-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <span className="block pl-9">{faq.answer}</span>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
