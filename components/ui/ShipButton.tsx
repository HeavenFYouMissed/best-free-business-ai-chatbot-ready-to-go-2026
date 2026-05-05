"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { DigitalCubeShader } from "@/components/ui/DigitalCubeShader";

type Props = {
  href: string;
  children: ReactNode;
  target?: string;
  rel?: string;
  size?: "default" | "large" | "compact";
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

/**
 * Primary CTA — digital-cube shader interior (cyan Voronoi cells + dithering)
 * with corner brackets, scanline overlay, magnetic cursor tracking and haptic
 * feedback on tap. Replaces the stainless-chrome treatment.
 */
export function ShipButton({
  href,
  children,
  target,
  rel,
  size = "default",
  className,
  onClick,
}: Props) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [coarsePointer, setCoarsePointer] = useState(false);
  const [shaderSpeed, setShaderSpeed] = useState(0.6);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setCoarsePointer(mq.matches);
    const handler = () => setCoarsePointer(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function onPointerMove(e: React.PointerEvent<HTMLAnchorElement>) {
    if (coarsePointer || e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = e.clientX - rect.left - rect.width / 2;
    const my = e.clientY - rect.top - rect.height / 2;
    x.set(Math.max(-8, Math.min(8, mx * 0.16)));
    y.set(Math.max(-5, Math.min(5, my * 0.16)));
  }
  function onLeave() {
    x.set(0);
    y.set(0);
    setShaderSpeed(0.6);
  }
  function onEnter() {
    if (!coarsePointer) setShaderSpeed(1.4);
  }

  function onTap(e: React.MouseEvent<HTMLAnchorElement>) {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(8);
      } catch {
        /* ignore vibration errors */
      }
    }
    onClick?.(e);
  }

  const pad =
    size === "large"
      ? "min-h-[44px] px-5 py-3 text-[13.5px] leading-tight sm:px-7 sm:py-3.5 sm:text-[15px] md:px-8 md:py-4 md:text-[16px]"
      : size === "compact"
        ? "min-h-[36px] px-3 py-1.5 text-[12.5px]"
        : "min-h-[44px] px-4 py-2.5 text-[13.5px] sm:px-5 sm:py-3 sm:text-[14px]";

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      style={coarsePointer ? undefined : { x: sx, y: sy }}
      onPointerMove={onPointerMove}
      onPointerLeave={onLeave}
      onPointerEnter={onEnter}
      onClick={onTap}
      whileTap={{ scale: coarsePointer ? 0.97 : 0.94 }}
      className={`ship-btn group relative isolate inline-flex w-fit max-w-full shrink-0 items-center justify-center gap-2 overflow-hidden rounded-[var(--radius-sm)] font-semibold ${pad} ${className ?? ""}`}
    >
      <span aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <DigitalCubeShader speed={shaderSpeed} />
      </span>

      {/* Vertical scanline overlay — reads as terminal/HUD */}
      <span
        aria-hidden
        className="ship-btn-scanline pointer-events-none absolute inset-0 z-[1] opacity-40 mix-blend-overlay"
      />

      {/* Sweep highlight on hover (desktop only) */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-[60%] top-0 z-[2] h-full w-[45%] -skew-x-[16deg] bg-[linear-gradient(90deg,transparent,rgba(180,240,255,0.55),transparent)] opacity-0 transition-all duration-[520ms] ease-out group-hover:left-[115%] group-hover:opacity-100 max-md:hidden"
      />

      {/* Corner brackets — four right-angle ticks at button corners */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[6px] z-[2] ship-btn-brackets"
      />

      {/* Inner cyan ring */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] rounded-[inherit] ring-1 ring-inset ring-[color-mix(in_srgb,var(--color-accent)_55%,transparent)]"
      />
      {/* Outer 1px deep ring */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[-1px] z-[2] rounded-[inherit] ring-1 ring-[color-mix(in_srgb,var(--color-accent)_22%,transparent)]"
      />

      {/* Outer cyan bloom — single-point hotspot behind the button */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[-1] rounded-[inherit] opacity-70 blur-[18px] transition-opacity duration-300 group-hover:opacity-100 max-md:opacity-55"
        style={{
          background:
            "radial-gradient(closest-side, rgba(0,212,255,0.75), rgba(0,212,255,0.3) 45%, transparent 72%)",
        }}
      />

      <span
        data-ship-size={size}
        className="ship-btn-text relative z-[3] inline-flex items-center gap-2"
      >
        {children}
      </span>
    </motion.a>
  );
}

export default ShipButton;
