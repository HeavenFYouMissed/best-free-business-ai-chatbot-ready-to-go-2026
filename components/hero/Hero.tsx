"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { HeroCanvas } from "./HeroCanvas";
import { HeadlineSplit } from "./HeadlineSplit";
import { ToolLogos } from "./ToolLogos";
import { ProductShowcase } from "./ProductShowcase";
import { ShipButton } from "@/components/ui/ShipButton";

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.42], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const contentBlur = useTransform(scrollYProgress, [0, 0.6], ["blur(0px)", "blur(4px)"]);

  return (
    <section
      ref={sectionRef}
      className="section--no-edge-mask relative isolate min-h-[90svh] overflow-hidden pb-0 pt-6 md:min-h-[100svh] md:pt-14"
    >
      {/* Layer 0: shaders.com Smoke — always on after mount (see HeroCanvas). */}
      <HeroCanvas boundsRef={sectionRef} />

      {/* Layer 2: DOM content (on top of everything) */}
      <motion.div
        className="container-x relative z-[3] min-w-0 w-full pb-20 md:pb-32"
        style={{
          opacity: reduce ? 1 : contentOpacity,
          y: reduce ? 0 : contentY,
          filter: reduce ? undefined : contentBlur,
        }}
      >
        <div className="grid min-w-0 grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-12">
          <div className="min-w-0 max-w-full">
            <div className="mono-label mb-4 md:mb-5">[ 00 / publishd ]</div>

            <h1
              id="site-headline"
              className="min-w-0 max-w-[min(100%,18ch)] text-balance font-semibold leading-[0.96] break-words"
            >
              <span className="sr-only">Publishd — </span>
              <HeadlineSplit text="You need it." />
              <br />
              <HeadlineSplit text="We ship it." accentWord="ship" />
            </h1>

            <p className="mt-5 min-w-0 max-w-full break-words text-balance text-[17px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_72%,transparent)] sm:max-w-[52ch] md:mt-6 md:text-[19px]">
              Apps to the stores. Sites that convert. Chatbots that help.{" "}
              <strong className="font-semibold text-[color-mix(in_srgb,var(--color-fg)_88%,transparent)]">
                Publishd
              </strong>{" "}
              ships it — from a live URL, repo, or raw files to the{" "}
              <strong className="font-semibold text-[color-mix(in_srgb,var(--color-fg)_88%,transparent)]">
                App Store, Google Play
              </strong>
              , or your own domain. One flat fee. You own everything.{" "}
              <Link href="/kickoff" className="underline decoration-white/25 underline-offset-[5px] hover:decoration-[var(--color-accent)]">
                Kickoff intake
              </Link>
              {" · "}
              <Link
                href="/ship-web-app-to-app-store"
                className="underline decoration-white/25 underline-offset-[5px] hover:decoration-[var(--color-accent)]"
              >
                Web app → both stores
              </Link>
              .
            </p>

            <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center md:mt-8">
              <ShipButton href="#pricing" size="large" className="!justify-center">
                Ship my app <span className="num">— $399</span>
                <ArrowRight className="icon h-[16px] w-[16px]" aria-hidden />
              </ShipButton>
              <Link
                href="#studio-work"
                className="btn btn--glass !w-auto inline-flex min-h-[44px] min-w-0 max-w-full shrink px-4 py-2 text-[13px] sm:px-6 sm:py-3 sm:text-[14.5px]"
              >
                <span className="truncate">See what I&apos;ve shipped</span>
                <ArrowDown className="icon h-4 w-4 shrink-0 opacity-80" aria-hidden />
              </Link>
              <Link
                href="/built-for-you"
                className="btn btn--glass !w-auto inline-flex min-h-[44px] min-w-0 max-w-full shrink px-4 py-2 text-[13px] sm:px-6 sm:py-3 sm:text-[14.5px]"
              >
                <span className="truncate">Get something built</span>
                <ArrowRight className="icon h-4 w-4 shrink-0 opacity-80" aria-hidden />
              </Link>
            </div>

            <ToolLogos />
          </div>

          <ProductShowcase />
        </div>
      </motion.div>

      {/* Scroll hint */}
      <div
        className="pointer-events-none absolute bottom-6 left-1/2 z-[3] hidden -translate-x-1/2 flex-col items-center gap-2 md:bottom-10 md:flex"
        aria-hidden
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-subtle)]">
          scroll
        </span>
        <span className="hero-scroll-hint h-10 w-px overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--color-accent)_45%,transparent)]" />
      </div>

      {/* Dissolve bottom */}
      <div className="hero-fade" aria-hidden />
    </section>
  );
}
