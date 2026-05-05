"use client";

import {
  Shader,
  FallingLines,
  Glow,
  CRTScreen,
  Dither,
} from "shaders/react";

/**
 * Hamburger drawer backdrop — cyan matrix-rain / data-stream.
 *
 * No SolidColor, so the canvas is transparent where the falling lines
 * aren't painting. The drawer aside itself handles transparency + frost
 * via CSS `backdrop-filter`; this shader is mounted on top of that
 * at ~50% opacity with `mix-blend-mode: screen` so the rain reads as
 * light INSIDE the glass without blocking the blurred site behind.
 */
export default function DrawerShader() {
  return (
    <Shader className="h-full w-full">
      <FallingLines
        colorA="#00d4ff"
        colorB="#041218ff"
        colorSpace="oklab"
        density={26}
        speed={0.4}
        speedVariance={0.55}
        strokeWidth={0.38}
        trailLength={0.62}
        angle={90}
      />
      <Dither
        pattern="blueNoise"
        pixelSize={2}
        threshold={0.5}
        spread={1}
        colorMode="custom"
        colorA="transparent"
        colorB="rgba(0,212,255,0.08)"
      />
      <Glow intensity={3.2} size={1.5} threshold={0.3} />
      <CRTScreen
        scanlineFrequency={180}
        scanlineIntensity={0.14}
        pixelSize={28}
        vignetteIntensity={0.12}
        vignetteRadius={0.4}
      />
    </Shader>
  );
}
