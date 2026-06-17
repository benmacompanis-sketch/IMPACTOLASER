"use client";

import { useEffect } from "react";

import { detectTier, TIER_ORDER, type PerfTier } from "@/lib/performance";

/**
 * Sets `data-tier` on <html> from device capabilities, then runs a short,
 * cheap FPS watchdog: if the device can't sustain a smooth frame rate it steps
 * the tier down (high → medium → low). CSS and the background read the tier and
 * shed work accordingly. Pure measurement — adds no visual cost.
 */
export function PerfProvider() {
  useEffect(() => {
    const root = document.documentElement;
    let tier: PerfTier = detectTier();
    root.dataset.tier = tier;

    if (tier === "low" || typeof window.requestAnimationFrame !== "function") return;

    let raf = 0;
    let frames = 0;
    let windowStart = performance.now();
    let started = 0;
    let badWindows = 0;
    let stopped = false;

    const downgrade = () => {
      const next = TIER_ORDER[Math.max(0, TIER_ORDER.indexOf(tier) - 1)];
      if (next !== tier) {
        tier = next;
        root.dataset.tier = tier;
      }
    };

    const tick = (now: number) => {
      if (stopped) return;
      if (!started) started = now;
      frames++;
      const elapsed = now - windowStart;
      if (elapsed >= 1000) {
        const fps = (frames * 1000) / elapsed;
        if (fps < 45) {
          if (++badWindows >= 2) {
            downgrade();
            badWindows = 0;
          }
        } else {
          badWindows = 0;
        }
        frames = 0;
        windowStart = now;
      }
      // Watch for ~10s after settling, then stop (no point monitoring forever).
      if (tier !== "low" && now - started < 10000) {
        raf = requestAnimationFrame(tick);
      }
    };

    // Start after the first paint settles so the watchdog doesn't measure load jank.
    const startTimer = window.setTimeout(() => {
      windowStart = performance.now();
      raf = requestAnimationFrame(tick);
    }, 1500);

    return () => {
      stopped = true;
      window.clearTimeout(startTimer);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
