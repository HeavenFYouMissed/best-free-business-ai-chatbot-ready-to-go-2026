"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView } from "framer-motion";

type Mode = "dark" | "peak" | "editorial";

type Props = {
  id?: string;
  mode: Mode;
  children: ReactNode;
  /**
   * Shader slot — only mounts while the section is near the viewport,
   * unmounts as you scroll past. Pass a function so the shader isn't
   * constructed server-side.
   */
  shader?: () => ReactNode;
  /** Additional classes for the <section>. */
  className?: string;
  /** Shader container opacity at rest (0–1). */
  shaderOpacity?: number;
  /** Mounting margin for useInView (distance past viewport edge that counts). */
  mountMargin?: `${number}px 0px ${number}px 0px` | `${number}% 0px ${number}% 0px` | `${number}px` | `${number}%`;
  /** Whether to skip the brightness-lift transition (for sections that handle their own copy styling). */
  skipLightLift?: boolean;
};

const BG_BY_MODE: Record<Mode, string> = {
  dark: "#05070d",
  peak: "#06141f",
  editorial: "#0d0c10",
};

/**
 * Section rhythm wrapper. Tags each section with its mode, mounts a shader
 * slot only while near viewport, and applies a brightness/saturation lift on
 * enter so dark valleys "snap into color" as the user scrolls in.
 */
export function SectionShell({
  id,
  mode,
  children,
  shader,
  className,
  shaderOpacity,
  mountMargin = "35% 0px 20% 0px" as const,
  skipLightLift = false,
}: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  /* Full-view trigger (for brightness lift) */
  const revealInView = useInView(sectionRef, { once: true, margin: "0px 0px -25% 0px" });
  /* Near-view trigger (for shader mount/unmount) */
  const nearInView = useInView(sectionRef, { margin: mountMargin });

  const [shaderNode, setShaderNode] = useState<ReactNode | null>(null);
  /* Modern phones handle a single near-viewport shader just fine. Only skip
     when the user has requested reduced motion — that's the only signal
     that should suppress premium visuals. The near-viewport mount/unmount
     logic above is the real perf guard. */
  const [shadersAllowed, setShadersAllowed] = useState(true);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShadersAllowed(!mq.matches);
    const handler = () => setShadersAllowed(!mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!shader || !shadersAllowed) {
      setShaderNode(null);
      return;
    }
    if (nearInView) {
      setShaderNode(shader());
    } else {
      setShaderNode(null);
    }
  }, [nearInView, shader, shadersAllowed]);

  const restOpacity =
    shaderOpacity ?? (mode === "peak" ? 0.72 : mode === "editorial" ? 0.3 : 0.12);

  return (
    <section
      ref={sectionRef}
      id={id}
      data-section-mode={mode}
      data-section-lit={revealInView ? "1" : "0"}
      className={`section-shell relative isolate overflow-hidden ${className ?? ""}`}
      style={{
        // `--lit` animates from 0 → 1 on enter (set via attribute selector below)
        // `--mode-bg` is the canonical background token for this mode
        ...({
          "--mode-bg": BG_BY_MODE[mode],
          "--shader-rest-opacity": String(restOpacity),
        } as React.CSSProperties),
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: "var(--mode-bg)" }}
      />
      {shader && (
        <div
          aria-hidden
          className="section-shell-shader pointer-events-none sticky top-0 -mb-[100vh] h-[100vh] w-full z-[1]"
          style={{ opacity: `var(--shader-rest-opacity)` }}
        >
          {shaderNode}
        </div>
      )}
      <div
        className={`section-shell-content relative z-[2] ${skipLightLift ? "no-lift" : ""}`}
      >
        {children}
      </div>
    </section>
  );
}

export default SectionShell;
