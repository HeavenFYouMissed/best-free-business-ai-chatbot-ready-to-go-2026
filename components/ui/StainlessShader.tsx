"use client";

import { useEffect, useState } from "react";
import { Shader, StudioBackground, Swirl, FilmGrain } from "shaders/react";

/**
 * Stainless Steel surface — StudioBackground lighting + high-detail Swirl
 * (B&W HSL) + FilmGrain. Glass component removed intentionally: its SDF shape
 * created a visible circular refraction artifact inside buttons. The Swirl
 * alone produces brushed metal that fills uniformly; CSS overlays on the
 * consuming button handle directional gloss + bevel.
 */
type Variant = "light" | "dark";

type Props = {
  variant?: Variant;
  className?: string;
};

const CSS_FALLBACK_LIGHT =
  "radial-gradient(ellipse 85% 65% at 28% 18%, rgba(255,255,255,0.88) 0%, rgba(230,230,235,0.38) 28%, transparent 58%), radial-gradient(ellipse 60% 50% at 75% 82%, rgba(250,250,252,0.3) 0%, transparent 60%), linear-gradient(160deg, #fafafa 0%, #e4e4e7 28%, #c7c7cc 58%, #a1a1aa 82%, #d4d4d8 100%)";

const CSS_FALLBACK_DARK =
  "radial-gradient(ellipse 85% 65% at 28% 18%, rgba(220,220,230,0.55) 0%, rgba(90,90,105,0.25) 32%, transparent 62%), radial-gradient(ellipse 65% 55% at 78% 84%, rgba(40,40,50,0.65) 0%, transparent 60%), linear-gradient(160deg, #a8a8b0 0%, #6e6e78 26%, #3a3a44 52%, #1a1a22 80%, #2e2e38 100%)";

export function StainlessShader({ variant = "light", className }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        aria-hidden
        className={className}
        style={{
          background: variant === "dark" ? CSS_FALLBACK_DARK : CSS_FALLBACK_LIGHT,
          height: "100%",
          width: "100%",
        }}
      />
    );
  }

  // Light = bright silver (for button text contrast)
  // Dark  = gunmetal with deep shadows (for chat FAB, reads against cyan bloom)
  const studio = variant === "dark"
    ? { color: "#0c0c12", brightness: 70, keyIntensity: 18, fillIntensity: 12, ambientIntensity: 40 }
    : { color: "#1b1b21", brightness: 100, keyIntensity: 11, fillIntensity: 9, ambientIntensity: 65 };

  const swirl = variant === "dark"
    ? { colorA: "#040408", colorB: "#c0c0c6", detail: 4.2, speed: 0.45, blend: 32 }
    : { colorA: "#141412", colorB: "#d4d4d8", detail: 4.2, speed: 0.5, blend: 22 };

  return (
    <Shader className={className ?? "h-full w-full"}>
      <StudioBackground
        ambientIntensity={studio.ambientIntensity}
        backIntensity={25}
        brightness={studio.brightness}
        center={{ x: 0.5, y: 0.88 }}
        color={studio.color}
        fillAngle={53}
        fillIntensity={studio.fillIntensity}
        fillSoftness={94}
        keyIntensity={studio.keyIntensity}
        keySoftness={100}
        wallCurvature={19}
      />
      <Swirl
        blend={swirl.blend}
        colorA={swirl.colorA}
        colorB={swirl.colorB}
        colorSpace="hsl"
        detail={swirl.detail}
        speed={swirl.speed}
      />
      <FilmGrain strength={variant === "dark" ? 0.08 : 0.1} />
    </Shader>
  );
}
