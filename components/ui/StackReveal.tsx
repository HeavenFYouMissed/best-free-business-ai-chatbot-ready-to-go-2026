"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type StackRevealProps = {
  children: ReactNode;
  /** Card index in the row (0-based). */
  index: number;
  /** Total cards in the row — used to pick the visual "center" index. */
  count: number;
  /** Classes passed through to the wrapping motion.div. */
  className?: string;
};

/**
 * Active-Theory-inspired card entrance: all cards in a row start stacked
 * toward the center with scale 0.94 + subtle fan rotation. On `useInView`,
 * the center card expands first and outer cards follow with stagger, each
 * landing at its natural grid slot. Reads as a dealer spreading a hand.
 *
 * Also wires an edge-light sweep across the left edge when the card crosses
 * into view, plus a preserve-3d parallax tilt so copy inside sits forward
 * of the card surface.
 *
 * Respects prefers-reduced-motion → falls back to simple fade/translate.
 */
export function StackReveal({ children, index, count, className }: StackRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  const center = (count - 1) / 2;
  const offset = index - center;
  const absOffset = Math.abs(offset);

  if (reduce) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: absOffset * 0.06 }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  const initial = {
    opacity: 0,
    y: 48,
    scale: 0.94,
    rotateZ: offset * 0.9,
    x: -offset * 18,
    z: -absOffset * 22,
  };

  const target = inView
    ? {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateZ: 0,
        x: 0,
        z: 0,
      }
    : {};

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={target}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: absOffset * 0.09,
      }}
      style={{
        transformStyle: "preserve-3d",
        transformPerspective: 1100,
      }}
      className={`stack-reveal-card group/card relative ${className ?? ""}`}
    >
      {/* Edge-catch light sweep on first reveal — downstream classes handle when it appears. */}
      <span aria-hidden className="stack-reveal-edge pointer-events-none absolute inset-y-0 left-0 w-[2px]" />
      <div className="relative h-full" style={{ transform: "translateZ(0)" }}>
        {children}
      </div>
    </motion.div>
  );
}

export default StackReveal;
