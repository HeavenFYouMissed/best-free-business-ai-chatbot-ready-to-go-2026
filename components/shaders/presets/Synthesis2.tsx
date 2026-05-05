"use client";

import { Shader, FilmGrain, SineWave, SolidColor, WaveDistortion } from "shaders/react";

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

/**
 * shaders.com preset: Synthesis 2 (id 105db495-7d37-431b-a725-b1bf63d88b12).
 * Cinematic cyan aurora waves against near-black navy. Used as the BFY hero
 * signature — cousin to homepage's DigitalActivation6 but softer and more
 * atmospheric, giving the Built-For-You page its own identity without
 * breaking the brand cyan discipline.
 */
export function Synthesis2({ className, style }: Props) {
  return (
    <Shader className={className} style={style}>
      <SolidColor color="#08071a" />
      <SineWave
        amplitude={0.5}
        angle={144}
        blendMode="normal-oklch"
        color="#0a4a7a"
        frequency={0.2}
        position={{ x: 0.22, y: 0.27 }}
        softness={0.55}
        speed={0.3}
        thickness={0.72}
      />
      <SineWave
        amplitude={0.58}
        blendMode="normal-oklch"
        color="#00d4ff"
        frequency={0.2}
        position={{ x: 0.6, y: 0.51 }}
        softness={0.57}
        speed={0.5}
        thickness={0.58}
      />
      <WaveDistortion angle={114} edges="mirror" speed={0.3} strength={0.61} />
      <FilmGrain strength={0.07} />
    </Shader>
  );
}

export default Synthesis2;
