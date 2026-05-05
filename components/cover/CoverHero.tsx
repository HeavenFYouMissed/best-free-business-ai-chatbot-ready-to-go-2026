"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.82, delay: 0.38 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const HERO_BLOCK = {
  hidden: { opacity: 0, y: 72 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.05, delay: 0.16, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function CoverHero() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    setMounted(true);
    const v = videoRef.current;
    if (v) v.playbackRate = 0.85;
  }, []);

  return (
    <section
      className="cover-hero relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden bg-[var(--color-bg)]"
      aria-label="Publishd"
    >
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover opacity-90 motion-reduce:hidden"
          aria-hidden="true"
        >
          <source src="/cover/hero.mp4" type="video/mp4" />
        </video>

        <div
          aria-hidden
          className="absolute inset-0 hidden motion-reduce:block"
          style={{
            background:
              "linear-gradient(135deg, #04060c 0%, #0a1322 45%, #061a22 70%, #04060c 100%)",
          }}
        />

        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: [
              "radial-gradient(48% 58% at 16% 34%, rgba(212,165,116,0.42) 0%, rgba(212,165,116,0.16) 28%, transparent 68%)",
              "radial-gradient(44% 54% at 80% 22%, rgba(255,107,61,0.24) 0%, rgba(255,107,61,0.10) 24%, transparent 70%)",
              "radial-gradient(36% 42% at 62% 76%, rgba(118,72,54,0.18) 0%, transparent 72%)",
              "linear-gradient(180deg, rgba(18,13,10,0.15) 0%, rgba(18,13,10,0.1) 35%, rgba(5,7,13,0.4) 100%)",
            ].join(", "),
            mixBlendMode: "screen",
            opacity: 0.9,
          }}
        />

        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(12,8,6,0.48) 0%, rgba(12,8,6,0.12) 34%, rgba(29,18,12,0.18) 62%, rgba(5,7,13,0.52) 100%)",
            mixBlendMode: "multiply",
          }}
        />

        {/* Vignette — soft edges only, lets the video breathe in the center */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(85% 75% at 50% 45%, transparent 0%, transparent 55%, color-mix(in srgb, var(--color-bg) 40%, transparent) 75%, color-mix(in srgb, var(--color-bg) 80%, transparent) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[40%]"
          style={{
            background:
              "linear-gradient(to top, var(--color-bg) 0%, color-mix(in srgb, var(--color-bg) 50%, transparent) 40%, transparent 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[18%]"
          style={{
            background:
              "linear-gradient(to bottom, color-mix(in srgb, var(--color-bg) 50%, transparent) 0%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative z-[1] flex flex-1 flex-col px-5 pt-24 pb-12 md:justify-end md:px-10 md:pb-[11vh] md:pt-28 lg:px-16 lg:pb-[12vh]">
        <motion.div
          initial={reduce ? false : "hidden"}
          animate={mounted ? "visible" : "hidden"}
          variants={HERO_BLOCK}
          className="max-w-[680px]"
        >
          <motion.span
            initial={reduce ? false : "hidden"}
            animate={mounted ? "visible" : "hidden"}
            variants={FADE_UP}
            custom={0}
            className="block font-mono text-[10.5px] uppercase tracking-[0.28em] text-[color-mix(in_srgb,var(--color-fg)_70%,transparent)]"
          >
            Solo engineer / Connecticut
          </motion.span>

          <motion.h1
            initial={reduce ? false : "hidden"}
            animate={mounted ? "visible" : "hidden"}
            variants={FADE_UP}
            custom={1}
            className="mt-5 text-[clamp(2.6rem,11.5vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-[var(--color-fg)]"
            style={{ textShadow: "0 2px 32px rgba(0,0,0,0.55)" }}
          >
            You need it.
            <br />
            We ship it
            <span style={{ color: "var(--color-accent)" }}>.</span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : "hidden"}
            animate={mounted ? "visible" : "hidden"}
            variants={FADE_UP}
            custom={2}
            className="mt-6 max-w-[46ch] text-[15px] leading-[1.7] text-[color-mix(in_srgb,var(--color-fg)_88%,transparent)] md:text-[17px]"
          >
            100+ websites built solo. Apps to both stores. AI assistants for your business.
            One senior engineer, flat fees, no subscriptions. You own everything.
          </motion.p>

          <motion.div
            initial={reduce ? false : "hidden"}
            animate={mounted ? "visible" : "hidden"}
            variants={FADE_UP}
            custom={3}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3.5"
          >
            <Link
              href="/kickoff"
              className="inline-flex w-full items-center justify-center rounded-md bg-[var(--color-accent)] px-6 py-3.5 text-[14px] font-semibold tracking-[-0.005em] text-[#001018] transition-all duration-200 hover:brightness-110 active:scale-[0.98] sm:w-auto"
            >
              Start a project
            </Link>
            <Link
              href="/pricing"
              className="inline-flex w-full items-center justify-center rounded-md border border-[color-mix(in_srgb,var(--color-fg)_22%,transparent)] bg-[color-mix(in_srgb,var(--color-bg)_55%,transparent)] px-6 py-3.5 text-[14px] font-medium text-[var(--color-fg)] backdrop-blur-md transition-all duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] active:scale-[0.98] sm:w-auto"
            >
              See pricing
            </Link>
          </motion.div>

          <motion.div
            initial={reduce ? false : "hidden"}
            animate={mounted ? "visible" : "hidden"}
            variants={FADE_UP}
            custom={4}
            className="mt-8 grid gap-3 sm:grid-cols-2 xl:max-w-[760px] xl:grid-cols-4"
          >
            {[
              ["Websites built", "100+ solo-shipped"],
              ["Apps shipped", "50+ to stores"],
              ["Reply target", "< 6 business hours"],
              ["Ownership", "100% yours"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-md border border-[color-mix(in_srgb,var(--color-fg)_16%,transparent)] bg-[color-mix(in_srgb,var(--color-bg)_58%,transparent)] px-4 py-3 backdrop-blur-md"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--color-fg)_55%,transparent)]">
                  {label}
                </div>
                <div className="mt-1.5 text-[14px] font-medium text-[var(--color-fg)]">{value}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={mounted ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 1.55 }}
            className="mt-10 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[color-mix(in_srgb,var(--color-fg)_55%,transparent)] md:mt-16"
          >
            <span aria-hidden className="h-px w-10 bg-[color-mix(in_srgb,var(--color-fg)_30%,transparent)]" />
            Reply within 6 business hours
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
