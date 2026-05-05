"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { AuroraText } from "@/components/landing/ui/AuroraText";
import { BrandMarquee } from "@/components/landing/ui/BrandMarquee";

const SPLINE_SCENE = "https://prod.spline.design/mZBrYNcnoESGlTUG/scene.splinecode";
const SPLINE_VIEWER_SRC =
  "https://unpkg.com/@splinetool/viewer@1.10.18/build/spline-viewer.js";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { url?: string },
        HTMLElement
      >;
    }
  }
}

/**
 * LandingClosing — final hero/footer transition section.
 *
 * Spline scene renders the cubes in the lower-center of its canvas, which
 * left a large empty band in the upper half of the container. Since the
 * canvas is a custom WebGL element we can't reach into it, but we CAN
 * transform the host: a fixed-height frame with `translateY(-12%) scale(1.08)`
 * shifts the canvas up so the cubes sit in the optical center.
 *
 * Mobile reorders so the copy lands above the cubes — copy → spec readout →
 * cubes → bottom banner. Reads top-down without dead space.
 */
export function LandingClosing() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [showScene, setShowScene] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setShowScene(true), 400);
    return () => clearTimeout(t);
  }, [inView]);

  // Inject the spline-viewer script tag exactly once, only when needed.
  useEffect(() => {
    if (!showScene) return;
    if (document.querySelector(`script[data-spline-viewer]`)) return;
    const s = document.createElement("script");
    s.type = "module";
    s.src = SPLINE_VIEWER_SRC;
    s.async = true;
    s.dataset.splineViewer = "true";
    document.head.appendChild(s);
  }, [showScene]);

  return (
    <section
      ref={ref}
      id="closing"
      className="relative overflow-hidden border-t border-[var(--color-border)] py-12 md:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_60%_at_50%_50%,color-mix(in_srgb,var(--color-accent)_10%,transparent)_0%,transparent_70%)]"
      />

      {/* Top banner — fills empty mobile space with the brand wordmark. */}
      <BrandMarquee position="top" />

      <div className="relative mx-auto grid w-full max-w-[1280px] items-center gap-8 px-6 md:grid-cols-[0.95fr_1.05fr] md:gap-16 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 flex flex-col items-start gap-6 text-left"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
            [ Built by Daniel Castellani ]
          </span>
          <h2 className="text-balance text-[clamp(2.2rem,5.4vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-[var(--color-fg)]">
            <AuroraText>Code</AuroraText> that compiles. <br />
            <AuroraText>Apps</AuroraText> that ship. <br />
            <AuroraText>Bills</AuroraText> that don&apos;t surprise.
          </h2>
          <p className="max-w-[52ch] text-[15.5px] leading-[1.7] text-[color-mix(in_srgb,var(--color-fg)_75%,transparent)]">
            Connecticut-based senior engineer. Worldwide clients. One contact, one
            flat fee, one ship date — no agencies, no offshore handoffs, no monthly
            retainers.
          </p>
          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
            <Link
              href="/kickoff"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-5 text-[13.5px] font-semibold tracking-tight text-[#001018] transition-all duration-200 hover:translate-y-[-1px] hover:bg-[color-mix(in_srgb,var(--color-accent)_92%,white)] active:scale-[0.98]"
            >
              <span className="font-mono text-[#001018]/80">&gt;_</span>
              Start a project
            </Link>
            <Link
              href="mailto:daniel@publishd.app"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_55%,transparent)] px-5 text-[13.5px] font-semibold tracking-tight text-[var(--color-fg)] backdrop-blur-md transition-all duration-200 hover:border-[color-mix(in_srgb,var(--color-accent)_45%,var(--color-border))] active:scale-[0.98]"
            >
              daniel@publishd.app
            </Link>
          </div>
        </motion.div>

        {/* Cube cell — mobile order-2 (after copy), desktop order-2 (right
            column). Fixed-height frame with overflow-hidden + transformed
            spline-viewer so the cubes sit in optical center, not the
            geometric center of an oversize canvas. */}
        <div className="relative order-2 mx-auto w-full max-w-[420px] md:max-w-none">
          {/* Engineering bracket frame around the cube cell */}
          <CubeFrame />

          <div className="relative h-[400px] overflow-hidden rounded-2xl border border-white/8 bg-[color-mix(in_srgb,var(--color-ink)_55%,transparent)] sm:h-[480px] md:h-[580px]">
            {/* Cyan radial halo behind the cubes */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(50% 60% at 50% 60%, color-mix(in srgb, var(--color-accent) 22%, transparent) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />

            {showScene ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute inset-0"
                style={{
                  // The Spline scene renders the cubes left-of-center in
                  // its internal camera. Balanced nudge so the cluster sits
                  // dead-center on mobile without overshooting.
                  transform: "translate(-18%, -10%) scale(1.1)",
                  transformOrigin: "center center",
                }}
              >
                {/* @ts-expect-error - spline-viewer is a custom element registered at runtime */}
                <spline-viewer
                  url={SPLINE_SCENE}
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "transparent",
                  }}
                />
              </motion.div>
            ) : (
              <CubeFallback />
            )}

            {/* Vignette so cubes feather into the page */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 [background:radial-gradient(70%_70%_at_50%_60%,transparent_60%,var(--color-bg)_100%)]"
            />

            {/* Spec readout overlay — fills the upper portion of the cell
                with engineering-doc detail so the empty pre-cube space
                reads as intentional architecture instead of dead air. */}
            <SpecReadout />
          </div>
        </div>
      </div>

      {/* Bottom banner — large solid wordmark, page sign-off. */}
      <BrandMarquee position="bottom" />
    </section>
  );
}

/** Tiny corner brackets around the cube cell — engineering doc style. */
function CubeFrame() {
  const corner =
    "pointer-events-none absolute h-3 w-3 border-[var(--color-accent)]";
  return (
    <>
      <span aria-hidden className={`${corner} -left-1 -top-1 border-l border-t`} />
      <span aria-hidden className={`${corner} -right-1 -top-1 border-r border-t`} />
      <span aria-hidden className={`${corner} -bottom-1 -left-1 border-b border-l`} />
      <span aria-hidden className={`${corner} -bottom-1 -right-1 border-b border-r`} />
    </>
  );
}

/** Tech-readout label at the top of the cube cell. */
function SpecReadout() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] flex items-center justify-between gap-2 px-3 pt-3 sm:px-4 sm:pt-4">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-[color-mix(in_srgb,var(--color-ink)_70%,transparent)] px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.22em] text-[color-mix(in_srgb,var(--color-fg)_70%,transparent)] backdrop-blur-md">
        <span
          aria-hidden
          className="h-1 w-1 rounded-full bg-[var(--color-accent)]"
          style={{ animation: "status-dot-pulse 2.6s ease-in-out infinite" }}
        />
        rendering · live
      </span>
      <span className="hidden font-mono text-[9.5px] uppercase tracking-[0.22em] text-[color-mix(in_srgb,var(--color-fg)_60%,transparent)] sm:inline">
        scene · publishd-cube-v1
      </span>
    </div>
  );
}

/** Static cube-grid placeholder shown before the Spline scene loads. */
function CubeFallback() {
  return (
    <div aria-hidden className="absolute inset-0 grid grid-cols-3 gap-2 p-6 opacity-30">
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="aspect-square rounded-md border border-white/10 bg-[color-mix(in_srgb,var(--color-accent)_8%,transparent)]"
        />
      ))}
    </div>
  );
}
