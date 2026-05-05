"use client";

import {
  Shader,
  Ascii,
  CRTScreen,
  FallingLines,
  Glow,
  Perspective,
  SolidColor,
} from "shaders/react";

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

/**
 * shaders.com preset: Enter The Matrix (id d9df03c5-1515-4e1f-b6fe-304767cdfc17).
 * Katakana rain recoloured cyan/navy for brand fit.
 * Included section peak — "data flowing from your URL to the stores."
 */
export function EnterTheMatrix({ className, style }: Props) {
  return (
    <Shader className={className} style={style}>
      <SolidColor color="#051018" />
      <Ascii
        cellSize={25}
        characters="ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ"
        fontFamily="var(--font-geist-mono), Geist Mono, ui-monospace, monospace"
        spacing={0.9}
      >
        <FallingLines
          colorA="#00d4ff"
          colorB="#041218ff"
          colorSpace="oklab"
          density={34}
          speed={0.45}
          speedVariance={0.55}
          strokeWidth={0.5}
          trailLength={0.7}
        />
      </Ascii>
      <Glow intensity={6.8} size={2} threshold={0.4} />
      <CRTScreen
        colorShift={0}
        pixelSize={112}
        scanlineFrequency={100}
        scanlineIntensity={0.1}
        vignetteIntensity={0.1}
        vignetteRadius={0.35}
      />
      <Perspective edges="wrap" tilt={30} zoom={0.9} />
    </Shader>
  );
}

export default EnterTheMatrix;
