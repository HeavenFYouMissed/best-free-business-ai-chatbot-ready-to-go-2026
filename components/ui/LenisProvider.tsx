"use client";

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    // Disable browser's own scroll restoration so Next/Lenis can own it cleanly.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const l = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });
    setLenis(l);

    let rafId = 0;
    const raf = (time: number) => {
      l.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      l.destroy();
      setLenis(null);
    };
  }, []);

  // Snap to top on pathname change. Layout effect fires sync before paint,
  // plus a safety-belt queued call to beat Next's async scroll restoration.
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) return;

    const snap = () => {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true, force: true });
      }
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    snap();
    const t = setTimeout(snap, 0);
    return () => clearTimeout(t);
  }, [pathname, lenis]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
