"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import { Logo } from "@/components/brand/logo";
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";

type Particle = { x: number; y: number; size: number; delay: number; dur: number };

/**
 * Cinematic brand intro: black → blue energy → laser beam → flash → the logo
 * resolves and holds, then dissolves into the site.
 *
 * Anti-flash: every animated element is hidden inline from the very first paint
 * (so the logo never shows early), and GSAP re-asserts those states in a layout
 * effect before the browser paints. All animation is opacity/scale/translate
 * (no clip-path) to stay smooth on phones.
 */
export function Intro({ onComplete }: { onComplete?: () => void }) {
  const [hidden, setHidden] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  const rootRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  // Particles generated client-side (avoids hydration mismatch); fewer on phones.
  useEffect(() => {
    const count = window.matchMedia("(max-width: 768px)").matches ? 16 : 46;
    setParticles(
      Array.from({ length: count }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.8,
        delay: Math.random() * 0.8,
        dur: Math.random() * 1.6 + 1.4,
      }))
    );
  }, []);

  useIsomorphicLayoutEffect(() => {
    const revealSite = () => onComplete?.();
    const unmount = () => {
      document.body.style.overflow = "";
      setHidden(true);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealSite();
      unmount();
      return;
    }

    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      // Re-assert hidden states before paint (belt + suspenders with inline styles).
      gsap.set(glowRef.current, { autoAlpha: 0, scale: 0.4 });
      gsap.set(particlesRef.current, { autoAlpha: 0 });
      gsap.set(beamRef.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(headRef.current, { autoAlpha: 0, xPercent: -50, yPercent: -50, left: "0%" });
      gsap.set(logoRef.current, { autoAlpha: 0, scale: 0.9 });
      gsap.set(flashRef.current, { autoAlpha: 0 });

      const tl = gsap.timeline({ onComplete: unmount });

      // En celular la intro corre la MISMA coreografía, sólo que más rápida.
      // El timeline no puede empezar hasta que baja y se ejecuta el JS, así que
      // en un teléfono la espera real es "descarga + intro": a 1x se siente
      // eterna. Comprimirla acá recorta ~2s sin sacar ningún momento.
      // En desktop queda intacta (timeScale 1).
      const fastIntro =
        window.matchMedia("(max-width: 768px)").matches ||
        window.matchMedia("(pointer: coarse)").matches;
      tl.timeScale(fastIntro ? 1.75 : 1);

      tl
        // 1 · blue energy + particles awaken from the black
        .to(glowRef.current, { autoAlpha: 1, scale: 1, duration: 1.0, ease: "power2.out" }, 0.25)
        .to(particlesRef.current, { autoAlpha: 1, duration: 0.8, ease: "power2.out" }, 0.35)
        // 2 · the laser beam draws across (head leads, line follows)
        .to(headRef.current, { autoAlpha: 1, duration: 0.2 }, 0.9)
        .to(headRef.current, { left: "100%", duration: 1.0, ease: "power2.inOut" }, 0.9)
        .to(beamRef.current, { scaleX: 1, duration: 1.0, ease: "power2.inOut" }, 0.9)
        .to(headRef.current, { autoAlpha: 0, duration: 0.25 }, 1.75)
        // 3 · elegant flash
        .to(flashRef.current, { autoAlpha: 0.9, duration: 0.2, ease: "power2.in" }, 1.75)
        .to(flashRef.current, { autoAlpha: 0, duration: 0.55, ease: "power2.out" }, 1.95)
        // 4 · the logo resolves — gradual and prominent (no clip-path)
        .to(logoRef.current, { autoAlpha: 1, scale: 1, duration: 1.2, ease: "power3.out" }, 1.95)
        .to(beamRef.current, { autoAlpha: 0, duration: 0.6 }, 2.1)
        // 5 · hold so the brand registers, energy swells behind it
        .to(glowRef.current, { autoAlpha: 0.75, scale: 1.18, duration: 1.4, ease: "power1.inOut" }, 3.0)
        // 6 · cinematic exit
        .to(logoRef.current, { scale: 1.05, duration: 0.9, ease: "power2.inOut" }, 3.8)
        .add(revealSite, 4.0)
        .to(rootRef.current, { autoAlpha: 0, duration: 0.75, ease: "power2.inOut" }, 4.1);
    }, rootRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  if (hidden) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#04060d]"
    >
      {/* technological particles */}
      <div ref={particlesRef} className="absolute inset-0" style={{ opacity: 0 }}>
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-laser-200"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              boxShadow: "0 0 8px 1px rgba(109,171,255,0.8)",
              animation: `pulse-glow ${p.dur}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ambient core glow — blue energy (centred via margin so GSAP scale is free) */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-1/2 -ml-[15rem] -mt-[15rem] size-[30rem] rounded-full bg-laser-500/15 blur-[110px]"
        style={{ opacity: 0 }}
      />

      {/* laser beam + travelling head */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
        <div
          ref={beamRef}
          className="h-[2px] w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(109,171,255,0.7), #ffffff, rgba(109,171,255,0.7), transparent)",
            boxShadow: "0 0 20px 2px rgba(47,139,255,0.6)",
            transform: "scaleX(0)",
            transformOrigin: "left center",
          }}
        />
        <div
          ref={headRef}
          className="absolute left-0 top-1/2 size-3 rounded-full bg-white"
          style={{
            boxShadow: "0 0 24px 8px rgba(109,171,255,0.95), 0 0 60px 18px rgba(47,139,255,0.6)",
            opacity: 0,
          }}
        />
      </div>

      {/* progressive logo */}
      <div
        ref={logoRef}
        className="relative z-10 px-8"
        style={{ opacity: 0, transform: "scale(0.9)" }}
      >
        <Logo variant="full" priority className="w-[min(44rem,92vw)]" />
      </div>

      {/* flash */}
      <div
        ref={flashRef}
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(circle at center, rgba(255,255,255,0.9), transparent 55%)",
          opacity: 0,
        }}
      />
    </div>
  );
}
