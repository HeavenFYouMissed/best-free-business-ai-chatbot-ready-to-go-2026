"use client";

import { Terminal } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { StackReveal } from "@/components/ui/StackReveal";

const cases = [
  {
    code: "GUIDELINE 4.2 — MINIMUM FUNCTIONALITY",
    body: "Your app is a wrapper for a website…",
    outcome: "Resolved in average 2 resubmissions",
  },
  {
    code: "GUIDELINE 5.1.1 — PRIVACY DATA COLLECTION",
    body: "Missing required privacy disclosures…",
    outcome: "Resolved in average 1 resubmission",
  },
  {
    code: "GUIDELINE 2.3.0 — ACCURATE METADATA",
    body: "Screenshots don't match app content…",
    outcome: "Resolved in average 1 resubmission",
  },
] as const;

export function RejectionHandling() {
  return (
    <section id="rejections">
      <div className="container-x">
        <Reveal>
          <SectionLabel index="07" label="When Apple says no" />
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-3 max-w-[24ch] text-balance">
            When Apple says no, <span className="text-[var(--color-muted)]">I say &ldquo;not yet.&rdquo;</span>
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-6 grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-start md:gap-10">
            <p className="max-w-[62ch] text-[15.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_82%,transparent)]">
              Apple rejects roughly 30% of first submissions, often with vague reasons:
              &ldquo;insufficient native functionality&rdquo; (Guideline 4.2), metadata issues, missing privacy
              disclosures. Most solo developers spend 5–10 back-and-forths figuring out what Apple actually wants.
              I&apos;ve seen every common rejection reason. I know what language to use in appeals, when to fix,
              when to push back, and when to resubmit with changes. Rejection handling is included in every tier.
              Not a surprise upcharge. Not a separate invoice.
            </p>

            <div className="space-y-3">
              {cases.map((c, i) => (
                <StackReveal key={c.code} index={i} count={cases.length}>
                  <div className="glass-card glass-card--warn reject-case relative overflow-hidden rounded-[var(--radius-md)] p-4">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-[0.22]"
                      style={{
                        backgroundImage:
                          "radial-gradient(color-mix(in srgb, var(--color-warn) 35%, transparent) 1px, transparent 1px)",
                        backgroundSize: "6px 6px",
                      }}
                    />
                    {/* VHS scanline + glitch feel on warn peak */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-[0.16]"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(0deg, transparent 0 2px, rgba(255,179,71,0.35) 2px 3px)",
                      }}
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, color-mix(in srgb, var(--color-surface-2) 45%, transparent), color-mix(in srgb, var(--color-surface-2) 90%, transparent))",
                      }}
                    />
                    <div className="relative">
                      <div className="mono-label flex items-center gap-2" style={{ color: "var(--color-warn)" }}>
                        <Terminal className="icon h-3.5 w-3.5" aria-hidden />
                        [ {c.code} ]
                      </div>
                      <p className="num mt-2 text-[12.5px] text-[var(--color-muted)]">&ldquo;{c.body}&rdquo;</p>
                      <p className="mt-2 text-[12.5px]" style={{ color: "var(--color-accent)" }}>
                        → {c.outcome}
                      </p>
                    </div>
                  </div>
                </StackReveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
