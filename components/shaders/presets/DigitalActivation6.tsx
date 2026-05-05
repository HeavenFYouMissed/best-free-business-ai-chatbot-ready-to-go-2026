"use client";

import { Shader, Ascii, DotGrid, Glass, SolidColor, Spiral } from "shaders/react";

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

/**
 * shaders.com preset: Digital Activation 6 (id 9ce36a2a-767c-4cba-9818-c93311d5edc0).
 * Glass-refracted rounded-rectangle panel revealing a pixelated cyan spiral beneath it.
 * Acts as the Hero right-column signature piece.
 */
export function DigitalActivation6({ className, style }: Props) {
  return (
    <Shader className={className} style={style}>
      <SolidColor color="#0e0f14" />
      <DotGrid color="#292936" density={49} dotSize={0.1} />
      <Glass
        aberration={0.8}
        center={{ x: 1, y: 1 }}
        cutout
        edgeSoftness={0.2}
        fresnel={0}
        fresnelSoftness={0.23}
        highlight={0}
        highlightSoftness={0.16}
        lightAngle={274}
        refraction={2}
        scale={1.45}
        /* Shader-lib TS type is narrower than runtime — shape object is valid. */
        shape={{
          type: "roundedRectSDF",
          radius: 1,
          height: 0.4,
          rounding: 0.05,
          rotation: 0,
        } as unknown as string}
        shapeSdfUrl=""
        shapeType="circleSDF"
      >
        <SolidColor color="#0e0f14" />
        <Ascii characters="◘•" gamma={0.55} spacing={0.8}>
          <Spiral
            center={{ x: 0.98, y: 0.43 }}
            colorA="#0a131f"
            colorB="#00d4ff"
            softness={0.4}
          />
        </Ascii>
      </Glass>
    </Shader>
  );
}

export default DigitalActivation6;
