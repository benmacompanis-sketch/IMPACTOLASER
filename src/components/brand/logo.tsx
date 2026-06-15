"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  LOGO OFICIAL
 *  La primera fuente (`/logo.jpg`) es el archivo oficial real → carga directo,
 *  sin parpadeos de "imagen rota". Si por algo fallara, cae al placeholder SVG.
 *  El fondo negro del JPEG se vuelve invisible sobre el fondo oscuro del sitio
 *  mediante `mix-blend-mode: screen` (no se edita el archivo).
 *
 *  Para reemplazarlo, subí a /public un archivo y poné su ruta primera abajo.
 * ─────────────────────────────────────────────────────────────────────────
 */
const FULL_SOURCES = ["/logo.jpg", "/logo.png.jpeg", "/logo.svg"];
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
