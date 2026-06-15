"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { MoveHorizontal } from "lucide-react";

/**
 * Interactive ablation demo built as a live "before/after" reveal slider:
 * everything LEFT of the laser line is the clean original surface, everything
 * RIGHT is still contaminated. Move the pointer (or drag on touch) to sweep the
 * laser in either direction. Auto-plays a demo sweep on first view.
 */
export function LaserDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  const clean = useMotionValue(0); // 0 → 100, cleaned from the left
  const grimeClip = useMotionTemplate`inset(0 0 0 ${clean}%)`;
  const edge = useMotionTemplate`${clean}%`;

  // Auto demo: dirty → fully clean → settle at half, so both states are visible.
  useEffect(() => {
    if (!inView) return;
    const controls = animate(clean, [0, 100, 50], {
      duration: 3.4,
      times: [0, 0.62, 1],
      ease: [0.4, 0, 0.2, 1],
      delay: 0.3,
    });
    return () => controls.stop();
  }, [inView, clean]);

  const setFromPointer = (clientX: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    clean.set(Math.min(100, Math.max(0, pct)));
  };

  return (
    <div className="relative">
      <div
        ref={ref}
        onPointerMove={(e) => setFromPointer(e.clientX)}
        style={{ touchAction: "pan-y" }}
        className="group relative aspect-[16/8] w-full select-none overflow-hidden rounded-3xl border border-white/10 bg-ink-800"
      >
        {/* CLEAN surface (revealed, left of the laser) */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #27456f 0%, #3d8eff2e 38%, #16223f 78%), repeating-linear-gradient(115deg, rgba(255,255,255,0.06) 0 2px, transparent 2px 8px)",
            }}
          />
          <div className="absolute inset-0 bg-tech-grid opacity-50" />
          {/* sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-laser-400/10 to-transparent" />
          <div className="absolute bottom-5 left-5">
            <span className="rounded-full border border-laser-400/30 bg-laser-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-laser-200 backdrop-blur-sm">
              ✓ Superficie original
            </span>
          </div>
        </div>

        {/* GRIME layer (clipped away as you clean, right of the laser) */}
        <motion.div className="absolute inset-0" style={{ clipPath: grimeClip }}>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #3a2912 0%, #1c130a 45%, #2e2110 100%)",
            }}
          />
          {/* grime speckle + rust */}
          <div
            className="absolute inset-0 opacity-80 mix-blend-overlay"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, rgba(150,105,45,0.7) 0 7px, transparent 8px), radial-gradient(circle at 70% 60%, rgba(95,68,32,0.8) 0 10px, transparent 11px), radial-gradient(circle at 45% 80%, rgba(165,115,55,0.6) 0 6px, transparent 7px), radial-gradient(circle at 85% 25%, rgba(110,80,40,0.7) 0 8px, transparent 9px), radial-gradient(circle at 33% 55%, rgba(80,55,28,0.7) 0 12px, transparent 13px)",
              backgroundSize: "110px 110px",
            }}
          />
          <div className="absolute bottom-5 right-5">
            <span className="rounded-full border border-amber-700/40 bg-amber-950/50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-amber-200/90 backdrop-blur-sm">
              Óxido · Pintura · Suciedad
            </span>
          </div>
        </motion.div>

        {/* Laser divider + draggable grip at the cleaning edge */}
        <motion.div
          className="pointer-events-none absolute bottom-0 top-0 z-10 w-0"
          style={{ left: edge }}
        >
          {/* vertical beam */}
          <div
            className="absolute left-0 top-0 h-full w-[3px] -translate-x-1/2"
            style={{
              background:
                "linear-gradient(to bottom, rgba(109,171,255,0.15), #cfe4ff 50%, rgba(109,171,255,0.15))",
              boxShadow: "0 0 20px 4px rgba(47,139,255,0.7)",
            }}
          />
          {/* emitter */}
          <div className="absolute -top-2.5 left-0 size-6 -translate-x-1/2 rounded-md border border-laser-300/60 bg-ink-700 shadow-glow" />

          {/* contact bloom (center) */}
          <div
            className="absolute left-0 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.85), rgba(47,139,255,0.45) 35%, transparent 70%)",
            }}
          />
          {/* energy rings */}
          {[0, 0.6, 1.2].map((d) => (
            <motion.div
              key={d}
              className="absolute left-0 top-1/2 size-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-laser-200/70"
              animate={{ scale: [0.4, 2.8], opacity: [0.7, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: d, ease: "easeOut" }}
            />
          ))}
          {/* sparks */}
          {[...Array(7)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute left-0 top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-laser-100"
              animate={{
                x: [0, (i % 2 ? 1 : -1) * (14 + i * 4)],
                y: [0, (i % 3 ? -1 : 1) * (10 + i * 5)],
                opacity: [1, 0],
              }}
              transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.11, ease: "easeOut" }}
              style={{ boxShadow: "0 0 6px 1px rgba(109,171,255,0.9)" }}
            />
          ))}

          {/* draggable grip handle */}
          <div className="absolute left-0 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white shadow-glow backdrop-blur-md">
            <MoveHorizontal className="size-5" />
            <span className="absolute inset-0 animate-pulse-glow rounded-full bg-laser-500/20 blur-sm" />
          </div>
        </motion.div>

        {/* persistent hint */}
        <div className="pointer-events-none absolute right-4 top-4 z-20 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[11px] text-white/70 backdrop-blur-sm">
          <MoveHorizontal className="size-3.5 text-laser-300" />
          Deslizá para limpiar
        </div>
      </div>
    </div>
  );
}
