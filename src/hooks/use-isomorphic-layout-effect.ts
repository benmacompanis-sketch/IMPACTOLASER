import { useEffect, useLayoutEffect } from "react";

/**
 * useLayoutEffect on the client, useEffect on the server — avoids the
 * "useLayoutEffect does nothing on the server" warning while letting us
 * set GSAP initial states before the browser paints (no flash).
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
