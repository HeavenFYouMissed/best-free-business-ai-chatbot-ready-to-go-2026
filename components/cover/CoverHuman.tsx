"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ReviewLink } from "@/components/reviews/ReviewLink";

function useIsBusinessHours() {
  const [online, setOnline] = useState(false);
  useEffect(() => {
    function check() {
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

export function CoverHuman() {
  const online = useIsBusinessHours();

  return (
    <section
      className="cover-human px-5 pt-20 md:px-10 md:pt-28 lg:px-16"
      aria-label="The human"
    >
      <div className="rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-ink)_70%,transparent)] p-6 md:p-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[color-mix(in_srgb,var(--color-fg)_60%,transparent)]">
          The human
        </span>

        <div className="mt-7 grid gap-8 md:mt-9 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:items-center md:gap-12">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[360px] overflow-hidden rounded-lg border border-[var(--color-border)]">
            <Image
              src="/portrait/daniel.png"
              alt="Daniel Castellani — solo engineer behind Publishd"
              fill
              sizes="(min-width: 768px) 360px, 100vw"
              loading="lazy"
              className="object-cover"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 55%, color-mix(in srgb, var(--color-bg) 85%, transparent) 100%)",
              }}
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--color-fg)_85%,transparent)]">
              <span
                aria-hidden
                className="inline-block h-[7px] w-[7px] rounded-full"
                style={{
                  background: online ? "#3ede7a" : "#6a7280",
                  boxShadow: online ? "0 0 10px rgba(62,222,122,0.6)" : "none",
                }}
              />
              {online ? "Online now" : "Replies in < 4h"} — Connecticut
            </div>
          </div>

          <div>
            <h2 className="max-w-[22ch] text-[clamp(1.6rem,4vw,2.4rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-[var(--color-fg)]">
              You&apos;re not hiring software.{" "}
              <span className="text-[color-mix(in_srgb,var(--color-fg)_60%,transparent)]">
                You&apos;re hiring me.
              </span>
            </h2>

            <p className="mt-5 max-w-[56ch] text-[14.5px] leading-[1.7] text-[color-mix(in_srgb,var(--color-fg)_78%,transparent)]">
              When Apple rejects your app, I&apos;m the one on the phone with you. When iOS breaks
              things, you text me directly. You get my number on day one. No ticket queue,
              no chatbot, no offshore support team — just a developer who has been through
              this and gives a shit about your app.
            </p>

            <dl className="mt-6 grid gap-x-8 gap-y-3 text-[13px] sm:grid-cols-2">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color-mix(in_srgb,var(--color-fg)_50%,transparent)]">
                  Background
                </dt>
                <dd className="mt-1 text-[var(--color-fg)]">Amazon alumni · solo builder</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color-mix(in_srgb,var(--color-fg)_50%,transparent)]">
                  Focus
                </dt>
                <dd className="mt-1 text-[var(--color-fg)]">Apps, websites, AI for small business</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color-mix(in_srgb,var(--color-fg)_50%,transparent)]">
                  Promise
                </dt>
                <dd className="mt-1 text-[var(--color-fg)]">Reply within 6 business hours</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color-mix(in_srgb,var(--color-fg)_50%,transparent)]">
                  Ownership
                </dt>
                <dd className="mt-1 text-[var(--color-fg)]">You own the code, accounts, everything</dd>
              </div>
            </dl>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {[
                { href: "https://model-surgery.com", label: "model-surgery.com" },
                { href: "https://superclawhub.com", label: "superclawhub.com" },
                { href: "https://nexus-language.com", label: "nexus-language.com" },
                { href: "https://github.com/HeavenFYouMissed", label: "github" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex rounded-md border border-[var(--color-border)] px-3 py-2 font-mono text-[11px] tracking-wide text-[color-mix(in_srgb,var(--color-fg)_75%,transparent)] transition-colors duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-fg)]"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Trustpilot — keep this static so third-party widget scripts can't mutate the DOM before hydration */}
            <div className="mt-5">
              <div className="sm:hidden">
                <div className="rounded-lg border border-[color-mix(in_srgb,#00b67a_28%,var(--color-border))] bg-[linear-gradient(145deg,color-mix(in_srgb,#00b67a_12%,transparent),color-mix(in_srgb,var(--color-bg)_72%,transparent))] p-3.5 shadow-[0_12px_28px_-16px_rgba(0,182,122,0.45)]">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--color-fg)_56%,transparent)]">
                    Trustpilot
                  </p>
                  <p className="mt-1.5 text-[12.5px] leading-[1.55] text-[color-mix(in_srgb,var(--color-fg)_74%,transparent)]">
                    Read verified reviews or leave one if we already worked together.
                  </p>
                  <ReviewLink variant="cta" className="mt-3 w-full justify-center border-[color-mix(in_srgb,#00b67a_38%,var(--color-border))] bg-[color-mix(in_srgb,#00b67a_8%,transparent)] px-4 py-3 text-[12px] text-[#dffcf0] hover:bg-[color-mix(in_srgb,#00b67a_14%,transparent)]" />
                </div>
              </div>

              <div className="hidden sm:block">
                <div className="rounded-lg border border-[color-mix(in_srgb,#00b67a_24%,var(--color-border))] bg-[linear-gradient(145deg,color-mix(in_srgb,#00b67a_10%,transparent),color-mix(in_srgb,var(--color-bg)_58%,transparent))] p-4 shadow-[0_16px_34px_-22px_rgba(0,182,122,0.45)]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--color-fg)_56%,transparent)]">
                        Trustpilot
                      </p>
                      <p className="mt-1.5 max-w-[42ch] text-[13px] leading-[1.6] text-[color-mix(in_srgb,var(--color-fg)_76%,transparent)]">
                        Read verified reviews from past clients, or leave one if we already shipped together.
                      </p>
                    </div>
                    <div className="hidden shrink-0 items-center gap-1 pt-0.5 md:flex" aria-hidden>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className="text-[#00b67a]">★</span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3.5">
                    <ReviewLink variant="cta" className="w-full justify-center border-[color-mix(in_srgb,#00b67a_38%,var(--color-border))] bg-[color-mix(in_srgb,#00b67a_8%,transparent)] px-4 py-3 text-[12px] text-[#dffcf0] hover:bg-[color-mix(in_srgb,#00b67a_14%,transparent)] md:w-auto md:justify-start" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
