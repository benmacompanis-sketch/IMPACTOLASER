"use client";

import { type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

import { REVEAL_VIEWPORT_MARGIN } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical travel in px. */
  y?: number;
  /** Desenfoque al entrar. Apagado por defecto: animar un filtro es caro de
   *  dibujar y el texto borroso se percibe como "todavía no cargó". */
  blur?: boolean;
  once?: boolean;
}

/**
 * Entrada suave (aparece y sube) disparada por el scroll. Arranca antes de que
 * el elemento llegue a la pantalla (ver REVEAL_VIEWPORT_MARGIN), así a ritmo
 * normal de scroll el contenido ya está ahí cuando el visitante llega.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  blur = false,
  once = true,
}: RevealProps) {
  const variants: Variants = {
    hidden: {
      opacity: 0,
      y,
      ...(blur ? { filter: "blur(12px)" } : {}),
    },
    visible: {
      opacity: 1,
      y: 0,
      ...(blur ? { filter: "blur(0px)" } : {}),
      transition: {
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      className={cn("m-show", className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: REVEAL_VIEWPORT_MARGIN }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Staggered container — pair with <RevealChild/> for lists/grids.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.06,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: REVEAL_VIEWPORT_MARGIN }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealChild({
  children,
  className,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={cn("m-show", className)}
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
