"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Props = {
  href: string;
  variant?: "primary" | "ghost" | "default";
  className?: string;
  children: ReactNode;
  target?: string;
  rel?: string;
};

export function MagneticButton({ href, variant = "default", className, children, target, rel }: Props) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function onPointerMove(e: React.PointerEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = e.clientX - rect.left - rect.width / 2;
    const my = e.clientY - rect.top - rect.height / 2;
    x.set(Math.max(-10, Math.min(10, mx * 0.2)));
    y.set(Math.max(-6, Math.min(6, my * 0.2)));
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const variantClass =
    variant === "primary" ? "btn btn--primary" : variant === "ghost" ? "btn btn--ghost" : "btn";

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      style={{ x: sx, y: sy }}
      onPointerMove={onPointerMove}
      onPointerLeave={onLeave}
      className={`${variantClass} ${className ?? ""}`}
    >
      {children}
    </motion.a>
  );
}
