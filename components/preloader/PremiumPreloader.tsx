"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { markPublishdBootstrapReady } from "@/lib/bootstrap";

const DigitalActivation10 = dynamic(
  () =>
    import("@/components/shaders/presets/DigitalActivation10").then(
      (m) => m.DigitalActivation10
    ),
  { ssr: false }
);

const BOOT_LINES = [
  "init publishd.app",
  "auth · pro session · ok",
  "mount shaders · 28",
  "compile rhythm",
  "ready",
] as const;

/**
 * Premium boot sequence. Full-viewport dark stage with a Digital Activation 10
 * orb centered, a typewriter boot log on the left, a percentage counter on
 * the right, and an iris-open exit that expands the orb to fill the screen
 * as the rest fades.
 *
 * Session-gated via `publishd-splash-once`. Reduced-motion users skip the
 * typewriter and see only the final "ready" frame for 180ms before fade.
 */
export function PremiumPreloader() {
  const [progress, setProgress] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const [typedCols, setTypedCols] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);
  const [reduce, setReduce] = useState(false);

  /* Mount / gate check */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);

    if (mq.matches) {
      setProgress(100);
      setLineIdx(BOOT_LINES.length);
      const t = setTimeout(() => {
        setExiting(true);
        markPublishdBootstrapReady();
        setTimeout(() => setDone(true), 260);
      }, 180);
      return () => clearTimeout(t);
    }

    try {
      if (sessionStorage.getItem("publishd-splash-once") === "1") {
        setDone(true);
        markPublishdBootstrapReady();
        return;
      }
    } catch {
      /* private mode / blocked storage */
    }
  }, []);

  /* Progress meter */
  useEffect(() => {
    if (reduce || done) return;
    const start = performance.now();
    const duration = 1500;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      setProgress(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        try {
          sessionStorage.setItem("publishd-splash-once", "1");
        } catch {
          /* ignore */
        }
        /* Trigger iris-open */
        setTimeout(() => {
          setExiting(true);
          markPublishdBootstrapReady();
          setTimeout(() => setDone(true), 620);
        }, 180);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce, done]);

  /* Typewriter boot lines — each line types character-by-character, then a
     small pause, then next line. Cycles sync with the progress bar roughly. */
  useEffect(() => {
    if (reduce || done || exiting) return;
    if (lineIdx >= BOOT_LINES.length) return;
    const line = BOOT_LINES[lineIdx];
    if (typedCols < line.length) {
      const id = setTimeout(
        () => setTypedCols((c) => c + 1),
        28 + Math.random() * 32
      );
      return () => clearTimeout(id);
    }
    /* Line complete → pause then advance */
    const id = setTimeout(() => {
      setLineIdx((i) => i + 1);
      setTypedCols(0);
    }, 140);
    return () => clearTimeout(id);
  }, [lineIdx, typedCols, reduce, done, exiting]);

  /* Lock scroll while showing */
  useEffect(() => {
    if (done) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="preloader fixed inset-0 z-[200] overflow-hidden"
          style={{ background: "#05070d" }}
          aria-hidden
        >
          {/* Orb — scale aggressively on iris-open so it feels like the shader
              becomes the whole screen before fading away */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: exiting ? 14 : [1, 1.04, 1],
              opacity: exiting ? 0 : 1,
              rotate: exiting ? 12 : 0,
            }}
            transition={{
              scale: exiting
                ? { duration: 0.62, ease: [0.32, 0, 0.28, 1] }
                : { duration: 5, ease: "easeInOut", repeat: Infinity },
              opacity: { duration: exiting ? 0.5 : 0.3 },
              rotate: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
            }}
          >
            <DigitalActivation10 className="h-full w-full" />
          </motion.div>

          {/* Ambient radial glow behind the orb */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60"
            style={{
              background:
                "radial-gradient(closest-side, color-mix(in srgb, #00d4ff 42%, transparent), transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          {/* Centered brand lockup, underneath the orb */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[220px] text-center"
            aria-hidden
          >
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: exiting ? 0 : 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative inline-flex items-baseline gap-1 text-[22px] font-semibold tracking-[-0.02em]"
            >
              <span className="logo-glow" aria-hidden />
              <span className="logo-steel relative">PUBLISHD</span>
              <span
                aria-hidden
                className="ml-[2px] inline-block h-[7px] w-[7px] translate-y-[-2px] rounded-full bg-[var(--color-accent)] shadow-[0_0_14px_var(--color-accent)]"
              />
            </motion.div>
          </div>

          {/* Left rail — typewriter boot log */}
          <div
            className="pointer-events-none absolute left-6 top-6 font-mono text-[11.5px] uppercase tracking-[0.22em] sm:left-10 sm:top-10"
            style={{ color: "color-mix(in srgb, var(--color-accent) 88%, white)" }}
          >
            <div
              className="mb-3 text-[10.5px]"
              style={{ color: "color-mix(in srgb, var(--color-accent) 60%, transparent)" }}
            >
              [ boot sequence ]
            </div>
            <div className="space-y-1 text-left">
              {BOOT_LINES.map((line, i) => {
                const isPast = i < lineIdx;
                const isCurrent = i === lineIdx;
                const visibleLength = isPast
                  ? line.length
                  : isCurrent
                    ? typedCols
                    : 0;
                const text = line.slice(0, visibleLength);
                return (
                  <div
                    key={i}
                    className="block whitespace-nowrap"
                    style={{
                      opacity: isPast ? 0.62 : isCurrent ? 1 : 0.25,
                      transition: "opacity 220ms ease-out",
                    }}
                  >
                    <span
                      className="mr-2"
                      style={{ color: "color-mix(in srgb, var(--color-accent) 70%, transparent)" }}
                    >
                      &gt;
                    </span>
                    <span>{text}</span>
                    {isCurrent && (
                      <span className="chat-caret ml-0.5 inline-block align-[-2px]">_</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right rail — percentage */}
          <div
            className="pointer-events-none absolute right-6 top-6 text-right sm:right-10 sm:top-10"
            style={{ color: "color-mix(in srgb, var(--color-accent) 92%, white)" }}
          >
            <div
              className="text-[10.5px] uppercase tracking-[0.22em]"
              style={{ color: "color-mix(in srgb, var(--color-accent) 60%, transparent)" }}
            >
              [ mount ]
            </div>
            <div className="num mt-2 text-[36px] font-semibold tracking-[-0.02em] tabular-nums sm:text-[44px]">
              {String(progress).padStart(3, "0")}
              <span className="ml-1 text-[14px] font-normal opacity-70">%</span>
            </div>
          </div>

          {/* Bottom progress bar */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-6 bottom-6 sm:inset-x-10 sm:bottom-10"
          >
            <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-[color-mix(in_srgb,#0a1828_70%,transparent)]">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[linear-gradient(90deg,#7cf0d4_0%,var(--color-accent)_55%,#ff6b3d_100%)]"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-y-0 left-0 h-full w-10 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)]"
                animate={{ x: ["-40px", "100%"] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-[color-mix(in_srgb,var(--color-fg)_48%,transparent)]">
              <span>{lineIdx >= BOOT_LINES.length ? "ready" : "compiling"}</span>
              <span>publishd.app</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
