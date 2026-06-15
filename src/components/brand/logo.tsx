"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  LOGO OFICIAL
 *  Se usa `/logo-transparent.png`: el logo original con el fondo negro ya
 *  convertido a transparencia real (ver scripts/make-logo-transparent.mjs).
 *  Así se integra sobre cualquier fondo, sin recuadro negro y sin depender
 *  de blend modes. Si faltara, cae al placeholder SVG.
 *
 *  Para regenerarlo desde un logo nuevo:
 *    1) subí el archivo a public/ (logo.jpg o logo.png.jpeg)
 *    2) npm i sharp --no-save && node scripts/make-logo-transparent.mjs
 * ─────────────────────────────────────────────────────────────────────────
 */
const FULL_SOURCES = ["/logo-transparent.png", "/logo.svg"];
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
      className={cn("h-auto w-auto select-none", className)}
    />
  );
}
