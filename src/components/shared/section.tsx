import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}

export function Section({ id, className, containerClassName, children }: SectionProps) {
  return (
    <section id={id} className={cn("relative py-24 sm:py-32", className)}>
      <div className={cn("container", containerClassName)}>{children}</div>
    </section>
  );
}
