"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  maxDeg?: number;
  glow?: boolean;
};

export function TiltCard({ children, className, maxDeg = 4, glow = true }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 180, damping: 18 });
  const smy = useSpring(my, { stiffness: 180, damping: 18 });

  const rx = useTransform(smy, [-0.5, 0.5], [maxDeg, -maxDeg]);
  const ry = useTransform(smx, [-0.5, 0.5], [-maxDeg, maxDeg]);
  const px = useTransform(smx, [-0.5, 0.5], ["-40%", "140%"]);
  const py = useTransform(smy, [-0.5, 0.5], ["-40%", "140%"]);

  function onMove(e: React.PointerEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", transformPerspective: 900 }}
      className={`relative ${className ?? ""}`}
    >
      {children}
      {glow && (
        <motion.div
          aria-hidden
          style={{
            left: px,
            top: py,
            background:
              "radial-gradient(180px 180px at center, color-mix(in srgb, var(--color-accent) 45%, transparent), transparent 70%)",
          }}
          className="pointer-events-none absolute h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 opacity-0 blur-xl transition-opacity duration-300 [.group:hover_&]:opacity-100"
        />
      )}
    </motion.div>
  );
}
