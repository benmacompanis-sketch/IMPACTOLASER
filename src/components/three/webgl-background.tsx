"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";

import { ParticleField } from "./particle-field";
import type { PerfTier } from "@/lib/performance";

/**
 * Desktop WebGL backdrop. Isolated in its own module + default export so the
 * heavy three.js / r3f bundle is code-split and ONLY shipped to desktop (this
 * is dynamically imported with ssr:false from SceneBackground).
 *
 * Adaptive by device power: a capable machine ("high") gets the full field and
 * the exact same settings as before; a detected-weak desktop ("medium"/"low")
 * gets fewer particles and a lower resolution ceiling. PerformanceMonitor still
 * auto-scales render resolution at runtime on top of that.
 */
const QUALITY = {
  high: { quality: "high", dpr: 1.5, ceil: 1.5, declineDpr: 1 },
  medium: { quality: "medium", dpr: 1.15, ceil: 1.25, declineDpr: 0.85 },
  low: { quality: "low", dpr: 1, ceil: 1, declineDpr: 0.75 },
} as const;

export default function WebglBackground({ tier = "high" }: { tier?: PerfTier }) {
  const cfg = QUALITY[tier];
  const [dpr, setDpr] = useState<number>(cfg.dpr);

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
          onIncline={() => setDpr(cfg.ceil)}
          onDecline={() => setDpr(cfg.declineDpr)}
          onFallback={() => setDpr(0.85)}
        />
        <Suspense fallback={null}>
          <ParticleField quality={cfg.quality} />
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
