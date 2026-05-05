"use client";

import { useEffect, type ReactNode } from "react";
import { useLenis } from "@/components/ui/LenisProvider";

/**
 * Drives Lenis's internal RAF loop with plain requestAnimationFrame.
 *
 * Historically this was a GSAP provider that piped Lenis scroll frames into
 * GSAP's ticker for ScrollTrigger. Nothing in the app actually consumed
 * ScrollTrigger, so we dropped GSAP (~70KB gzipped) and run Lenis ourselves.
 *
 * Export name kept as `GsapProvider` only for compatibility with any old
 * imports — the real name is `LenisDriver`.
 */
export function LenisDriver({ children }: { children: ReactNode }) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [lenis]);

  return <>{children}</>;
}

export { LenisDriver as GsapProvider };
