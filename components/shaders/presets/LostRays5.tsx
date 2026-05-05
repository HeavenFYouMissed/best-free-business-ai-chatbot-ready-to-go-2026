"use client";

import { Shader, FilmGrain, Godrays, Tritone, ZoomBlur } from "shaders/react";

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

/**
 * shaders.com preset: Lost Rays 5 (id a42e21a8-0420-45ab-bd12-f097a20278ee).
 * Cyan prismatic godrays with film grain + tritone grade.
 * Brand override: Tritone.colorC green → mint #7cf0d4 for brand fit.
 * StudioWork editorial peak.
 */
export function LostRays5({ className, style }: Props) {
  return (
    <Shader className={className} style={style}>
      <Godrays
        backgroundColor="#07161f"
        center={{ x: 0.52, y: 1 }}
        intensity={0.58}
        rayColor="#ccdaed"
        speed={1}
      />
      <FilmGrain strength={0.09} />
      <Tritone
        blendMid={0.6}
        colorA="#07161f"
        colorB="#00d4ff"
        colorC="#7cf0d4"
        colorSpace="oklch"
      />
      <ZoomBlur center={{ x: 0.58, y: 0.73 }} intensity={100} />
    </Shader>
  );
}

export default LostRays5;
