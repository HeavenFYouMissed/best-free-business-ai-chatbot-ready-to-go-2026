"use client";

import { Shader, MultiPointGradient, Dither } from "shaders/react";

type Props = {
  className?: string;
};

/**
 * Chat panel iridescent overlay. This is NOT the full background — real frost
 * is handled by CSS `backdrop-filter` on the screen container in globals.css.
 * This shader just adds a low-opacity pearl tint + micro noise on top of the
 * blurred site, so the panel reads as Apple Intelligence glass (see the page
 * behind + a hint of iridescent color).
 *
 * No SolidColor base → the canvas is transparent where the mesh is low-alpha.
 * No Glass → CSS backdrop-filter does that cheaper and more reliably.
 * Consumer mounts this at ~0.42 opacity with `mix-blend-mode: screen`.
 */
export function ChatPanelBackdrop({ className }: Props) {
  return (
    <Shader className={className ?? "h-full w-full"}>
      <MultiPointGradient
        colorA="#ffc8e0"
        positionA={{ x: 0.15, y: 0.2 }}
        colorB="#c7b4ff"
        positionB={{ x: 0.85, y: 0.22 }}
        colorC="#b4e8ff"
        positionC={{ x: 0.2, y: 0.8 }}
        colorD="#b4f0d9"
        positionD={{ x: 0.82, y: 0.84 }}
        colorE="#ffd7b4"
        positionE={{ x: 0.5, y: 0.5 }}
        smoothness={2.8}
      />
      <Dither
        pattern="blueNoise"
        pixelSize={2}
        threshold={0.52}
        spread={1}
        colorMode="custom"
        colorA="transparent"
        colorB="rgba(255,255,255,0.05)"
      />
    </Shader>
  );
}

export default ChatPanelBackdrop;
