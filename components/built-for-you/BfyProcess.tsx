"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ShaderBackdrop } from "@/components/ui/ShaderBackdrop";
import { StackReveal } from "@/components/ui/StackReveal";
import { SectionShell } from "@/components/ui/SectionShell";

const steps = [
  {
    n: "01",
    title: "Tell me what you need",
    body: "Short intake or email. Scope, timeline, preferences. Usually 15 minutes.",
    variant: "simplex" as const,
  },
  {
    n: "02",
    title: "I build it",
    body: "Design, development, deploy. Progress updates along the way — no dark weeks.",
    variant: "warp" as const,
  },
  {
    n: "03",
    title: "You launch",
    body: "Final handoff on your domain or in your app. Source, accounts, content — yours.",
    variant: "ripple" as const,
  },
];

export function BfyProcess() {
  return (
    <SectionShell id="process" mode="dark" className="scroll-mt-28 py-20 md:py-24">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Reveal>
              <SectionLabel index="05" label="Process" />
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-3 max-w-[22ch] text-balance">From idea to live.</h2>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <p className="max-w-[42ch] text-[14.5px] leading-relaxed text-[var(--color-muted)]">
              Three beats, no agency theatre. Same rhythm as the app-submission service,
              applied to sites and bots.
            </p>
          </Reveal>
        </div>

        <ol className="mt-10 grid gap-4 md:grid-cols-3 md:gap-5">
          {steps.map((s, i) => (
            <li key={s.n} className={i === 1 ? "md:-mt-3" : i === 2 ? "md:mt-4" : ""}>
              <StackReveal index={i} count={steps.length} className="h-full">
                <article className="glass-card relative h-full min-h-[240px] overflow-hidden rounded-[var(--radius-lg)] p-6">
                  <ShaderBackdrop variant={s.variant} color="#00d4ff" opacity={0.16} size={1.4} />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-[inherit]"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.06), transparent 40%), linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.3))",
                    }}
                  />
                  <div className="relative flex h-full flex-col">
                    <span
                      className="num inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[color-mix(in_srgb,var(--color-bg)_70%,transparent)] text-[15px] font-semibold tracking-tight"
                      style={{ color: "var(--color-accent)" }}
                    >
                      {s.n}
                    </span>
                    <h3 className="mt-5 text-[22px] font-semibold leading-tight">{s.title}</h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-[var(--color-muted)]">
                      {s.body}
                    </p>
                  </div>
                </article>
              </StackReveal>
            </li>
          ))}
        </ol>
      </div>
    </SectionShell>
  );
}

export default BfyProcess;
