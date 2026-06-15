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

export function Faq() {
  return (
    <Section id="faq" className="py-24 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading
          align="left"
          eyebrow="Preguntas frecuentes"
          title="Todo lo que querés saber"
          description="Respuestas claras sobre cómo funciona la limpieza laser y por qué no daña la superficie."
          className="lg:sticky lg:top-28 lg:self-start"
        />

        <Accordion type="single" collapsible className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <AccordionItem value={`item-${i}`}>
                <AccordionTrigger>
                  <span className="flex items-center gap-4">
                    <span className="font-mono text-xs text-laser-300/50 transition-colors group-hover:text-laser-300">
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
