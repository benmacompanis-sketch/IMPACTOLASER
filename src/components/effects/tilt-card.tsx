"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

import { useHasFinePointer } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees. */
  intensity?: number;
  /** Show the cursor-following glow. */
  glow?: boolean;
}

/**
 * Premium 3D tilt card: rotates subtly toward the cursor in real 3D,
 * lifts on hover and projects a cursor-anchored glow + sheen.
 */
export function TiltCard({
  children,
  className,
  intensity = 9,
  glow = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hasFinePointer = useHasFinePointer();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);

  const rotateX = useSpring(rx, { stiffness: 220, damping: 18 });
  const rotateY = useSpring(ry, { stiffness: 220, damping: 18 });

  const glowBg = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, rgba(47,139,255,0.18), transparent 60%)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hasFinePointer || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rx.set((0.5 - py) * intensity * 2);
    ry.set((px - 0.5) * intensity * 2);
    mx.set(px * 100);
    my.set(py * 100);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
    mx.set(50);
    my.set(50);
  };

  // El 3D sólo se monta donde hay puntero fino. Sin esto, cada tarjeta arrastra
  // una capa de GPU propia (perspective + preserve-3d + translateZ) aunque el
  // efecto no se pueda usar nunca: en celular eran ~30 capas de puro costo, y
  // pasado el límite de memoria Safari deja de pintar zonas enteras.
  // El hook arranca en false, así que tampoco pesan durante la carga inicial
  // en escritorio; el tilt se activa apenas hidrata.
  if (!hasFinePointer) {
    return <div className={cn("group relative rounded-2xl", className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={cn(
        "group relative transform-gpu rounded-2xl [transform-style:preserve-3d]",
        className
      )}
    >
      {glow && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: glowBg }}
        />
      )}
      {children}
    </motion.div>
  );
}
