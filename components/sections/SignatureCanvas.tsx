"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import {
  Shader,
  LensFlare,
} from "shaders/react";

const DigitalActivation10 = dynamic(
  () =>
    import("@/components/shaders/presets/DigitalActivation10").then(
      (m) => m.DigitalActivation10
    ),
  { ssr: false }
);

/**
 * SignatureCanvas — a standalone "art piece" section between StudioWork and Pricing.
 *
 * Hosts Digital Activation 10 as the centerpiece. Content dissolves to black
 * around the orb via a CSS radial mask on the copy layer (the shader library's
 * in-shader masks operate on shader layers; our DOM text uses a matching CSS
 * mask to achieve the same "fades toward the orb" effect).
 *
 * Scroll through the section rotates the hex prism slowly. Hover anywhere
 * bumps the orb's apparent scale via CSS transform on the shader container.
 *
 * The LensFlare Shader sits on top of the orb as an overlay, providing the
 * bright-bloom hotspot at orb center.
 */
export function SignatureCanvas() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = () => setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const rotationRaw = useTransform(scrollYProgress, [0, 1], [-10, 35]);
  const rotation = useSpring(rotationRaw, { stiffness: 80, damping: 22 });
  const [rot, setRot] = useState(0);
  useEffect(() => {
    return rotation.on("change", setRot);
  }, [rotation]);

  const scale = useMotionValue(1);
  const sScale = useSpring(scale, { stiffness: 140, damping: 18 });

  useEffect(() => {
    scale.set(hovered ? 1.06 : 1);
  }, [hovered, scale]);

  return (
    <section
      ref={sectionRef}
      data-section-mode="editorial"
      className="signature-canvas relative isolate overflow-hidden"
      style={{
        background: "#0a0a0e",
        minHeight: "100vh",
      }}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Background orb — Digital Activation 10, scroll-coupled rotation */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{ scale: sScale }}
      >
        {mounted && <DigitalActivation10 rotation={rot} className="h-full w-full" />}
      </motion.div>

      {/* Bright bloom hotspot at orb center — LensFlare on top.
          Mobile skips this entirely; a CSS radial hotspot takes its place. */}
      {mounted && !isMobile && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] opacity-90 mix-blend-screen"
        >
          <Shader className="h-full w-full">
            <LensFlare
              lightPosition={{ x: 0.5, y: 0.5 }}
              intensity={0.55}
              ghostIntensity={0.18}
              ghostSpread={0.9}
              ghostChroma={0.4}
              haloIntensity={0.25}
              haloRadius={0.48}
              haloChroma={0.55}
              haloSoftness={0.9}
              starburstIntensity={0.18}
              starburstPoints={6}
              streakIntensity={0.08}
              streakLength={0.35}
              glareIntensity={0.12}
              glareSize={0.35}
              edgeFade={0.15}
              speed={0.25}
            />
          </Shader>
        </div>
      )}
      {/* Mobile hotspot — plain CSS radial, no shader canvas */}
      {isMobile && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] mix-blend-screen"
          style={{
            background:
              "radial-gradient(12% 14% at 50% 50%, rgba(255,255,255,0.38), transparent 65%)",
          }}
        />
      )}

      {/* Mask vignette — pulls non-orb edges into black */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(55% 70% at 50% 50%, transparent 40%, #0a0a0e 82%)",
        }}
      />

      {/* Content — dissolves toward the orb via CSS radial mask */}
      <div
        className="signature-copy relative z-[3] flex min-h-[100vh] flex-col items-center justify-center px-6 py-24"
        style={{
          WebkitMaskImage:
            "radial-gradient(closest-side at 50% 50%, transparent 0%, transparent 24%, #000 46%, #000 100%)",
          maskImage:
            "radial-gradient(closest-side at 50% 50%, transparent 0%, transparent 24%, #000 46%, #000 100%)",
        }}
      >
        <div className="mono-label mb-[96px] tracking-[0.32em] text-[10.5px]">
          [ yours alone ]
        </div>
        <p className="mb-[96px] max-w-[20ch] text-center font-mono text-[13px] uppercase tracking-[0.22em] text-[color-mix(in_srgb,var(--color-fg)_78%,transparent)]">
          Your accounts.
          <br />
          Your app.
        </p>
        <p className="max-w-[22ch] text-center font-mono text-[13px] uppercase tracking-[0.22em] text-[color-mix(in_srgb,var(--color-fg)_78%,transparent)]">
          Live in both stores.
        </p>
      </div>

      {/* Editorial page marker at bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-6 z-[4] text-center font-mono text-[10.5px] uppercase tracking-[0.32em] text-[var(--color-subtle)]"
      >
        <span style={{ color: "var(--color-accent)" }}>◆</span>
        &nbsp;&nbsp;Section fourteen&nbsp;&nbsp;
        <span style={{ color: "var(--color-accent)" }}>◆</span>
        &nbsp;&nbsp;publishd.app
        &nbsp;&nbsp;—&nbsp;&nbsp;
        <span className="num">2026</span>
      </div>
    </section>
  );
}

export default SignatureCanvas;
