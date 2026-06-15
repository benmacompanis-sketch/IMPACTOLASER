"use client";

import { type ReactNode } from "react";

import { TextReveal } from "@/components/effects/text-reveal";
import { Reveal } from "@/components/effects/reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}

/**
 * Consistent section header: animated eyebrow chip, masked text-reveal
 * title and a blur-up description. Keeps every section on-brand.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-5",
        align === "center" ? "mx-auto items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <Reveal y={14} blur={false}>
          <span className="eyebrow">
            <span className="size-1.5 rounded-full bg-laser-400 shadow-glow-sm" />
            {eyebrow}
          </span>
        </Reveal>
      )}

      <h2
        className={cn(
          "font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-[3.5rem]",
          titleClassName
        )}
      >
        <TextReveal text={title} className="text-gradient" />
      </h2>

      {description && (
        <Reveal delay={0.1}>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
