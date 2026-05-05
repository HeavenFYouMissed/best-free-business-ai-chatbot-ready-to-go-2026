"use client";

import {
  Shader,
  Circle,
  FallingLines,
  Glow,
  Halftone,
  Paper,
  PolarCoordinates,
  SolidColor,
} from "shaders/react";

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

/**
 * shaders.com preset: Fireworks 5 (id 011a60f7-d51c-4c48-9ed2-c82dd22e06e4).
 * Radial starburst falling-lines in polar coordinates + paper texture.
 * Brand override: red→cyan, cyan→white for brand fit.
 * FinalCta MAX peak — crescendo moment of the page.
 */
export function Fireworks5({ className, style }: Props) {
  return (
    <Shader className={className} style={style}>
      <Circle
        id="fireworks5Mask"
        center={{ x: 0.5, y: 0 }}
        radius={1.05}
        softness={0.47}
      />
      <SolidColor color="#040a14" />
      <PolarCoordinates
        center={{ x: 0.5, y: 0 }}
        maskSource="fireworks5Mask"
        maskType="alphaInverted"
        radius={0.7}
      >
        <FallingLines
          colorA="#00d4ff"
          colorB="#ffffff"
          colorSpace="oklab"
          density={35}
          speed={0.25}
          speedVariance={0.55}
        />
      </PolarCoordinates>
      <Glow intensity={1.1} size={10.4} threshold={0.2} />
      <Halftone frequency={162} />
      <Paper displacement={0.22} grainScale={3} roughness={0.95} />
    </Shader>
  );
}

export default Fireworks5;
