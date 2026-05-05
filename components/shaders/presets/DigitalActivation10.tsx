"use client";

import { Shader, Ascii, DotGrid, Glass, SolidColor, Spiral, Circle } from "shaders/react";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  /** When true, layers a centered invisible Circle to mask content outside the orb (for SignatureCanvas dissolve). */
  withDissolveMask?: boolean;
  rotation?: number;
};

/**
 * shaders.com preset: Digital Activation 10 (id 2757b00d-f85c-4908-8d2a-2c0be9b9155a).
 * Hexagonal glass prism over a white-on-black pixelated spiral.
 * Centerpiece art piece for the SignatureCanvas section.
 */
export function DigitalActivation10({
  className,
  style,
  withDissolveMask = false,
  rotation = 0,
}: Props) {
  return (
    <Shader className={className} style={style}>
      <SolidColor color="#0a0a0e" />
      <DotGrid color="#292936" density={49} dotSize={0.1} />
      {withDissolveMask && (
        <Circle
          id="orbDissolve"
          visible={false}
          color="#ffffff"
          radius={0.45}
          softness={0.8}
          center={{ x: 0.5, y: 0.5 }}
        />
      )}
      <Glass
        aberration={0.8}
        cutout
        edgeSoftness={0.2}
        fresnel={0}
        fresnelSoftness={0.23}
        highlight={0}
        highlightSoftness={0.16}
        lightAngle={274}
        refraction={2}
        scale={1.55}
        /* Shader-lib TS type is narrower than runtime — shape object is valid. */
        shape={{
          type: "polygonSDF",
          radius: 0.41,
          sides: 6,
          rounding: 0,
          rotation,
        } as unknown as string}
        shapeSdfUrl=""
        shapeType="circleSDF"
      >
        <SolidColor color="#0a0a0e" />
        <Ascii characters="◘•" gamma={2.95} spacing={0.8}>
          <Spiral colorA="#0a131f" softness={0.4} />
        </Ascii>
      </Glass>
    </Shader>
  );
}

export default DigitalActivation10;
