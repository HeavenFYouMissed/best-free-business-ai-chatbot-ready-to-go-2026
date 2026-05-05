"use client";

import { motion } from "framer-motion";
import { DigitalCubeShader } from "@/components/ui/DigitalCubeShader";

type Props = {
  open: boolean;
  hovered: boolean;
};

/**
 * 3×5 dot-matrix glyph. Default state = three horizontal rows lit (rows 1, 3, 5).
 * Open state = diagonal X pattern (5 dots). Uses framer-motion per-cell opacity
 * so the morph reads as a coordinated animation, not 15 independent fades.
 *
 * The shader background underneath only lights up on hover or when open, so the
 * nav stays quiet at rest.
 */
const IDLE = [
  [1, 1, 1],
  [0, 0, 0],
  [1, 1, 1],
  [0, 0, 0],
  [1, 1, 1],
];

const OPEN = [
  [1, 0, 1],
  [0, 1, 0],
  [0, 1, 0],
  [0, 1, 0],
  [1, 0, 1],
];

export function MenuGlyph({ open, hovered }: Props) {
  const grid = open ? OPEN : IDLE;
  const shaderOpacity = open ? 0.9 : hovered ? 0.6 : 0;

  return (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{ opacity: shaderOpacity }}
      >
        <DigitalCubeShader speed={open ? 1.2 : 0.6} />
      </span>

      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-[color-mix(in_srgb,var(--color-accent)_28%,transparent)] transition-[box-shadow,border-color] duration-300"
        style={{
          boxShadow: hovered || open ? "inset 0 0 12px rgba(0,212,255,0.25)" : "none",
        }}
      />

      <span
        className="relative z-[1] grid gap-[2px]"
        style={{ gridTemplateRows: "repeat(5, 2px)", gridTemplateColumns: "repeat(3, 2px)" }}
      >
        {grid.flatMap((row, rIdx) =>
          row.map((cell, cIdx) => {
            const isLit = cell === 1;
            const key = `${rIdx}-${cIdx}`;
            const baseDelay = open ? rIdx * 0.04 + cIdx * 0.02 : 0;
            return (
              <motion.span
                key={key}
                initial={false}
                animate={{
                  opacity: isLit ? 1 : 0.12,
                  scale: isLit ? 1 : 0.65,
                }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1], delay: baseDelay }}
                className="block h-[2px] w-[2px] rounded-[0.5px] bg-[color-mix(in_srgb,#e6faff_95%,transparent)]"
                style={{
                  boxShadow: isLit
                    ? "0 0 4px rgba(0,212,255,0.85)"
                    : "none",
                  gridRow: rIdx + 1,
                  gridColumn: cIdx + 1,
                }}
              />
            );
          })
        )}
      </span>
    </>
  );
}

export default MenuGlyph;
