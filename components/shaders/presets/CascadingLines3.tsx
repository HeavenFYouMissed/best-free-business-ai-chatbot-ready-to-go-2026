"use client";

import {
  Shader,
  Dither,
  FallingLines,
  SineWave,
  SolidColor,
  Swirl,
} from "shaders/react";

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

/**
 * shaders.com preset: Cascading Lines 3 (id 3acf38f9-bcc9-40e1-ba71-19e06dab6b5c).
 * Digital rain / audio waveform — reads as "intelligence / data flow",
 * used for the Chatbots peak. Recolored to cyan + brand signal orange
 * (the preset's original magenta shifted to our warm-accent so the wave
 * still has a secondary color beat without breaking the cyan monopoly).
 */
export function CascadingLines3({ className, style }: Props) {
  return (
    <Shader className={className} style={style}>
      <SolidColor color="#0b1a22" />
      <Swirl
        blend={35}
        colorA="#00d4ff"
        colorB="#0a4a7a"
        detail={2}
        maskSource="publishd-bfy-chat-mask"
      />
      <FallingLines
        id="publishd-bfy-chat-mask"
        density={60}
        speed={0.1}
        speedVariance={0.7}
        strokeWidth={0.66}
        trailLength={
          {
            type: "map",
            curve: -0.15,
            source: "publishd-bfy-chat-wave",
            channel: "alpha",
            inputMax: 1,
            inputMin: 0,
            outputMax: 1,
            outputMin: 0.01,
          } as unknown as number
        }
        visible={false}
      />
      <SineWave
        id="publishd-bfy-chat-wave"
        amplitude={0.4}
        angle={26}
        frequency={0.5}
        softness={1}
        speed={0.4}
        thickness={1}
        visible={false}
      />
      <Dither blendMode="linearDodge" colorMode="source" pixelSize={3} />
    </Shader>
  );
}

export default CascadingLines3;
