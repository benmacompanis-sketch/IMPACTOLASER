"use client";

import { motion } from "framer-motion";

import { Magnetic } from "@/components/effects/magnetic";
import { WhatsappIcon } from "@/components/brand/social-icons";
import { presupuestoHref, site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Persistent floating WhatsApp CTA — the primary conversion action of the
 * whole site. Pops in (coordinated with the intro lift via `active`) and
 * expands a label on hover.
 *
 * Se renderiza SIEMPRE (antes sólo existía cuando `active` era true, o sea
 * cuando ya había arrancado el JavaScript). En celular la clase .m-show-tap lo
 * deja visible y clickeable apenas termina la intro, sin esperar al bundle: es
 * el botón que más convierte, no puede depender de que cargue el JS.
 */
export function WhatsappFloat({ active = false }: { active?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={
        active ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.6, y: 20 }
      }
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: active ? 0.5 : 0 }}
      className={cn(
        "m-show-tap fixed bottom-5 right-5 z-30 sm:bottom-6 sm:right-6",
        !active && "pointer-events-none"
      )}
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
  );
}
