"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroCanvas = dynamic(
  () => import("@/components/hero/HeroCanvas").then((m) => m.HeroCanvas),
  { ssr: false }
);

/**
 * Kickoff page background. Attempts to load the shader backdrop;
 * falls back to a CSS gradient if WebGPU/shaders fail to initialize.
 */
export function KickoffBackdrop() {
  const [useShader, setUseShader] = useState(false);

  useEffect(() => {
    try {
      const isLowEnd =
        (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } })
          .connection?.saveData === true ||
        ["2g", "slow-2g"].includes(
          (navigator as unknown as { connection?: { effectiveType?: string } }).connection
            ?.effectiveType ?? ""
        ) ||
        (navigator.hardwareConcurrency ?? 8) < 4 ||
        ((navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 8) < 4;

      if (!isLowEnd) {
        setUseShader(true);
      }
    } catch {
      // Fallback to CSS
    }
  }, []);

  if (!useShader) {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.65]"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 65% 45%, color-mix(in srgb, #0a2235 90%, transparent), transparent 70%), radial-gradient(ellipse 50% 40% at 80% 55%, color-mix(in srgb, #0f3a50 55%, transparent), transparent 65%), #050814",
        }}
      />
    );
  }

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 opacity-[0.65]">
      <HeroCanvas />
    </div>
  );
}
