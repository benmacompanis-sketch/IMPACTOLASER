"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";

import { ParticleField } from "./particle-field";
import { usePrefersReducedMotion, useMediaQuery } from "@/hooks/use-media-query";

/**
 * Fixed, full-viewport 3D backdrop behind all content.
 * - Reduced-motion users get a calm static gradient (no WebGL).
 * - PerformanceMonitor measures real FPS and auto-scales the render resolution
 *   down on slow devices (and back up when there's headroom) — keeps it fluid.
 */
export function SceneBackground() {
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const maxDpr = isMobile ? 1.2 : 1.5;
  const [dpr, setDpr] = useState(maxDpr);

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
        dpr={dpr}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <fog attach="fog" args={["#04060d", 9, 22]} />
        {/* Auto quality scaling based on measured frame rate. */}
        <PerformanceMonitor
          flipflops={3}
          onIncline={() => setDpr(maxDpr)}
          onDecline={() => setDpr(1)}
          onFallback={() => setDpr(isMobile ? 0.75 : 0.9)}
        />
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
