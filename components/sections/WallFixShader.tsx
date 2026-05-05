"use client";

import { useEffect, useState } from "react";
import { Shader, FlowingGradient, FilmGrain, SolidColor } from "shaders/react";

/**
 * Cheap animated fill for the Wall and Fix cards in ProblemFix.
 * FlowingGradient is a generator (sub-1ms), auto-throttles offscreen.
 */
export function WallFixShader({ tone }: { tone: "wall" | "fix" }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    if (tone === "wall") {
      return (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 25% 35%, color-mix(in srgb, #ff3d5a 32%, transparent), transparent 60%), radial-gradient(ellipse 65% 60% at 75% 65%, color-mix(in srgb, #7a1020 55%, transparent), transparent 65%)",
          }}
        />
      );
    }
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 70% 40%, color-mix(in srgb, #00d4ff 34%, transparent), transparent 62%), radial-gradient(ellipse 55% 50% at 25% 70%, color-mix(in srgb, #7cf0d4 26%, transparent), transparent 65%)",
        }}
      />
    );
  }

  if (tone === "wall") {
    return (
      <Shader className="pointer-events-none absolute inset-0">
        <SolidColor color="#1a060a" />
        <FlowingGradient
          colorA="#ff3d5a"
          colorB="#7a1020"
          colorC="#2a0810"
          colorD="#ff7490"
          colorSpace="oklab"
          distortion={0.55}
          seed={12}
        />
        <FilmGrain strength={0.06} />
      </Shader>
    );
  }

  return (
    <Shader className="pointer-events-none absolute inset-0">
      <SolidColor color="#061820" />
      <FlowingGradient
        colorA="#00d4ff"
        colorB="#0a2c3a"
        colorC="#7cf0d4"
        colorD="#042434"
        colorSpace="oklab"
        distortion={0.5}
        seed={27}
      />
      <FilmGrain strength={0.05} />
    </Shader>
  );
}
