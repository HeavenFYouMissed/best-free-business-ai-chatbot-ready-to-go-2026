"use client";

import { Shader, SolidColor, Truchet, Paper, FilmGrain } from "shaders/react";

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Editorial painted-paper beat used on StudioTier, StudioWork, and
 * ComparisonTable. Truchet arc tiles in warm ink on deep charcoal,
 * then Paper roughens the surface so it reads as a printed sheet.
 *
 * Not a shaders.com preset — composed inline from library primitives to
 * match the warm-accent palette (cyan + signal orange).
 */
export function EditorialPaper({ className, style }: Props) {
  return (
    <Shader className={className} style={style}>
      <SolidColor color="#0d0c10" />
      <Truchet
        colorA="#120f0a"
        colorB="#ff6b3d"
        cells={14}
        thickness={1.1}
      />
      <Paper roughness={0.38} grainScale={3.4} displacement={0.12} />
      <FilmGrain strength={0.08} />
    </Shader>
  );
}

export default EditorialPaper;
