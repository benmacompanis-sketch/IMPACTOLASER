"use client";

import { useEffect, useRef, useState } from "react";

import { Logo } from "@/components/brand/logo";

/**
 * Cinematic brand intro: black → blue energy → laser beam → flash → the logo
 * resolves and holds, then dissolves into the site.
 *
 * La coreografía vive en CSS (ver .intro-* en globals.css), NO en JavaScript.
 * Motivo: la intro tapa todo el sitio, y una intro movida por JS no puede
 * siquiera empezar hasta que el teléfono terminó de bajar y ejecutar el bundle
 * — en un celular lento eso son 15-20s de pantalla negra antes del primer
 * fotograma. En CSS arranca en el primer pintado y termina sola aunque el JS
 * tarde muchísimo (o no llegue nunca).
 *
 * El JS acá sólo hace la limpieza: bloquea el scroll mientras dura, avisa al
 * sitio que puede entrar (onComplete) y desmonta el overlay. Si llega tarde,
 * calcula cuánto queda de animación y hace todo eso de inmediato.
 */

/** Posiciones fijas (no aleatorias) para que las partículas existan también en
 *  el HTML del servidor y se vean sin esperar JavaScript. En celular se ocultan
 *  las últimas por CSS para aligerar. */
const PARTICLES = [
  [8, 18, 1.6, 0.35, 2.1], [17, 62, 2.2, 0.12, 1.7], [24, 33, 1.1, 0.61, 2.6],
  [31, 78, 1.9, 0.28, 1.9], [39, 12, 1.4, 0.74, 2.3], [45, 51, 2.6, 0.05, 1.5],
  [52, 86, 1.2, 0.44, 2.8], [58, 27, 1.8, 0.67, 1.6], [64, 69, 1.3, 0.19, 2.4],
  [71, 41, 2.3, 0.53, 2.0], [77, 8, 1.5, 0.31, 2.7], [83, 74, 1.7, 0.78, 1.8],
  [89, 36, 1.1, 0.09, 2.5], [94, 58, 2.0, 0.48, 2.2], [12, 91, 1.6, 0.23, 1.9],
  [36, 45, 1.3, 0.69, 2.6], [4, 47, 1.9, 0.41, 2.0], [68, 94, 1.4, 0.15, 2.4],
  [21, 6, 2.1, 0.57, 1.7], [49, 66, 1.2, 0.83, 2.9], [86, 21, 1.8, 0.37, 2.1],
  [28, 57, 1.5, 0.71, 1.6], [61, 15, 2.4, 0.26, 2.3], [74, 82, 1.1, 0.49, 2.7],
  [15, 39, 1.7, 0.63, 1.8], [42, 24, 1.3, 0.11, 2.5], [96, 79, 2.0, 0.55, 2.0],
  [55, 3, 1.6, 0.29, 2.6], [33, 88, 1.4, 0.75, 1.9], [80, 52, 2.2, 0.17, 2.2],
  [7, 71, 1.2, 0.59, 2.8], [66, 48, 1.9, 0.33, 1.7], [23, 20, 1.5, 0.81, 2.4],
  [91, 64, 1.3, 0.45, 2.1],
] as const;

export function Intro({ onComplete }: { onComplete?: () => void }) {
  const [hidden, setHidden] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const root = rootRef.current;
    const revealSite = () => onCompleteRef.current?.();
    const unmount = () => {
      document.body.style.overflow = "";
      setHidden(true);
    };

    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealSite();
      unmount();
      return;
    }

    // La animación ya venía corriendo antes de que este código existiera: se le
    // pregunta al navegador en qué punto está, en vez de reiniciar la cuenta.
    // Si el JS tardó mucho, puede haber terminado y entonces no se espera nada.
    const anim = root.getAnimations?.()[0];
    if (!anim) {
      revealSite();
      unmount();
      return;
    }

    const duration = Number(anim.effect?.getComputedTiming?.().duration) || 0;
    const current = Number(anim.currentTime) || 0;

    if (duration <= 0 || current >= duration) {
      revealSite();
      unmount();
      return;
    }

    // Sólo se bloquea el scroll si de verdad queda intro por ver.
    document.body.style.overflow = "hidden";

    // El sitio entra mientras el overlay se disuelve (mismo solape que antes).
    let cancelled = false;
    const revealTimer = window.setTimeout(revealSite, Math.max(0, duration * 0.845 - current));
    anim.finished
      .then(() => {
        if (!cancelled) unmount();
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      window.clearTimeout(revealTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={rootRef}
      className="intro-root fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#04060d]"
    >
      {/* technological particles */}
      <div className="intro-particles absolute inset-0" style={{ opacity: 0 }}>
        {PARTICLES.map(([x, y, size, delay, dur], i) => (
          <span
            key={i}
            className="intro-particle absolute rounded-full bg-laser-200"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              boxShadow: "0 0 8px 1px rgba(109,171,255,0.8)",
              animation: `pulse-glow ${dur}s ease-in-out ${delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ambient core glow — blue energy (centred via margin so the scale is free) */}
      <div
        className="intro-glow pointer-events-none absolute left-1/2 top-1/2 -ml-[15rem] -mt-[15rem] size-[30rem] rounded-full bg-laser-500/15 blur-[110px]"
        style={{ opacity: 0 }}
      />

      {/* laser beam + travelling head */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
        <div
          className="intro-beam h-[2px] w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(109,171,255,0.7), #ffffff, rgba(109,171,255,0.7), transparent)",
            boxShadow: "0 0 20px 2px rgba(47,139,255,0.6)",
            transform: "scaleX(0)",
            transformOrigin: "left center",
          }}
        />
        <div
          className="intro-head absolute left-0 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          style={{
            boxShadow: "0 0 24px 8px rgba(109,171,255,0.95), 0 0 60px 18px rgba(47,139,255,0.6)",
            opacity: 0,
          }}
        />
      </div>

      {/* progressive logo */}
      <div
        className="intro-logo relative z-10 px-8"
        style={{ opacity: 0, transform: "scale(0.9)" }}
      >
        <Logo variant="full" priority className="w-[min(44rem,92vw)]" />
      </div>

      {/* flash */}
      <div
        className="intro-flash pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(circle at center, rgba(255,255,255,0.9), transparent 55%)",
          opacity: 0,
        }}
      />
    </div>
  );
}
