"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";

import {
  detectTier,
  isTouchDevice,
  prefersReducedMotion,
  particleBudget,
  type PerfTier,
} from "@/lib/performance";

// three.js only ships to desktop, where this actually renders.
const WebglBackground = dynamic(() => import("./webgl-background"), { ssr: false });

const BASE_GRADIENT =
  "radial-gradient(75% 55% at 50% 0%, rgba(47,139,255,0.16), transparent 60%), radial-gradient(45% 35% at 82% 28%, rgba(47,139,255,0.07), transparent 60%), #04060d";

function StaticBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ background: BASE_GRADIENT }}
    />
  );
}

/**
 * Lightweight CSS-only animated backdrop for mobile/touch. Glow orbs drift via
 * translate (the heavy blur is rasterised once, not per frame) and dots twinkle
 * via opacity — all on the compositor, off the main thread. Particle count
 * scales with the device tier; on `low` the CSS tier rules freeze the motion.
 */
function CssBackground({ tier }: { tier: PerfTier }) {
  const dots = useMemo(
    () =>
      Array.from({ length: particleBudget(tier) }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.2 + 1,
        dur: Math.random() * 4 + 3,
        delay: Math.random() * 4,
      })),
    [tier]
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0" style={{ background: BASE_GRADIENT }} />

      <div
        className="absolute -left-12 top-[12%] size-64 rounded-full bg-laser-500/12 blur-[55px] animate-float"
        style={{ animationDuration: "12s" }}
      />
      <div
        className="absolute right-[-3rem] top-[44%] size-56 rounded-full bg-laser-400/12 blur-[55px] animate-float"
        style={{ animationDuration: "9s", animationDirection: "alternate-reverse" }}
      />
      <div
        className="absolute bottom-[8%] left-1/3 size-64 rounded-full bg-laser-600/12 blur-[60px] animate-float"
        style={{ animationDuration: "14s" }}
      />

      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-laser-200 animate-pulse-glow"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            boxShadow: "0 0 8px 1px rgba(109,171,255,0.7)",
            animationDuration: `${d.dur}s`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Fixed, full-viewport backdrop behind all content. Loaded with `ssr:false`, so
 * reading matchMedia/navigator in the lazy initialiser is safe.
 *  - reduced-motion → static gradient
 *  - mobile / touch → CSS-animated (no WebGL, tier-scaled particles)
 *  - desktop (mouse) → live 3D particle field
 */
export function SceneBackground() {
  const [mode] = useState<"static" | "css" | "webgl">(() => {
    if (typeof window === "undefined") return "static";
    if (prefersReducedMotion()) return "static";
    return isTouchDevice() ? "css" : "webgl";
  });
  const [tier] = useState<PerfTier>(() => detectTier());

  if (mode === "static") return <StaticBackground />;
  if (mode === "css") return <CssBackground tier={tier} />;
  return <WebglBackground />;
}
