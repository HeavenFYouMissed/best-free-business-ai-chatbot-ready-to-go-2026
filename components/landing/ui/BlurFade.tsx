"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";

type BlurFadeProps = {
  children: ReactNode;
  className?: string;
  variant?: Variants;
  durationMs?: number;
  delayMs?: number;
  yOffset?: number;
  inView?: boolean;
  inViewMargin?: string;
  blur?: string;
};

const defaultVariants: Variants = {
  hidden: { y: 8, opacity: 0, filter: "blur(8px)" },
  visible: { y: 0, opacity: 1, filter: "blur(0px)" },
};

export function BlurFade({
  children,
  className,
  variant,
  durationMs = 700,
  delayMs = 0,
  yOffset = 8,
  inView = true,
  inViewMargin = "-80px",
  blur = "8px",
}: BlurFadeProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    margin: inViewMargin as any,
  });
  const isVisible = !inView || isInView;

  const variants: Variants = variant ?? {
    hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
    visible: { y: 0, opacity: 1, filter: "blur(0px)" },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      exit="hidden"
      variants={variants ?? defaultVariants}
      transition={{
        duration: durationMs / 1000,
        delay: delayMs / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
