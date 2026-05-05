"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { HeadlineSplit } from "@/components/hero/HeadlineSplit";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ShipButton } from "@/components/ui/ShipButton";
import { openIntake } from "./intakeBus";

const Synthesis2 = dynamic(
  () => import("@/components/shaders/presets/Synthesis2").then((m) => m.Synthesis2),
  { ssr: false }
);

/**
 * BFY hero — echoes the homepage's parallax-blur-out hero treatment, but
 * swaps the right-column `DigitalActivation6` for the softer, more
 * atmospheric `Synthesis2` aurora (cyan on navy). Masked into a rounded
 * panel so it reads as a framed signature piece, not a wall-filling
 * background.
 */
export function BfyHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.42], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const contentBlur = useTransform(scrollYProgress, [0, 0.6], ["blur(0px)", "blur(4px)"]);

  function scrollToSites(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    document.getElementById("sites")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section
      ref={sectionRef}
      className="section--no-edge-mask relative isolate min-h-[86svh] overflow-hidden pb-0 pt-6 md:min-h-[94svh] md:pt-12"
    >
      {/* Ambient aurora behind everything, softly clipped by the vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[0] opacity-[0.55]"
        style={{
          maskImage:
            "radial-gradient(ellipse 90% 70% at 72% 38%, #000 0%, rgba(0,0,0,0.6) 45%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 70% at 72% 38%, #000 0%, rgba(0,0,0,0.6) 45%, transparent 75%)",
        }}
      >
        <Synthesis2 className="h-full w-full" />
      </div>

      {/* Vignette + scanline to anchor content */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% 110%, color-mix(in srgb, var(--color-bg) 85%, transparent), transparent 55%), linear-gradient(180deg, color-mix(in srgb, var(--color-bg) 55%, transparent) 0%, transparent 30%)",
        }}
      />

      <motion.div
        className="container-x relative z-[3] min-w-0 w-full pb-20 md:pb-28"
        style={{
          opacity: reduce ? 1 : contentOpacity,
          y: reduce ? 0 : contentY,
          filter: reduce ? undefined : contentBlur,
        }}
      >
        <div className="grid min-w-0 grid-cols-1 items-center gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:gap-14">
          <div className="min-w-0 max-w-full">
            <SectionLabel index="00" label="Built for you" />

            <h1
              id="bfy-headline"
              className="mt-4 min-w-0 max-w-[min(100%,18ch)] text-balance font-semibold leading-[0.96] break-words md:mt-5"
            >
              <HeadlineSplit text="Beyond the" />
              <br />
              <HeadlineSplit text="App Store." accentWord="Store." />
            </h1>

            <p className="mt-5 min-w-0 max-w-full break-words text-balance text-[17px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_76%,transparent)] sm:max-w-[52ch] md:mt-6 md:text-[19px]">
              Sites. Chatbots. Polish. The stuff you need when shipping an app isn&apos;t
              enough — built at the same bar as{" "}
              <strong className="font-semibold text-[color-mix(in_srgb,var(--color-fg)_90%,transparent)]">
                publishd.app
              </strong>
              , shipped by one senior engineer.
            </p>

            <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center md:mt-8">
              <ShipButton href="#start" size="large" className="!justify-center" onClick={(e) => { e.preventDefault(); openIntake({ scope: "general" }); }}>
                Start a project
                <ArrowRight className="icon h-[16px] w-[16px]" aria-hidden />
              </ShipButton>
              <a
                href="#sites"
                onClick={scrollToSites}
                className="btn btn--glass !w-auto inline-flex min-h-[44px] min-w-0 max-w-full shrink px-4 py-2 text-[13px] sm:px-6 sm:py-3 sm:text-[14.5px]"
              >
                <span className="truncate">See services</span>
                <ArrowDown className="icon h-4 w-4 shrink-0 opacity-80" aria-hidden />
              </a>
            </div>

            {/* Compact price strip — reads like a ticker */}
            <dl className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[12px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
              {[
                ["Sites", "from $499"],
                ["Chatbots", "from $399"],
                ["Polish", "$199"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center gap-2 font-mono">
                  <span
                    aria-hidden
                    className="h-[5px] w-[5px] rounded-full"
                    style={{ background: "var(--color-accent)", boxShadow: "0 0 8px var(--color-accent)" }}
                  />
                  <dt className="text-[color-mix(in_srgb,var(--color-fg)_68%,transparent)]">{k}</dt>
                  <dd className="num text-[color-mix(in_srgb,var(--color-fg)_92%,transparent)]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right column: framed shader panel with kinetic typography stretched across */}
          <div className="relative mx-auto h-full w-full max-w-[520px]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-[color-mix(in_srgb,var(--color-accent)_22%,var(--color-border))] bg-[color-mix(in_srgb,var(--color-bg)_75%,transparent)] shadow-[0_40px_120px_-30px_rgba(0,212,255,0.25),0_20px_60px_-20px_rgba(0,0,0,0.6)]">
              <div className="absolute inset-0">
                <Synthesis2 className="h-full w-full" />
              </div>

              {/* Readability wash — keeps the kinetic headline legible over the aurora's brightest crests */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(5,7,13,0.62) 0%, rgba(5,7,13,0.22) 38%, transparent 70%), linear-gradient(180deg, transparent 55%, rgba(5,7,13,0.55) 100%)",
                }}
              />

              {/* Kinetic headline — stacked, gradient-washed, reads like a stencil on the aurora */}
              <div className="pointer-events-none absolute inset-0 z-[2] flex flex-col justify-between p-5 md:p-7">
                <div className="flex items-start justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase leading-none tracking-[0.28em]" style={{ color: "color-mix(in srgb, var(--color-accent) 88%, white)" }}>
                    [ example ]
                  </span>
                  <span className="font-mono text-[10px] uppercase leading-none tracking-[0.28em] text-[color-mix(in_srgb,#ffffff_70%,transparent)]">
                    publishd.app
                  </span>
                </div>

                <h2 className="max-w-[10ch] text-[44px] font-semibold leading-[0.9] tracking-[-0.03em] sm:text-[56px] md:text-[66px]">
                  <span
                    className="block bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, #ffffff 0%, color-mix(in srgb, var(--color-accent) 85%, white) 55%, color-mix(in srgb, var(--color-accent) 55%, white) 100%)",
                    }}
                  >
                    Build
                  </span>
                  <span className="block text-[color-mix(in_srgb,#ffffff_92%,transparent)]">anything</span>
                  <span className="block text-[color-mix(in_srgb,#ffffff_92%,transparent)]">you want.</span>
                </h2>

                <div className="flex items-end justify-between gap-3">
                  <p className="max-w-[22ch] font-mono text-[11px] uppercase leading-snug tracking-[0.22em]" style={{ color: "color-mix(in srgb, var(--color-accent) 92%, white)" }}>
                    you dream it · I ship it
                  </p>
                  <span
                    aria-hidden
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{
                      background: "var(--color-accent)",
                      boxShadow: "0 0 14px var(--color-accent)",
                      animation: "status-dot-pulse 3s ease-in-out infinite",
                    }}
                  />
                </div>
              </div>

              {/* Inner specular edge */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 z-[3] rounded-[inherit] ring-1 ring-inset ring-white/10"
              />
              {/* Bracket corners */}
              <span aria-hidden className="ship-btn-brackets pointer-events-none absolute inset-3 z-[3]" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Dissolve bottom — same fade as homepage hero */}
      <div className="hero-fade" aria-hidden />
    </section>
  );
}

export default BfyHero;
