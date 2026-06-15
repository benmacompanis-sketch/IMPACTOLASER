"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import { Logo } from "@/components/brand/logo";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";

type Particle = { x: number; y: number; size: number; delay: number; dur: number };

export function Intro({ onComplete }: { onComplete?: () => void }) {
  const reducedMotion = usePrefersReducedMotion();
  const [hidden, setHidden] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  const rootRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  // Generate particles client-side to avoid hydration mismatch.
  useEffect(() => {
    const list: Particle[] = Array.from({ length: 46 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.8,
      delay: Math.random() * 0.8,
      dur: Math.random() * 1.6 + 1.4,
    }));
    setParticles(list);
  }, []);

  useIsomorphicLayoutEffect(() => {
    // reveal the site (start its entrance) as the intro begins to dissolve
    const revealSite = () => onComplete?.();
    // unmount the overlay once it has fully faded
    const unmount = () => {
      document.body.style.overflow = "";
      setHidden(true);
    };

    if (reducedMotion) {
      revealSite();
      unmount();
      return;
    }

    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: unmount });

      gsap.set(logoRef.current, { autoAlpha: 0, scale: 0.94, clipPath: "inset(0 50% 0 50%)" });
      gsap.set(beamRef.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(headRef.current, { xPercent: -50, left: "0%", autoAlpha: 0 });
      gsap.set(flashRef.current, { autoAlpha: 0 });

      tl
        // particles breathe in
        .fromTo(
          particlesRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.5, ease: "power2.out" }
        )
        // laser head travels across, drawing the beam
        .to(headRef.current, { autoAlpha: 1, duration: 0.15 }, 0.2)
        .to(headRef.current, { left: "100%", duration: 0.85, ease: "power2.inOut" }, 0.2)
        .to(beamRef.current, { scaleX: 1, duration: 0.85, ease: "power2.inOut" }, 0.2)
        .to(headRef.current, { autoAlpha: 0, duration: 0.2 }, 0.95)
        // logo resolves out of the beam line
        .to(
          logoRef.current,
          { autoAlpha: 1, scale: 1, clipPath: "inset(0 0% 0 0%)", duration: 0.9, ease: "power3.out" },
          1.0
        )
        // beam fades as logo asserts
        .to(beamRef.current, { autoAlpha: 0, duration: 0.6 }, 1.2)
        // elegant flash
        .to(flashRef.current, { autoAlpha: 0.85, duration: 0.18, ease: "power2.in" }, 1.15)
        .to(flashRef.current, { autoAlpha: 0, duration: 0.5, ease: "power2.out" }, 1.33)
        // hold, then cinematic exit
        .to(logoRef.current, { scale: 1.06, duration: 0.7, ease: "power2.inOut" }, 2.1)
        .to(
          rootRef.current,
          { autoAlpha: 0, duration: 0.7, ease: "power2.inOut" },
          2.35
        )
        // trigger the hero's entrance as the overlay starts dissolving
        .add(revealSite, 2.2);
    }, rootRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [reducedMotion, onComplete]);

  if (hidden) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#04060d]"
    >
      {/* technological particles */}
      <div ref={particlesRef} className="absolute inset-0">
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

      {/* ambient core glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-laser-500/10 blur-[100px]" />

      {/* laser beam + travelling head */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2">
        <div
          ref={beamRef}
          className="h-[2px] w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(109,171,255,0.7), #ffffff, rgba(109,171,255,0.7), transparent)",
            boxShadow: "0 0 20px 2px rgba(47,139,255,0.6)",
          }}
        />
        <div
          ref={headRef}
          className="absolute top-1/2 size-3 -translate-y-1/2 rounded-full bg-white"
          style={{ boxShadow: "0 0 24px 8px rgba(109,171,255,0.95), 0 0 60px 18px rgba(47,139,255,0.6)" }}
        />
      </div>

      {/* progressive logo */}
      <div ref={logoRef} className="relative z-10 px-8">
        <Logo variant="full" priority className="w-[min(44rem,92vw)]" />
      </div>

      {/* flash */}
      <div
        ref={flashRef}
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at center, rgba(255,255,255,0.9), transparent 55%)" }}
      />
    </div>
  );
}
