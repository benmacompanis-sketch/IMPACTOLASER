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

import { useHasFinePointer } from "@/hooks/use-media-query";

/**
 * Interactive ablation demo: sweep the laser across the panel to vaporise
 * the contamination layer and reveal the untouched surface beneath.
 * Auto-plays a sweep on first view; pointer takes over on fine-pointer devices.
 */
export function LaserDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const hasFinePointer = useHasFinePointer();

  const clean = useMotionValue(0); // 0 → 100, cleaned from the left
  const grimeClip = useMotionTemplate`inset(0 0 0 ${clean}%)`;
  const edge = useMotionTemplate`${clean}%`;

  useEffect(() => {
    if (!inView) return;
    const controls = animate(clean, 100, {
      duration: 2.6,
      ease: [0.4, 0, 0.2, 1],
      delay: 0.3,
    });
    return () => controls.stop();
  }, [inView, clean]);

  const handleMove = (e: React.MouseEvent) => {
    if (!hasFinePointer || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    clean.set(Math.max(clean.get(), Math.min(100, Math.max(0, pct))));
  };

  return (
    <div className="relative">
      <div
        ref={ref}
        onMouseMove={handleMove}
        className="group relative aspect-[16/8] w-full cursor-none overflow-hidden rounded-3xl border border-white/10 bg-ink-800"
      >
        {/* CLEAN surface (revealed) */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #1a2540 0%, #2f8bff22 35%, #0b1120 70%), repeating-linear-gradient(115deg, rgba(255,255,255,0.04) 0 2px, transparent 2px 7px)",
            }}
          />
          <div className="absolute inset-0 bg-tech-grid opacity-40" />
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-center pb-5">
            <span className="rounded-full border border-laser-400/30 bg-laser-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-laser-200">
              Superficie original
            </span>
          </div>
        </div>

        {/* GRIME layer (clipped away as you clean) */}
        <motion.div className="absolute inset-0" style={{ clipPath: grimeClip }}>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #2a1d0f 0%, #1c130a 50%, #261c10 100%)",
            }}
          />
          {/* grime speckle */}
          <div
            className="absolute inset-0 opacity-70 mix-blend-overlay"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, rgba(120,90,40,0.6) 0 6px, transparent 7px), radial-gradient(circle at 70% 60%, rgba(80,60,30,0.7) 0 9px, transparent 10px), radial-gradient(circle at 45% 80%, rgba(140,100,50,0.5) 0 5px, transparent 6px), radial-gradient(circle at 85% 25%, rgba(90,70,35,0.6) 0 7px, transparent 8px)",
              backgroundSize: "90px 90px",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-center pb-5">
            <span className="rounded-full border border-amber-700/30 bg-amber-950/40 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-amber-200/80">
              Óxido · Pintura · Suciedad
            </span>
          </div>
        </motion.div>

        {/* Laser assembly at the cleaning edge */}
        <motion.div
          className="pointer-events-none absolute bottom-0 top-0 z-10 w-0"
          style={{ left: edge }}
        >
          {/* vertical beam */}
          <div
            className="absolute left-0 top-0 h-full w-[3px] -translate-x-1/2"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(109,171,255,0.2) 20%, #cfe4ff 60%, #ffffff)",
              boxShadow: "0 0 18px 3px rgba(47,139,255,0.7)",
            }}
          />
          {/* emitter */}
          <div className="absolute -top-3 left-0 size-6 -translate-x-1/2 rounded-md border border-laser-300/60 bg-ink-700 shadow-glow" />
          {/* contact bloom */}
          <div
            className="absolute bottom-10 left-0 size-16 -translate-x-1/2 translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.9), rgba(47,139,255,0.5) 35%, transparent 70%)",
            }}
          />
          {/* energy rings */}
          {[0, 0.6, 1.2].map((d) => (
            <motion.div
              key={d}
              className="absolute bottom-10 left-0 size-6 -translate-x-1/2 translate-y-1/2 rounded-full border border-laser-200/70"
              animate={{ scale: [0.4, 2.6], opacity: [0.7, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: d, ease: "easeOut" }}
            />
          ))}
          {/* sparks */}
          {[...Array(6)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute bottom-10 left-0 size-1 -translate-x-1/2 translate-y-1/2 rounded-full bg-laser-100"
              animate={{
                x: [0, (i % 2 ? 1 : -1) * (12 + i * 4)],
                y: [0, -(10 + i * 6)],
                opacity: [1, 0],
              }}
              transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.12, ease: "easeOut" }}
              style={{ boxShadow: "0 0 6px 1px rgba(109,171,255,0.9)" }}
            />
          ))}
        </motion.div>

        {/* hint */}
        <div className="pointer-events-none absolute right-4 top-4 z-20 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[11px] text-white/60 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-0">
          <MoveHorizontal className="size-3.5" />
          Deslizá para limpiar
        </div>
      </div>
    </div>
  );
}
