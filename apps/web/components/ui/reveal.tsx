"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp } from "@/lib/animations";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** delay in seconds before the reveal starts */
  delay?: number;
  as?: "div" | "section" | "li" | "header";
}

/**
 * Scroll-triggered reveal wrapper. Server and client always render the same
 * markup; users who prefer reduced motion get visible content via a CSS
 * override in globals.css (`.dark`-independent, `!important`).
 */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      data-animate-reveal="true"
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
