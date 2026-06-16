"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { useHasFinePointer } from "@/hooks/use-media-query";

/**
 * Premium dual-layer cursor:
 *  - a crisp inner dot that tracks instantly
 *  - a soft glowing ring that springs behind it and grows over interactive targets
 * Falls back to the native cursor on touch devices.
 */
export function CustomCursor() {
  const hasFinePointer = useHasFinePointer();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.6 });

  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!hasFinePointer) return;
    document.body.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      const interactive = target?.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor='hover']"
      );
      setHovering(Boolean(interactive));
    };

    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [hasFinePointer, visible, x, y]);

  if (!hasFinePointer) return null;

  return (
    <>
      {/* Glow ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full mix-blend-screen"
        style={{ x: ringX, y: ringY, translate: "-50% -50%" }}
        animate={{
          width: hovering ? 64 : 34,
          height: hovering ? 64 : 34,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 22 }}
      >
        <div
          className="size-full rounded-full border border-laser-300/60"
          style={{
            boxShadow:
              "0 0 22px 2px rgba(47,139,255,0.5), inset 0 0 14px rgba(47,139,255,0.35)",
            background: hovering
              ? "radial-gradient(circle, rgba(47,139,255,0.18), transparent 70%)"
              : "transparent",
          }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-laser-200 mix-blend-screen"
        style={{ x, y, translate: "-50% -50%" }}
        animate={{
          width: pressed ? 6 : hovering ? 5 : 7,
          height: pressed ? 6 : hovering ? 5 : 7,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
      />
    </>
  );
}
