"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { Shader, Smoke, SolidColor, FilmGrain, Circle } from "shaders/react";
import { useMouseActivity } from "@/hooks/useMouseActivity";

function StaticHeroBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        background:
          "radial-gradient(ellipse 80% 55% at 65% 45%, color-mix(in srgb, #0a2235 90%, transparent), transparent 70%), radial-gradient(ellipse 50% 40% at 80% 55%, color-mix(in srgb, #0f3a50 55%, transparent), transparent 65%), radial-gradient(ellipse 70% 50% at 40% 60%, color-mix(in srgb, var(--color-accent) 6%, transparent), transparent 55%), #050814",
      }}
    />
  );
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n));
}

type Props = {
  /** Hero `<section>` ref — used on touch to map finger → smoke UV without dead zones over text. */
  boundsRef?: RefObject<HTMLElement | null>;
};

/**
 * Hero background — shaders.com Smokescreen 8 preset (cyan/teal on navy).
 * On touch / narrow viewports, emission follows **finger vs hero bounds** from
 * window-level pointer events so it stays smooth over headlines and buttons
 * (the shader’s built-in mouse driver only “sees” the canvas, which is behind UI).
 */
export function HeroCanvas({ boundsRef }: Props) {
  const [mounted, setMounted] = useState(false);
  const [liteGpu, setLiteGpu] = useState(false);
  const [touchLane, setTouchLane] = useState(false);
  const [touchEmit, setTouchEmit] = useState({ x: 0.72, y: 0.5 });
  const [offscreen, setOffscreen] = useState(false);
  const mouseActive = useMouseActivity(400);
  const rafRef = useRef<number | null>(null);
  const pendingEmit = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => setMounted(true), []);

  /** Unmount the hero shader once scrolled significantly past the hero —
      no GPU cost when the shader isn't even visible. */
  useEffect(() => {
    if (typeof window === "undefined" || !boundsRef) return;
    function check() {
      const el = boundsRef?.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      /* If the hero bottom is above -20vh, consider it offscreen */
      setOffscreen(r.bottom < -window.innerHeight * 0.2);
    }
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [boundsRef]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 1023px)");
    const apply = () => setLiteGpu(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mqCoarse = window.matchMedia("(pointer: coarse)");
    const mqNarrow = window.matchMedia("(max-width: 1023px)");
    const apply = () => setTouchLane(mqCoarse.matches || mqNarrow.matches);
    apply();
    mqCoarse.addEventListener("change", apply);
    mqNarrow.addEventListener("change", apply);
    return () => {
      mqCoarse.removeEventListener("change", apply);
      mqNarrow.removeEventListener("change", apply);
    };
  }, []);

  const scheduleEmit = useCallback((x: number, y: number) => {
    pendingEmit.current = { x, y };
    if (rafRef.current != null) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      const p = pendingEmit.current;
      if (!p) return;
      setTouchEmit(p);
    });
  }, []);

  useEffect(() => {
    if (!touchLane || !boundsRef) return;

    const toHeroUv = (clientX: number, clientY: number) => {
      const el = boundsRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (clientX < r.left - 4 || clientX > r.right + 4 || clientY < r.top - 4 || clientY > r.bottom + 4) {
        return;
      }
      scheduleEmit(
        clamp((clientX - r.left) / Math.max(1, r.width), 0.03, 0.97),
        clamp((clientY - r.top) / Math.max(1, r.height), 0.03, 0.97),
      );
    };

    const onPointer = (e: PointerEvent) => {
      toHeroUv(e.clientX, e.clientY);
    };

    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0] ?? e.changedTouches[0];
      if (!t) return;
      toHeroUv(t.clientX, t.clientY);
    };

    /** Capture so we still get coordinates while the finger moves over text and CTAs. */
    window.addEventListener("pointermove", onPointer, { passive: true, capture: true });
    window.addEventListener("pointerdown", onPointer, { passive: true, capture: true });
    window.addEventListener("touchmove", onTouch, { passive: true, capture: true });
    window.addEventListener("touchstart", onTouch, { passive: true, capture: true });

    return () => {
      window.removeEventListener("pointermove", onPointer, true);
      window.removeEventListener("pointerdown", onPointer, true);
      window.removeEventListener("touchmove", onTouch, true);
      window.removeEventListener("touchstart", onTouch, true);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [touchLane, boundsRef, scheduleEmit]);

  if (!mounted || offscreen) {
    return <StaticHeroBackdrop />;
  }

  const emitFrom = touchLane
    ? touchEmit
    : mouseActive
      ? ({ type: "mouse-position", originX: 0.65, originY: 0.55 } as const)
      : ({ x: 0.65, y: 0.55 } as const);

  /** On touch lane, disable secondary “global mouse” pull — it fights emit UV over DOM layers. */
  const mouseInfluence = touchLane ? 0 : liteGpu ? 0.32 : 0.45;
  const mouseRadius = touchLane ? 0.08 : liteGpu ? 0.06 : 0.07;

  return (
    <Shader className="pointer-events-none absolute inset-0 z-0">
      <SolidColor color="#050814" />
      <Circle
        id="heroMask"
        visible={false}
        color="#ffffff"
        radius={2}
        softness={1}
        center={{ x: 1, y: 0.5 }}
      />
      <Smoke
        colorA="#6feaff"
        colorB="#0b1628"
        colorDecay={1.35}
        colorSpace="oklab"
        detail={liteGpu ? 3 : 4}
        direction={22}
        emitFrom={emitFrom}
        mouseInfluence={mouseInfluence}
        mouseRadius={mouseRadius}
        speed={liteGpu ? 2.5 : 3.2}
        maskSource="heroMask"
      />
      <FilmGrain strength={0.045} />
    </Shader>
  );
}
