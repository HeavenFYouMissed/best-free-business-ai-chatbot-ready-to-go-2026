"use client";

import { useEffect, useState } from "react";
import { Shader, SolidColor, Voronoi, Dither, FilmGrain } from "shaders/react";

type Props = {
  className?: string;
  /** Intensity of the shader animation — 1 = normal, 0 = still. */
  speed?: number;
};

/**
 * Digital-cube shader interior used by ShipButton and the hamburger button.
 *
 * Desktop stack: deep-navy base → cyan Voronoi cells → Dither pixelation
 * (makes cells read as cubes) → FilmGrain.
 *
 * Coarse-pointer devices skip the WebGL canvas entirely — the button is
 * mounted many times per page, and each instance running a shader at rest
 * is the biggest ongoing GPU expense on the site. The CSS fallback reads
 * near-identical on a 44px button using two layered gradients that evoke
 * the same "digital grid over cyan" aesthetic.
 */
const CSS_FALLBACK_BG = `
  linear-gradient(135deg, #0897c4 0%, #0a5b7a 40%, #083148 72%, #04121f 100%),
  repeating-linear-gradient(
    90deg,
    transparent 0 6px,
    color-mix(in srgb, #00d4ff 22%, transparent) 6px 7px
  ),
  repeating-linear-gradient(
    0deg,
    transparent 0 6px,
    color-mix(in srgb, #00d4ff 18%, transparent) 6px 7px
  )
`;

export function DigitalCubeShader({ className, speed = 1 }: Props) {
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
          backgroundImage: CSS_FALLBACK_BG,
          backgroundBlendMode: "normal, screen, screen",
          backgroundSize: "100% 100%, 14px 14px, 14px 14px",
          height: "100%",
          width: "100%",
          borderRadius: "inherit",
        }}
      />
    );
  }

  return (
    <Shader className={className ?? "h-full w-full"}>
      <SolidColor color="#041424" />
      <Voronoi
        colorA="#00d4ff"
        colorB="#041a2b"
        colorBorder="#0a2a44"
        colorSpace="oklch"
        edgeIntensity={0.92}
        edgeSoftness={0.03}
        scale={3.5}
        speed={0.3 * speed}
      />
      <Dither
        pattern="bayer4"
        pixelSize={5}
        threshold={0.5}
        spread={1}
        colorMode="source"
      />
      <FilmGrain strength={0.06} />
    </Shader>
  );
}

export default DigitalCubeShader;
