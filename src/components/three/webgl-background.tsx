"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";

import { ParticleField } from "./particle-field";

/**
 * Desktop WebGL backdrop. Isolated in its own module + default export so the
 * heavy three.js / r3f bundle is code-split and ONLY shipped to desktop (this
 * is dynamically imported with ssr:false from SceneBackground).
 *
 * PerformanceMonitor measures real FPS and auto-scales render resolution.
 */
export default function WebglBackground() {
  const [dpr, setDpr] = useState(1.5);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 11], fov: 60 }}
        dpr={dpr}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <fog attach="fog" args={["#04060d", 9, 22]} />
        <PerformanceMonitor
          flipflops={3}
          onIncline={() => setDpr(1.5)}
          onDecline={() => setDpr(1)}
          onFallback={() => setDpr(0.85)}
        />
        <Suspense fallback={null}>
          <ParticleField quality="high" />
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
