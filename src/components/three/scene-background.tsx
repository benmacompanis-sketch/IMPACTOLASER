"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import { ParticleField } from "./particle-field";
import { usePrefersReducedMotion, useMediaQuery } from "@/hooks/use-media-query";

/**
 * Fixed, full-viewport 3D backdrop that sits behind all content.
 * - Reduced-motion users get a calm static gradient (no WebGL).
 * - Mobile renders a lighter particle budget.
 */
export function SceneBackground() {
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (reducedMotion) {
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 50% at 50% 0%, rgba(47,139,255,0.16), transparent 60%), #04060d",
        }}
      />
    );
  }

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 11], fov: 60 }}
        dpr={[1, isMobile ? 1.3 : 1.7]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <fog attach="fog" args={["#04060d", 9, 22]} />
        <Suspense fallback={null}>
          <ParticleField quality={isMobile ? "low" : "high"} />
        </Suspense>
      </Canvas>
      {/* Vignette + gradient floor to seat the particles into the page */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 50% -10%, rgba(47,139,255,0.10), transparent 55%), linear-gradient(to bottom, transparent 60%, rgba(4,6,13,0.6) 100%)",
        }}
      />
    </div>
  );
}
