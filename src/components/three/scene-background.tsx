"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";

import {
  detectTier,
  isTouchDevice,
  prefersReducedMotion,
  particleBudget,
  type PerfTier,
} from "@/lib/performance";

// three.js only ships to desktop, where this actually renders.
const loadWebgl = () => import("./webgl-background");
const WebglBackground = dynamic(loadWebgl, { ssr: false });

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

      {/* Halos como degradado radial y NO como círculo desenfocado. Este fondo
          es position:fixed y cubre toda la pantalla: Safari lo recompone en cada
          frame del scroll, y un filtro blur ahí obliga a re-rasterizar una
          textura enorme constantemente (de ahí que al bajar quedaran zonas sin
          pintar). Un degradado radial se ve igual de suave y no cuesta nada. */}
      <div
        aria-hidden
        className="absolute -left-12 top-[12%] size-64 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(47,139,255,0.20), transparent)" }}
      />
      <div
        aria-hidden
        className="absolute right-[-3rem] top-[44%] size-56 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(61,142,255,0.20), transparent)" }}
      />
      <div
        aria-hidden
        className="absolute bottom-[8%] left-1/3 size-64 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(31,111,230,0.20), transparent)" }}
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
 * Devuelve true cuando ya terminó el barrido del laser de la intro.
 *
 * Arrancar el fondo 3D implica compilar sus programas gráficos y subir sus
 * datos a la placa de video, y eso caía justo durante el barrido: el mismo
 * momento en que la placa está moviendo el laser. Como la intro tapa el fondo
 * por completo, demorarlo no se ve, y le quedan ~2s para estar listo antes de
 * que la intro se disuelva. Si la intro ya no está (JS que llegó tarde, o
 * reduced-motion), arranca de inmediato.
 */
function useAfterLaserSweep() {
  const [listo, setListo] = useState(false);
  useEffect(() => {
    const anim = document.querySelector(".intro-head")?.getAnimations?.()[0];
    if (!anim) {
      setListo(true);
      return;
    }
    const duracion = Number(anim.effect?.getComputedTiming?.().duration) || 0;
    const ahora = Number(anim.currentTime) || 0;
    // El punto del laser se apaga al 41.2% del timeline de desktop
    // (ver @keyframes intro-head en globals.css).
    const t = window.setTimeout(() => setListo(true), Math.max(0, duracion * 0.42 - ahora));
    return () => window.clearTimeout(t);
  }, []);
  return listo;
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
  const barridoTerminado = useAfterLaserSweep();

  // Dos etapas separadas a propósito. Bajar y parsear three.js es trabajo del
  // procesador y arranca ya, para que esté listo a tiempo aunque la máquina
  // sea lenta. Lo que se demora hasta después del barrido es sólo montar la
  // escena (crear el contexto WebGL, compilar shaders, subir buffers), que es
  // lo que ocupa a la placa de video.
  useEffect(() => {
    if (mode === "webgl") void loadWebgl();
  }, [mode]);

  if (mode === "static") return <StaticBackground />;
  if (mode === "css") return <CssBackground tier={tier} />;
  return barridoTerminado ? <WebglBackground tier={tier} /> : null;
}
