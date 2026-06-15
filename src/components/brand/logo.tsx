"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  LOGO OFICIAL
 *  Subí el archivo ORIGINAL (con su fondo negro) a la carpeta /public.
 *  Funciona con cualquiera de estos nombres (probamos en orden):
 *     logo.png · logo.png.jpeg · logo.jpg · logo.jpeg · logo.webp
 *  Si ninguno existe, se usa el placeholder SVG (sin romperse).
 *
 *  El fondo negro se vuelve invisible automáticamente sobre el fondo oscuro
 *  del sitio mediante `mix-blend-mode: screen` (no se edita el archivo).
 * ─────────────────────────────────────────────────────────────────────────
 */
const FULL_SOURCES = [
  "/logo.png",
  "/logo.png.jpeg",
  "/logo.jpg",
  "/logo.jpeg",
  "/logo.webp",
  "/logo.svg", // placeholder fallback
];

const MARK_SOURCES = ["/logo-mark.svg"];

interface LogoProps {
  variant?: "full" | "mark";
  className?: string;
  priority?: boolean;
}

export function Logo({ variant = "mark", className, priority = false }: LogoProps) {
  const isFull = variant === "full";
  const sources = isFull ? FULL_SOURCES : MARK_SOURCES;
  const [idx, setIdx] = useState(0);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={sources[idx]}
      onError={() => setIdx((i) => Math.min(i + 1, sources.length - 1))}
      alt={`${site.name} — ${site.slogan}`}
      draggable={false}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={cn(
        "h-auto w-auto select-none",
        // El fondo negro del logo original desaparece sobre el oscuro del sitio.
        isFull && "mix-blend-screen",
        className
      )}
    />
  );
}
