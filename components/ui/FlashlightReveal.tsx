"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Radius of the revealed circle in px. */
  radius?: number;
  /** Feather amount 0..1 — how soft the edge is. */
  softness?: number;
  className?: string;
  /** Whether to slowly orbit the flashlight when there's no cursor (mobile/idle). */
  idleOrbit?: boolean;
};

/**
 * Hidden-in-the-dark reveal: children sit at reduced opacity by default,
 * and only pixels inside a soft radial mask around the cursor hit full
 * brightness. On touch devices (or when cursor hasn't moved) the mask slowly
 * orbits so the reveal is still alive.
 *
 * Implementation: CSS mask-image radial-gradient with the center driven by
 * CSS custom properties updated from pointermove. Respects reduced-motion
 * via the idleOrbit flag.
 */
export function FlashlightReveal({
  children,
  radius = 220,
  softness = 0.85,
  className,
  idleOrbit = true,
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [hasCursor, setHasCursor] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    function onMove(e: PointerEvent) {
      if (e.pointerType !== "mouse") return;
      const r = el!.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      setCursor({ x, y });
      setHasCursor(true);
    }
    function onLeave() {
      setHasCursor(false);
    }
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  useEffect(() => {
    if (hasCursor || !idleOrbit) return;
    let raf = 0;
    const start = performance.now();
    const tick = () => {
      const t = (performance.now() - start) / 6200;
      const angle = t * Math.PI * 2;
      const x = 50 + Math.cos(angle) * 26;
      const y = 50 + Math.sin(angle) * 22;
      setCursor({ x, y });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hasCursor, idleOrbit]);

  const innerStop = Math.max(0, (1 - softness) * 70);
  const outerStop = 100;

  return (
    <div
      ref={wrapRef}
      className={`flashlight-wrap relative ${className ?? ""}`}
      style={{
        position: "relative",
        ["--fx" as string]: `${cursor.x}%`,
        ["--fy" as string]: `${cursor.y}%`,
        ["--fr" as string]: `${radius}px`,
        ["--fi" as string]: `${innerStop}%`,
        ["--fo" as string]: `${outerStop}%`,
      }}
    >
      {/* Dim base layer — visible always */}
      <div
        aria-hidden
        className="flashlight-dim pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(var(--fr) var(--fr) at var(--fx) var(--fy), transparent 0%, color-mix(in srgb, #05070d 78%, transparent) var(--fi), #05070d var(--fo))",
          zIndex: 2,
        }}
      />
      {/* Ambient light ring at cursor — subtle cyan bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-screen"
        style={{
          background:
            "radial-gradient(calc(var(--fr) * 0.5) calc(var(--fr) * 0.5) at var(--fx) var(--fy), color-mix(in srgb, var(--color-accent) 28%, transparent) 0%, transparent 70%)",
          zIndex: 3,
        }}
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}

export default FlashlightReveal;
