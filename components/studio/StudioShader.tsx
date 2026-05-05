"use client";

import { useEffect, useState } from "react";
import { Shader, SolidColor, Smoke, FilmGrain, Circle } from "shaders/react";

/**
 * Studio tier atmosphere — Smokescreen 8 preset re-tinted violet so it feels
 * distinct from the hero (cyan) while sharing visual vocabulary. Mask fades
 * the shader toward the bottom of the card where the CTAs sit.
 */
export function StudioShader() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 55% 40%, color-mix(in srgb, #2c1b5c 60%, transparent), transparent 65%), radial-gradient(ellipse 55% 55% at 70% 30%, color-mix(in srgb, #6b49c4 45%, transparent), transparent 65%), #0a0614",
        }}
      />
    );
  }

  return (
    <Shader className="pointer-events-none absolute inset-0">
      <SolidColor color="#0a0614" />
      <Circle
        id="studioTopMask"
        visible={false}
        color="#ffffff"
        radius={1.7}
        softness={0.95}
        center={{ x: 0.5, y: 0.25 }}
      />
      <Smoke
        colorA="#c8b6ff"
        colorB="#0f0728"
        colorDecay={1.45}
        colorSpace="oklab"
        detail={6}
        direction={42}
        emitFrom={{
          type: "mouse-position",
          originX: 0.55,
          originY: 0.4,
        }}
        mouseInfluence={0.7}
        mouseRadius={0.08}
        speed={5.2}
        maskSource="studioTopMask"
      />
      <FilmGrain strength={0.04} />
    </Shader>
  );
}
