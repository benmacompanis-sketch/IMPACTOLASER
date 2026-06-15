"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Magnetic } from "@/components/effects/magnetic";
import { WhatsappIcon } from "@/components/brand/social-icons";
import { presupuestoHref, site } from "@/lib/site";

/**
 * Persistent floating WhatsApp CTA — the primary conversion action of the
 * whole site. Pulses to draw the eye and expands a label on hover.
 */
export function WhatsappFloat() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Reveal once the cinematic intro has lifted.
    const t = setTimeout(() => setShow(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-5 right-5 z-30 sm:bottom-6 sm:right-6"
        >
          <Magnetic strength={0.3}>
            <a
              href={presupuestoHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Escribir a ${site.name} por WhatsApp`}
              data-cursor="hover"
              className="group relative flex items-center gap-0 overflow-hidden rounded-full bg-[#1faa52] py-3.5 pl-3.5 pr-3.5 text-white shadow-[0_10px_40px_-8px_rgba(31,170,82,0.8)] transition-all duration-500 hover:pr-6"
            >
              {/* pulsing ring */}
              <span className="pointer-events-none absolute inset-0 rounded-full">
                <motion.span
                  className="absolute inset-0 rounded-full border-2 border-[#25D366]"
                  animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
              </span>

              <span className="relative flex size-7 items-center justify-center">
                <WhatsappIcon className="size-7" />
              </span>

              {/* label expands on hover (fine pointers) */}
              <span className="relative max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-500 group-hover:ml-2 group-hover:max-w-[12rem] group-hover:opacity-100">
                Solicitá tu presupuesto
              </span>
            </a>
          </Magnetic>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
