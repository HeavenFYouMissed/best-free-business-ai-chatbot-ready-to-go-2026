"use client";

import {
  Shader,
  Ascii,
  CRTScreen,
  Glow,
  GridDistortion,
  SolidColor,
  Stripes,
  WaveDistortion,
} from "shaders/react";

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

/**
 * shaders.com preset: ASCII Peaks (id 7f41b77a-62a2-42df-a227-ad7ed0760327).
 * Cyan zeros/O's cascading into peak silhouettes — literal metaphor for
 * "real numeric results." RealResults section background.
 */
export function AsciiPeaks({ className, style }: Props) {
  return (
    <Shader className={className} style={style}>
      <SolidColor color="#02090f" />
      <Ascii
        cellSize={33}
        characters="O0O0O0O0O0O0O0O0O0O0O0O0O0O0O0O0O0O0O0O0O0O0O0O0O0"
        fontFamily="Source Code Pro"
        spacing={0.75}
      >
        <Stripes
          angle={48}
          balance={0.29}
          colorA="#00c6e6"
          colorB="#03021769"
          density={3}
          softness={0.6}
          speed={0.1}
        />
        <WaveDistortion angle={90} frequency={4} strength={0.59} waveType="triangle" />
        <GridDistortion gridSize={8} intensity={5} radius={3} />
      </Ascii>
      <Glow intensity={9.44} size={1.98} threshold={0.12} />
      <CRTScreen
        brightness={3}
        colorShift={0.8}
        pixelSize={19}
        scanlineFrequency={250}
        scanlineIntensity={0.29}
      />
    </Shader>
  );
}

export default AsciiPeaks;
