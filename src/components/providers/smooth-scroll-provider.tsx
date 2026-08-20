"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type Lenis from "lenis";
import type { gsap as GsapType } from "gsap";

import { usePrefersReducedMotion } from "@/hooks/use-media-query";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Wraps the app in Lenis smooth scrolling and keeps GSAP ScrollTrigger
 * perfectly in sync. Disabled automatically for reduced-motion users.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    // Native scroll on mobile/touch: Lenis' continuous RAF loop is main-thread
    // overhead that janks the start and the menu on phones. The navbar/footer
    // anchor links fall back to native smooth scroll when Lenis is null.
    const isTouch =
      window.matchMedia("(max-width: 768px)").matches ||
      window.matchMedia("(pointer: coarse)").matches ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (isTouch) return;

    // GSAP, Lenis y ScrollTrigger se cargan acá, no arriba: en celular esta
    // rama nunca corre, así que el teléfono deja de descargar ~100KB de JS que
    // no iba a usar. Menos JS en el arranque = hidrata antes. En desktop el
    // comportamiento es idéntico.
    let lenisInstance: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;
    let gsapLib: typeof GsapType | null = null;
    let cancelled = false;

    void (async () => {
      const [{ gsap }, { default: LenisCtor }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("lenis"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsapLib = gsap;
      gsap.registerPlugin(ScrollTrigger);

      lenisInstance = new LenisCtor({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        touchMultiplier: 1.6,
        wheelMultiplier: 1,
      });

      setLenis(lenisInstance);

      // Drive Lenis from GSAP's ticker for a single, synced RAF loop.
      lenisInstance.on("scroll", ScrollTrigger.update);

      tick = (time: number) => {
        lenisInstance?.raf(time * 1000);
      };
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    })();

    return () => {
      cancelled = true;
      if (tick && gsapLib) gsapLib.ticker.remove(tick);
      lenisInstance?.destroy();
      setLenis(null);
    };
  }, [reducedMotion]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
