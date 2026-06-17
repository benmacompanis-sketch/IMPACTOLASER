/**
 * Device performance tiering.
 *
 * Picks a tier from cheap, synchronous signals (screen, pointer, CPU cores,
 * RAM, reduced-motion). Components and CSS adapt to it so the experience stays
 * fluid on weak phones while desktop/high-end keeps the full show.
 *
 *  high   → full experience (desktop, flagship phones)
 *  medium → reduced particles / effects (mid phones, weak desktops)
 *  low    → minimal effects, no heavy continuous animation (slow phones, RM)
 */
export type PerfTier = "high" | "medium" | "low";

export const TIER_ORDER: PerfTier[] = ["low", "medium", "high"];

export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(max-width: 768px)").matches ||
    window.matchMedia("(pointer: coarse)").matches ||
    !window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function detectTier(): PerfTier {
  if (typeof window === "undefined") return "high";
  if (prefersReducedMotion()) return "low";

  const mobile = isTouchDevice();
  const cores = navigator.hardwareConcurrency || (mobile ? 4 : 8);
  const mem =
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory ??
    (mobile ? 4 : 8);

  if (!mobile) {
    // Desktop: keep the full show by default. Only step down on machines that
    // look genuinely weak, so normal computers are never altered.
    // (deviceMemory is Chromium-only; it defaults to 8 elsewhere, so this stays
    // conservative and won't downgrade Firefox/Safari on capable hardware.)
    if (cores <= 2) return "medium";
    if (cores <= 4 && mem <= 4) return "medium";
    return "high";
  }

  // Mobile / touch
  if (cores >= 8 && mem >= 6) return "high"; // flagship
  if (cores >= 6 && mem >= 4) return "medium"; // mid-range
  return "low"; // weak / unknown
}

/** Particle budget per tier (used by the background). */
export function particleBudget(tier: PerfTier): number {
  return tier === "high" ? 26 : tier === "medium" ? 16 : 8;
}
