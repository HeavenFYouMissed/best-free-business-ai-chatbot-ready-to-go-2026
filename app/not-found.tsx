"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Terminal } from "lucide-react";

const BOOT_LINES = [
  "> ls /pages",
  "> grep -r '404' ./app",
  "> cat /dev/null",
  "> attempting retrieval",
  "> request not found",
];

/**
 * Editorial 404 with a terminal boot-sequence reveal. Types each line
 * with a small delay, then fades in the body copy underneath.
 */
export default function NotFound() {
  const [lineIdx, setLineIdx] = useState(0);
  const [bootDone, setBootDone] = useState(false);

  useEffect(() => {
    if (lineIdx >= BOOT_LINES.length) {
      const t = setTimeout(() => setBootDone(true), 180);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setLineIdx((i) => i + 1), 140 + Math.random() * 80);
    return () => clearTimeout(t);
  }, [lineIdx]);

  return (
    <div className="relative isolate min-h-[calc(100vh-200px)] overflow-hidden py-20 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[1]"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 30%, color-mix(in srgb, var(--color-accent) 14%, transparent), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[1] opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(0deg, color-mix(in srgb, var(--color-accent) 12%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--color-accent) 12%, transparent) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 70% 50% at 50% 40%, #000, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 50% at 50% 40%, #000, transparent 80%)",
        }}
      />
      <div className="container-tight">
        <div className="mono-label mb-6" style={{ color: "var(--color-accent)" }}>
          [ 404 · not found ]
        </div>

        <div className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[color-mix(in_srgb,#05070d_88%,transparent)] px-3 py-2">
          <Terminal className="icon h-3.5 w-3.5 opacity-60" aria-hidden />
          <span className="num text-[11.5px] text-[var(--color-muted)]">publishd:/app/not-found $</span>
        </div>

        <pre className="mt-4 font-mono text-[12.5px] leading-[1.9] text-[color-mix(in_srgb,var(--color-accent-mint)_90%,white)] whitespace-pre-wrap">
{BOOT_LINES.slice(0, lineIdx).join("\n")}
          {lineIdx < BOOT_LINES.length && (
            <span className="terminal-cursor">_</span>
          )}
        </pre>

        <div
          className="mt-10 transition-all duration-500"
          style={{
            opacity: bootDone ? 1 : 0,
            transform: bootDone ? "translateY(0)" : "translateY(8px)",
          }}
        >
          <h1 className="text-balance text-[clamp(2rem,6vw,4.5rem)] font-semibold tracking-[-0.035em]">
            This page didn&apos;t ship.
          </h1>
          <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-[var(--color-muted)]">
            The URL you asked for isn&apos;t here. Could be a typo, a moved section, or a link from
            a browser that cached an older version of the site.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="btn btn--primary min-h-[44px]"
            >
              <ArrowLeft className="icon" aria-hidden />
              Back to the homepage
            </Link>
            <Link
              href="/#pricing"
              className="btn btn--glass min-h-[44px]"
            >
              See pricing
            </Link>
            <a
              href="mailto:daniel@publishd.app"
              className="btn btn--ghost min-h-[44px]"
            >
              Email Daniel
            </a>
          </div>
        </div>
      </div>
      <style jsx>{`
        .terminal-cursor {
          animation: blink 1s steps(2) infinite;
          color: color-mix(in srgb, var(--color-accent) 90%, white);
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
