"use client";

import { useEffect, useRef, useState } from "react";
import {
  Shader,
  SolidColor,
  FlowingGradient,
  Ripples,
  Swirl,
  FilmGrain,
} from "shaders/react";

type Props = {
  className?: string;
  /** Tunes which half of the cyan range dominates. 0..1 */
  seed?: number;
  /** Ripple intensity + frequency. */
  intensity?: number;
};

/**
 * Small refractive "water orb" used inside each BuiltForYouTeaser glass
 * sphere. Ripples ride on a flowing cyan gradient, then Swirl adds subtle
 * swirl-depth, FilmGrain finishes. One Shader per orb, IntersectionObserver
 * gates mount so the three instances only boot when the teaser scrolls
 * into view.
 *
 * Shader components are masked into a circle by the orb wrapper (CSS
 * border-radius + overflow-hidden), so we don't need in-shader Glass
 * cutouts here — keeps the effect cheap.
 */
export function OrbShader({ className, seed = 0, intensity = 0.5 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(true);
            io.disconnect();
            return;
          }
        }
      },
      { rootMargin: "800px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mounted]);

  /* Palette offsets per orb so the three don't feel identical. */
  const cyanA = "#00d4ff";
  const cyanB = "#7cf0d4";
  const deep = seed > 0.5 ? "#04253a" : "#06172b";
  const warm = seed > 0.8 ? "#2dc9ff" : "#0aa9d9";

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className ?? ""}`}
    >
      {mounted && active ? (
        <Shader className="h-full w-full">
          <SolidColor color="#050a14" />
          <FlowingGradient
            colorA={deep}
            colorB={cyanA}
            colorC={cyanB}
            colorD={warm}
            colorSpace="oklab"
            distortion={0.55}
            speed={0.45 + seed * 0.2}
            seed={Math.floor(seed * 37) + 3}
          />
          <Ripples
            colorA={cyanA}
            colorB="#00000000"
            frequency={8 + intensity * 6}
            thickness={0.28}
            softness={0.72}
            speed={0.7 + intensity * 0.3}
            center={{ x: 0.5, y: 0.55 }}
          />
          <Swirl
            colorA={cyanB}
            colorB={deep}
            detail={1.4}
            blend={32}
            speed={0.35 + seed * 0.25}
            colorSpace="oklab"
          />
          <FilmGrain strength={0.05} />
        </Shader>
      ) : (
        /* CSS fallback while shader boots — ripple-ish radial shimmer */
        <div
          className="h-full w-full"
          style={{
            background: [
              `radial-gradient(circle at 50% 55%, color-mix(in srgb, ${cyanA} 60%, transparent) 0%, color-mix(in srgb, ${cyanA} 18%, transparent) 35%, transparent 68%)`,
              `radial-gradient(circle at 30% 30%, color-mix(in srgb, #ffffff 55%, transparent) 0%, transparent 40%)`,
              `linear-gradient(135deg, ${deep} 0%, #06172b 100%)`,
            ].join(", "),
          }}
        />
      )}
    </div>
  );
}

export default OrbShader;
