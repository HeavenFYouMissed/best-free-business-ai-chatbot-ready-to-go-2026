"use client";

import {
  Shader,
  Blob,
  FilmGrain,
  Glass,
  SineWave,
  Swirl,
  WaveDistortion,
} from "shaders/react";

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

/**
 * shaders.com preset: Soft Prism 3 (id deeb3c9d-17b7-482e-8702-e0b2c6758515).
 * A refractive glass sphere over flowing cyan gradients — the literal
 * "Polish" metaphor. The original preset uses a custom SDF for the glass
 * shape; we substitute the circle SDF (no external asset) so this ships
 * standalone. Recolored: magenta/violet → cyan so it stays on-brand.
 */
export function SoftPrism3({ className, style }: Props) {
  return (
    <Shader className={className} style={style}>
      <Swirl colorA="#081a2c" colorB="#00d4ff" colorSpace="lch" detail={2.5} speed={0.8} />
      <Blob
        center={{ x: 0.27, y: 0.85 }}
        colorA="#00d4ff"
        colorB="#0a4a7a"
        colorSpace="oklch"
        deformation={1}
        highlightColor="#ffffff"
        highlightIntensity={0.8}
        highlightX={0.5}
        highlightY={-0.5}
        highlightZ={0.8}
        opacity={0.85}
        seed={42}
        size={0.85}
        softness={3}
        speed={1.2}
        visible
      />
      <WaveDistortion
        angle={161}
        edges="mirror"
        frequency={3.4}
        speed={2.5}
        strength={0.2}
        visible
      />
      <SineWave
        amplitude={0.1}
        angle={97}
        color="#0a1220"
        frequency={0.5}
        position={{ x: 1, y: 0.5 }}
        softness={1}
        speed={-0.6}
        thickness={2.2}
        visible
      />
      <Glass
        aberration={1}
        center={{ x: 0.3, y: 0.5 }}
        fresnel={0}
        fresnelSoftness={0.31}
        highlight={0.1}
        highlightColor="#dbe6ff"
        highlightSoftness={0.27}
        innerZoom={1.15}
        lightAngle={289}
        refraction={0.74}
        scale={0.7}
        shapeType="circleSDF"
        thickness={1}
        visible
      />
      <FilmGrain strength={0.1} visible />
    </Shader>
  );
}

export default SoftPrism3;
