"use client";

import { Shader, CursorRipples, SolidColor, Grid, WaveDistortion } from "shaders/react";

/**
 * Thin shader layer over the PlatformMarquee rows.
 *
 * Two flavours of fluid motion composed over the cyan grid:
 *   - `WaveDistortion` — ambient, always-on, GPU-cheap. Makes the grid
 *     breathe like water even with no user input. This is what keeps the
 *     effect alive on touch devices (no cursor) without adding per-frame JS.
 *   - `CursorRipples` — reacts to cursor/touch. On desktop hover and on
 *     mobile taps it spawns chromatic-aberrated ripples from the contact
 *     point.
 *
 * Enabled on every viewport now. Reduced-motion users fall through the
 * shaders.com lib's internal static-frame mode.
 */
export default function MarqueeRipples() {
  return (
    <Shader className="h-full w-full">
      <CursorRipples
        intensity={12}
        decay={7}
        radius={0.38}
        chromaticSplit={1.4}
        edges="stretch"
      >
        <SolidColor color="transparent" />
        <Grid color="#00d4ff" cells={18} thickness={0.03} />
        <WaveDistortion
          angle={132}
          edges="mirror"
          frequency={2.6}
          strength={0.04}
          speed={0.38}
          waveType="sine"
        />
      </CursorRipples>
    </Shader>
  );
}
