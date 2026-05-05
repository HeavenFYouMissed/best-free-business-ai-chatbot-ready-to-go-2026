"use client";

import {
  Shader,
  Dither,
  Glow,
  Grid,
  GridDistortion,
  SolidColor,
  WaveDistortion,
} from "shaders/react";

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

/**
 * shaders.com preset: Chevron Nodes 4 (id aa947814-153d-4aa3-aead-f849344582da).
 * Dense architectural grid lattice with glitchy wave distortion — reads as
 * "structure / blueprint / sites". Recolored to brand cyan from its original
 * indigo palette.
 */
export function ChevronNodes4({ className, style }: Props) {
  return (
    <Shader className={className} style={style}>
      <SolidColor color="#050c17" />
      <Grid cells={20} color="#002e4a" opacity={0.91} thickness={0.25} visible />
      <Grid cells={4} color="#00d4ff" thickness={0.2} visible />
      <GridDistortion edges="mirror" gridSize={77} radius={2.8} />
      <WaveDistortion
        angle={326}
        edges="mirror"
        frequency={4.1}
        speed={0.6}
        strength={0.55}
        waveType="square"
      />
      <Dither
        blendMode="screen"
        colorMode="source"
        pattern="bayer2"
        pixelSize={9}
        spread={0.96}
        threshold={0.69}
      />
      <Glow intensity={4.8} size={20} threshold={0.1} />
    </Shader>
  );
}

export default ChevronNodes4;
