"use client";

import { useEffect, useState } from "react";
import { useRef } from "react";

/**
 * Site-wide soft cursor glow — desktop pointer only.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ok =
      window.matchMedia("(hover: hover)").matches &&
      !window.matchMedia("(pointer: coarse)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setActive(ok);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return;

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;
    let visible = false;

    function tick() {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      if (el) {
        el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
        el.style.opacity = visible ? "1" : "0";
      }
      raf = requestAnimationFrame(tick);
    }

    function onMove(e: PointerEvent) {
      visible = true;
      tx = e.clientX - 220;
      ty = e.clientY - 220;
    }
    function onLeave() {
      visible = false;
    }

    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[40] h-[440px] w-[440px] rounded-full opacity-0 transition-opacity duration-300"
      style={{
        background:
          "radial-gradient(closest-side, color-mix(in srgb, var(--color-accent) 14%, transparent), color-mix(in srgb, var(--color-accent) 5%, transparent) 45%, transparent 70%)",
        mixBlendMode: "screen",
        filter: "blur(4px)",
      }}
    />
  );
}
