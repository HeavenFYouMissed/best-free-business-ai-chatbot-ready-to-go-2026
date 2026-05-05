"use client";

import { useEffect, useRef } from "react";

export function SpotlightCursor() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
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
    raf = requestAnimationFrame(tick);

    function onMove(e: PointerEvent) {
      const rect = parent!.getBoundingClientRect();
      if (e.clientY < rect.top || e.clientY > rect.bottom) {
        visible = false;
        return;
      }
      visible = true;
      tx = e.clientX - rect.left - 210;
      ty = e.clientY - rect.top - 210;
    }
    function onLeave() {
      visible = false;
    }

    window.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 z-[1] h-[420px] w-[420px] rounded-full opacity-0 transition-opacity duration-300"
      style={{
        background:
          "radial-gradient(closest-side, rgba(0,212,255,0.16), rgba(0,212,255,0.06) 45%, transparent 70%)",
        mixBlendMode: "screen",
      }}
    />
  );
}
