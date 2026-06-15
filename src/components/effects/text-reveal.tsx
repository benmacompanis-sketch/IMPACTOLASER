"use client";

import { Fragment } from "react";
import { motion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  /** Delay before the first word animates in. */
  delay?: number;
  stagger?: number;
  once?: boolean;
}

/**
 * Word-by-word masked reveal. Each word rises out of an overflow-hidden
 * clip, producing the premium "type slides up behind a mask" effect.
 * Use for headlines. Renders semantic text; wrap in your own h1/h2.
 */
export function TextReveal({
  text,
  className,
  delay = 0,
  stagger = 0.07,
  once = true,
}: TextRevealProps) {
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const word: Variants = {
    hidden: { y: "115%", opacity: 0, rotateX: -40 },
    visible: {
      y: "0%",
      opacity: 1,
      rotateX: 0,
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.span
      className={cn("inline-block", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px" }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden py-[0.08em] align-bottom">
            <motion.span
              className="inline-block will-change-transform"
              style={{ transformOrigin: "bottom" }}
              variants={word}
              aria-hidden
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </motion.span>
  );
}
