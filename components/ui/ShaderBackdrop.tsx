"use client";

import { useEffect, useRef, useState } from "react";
import {
  Shader,
  SolidColor,
  FlowingGradient,
  Swirl,
  SimplexNoise,
  Ripples,
  Plasma,
  DotGrid,
  FilmGrain,
} from "shaders/react";

/**
 * Per-card animated backdrop. Each variant maps to a different shaders.com
 * WebGPU generator. Shaders auto-throttle to ~1fps when scrolled offscreen,
 * and we additionally defer initial mount via IntersectionObserver until the
 * card is within 1200px of the viewport — so the first page paint only boots
 * the hero + studio shaders, not all 20+ card shaders at once.
 */
type Variant = "simplex" | "warp" | "ripple" | "wave" | "dots" | "sphere" | "swirl";

type Props = {
  variant?: Variant;
  color?: string;
  opacity?: number;
  /** Reserved for API compatibility. */
  size?: number;
  speed?: number;
  vignette?: boolean;
  className?: string;
};

/**
 * Blend a hex color toward #050507 by `amount` percent (0–100).
 * shaders.com's color parser only accepts concrete hex/rgb — no CSS `color-mix()`.
 */
function darken(c: string, amount = 70) {
  const hex = c.replace("#", "");
  const full = hex.length === 3 ? hex.split("").map((ch) => ch + ch).join("") : hex.slice(0, 6);
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  const t = Math.max(0, Math.min(100, amount)) / 100;
  // blend toward #050507
  const nr = Math.round(r * (1 - t) + 0x05 * t);
  const ng = Math.round(g * (1 - t) + 0x05 * t);
  const nb = Math.round(b * (1 - t) + 0x07 * t);
  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${toHex(nr)}${toHex(ng)}${toHex(nb)}`;
}

function Layer({
  variant,
  color,
  speed = 0.5,
}: {
  variant: Variant;
  color: string;
  speed?: number;
}) {
  const base = "#050507";
  const deep = darken(color, 70);

  switch (variant) {
    case "simplex":
      return (
        <>
          <SolidColor color={base} />
          <SimplexNoise colorA={color} colorB={base} scale={3.2} contrast={0.3} speed={speed * 0.7} seed={11} />
          <FilmGrain strength={0.04} />
        </>
      );

    case "warp":
      return (
        <>
          <SolidColor color={base} />
          <Swirl colorA={color} colorB={deep} detail={2.2} blend={55} speed={speed * 1.1} colorSpace="oklab" />
          <FilmGrain strength={0.04} />
        </>
      );

    case "ripple":
      return (
        <>
          <SolidColor color={base} />
          <FlowingGradient
            colorA={base}
            colorB={color}
            colorC={deep}
            colorD={color}
            colorSpace="oklab"
            distortion={0.4}
            speed={speed * 0.8}
            seed={23}
          />
          <Ripples
            colorA={color}
            colorB="#00000000"
            frequency={12}
            thickness={0.35}
            softness={0.6}
            speed={speed * 0.9}
            center={{ x: 0.65, y: 0.35 }}
          />
          <FilmGrain strength={0.035} />
        </>
      );

    case "wave":
      return (
        <>
          <SolidColor color={base} />
          <FlowingGradient
            colorA={base}
            colorB={color}
            colorC={deep}
            colorD={color}
            colorSpace="oklab"
            distortion={0.55}
            speed={speed * 1.1}
            seed={7}
          />
          <FilmGrain strength={0.04} />
        </>
      );

    case "dots":
      return (
        <>
          <SolidColor color={base} />
          <FlowingGradient
            colorA={base}
            colorB={deep}
            colorC={color}
            colorD={base}
            colorSpace="oklab"
            distortion={0.35}
            speed={speed * 0.7}
            seed={19}
          />
          <DotGrid color={color} density={42} dotSize={0.18} twinkle={0.45} />
          <FilmGrain strength={0.035} />
        </>
      );

    case "sphere":
      return (
        <>
          <SolidColor color={base} />
          <Plasma
            colorA={color}
            colorB={base}
            density={1.4}
            intensity={1.1}
            warp={0.45}
            contrast={1.1}
            speed={speed * 1.2}
          />
          <FilmGrain strength={0.045} />
        </>
      );

    case "swirl":
      return (
        <>
          <SolidColor color={base} />
          <Swirl colorA={color} colorB={deep} detail={3.4} blend={52} speed={speed * 1.2} colorSpace="oklab" />
          <FilmGrain strength={0.04} />
        </>
      );

    default:
      return (
        <>
          <SolidColor color={base} />
          <FilmGrain strength={0.04} />
        </>
      );
  }
}

function cssFallback(variant: Variant, color: string): { backgroundImage: string; backgroundSize?: string } {
  switch (variant) {
    case "dots":
      return {
        backgroundImage: [
          `radial-gradient(color-mix(in srgb, ${color} 55%, transparent) 1.4px, transparent 1.4px)`,
          `radial-gradient(ellipse 80% 70% at 60% 40%, color-mix(in srgb, ${color} 35%, transparent), transparent 65%)`,
        ].join(", "),
        backgroundSize: "7px 7px, auto",
      };
    case "warp":
    case "swirl":
      return {
        backgroundImage: [
          `conic-gradient(from 140deg at 55% 50%, color-mix(in srgb, ${color} 45%, transparent), transparent 40%, color-mix(in srgb, ${color} 32%, transparent) 65%, transparent 92%)`,
          `radial-gradient(ellipse 90% 70% at 50% 50%, color-mix(in srgb, ${color} 28%, transparent), transparent 70%)`,
        ].join(", "),
      };
    default:
      return {
        backgroundImage: [
          `radial-gradient(ellipse 78% 64% at 28% 26%, color-mix(in srgb, ${color} 60%, transparent), transparent 60%)`,
          `radial-gradient(ellipse 60% 55% at 82% 78%, color-mix(in srgb, ${color} 42%, transparent), transparent 62%)`,
          `radial-gradient(ellipse 120% 50% at 50% 100%, color-mix(in srgb, ${color} 22%, transparent), transparent 65%)`,
        ].join(", "),
      };
  }
}

export function ShaderBackdrop({
  variant = "simplex",
  color = "#00d4ff",
  opacity = 0.55,
  speed = 0.5,
  vignette = true,
  className,
}: Props) {
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
      { rootMargin: "1200px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mounted]);

  const fallback = cssFallback(variant, color);

  return (
    <>
      <div
        ref={ref}
        aria-hidden
        className={`pointer-events-none absolute inset-0 ${className ?? ""}`}
        style={{ opacity }}
      >
        {mounted && active ? (
          <Shader className="h-full w-full">
            <Layer variant={variant} color={color} speed={speed} />
          </Shader>
        ) : (
          <div className="h-full w-full" style={fallback} />
        )}
      </div>
      {vignette && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 110% 90% at 50% 110%, color-mix(in srgb, var(--color-surface-2) 88%, transparent) 0%, transparent 55%), linear-gradient(180deg, transparent 45%, color-mix(in srgb, var(--color-surface-2) 55%, transparent) 100%)",
          }}
        />
      )}
    </>
  );
}
