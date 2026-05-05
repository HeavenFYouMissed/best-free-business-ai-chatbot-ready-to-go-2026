"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { FlashlightReveal } from "@/components/ui/FlashlightReveal";
import { DiscretionBadge } from "@/components/ui/DiscretionBadge";
import { Github, ExternalLink } from "lucide-react";

function useIsBusinessHours() {
  const [online, setOnline] = useState(false);
  useEffect(() => {
    function check() {
      /* America/New_York business hours, rough */
      const now = new Date();
      const fmt = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        hour: "numeric",
        hour12: false,
        weekday: "short",
      });
      const parts = fmt.formatToParts(now);
      const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
      const day = parts.find((p) => p.type === "weekday")?.value ?? "";
      const weekend = day === "Sat" || day === "Sun";
      setOnline(!weekend && hour >= 9 && hour < 19);
    }
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);
  return online;
}

export function HumanLayer() {
  const online = useIsBusinessHours();

  return (
    <section id="human">
      <div className="container-x">
        <Reveal>
          <SectionLabel index="13" label="The human layer" />
        </Reveal>

        <div className="mt-8 grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center">
          <Reveal>
            <div className="group relative mx-auto aspect-[4/5] w-full max-w-[380px] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)]">
              <Image
                src="/portrait/daniel.png"
                alt="Daniel Castellani — solo engineer behind Publishd, App Store and Google Play submission service"
                fill
                sizes="(min-width: 768px) 380px, 100vw"
                loading="lazy"
                className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(120% 80% at 75% 15%, color-mix(in srgb, var(--color-accent) 20%, transparent), transparent 55%)",
                  mixBlendMode: "screen",
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
                style={{
                  background:
                    "linear-gradient(180deg, transparent, color-mix(in srgb, var(--color-bg) 92%, transparent))",
                }}
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <div className="mono-label" style={{ color: "var(--color-accent)" }}>
                    [ daniel castellani ]
                  </div>
                  <p className="mt-1 flex items-center gap-2 text-[12.5px] text-[var(--color-muted)]">
                    <span
                      aria-hidden
                      className="inline-block h-[7px] w-[7px] rounded-full"
                      style={{
                        background: online ? "#3ede7a" : "var(--color-subtle)",
                        boxShadow: online
                          ? "0 0 10px rgba(62,222,122,0.7)"
                          : "none",
                        animation: online ? "status-dot-pulse 3s ease-in-out infinite" : undefined,
                      }}
                    />
                    {online ? "Online now" : "Usually replies in <4h"} · Connecticut
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <h2 className="max-w-[22ch] text-balance">
                You&apos;re not hiring software. <span className="text-[var(--color-muted)]">You&apos;re hiring me.</span>
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <p className="mt-5 max-w-[56ch] text-[15.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_82%,transparent)]">
                When Apple rejects your app, I&apos;m the one on the phone with you. When iOS 19 breaks things next
                year, text me directly. You get my cell number on day one. No ticket queue. No chatbot. No
                offshore support team. Just a developer who&apos;s been through this and gives a shit about your app.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
                <DiscretionBadge variant="inline" />
                <span className="min-w-0 flex-1 basis-[18ch] text-[12.5px] leading-snug text-[color-mix(in_srgb,var(--color-fg)_70%,transparent)]">
                  Your project stays yours. I don&apos;t name clients, share transcripts, or ask for permission to brag.
                </span>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-6">
                <FlashlightReveal radius={260} softness={0.85} className="rounded-[var(--radius-md)]">
                  <div className="relative overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[color-mix(in_srgb,#05070d_90%,transparent)] px-4 py-3.5">
                    <div className="mono-label mb-2 opacity-70 text-[10px]">[ credentials · cursor to reveal ]</div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-[var(--color-muted)]">
                      <span className="font-medium text-[var(--color-fg)]">Daniel Castellani</span>
                      <span className="hairline h-px w-4" aria-hidden />
                      <span>Amazon alumni</span>
                      <span className="opacity-40">·</span>
                      <span>Solo builder</span>
                      <span className="opacity-40">·</span>
                      <span>Ships apps to both stores</span>
                      <span className="opacity-40">·</span>
                      <span>Model Surgery researcher</span>
                    </div>
                  </div>
                </FlashlightReveal>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="https://model-surgery.com"
                  target="_blank"
                  rel="noopener"
                  className="btn btn--ghost btn--tiny min-h-[40px]"
                >
                  model-surgery.com
                  <ExternalLink className="icon" aria-hidden />
                </Link>
                <Link
                  href="https://superclawhub.com"
                  target="_blank"
                  rel="noopener"
                  className="btn btn--ghost btn--tiny min-h-[40px]"
                >
                  superclawhub.com
                  <ExternalLink className="icon" aria-hidden />
                </Link>
                <Link
                  href="https://nexus-language.com"
                  target="_blank"
                  rel="noopener"
                  className="btn btn--ghost btn--tiny min-h-[40px]"
                >
                  nexus-language.com
                  <ExternalLink className="icon" aria-hidden />
                </Link>
                <Link
                  href="https://github.com/HeavenFYouMissed"
                  target="_blank"
                  rel="noopener"
                  className="btn btn--ghost btn--tiny min-h-[40px]"
                >
                  <Github className="icon" aria-hidden />
                  GitHub
                </Link>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-8 max-w-[54ch] rounded-[var(--radius-md)] border border-[color-mix(in_srgb,var(--color-accent)_35%,var(--color-border))] bg-[color-mix(in_srgb,var(--color-accent)_5%,var(--color-surface-2))] p-4">
                <div className="mono-label" style={{ color: "var(--color-accent)" }}>
                  [ guarantee ]
                </div>
                <p className="mt-2 text-[14px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_88%,transparent)]">
                  <span className="font-medium text-[var(--color-fg)]">Response time promise.</span> I reply within
                  6 business hours. If I&apos;m traveling or offline, my auto-reply tells you exactly when I&apos;ll
                  respond. No ticket queues. No &ldquo;escalated to tier 2 support.&rdquo; Just me.
                </p>
                <DanielSignature />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Hand-drawn-feel signature that draws itself on scroll into view via
 * stroke-dashoffset. Not decorative — it's literally Daniel signing the
 * guarantee above it.
 */
function DanielSignature() {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = document.getElementById("daniel-signature");
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <svg
      id="daniel-signature"
      aria-hidden
      viewBox="0 0 240 70"
      className="mt-3 h-[44px] w-auto opacity-90"
    >
      <path
        d="M 8 44 Q 12 12, 26 14 T 36 38 Q 32 48, 24 42 Q 18 36, 30 30 Q 40 24, 54 32 Q 62 40, 68 28 L 72 14 L 76 46 Q 80 52, 86 42 Q 94 28, 102 38 Q 108 46, 114 32 Q 120 18, 128 30 Q 134 38, 140 28 Q 146 18, 156 30 Q 160 34, 168 24 Q 178 12, 188 28 Q 196 38, 204 30 Q 212 22, 220 32"
        fill="none"
        stroke="color-mix(in srgb, var(--color-accent) 90%, white)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={100}
        strokeDasharray={100}
        strokeDashoffset={inView ? 0 : 100}
        style={{
          transition: "stroke-dashoffset 1600ms cubic-bezier(0.22, 1, 0.36, 1)",
          filter: "drop-shadow(0 0 6px color-mix(in srgb, var(--color-accent) 40%, transparent))",
        }}
      />
      <path
        d="M 8 56 L 228 56"
        fill="none"
        stroke="color-mix(in srgb, var(--color-fg) 18%, transparent)"
        strokeWidth="0.5"
      />
      <text
        x="8"
        y="68"
        fill="color-mix(in srgb, var(--color-fg) 50%, transparent)"
        fontFamily="var(--font-mono), monospace"
        fontSize="9"
        letterSpacing="0.15em"
      >
        — DANIEL  ·  FOUNDER
      </text>
    </svg>
  );
}
