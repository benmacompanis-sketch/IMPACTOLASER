"use client";

import Link from "next/link";

import { Button, type ButtonProps } from "@/components/ui/button";
import { Magnetic } from "@/components/effects/magnetic";
import { cn } from "@/lib/utils";

interface CtaButtonProps extends ButtonProps {
  href?: string;
  /** Adds the animated laser sweep across the button surface. */
  sweep?: boolean;
  external?: boolean;
  magnetic?: boolean;
}

/**
 * Brand CTA: magnetic pull + optional laser light-sweep, wrapping the
 * base shadcn Button. Renders as a link when href is provided.
 */
export function CtaButton({
  href,
  children,
  className,
  sweep = true,
  external = true,
  magnetic = true,
  variant = "default",
  size = "lg",
  ...props
}: CtaButtonProps) {
  const content = (
    <Button
      asChild={Boolean(href)}
      variant={variant}
      size={size}
      className={cn(
        "relative overflow-hidden",
        sweep && variant === "default" && "laser-line",
        className
      )}
      {...props}
    >
      {href ? (
        <Link
          href={href}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </Link>
      ) : (
        children
      )}
    </Button>
  );

  if (!magnetic) return content;
  return <Magnetic strength={0.4}>{content}</Magnetic>;
}
