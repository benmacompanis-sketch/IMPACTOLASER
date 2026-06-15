import Image from "next/image";

import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  OFFICIAL LOGO SWAP
 *  These constants are the ONLY thing to change to use the delivered asset.
 *  Drop the official files into /public and update the paths below, e.g.:
 *     export const LOGO_FULL = "/logo.png";
 *     export const LOGO_MARK = "/logo.png";
 *  The current SVGs are faithful placeholders so the site ships complete.
 * ─────────────────────────────────────────────────────────────────────────
 */
export const LOGO_FULL = "/logo.svg";
export const LOGO_MARK = "/logo-mark.svg";

interface LogoProps {
  variant?: "full" | "mark";
  className?: string;
  priority?: boolean;
}

export function Logo({ variant = "mark", className, priority = false }: LogoProps) {
  const isFull = variant === "full";
  return (
    <Image
      src={isFull ? LOGO_FULL : LOGO_MARK}
      alt={`${site.name} — ${site.slogan}`}
      width={isFull ? 1280 : 1000}
      height={isFull ? 480 : 340}
      priority={priority}
      draggable={false}
      className={cn("h-auto w-auto select-none", className)}
    />
  );
}
