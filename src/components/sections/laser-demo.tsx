"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  type AnimationPlaybackControls,
} from "framer-motion";
import { MoveHorizontal } from "lucide-react";

import dirtyPhoto from "../../../public/demo-sucio.jpg";
import cleanPhoto from "../../../public/demo-limpio.jpg";

/**
 * Interactive ablation demo as a "before/after" reveal slider.
 * LEFT of the laser = clean original surface, RIGHT = still contaminated.
 *
 * Interaction: press & drag the laser line (no hover-move) — like a real slider.
 * Works with touch (horizontal drag = slider, vertical = page scroll).
 *
 * The photos are imported statically so Next optimises them: AVIF/WebP at the
 * device's real width (instead of shipping the full 1600px JPEGs) and an
 * automatic blur placeholder. While a photo streams in, the viewer sees a
 * blurred version of the REAL photo — never a stand-in surface.
 */
export function LaserDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const dragging = useRef(false);
  const autoControls = useRef<AnimationPlaybackControls | null>(null);

  const clean = useMotionValue(0); // 0 → 100, cleaned from the left
  const grimeClip = useMotionTemplate`inset(0 0 0 ${clean}%)`;
  const edge = useMotionTemplate`${clean}%`;

  // Auto demo: dirty → fully clean → settle at half.
  useEffect(() => {
    if (!inView) return;
    autoControls.current = animate(clean, [0, 100, 50], {
      duration: 3.4,
      times: [0, 0.62, 1],
      ease: [0.4, 0, 0.2, 1],
      delay: 0.3,
    });
    return () => autoControls.current?.stop();
  }, [inView, clean]);

  const setFromPointer = (clientX: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    clean.set(Math.min(100, Math.max(0, pct)));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    autoControls.current?.stop();
    dragging.current = true;
    ref.current?.setPointerCapture?.(e.pointerId);
    setFromPointer(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) setFromPointer(e.clientX);
  };
  const endDrag = () => {
    dragging.current = false;
  };

  return (
    <div className="relative">
      <div
        ref={ref}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        style={{ touchAction: "pan-y" }}
        className="group relative aspect-[16/8] w-full select-none overflow-hidden rounded-3xl border border-white/10 bg-ink-800"
      >
        {/* CLEAN surface (revealed, left of the laser) */}
        <div className="absolute inset-0">
          <Image
            src={cleanPhoto}
            alt="Superficie metálica restaurada tras la limpieza laser"
            fill
            sizes="(max-width: 768px) 100vw, 1100px"
            placeholder="blur"
            className="object-cover"
          />
          <div className="absolute bottom-5 left-5">
            <span className="rounded-full border border-laser-400/30 bg-laser-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-laser-200 backdrop-blur-sm">
              ✓ Superficie limpia
            </span>
          </div>
        </div>

        {/* GRIME layer (clipped away as you clean, right of the laser) */}
        <motion.div className="absolute inset-0" style={{ clipPath: grimeClip }}>
          <Image
            src={dirtyPhoto}
            alt="Superficie metálica oxidada antes del tratamiento"
            fill
            sizes="(max-width: 768px) 100vw, 1100px"
            placeholder="blur"
            className="object-cover"
          />
          <div className="absolute bottom-5 right-5">
            <span className="rounded-full border border-amber-700/40 bg-amber-950/50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-amber-200/90 backdrop-blur-sm">
              Superficie oxidada
            </span>
          </div>
        </motion.div>

        {/* Laser divider + draggable grip at the cleaning edge */}
        <motion.div
          className="pointer-events-none absolute bottom-0 top-0 z-10 w-0"
          style={{ left: edge }}
        >
          <div
            className="absolute left-0 top-0 h-full w-[3px] -translate-x-1/2"
            style={{
              background:
                "linear-gradient(to bottom, rgba(109,171,255,0.15), #cfe4ff 50%, rgba(109,171,255,0.15))",
              boxShadow: "0 0 20px 4px rgba(47,139,255,0.7)",
            }}
          />
          <div className="absolute -top-2.5 left-0 size-6 -translate-x-1/2 rounded-md border border-laser-300/60 bg-ink-700 shadow-glow" />
          {/* contained, symmetric glow centered on the grip */}
          <div
            className="absolute left-0 top-1/2 size-14 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(109,171,255,0.55), transparent 65%)",
            }}
          />
          {/* rings & sparks center via negative margins (Framer's animated
              transform would override translate-based centering) */}
          {[0, 0.6, 1.2].map((d) => (
            <motion.div
              key={d}
              className="absolute left-0 top-1/2 -ml-3.5 -mt-3.5 size-7 rounded-full border border-laser-200/70"
              animate={{ scale: [0.4, 2.8], opacity: [0.7, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: d, ease: "easeOut" }}
            />
          ))}
          {[...Array(7)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute left-0 top-1/2 -ml-0.5 -mt-0.5 size-1 rounded-full bg-laser-100"
              animate={{
                x: [0, (i % 2 ? 1 : -1) * (14 + i * 4)],
                y: [0, (i % 3 ? -1 : 1) * (10 + i * 5)],
                opacity: [1, 0],
              }}
              transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.11, ease: "easeOut" }}
              style={{ boxShadow: "0 0 6px 1px rgba(109,171,255,0.9)" }}
            />
          ))}

          {/* draggable grip handle — glow attached to it so it stays centered */}
          <div
            className="absolute left-0 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur-md"
            style={{
              boxShadow:
                "0 0 22px 5px rgba(47,139,255,0.6), 0 0 48px 14px rgba(47,139,255,0.22)",
            }}
          >
            <MoveHorizontal className="size-5" />
          </div>
        </motion.div>

        {/* persistent hint */}
        <div className="pointer-events-none absolute right-4 top-4 z-20 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[11px] text-white/70 backdrop-blur-sm">
          <MoveHorizontal className="size-3.5 text-laser-300" />
          Arrastrá para limpiar
        </div>
      </div>
    </div>
  );
}
