"use client";

import dynamic from "next/dynamic";

import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { CustomCursor } from "@/components/effects/custom-cursor";
import { ScrollProgress } from "@/components/effects/scroll-progress";

// WebGL backdrop is client-only to keep it out of the server bundle.
const SceneBackground = dynamic(
  () => import("@/components/three/scene-background").then((m) => m.SceneBackground),
  { ssr: false }
);

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <SceneBackground />
      <CustomCursor />
      <ScrollProgress />
      {children}
    </SmoothScrollProvider>
  );
}
