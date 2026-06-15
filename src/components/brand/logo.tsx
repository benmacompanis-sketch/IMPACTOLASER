"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  LOGO OFICIAL
 *  Subí el archivo ORIGINAL (con su fondo negro) a /public como `logo.png`.
 *  El fondo negro se vuelve invisible automáticamente sobre el fondo oscuro
 *  del sitio mediante `mix-blend-mode: screen` (no se edita el archivo).
 *
 *  Mientras `logo.png` no exista, se usa el placeholder SVG (sin romperse).
 *  Si tu archivo es .jpg, nombralo igual `logo.png`.
 * ─────────────────────────────────────────────────────────────────────────
 */
export const LOGO_FULL = "/logo.png";
export const LOGO_FULL_FALLBACK = "/logo.svg";
export const LOGO_MARK = "/logo-mark.svg";

interface LogoProps {
  variant?: "full" | "mark";
  className?: string;
  priority?: boolean;
}

export function Logo({ variant = "mark", className, priority = false }: LogoProps) {
  const isFull = variant === "full";
  const [src, setSrc] = useState(isFull ? LOGO_FULL : LOGO_MARK);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      onError={() => {
        if (isFull && src !== LOGO_FULL_FALLBACK) setSrc(LOGO_FULL_FALLBACK);
      }}
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
