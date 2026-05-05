"use client";

import { useEffect, useState } from "react";
import { Shader, SolidColor, Spiral, Glass, FilmGrain } from "shaders/react";

type Props = {
  className?: string;
};

/**
 * Pure-CSS fallback used on coarse-pointer devices — no shader canvas, no
 * continuous GPU work. Still reads as a glass orb: layered radial gradients
 * + a chromatic rim via pseudo-element.
 */
const CSS_FALLBACK_BG =
  "radial-gradient(circle at 30% 28%, rgba(200,238,255,0.78) 0%, rgba(135,215,255,0.55) 18%, rgba(0,180,220,0.45) 36%, rgba(6,10,22,0.92) 68%, #020308 100%)";

/**
 * The chat FAB as a physical glass orb (desktop) or a CSS glass orb (mobile).
 *
 * Stack (desktop):
 *   SolidColor (deep navy) → Spiral (cyan) → Glass circle SDF (strong
 *   refraction + chromatic aberration + fresnel rim) → FilmGrain.
 *
 * Coarse-pointer devices skip the shader entirely and use the CSS fallback,
 * since running a WebGL canvas for a 60px FAB that's idle most of the time
 * is the worst perf tradeoff on the site.
 */
export function GlassBubbleShader({ className }: Props) {
  const [mounted, setMounted] = useState(false);
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(pointer: coarse)");
    setCoarse(mq.matches);
    const handler = () => setCoarse(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (!mounted || coarse) {
    return (
      <div
        aria-hidden
        className={className}
        style={{
          background: CSS_FALLBACK_BG,
          height: "100%",
          width: "100%",
          borderRadius: "inherit",
        }}
      />
    );
  }

  return (
    <Shader className={className ?? "h-full w-full"}>
      <SolidColor color="#050810" />
      <Spiral
        colorA="#041a2b"
        colorB="#00d4ff"
        center={{ x: 0.5, y: 0.55 }}
        scale={0.85}
        strokeWidth={0.55}
        softness={0.4}
        speed={0.45}
        colorSpace="oklch"
      />
      <Glass
        /* Shader-lib TS type is narrower than runtime — shape object is valid. */
        shape={
          {
            type: "circleSDF",
            radius: 0.46,
          } as unknown as string
        }
        cutout
        edgeSoftness={0.05}
        refraction={2.2}
        thickness={0.28}
        aberration={0.85}
        highlight={0.42}
        highlightSoftness={0.35}
        highlightColor="#ffffff"
        lightAngle={310}
        fresnel={0.55}
        fresnelSoftness={0.2}
        fresnelColor="#9be7ff"
        tintColor="#00d4ff"
        tintIntensity={0.12}
      />
      <FilmGrain strength={0.04} />
    </Shader>
  );
}

export default GlassBubbleShader;
