"use client";

import {
  Shader,
  Ascii,
  FallingLines,
  Form3D,
  RadialGradient,
  StudioBackground,
} from "shaders/react";

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

/**
 * shaders.com preset: Ascii Tunnel 4 (id 6062c95d-99ec-44b3-9613-ab9864228056).
 * Real 3D torus (Form3D) slowly spinning, rendered through Ascii filter
 * from falling-lines. Reads as "tunnel receding / timeline ahead."
 * WhatHappensNext section.
 */
export function AsciiTunnel4({ className, style }: Props) {
  return (
    <Shader colorSpace="srgb" className={className} style={style}>
      <RadialGradient
        center={{ x: 0.5, y: 1 }}
        colorA="#051018"
        colorB="#0f0f17"
        radius={0.8}
        visible={false}
      />
      <StudioBackground
        ambientIntensity={98}
        ambientSpeed={5}
        brightness={100}
        center={{ x: 0.5, y: 1 }}
        color="#0e1214"
        fillIntensity={0}
        keyIntensity={5}
        lightTarget={0}
      />
      <Ascii
        alphaThreshold={0.14}
        cellSize={12}
        characters="┉╳┉╳"
        gamma={0.25}
        preserveAlpha={false}
      >
        <Form3D
          glossiness={0}
          lighting={0}
          /* Shader-lib TS type is narrower than runtime — shape3d object is valid. */
          shape3d={{
            type: "torus",
            outerRadius: 102,
            tubeRadius: 100,
            rotX: -90,
            rotY: 0,
            rotZ: 0,
            spinX: 0,
            spinY: 0.5,
            spinZ: 0,
          } as unknown as string}
          shape3dType="torus"
          zoom={92}
        >
          <FallingLines
            colorA="#00d4ff"
            colorB="#7cf0d4"
            density={17}
            speed={0.25}
            speedVariance={0.55}
            strokeWidth={0.38}
            trailLength={0.49}
          />
        </Form3D>
      </Ascii>
    </Shader>
  );
}

export default AsciiTunnel4;
