"use client";

import NumberFlow from "@number-flow/react";
import { useEffect, useRef, useState } from "react";

import { landingConfig } from "@/components/landing/config";
import { CornerPlus } from "@/components/landing/ui/CornerPlus";
import { DotPattern } from "@/components/landing/ui/DotPattern";
import { Marquee } from "@/components/landing/ui/Marquee";

const STACK_LABELS = [
  "App Store",
  "Google Play",
  "TestFlight",
  "React",
  "Next.js",
  "Swift",
  "iOS",
  "watchOS",
  "Android",
  "Capacitor",
  "Cloudflare Workers",
  "Vercel",
  "Stripe",
  "OpenAI",
  "Anthropic",
  "Groq",
  "Supabase",
  "Postgres",
  "Cursor",
  "Lovable",
  "Bolt",
  "v0",
  "Replit",
];

export function LandingTrust() {
  const { items } = landingConfig.trust;
  const ref = useRef<HTMLElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="trust"
      className="border-b border-white/5 py-12 md:py-16"
    >
      <div className="relative mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <h2 className="sr-only">Trust signals — proof of solo senior delivery</h2>
        <div className="relative w-full text-white/15">
          <CornerPlus />
          <DotPattern
            className="opacity-25 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_75%)]"
            width={22}
            height={22}
            cr={0.7}
          />
          <div className="grid w-full grid-cols-2 gap-x-6 gap-y-10 px-6 py-8 md:grid-cols-4 md:px-8 md:py-10">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 border-l border-white/10 pl-5 first:border-l-0 first:pl-0 md:border-l md:pl-5 md:[&:first-child]:border-l md:[&:first-child]:pl-5"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color-mix(in_srgb,var(--color-fg)_55%,transparent)]">
              [ 0{i + 1} ]
            </div>
            <div className="flex items-baseline gap-1.5 font-mono text-[clamp(2rem,4.5vw,3rem)] font-semibold tracking-[-0.03em] text-[var(--color-fg)]">
              {typeof item.stat === "number" ? (
                <>
                  {"prefix" in item && item.prefix ? (
                    <span className="text-[var(--color-accent)]">{item.prefix}</span>
                  ) : null}
                  <NumberFlow
                    value={animate ? item.stat : 0}
                    transformTiming={{ duration: 1200, easing: "ease-out" }}
                    spinTiming={{ duration: 1200, easing: "ease-out" }}
                  />
                </>
              ) : (
                <span className="text-[var(--color-accent)]">{item.stat}</span>
              )}
              <span className="text-[14px] font-medium tracking-tight text-[color-mix(in_srgb,var(--color-fg)_72%,transparent)]">
                {item.suffix}
              </span>
            </div>
            <div className="text-[13px] leading-[1.55] text-[color-mix(in_srgb,var(--color-fg)_60%,transparent)]">
              {item.label}
            </div>
          </div>
        ))}
          </div>
        </div>
      </div>

      <div
        className="relative mt-12 overflow-hidden border-y border-white/10 bg-[color-mix(in_srgb,var(--color-ink)_50%,transparent)] py-5"
        aria-label="Stack and platforms shipped on"
        role="region"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--color-bg)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--color-bg)] to-transparent" />
        <Marquee durationMs={48000} repeat={3}>
          {STACK_LABELS.map((label) => (
            <span
              key={label}
              className="inline-flex shrink-0 items-center gap-2 font-mono text-[13px] uppercase tracking-[0.22em] text-[color-mix(in_srgb,var(--color-fg)_72%,transparent)]"
            >
              <span
                className="h-1 w-1 rounded-full bg-[var(--color-accent)]"
                aria-hidden="true"
              />
              {label}
            </span>
          ))}
        </Marquee>
      </div>

      {/* Built-on platform signal: tells visitors the engineering surface
          area is real, not just a portfolio site. Same row collapses to
          two columns on mobile so it never feels stacked-in-a-list. */}
      <div className="mx-auto mt-10 flex w-full max-w-[1100px] flex-col items-center gap-4 px-6 text-center md:px-10">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-[color-mix(in_srgb,var(--color-fg)_50%,transparent)]">
          Built on · Distributed via
        </p>
        <ul className="grid w-full max-w-[760px] grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "App Store", caption: "Approved appeals" },
            { label: "Google Play", caption: "Direct submissions" },
            { label: "Cloudflare", caption: "Workers · Pages · D1" },
            { label: "OpenAI · Anthropic", caption: "Production-grounded AI" },
          ].map((p) => (
            <li
              key={p.label}
              className="rounded-lg border border-white/10 bg-[color-mix(in_srgb,var(--color-ink)_55%,transparent)] px-3 py-3 text-left"
            >
              <div className="text-[13px] font-semibold tracking-tight text-[var(--color-fg)]">
                {p.label}
              </div>
              <div className="mt-0.5 text-[11.5px] leading-[1.5] text-[color-mix(in_srgb,var(--color-fg)_60%,transparent)]">
                {p.caption}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
