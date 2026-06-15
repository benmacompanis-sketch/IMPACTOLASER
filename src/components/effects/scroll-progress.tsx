"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin laser progress bar pinned to the very top of the viewport that fills
 * as the page is scrolled — a subtle premium "you are here" indicator.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-laser-500 via-laser-200 to-laser-400"
    >
      <div className="absolute inset-0 bg-laser-400/60 blur-[6px]" />
    </motion.div>
  );
}
