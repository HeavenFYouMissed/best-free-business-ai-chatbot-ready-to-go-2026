"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Chapter-marker brand moment. A 3D render of the PUBLISHD wordmark is
 * presented full-viewport on mobile (the portrait image fits naturally),
 * and as a letterboxed cinematic band on desktop. The image is blended
 * through a cyan→ink gradient so it reads as atmosphere, not a decal.
 *
 * Parallax: the render drifts a small y-translate against scroll so it
 * feels like a physical diorama you're walking past.
 */
export function BrandBanner() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1.12]);

  return (
    <section
      ref={ref}
      aria-label="Publishd — brand moment"
      data-section-mode="editorial"
      className="brand-banner relative isolate w-full overflow-hidden"
      style={{
        background: "#05070d",
        /* Portrait on mobile (let the image breathe), cinemascope on desktop */
        height: "clamp(420px, 78svh, 780px)",
      }}
    >
      {/* Image layer — full bleed, parallaxed */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{ y, scale }}
      >
        <Image
          src="/brand/publishd-wordmark.png"
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-center opacity-90"
        />
      </motion.div>

      {/* Cyan→ink overlay — blends the image into the site palette, keeps
          text legible, and strengthens the mood on desktop where the image
          is letterboxed. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(80% 70% at 50% 55%, transparent 0%, color-mix(in srgb, #05070d 30%, transparent) 45%, color-mix(in srgb, #05070d 82%, transparent) 75%, #05070d 100%)",
          mixBlendMode: "multiply",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(0deg, color-mix(in srgb, var(--color-accent) 9%, transparent), transparent 35%, transparent 65%, color-mix(in srgb, var(--color-accent) 6%, transparent))",
          mixBlendMode: "screen",
        }}
      />

      {/* Scanline pass — subtle, pulls it into the rest of the digital rhythm */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0 2px, rgba(0,212,255,0.7) 2px 3px)",
        }}
      />

      {/* Content — top monogram label, bottom dateline */}
      <div className="relative z-[3] flex h-full flex-col justify-between px-6 py-10 md:px-12 md:py-14">
        <div className="flex items-start justify-between gap-4">
          <div className="mono-label opacity-80">[ brand ]</div>
          <div className="font-mono text-[10.5px] uppercase tracking-[0.32em] text-[var(--color-subtle)]">
            ◆&nbsp;&nbsp;publishd.app&nbsp;&nbsp;·&nbsp;&nbsp;<span className="num">est. 2026</span>
          </div>
        </div>

        <div className="flex items-end justify-between gap-6">
          <p className="max-w-[24ch] font-mono text-[12.5px] uppercase tracking-[0.24em] text-[color-mix(in_srgb,var(--color-fg)_78%,transparent)]">
            Built for one purpose —
            <br />
            <span style={{ color: "var(--color-accent)" }}>getting your app into the stores.</span>
          </p>
          <div className="hidden items-center gap-3 md:flex">
            <span
              className="h-[7px] w-[7px] rounded-full"
              style={{
                background: "var(--color-accent)",
                boxShadow: "0 0 10px var(--color-accent)",
                animation: "status-dot-pulse 3s ease-in-out infinite",
              }}
            />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-[var(--color-muted)]">
              shipping · live
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BrandBanner;
