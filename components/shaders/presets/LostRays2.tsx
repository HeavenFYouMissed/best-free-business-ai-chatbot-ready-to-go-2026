"use client";

import { Shader, FilmGrain, Godrays, Tritone, ZoomBlur } from "shaders/react";

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

/**
 * shaders.com preset: Lost Rays 2 (id fe27e1d6-c6fc-43ee-b3c8-051010bccc2b).
 * Cinematic godrays + zoom-blur portal. The original tritone palette
 * included a golden accent (#ffd53d); we rebrand the mid-warm stop to a
 * darker cyan so the whole preset lives inside the cyan/navy brand
 * vocabulary — reads as "a portal glowing with our accent colour."
 */
export function LostRays2({ className, style }: Props) {
  return (
    <Shader className={className} style={style}>
      <Godrays
        backgroundColor="#000000"
        center={{ x: 0.53, y: 0.72 }}
        density={0.2}
        rayColor="#ffffff"
        speed={0.7}
      />
      <FilmGrain strength={0.09} />
      <Tritone
        blendMid={0.7}
        colorA="#050a16"
        colorB="#00d4ff"
        colorC="#7cf0d4"
        colorSpace="hsl"
      />
      <ZoomBlur center={{ x: 0.11, y: 0.33 }} intensity={100} />
    </Shader>
  );
}

export default LostRays2;
