"use client";

import { Suspense, useRef, useState } from "react";
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

  // Cuánto del campo de partículas se dibuja. Lo mueve el medidor de FPS real:
  // si la máquina sostiene el ritmo queda en 1 (todo), y si no va bajando. Es un
  // ref y no estado para que cambiarlo no vuelva a montar la escena: los buffers
  // siguen siendo los mismos y la transición no se nota.
  const scaleRef = useRef(1);

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
          onIncline={() => {
            setDpr(cfg.ceil);
            scaleRef.current = 1;
          }}
          onDecline={() => {
            setDpr(cfg.declineDpr);
            scaleRef.current = 0.62;
          }}
          onFallback={() => {
            setDpr(0.85);
            scaleRef.current = 0.42;
          }}
        />
        <Suspense fallback={null}>
          <ParticleField quality={cfg.quality} scaleRef={scaleRef} />
        </Suspense>
      </Canvas>
      {/* Tenue resplandor superior. Antes tenía un corte (radial que terminaba
          al 55% + un oscurecido lineal abajo) y, al ser un overlay FIJO, esas
          transiciones se veían como líneas horizontales que "dividían" a la
          misma altura en todas las secciones. Ahora es un solo degradado muy
          suave que se desvanece del todo, sin bordes. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 120% at 50% -30%, rgba(47,139,255,0.06), transparent 80%)",
        }}
      />
    </div>
  );
}
