"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ShaderBackdrop } from "@/components/ui/ShaderBackdrop";
import { StackReveal } from "@/components/ui/StackReveal";
import { DealOutDeck } from "@/components/ui/DealOutDeck";

const steps = [
  {
    n: "01",
    title: "Send it your way",
    body: "Live URL, GitHub repo, or raw files. If it runs somewhere, I can ship it.",
    variant: "simplex" as const,
  },
  {
    n: "02",
    title: "Quick setup call",
    body: "15 minutes. We set up your Apple + Google accounts. You own them forever.",
    variant: "warp" as const,
  },
  {
    n: "03",
    title: "Live in both stores",
    body: "7–14 days later, live on App Store and Google Play. Under your accounts.",
    variant: "ripple" as const,
  },
];

export function HowItWorks() {
  const trackRef = useRef<HTMLOListElement | null>(null);

  function scrollBy(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.max(340, el.clientWidth * 0.8);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }

  return (
    <section id="how-it-works" data-section-mode="dark">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Reveal>
              <SectionLabel index="03" label="How it works" />
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-3 max-w-[22ch] text-balance">Three steps. No agency handwaving.</h2>
            </Reveal>
          </div>
          <div className="hidden gap-1.5 md:flex">
            <IconBtn onClick={() => scrollBy(-1)} label="Previous step">
              <ChevronLeft className="icon" aria-hidden />
            </IconBtn>
            <IconBtn onClick={() => scrollBy(1)} label="Next step">
              <ChevronRight className="icon" aria-hidden />
            </IconBtn>
          </div>
        </div>

        {/* Mobile — scroll-pinned deck */}
        <div className="mt-10 md:hidden">
          <DealOutDeck
            cardScrollVh={0.7}
            label="how it works"
            cardLabels={steps.map((s) => s.n)}
            cards={steps.map((s) => (
              <StepCard key={s.n} step={s} solid />
            ))}
          />
        </div>

        {/* Desktop — asymmetric horizontal row, unchanged */}
        <div className="relative z-[2] hidden md:block">
          <ol
            ref={trackRef}
            className="snap-row mt-10 grid grid-cols-3 gap-5 [grid-template-rows:auto]"
          >
            {steps.map((s, i) => (
              <li
                key={s.n}
                className={`${i === 1 ? "-mt-3" : i === 2 ? "mt-4" : ""}`}
              >
                <StackReveal index={i} count={steps.length} className="h-full">
                  <StepCard step={s} />
                </StackReveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  solid,
}: {
  step: (typeof steps)[number];
  /** Mobile deck only — denser glass + top spotlight for readability */
  solid?: boolean;
}) {
  return (
    <article
      className={`glass-card relative h-full min-h-[260px] overflow-hidden rounded-[var(--radius-lg)] p-6${solid ? " glass-card--deck" : ""}`}
    >
      <ShaderBackdrop variant={step.variant} opacity={0.16} size={1.4} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          background: solid
            ? "linear-gradient(135deg, rgba(255,255,255,0.06), transparent 40%), linear-gradient(180deg, transparent 58%, rgba(0,0,0,0.18))"
            : "linear-gradient(135deg, rgba(255,255,255,0.06), transparent 40%), linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.3))",
        }}
      />
      {solid ? (
        <>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-accent) 78%, white) 50%, transparent)",
              boxShadow: "0 0 14px 2px color-mix(in srgb, var(--color-accent) 60%, transparent)",
            }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[60%] rounded-[inherit]"
            style={{
              background:
                "radial-gradient(ellipse 70% 100% at 50% 0%, color-mix(in srgb, var(--color-accent) 28%, transparent) 0%, color-mix(in srgb, var(--color-accent) 10%, transparent) 35%, transparent 75%)",
              mixBlendMode: "screen",
            }}
          />
        </>
      ) : null}
      <div className="relative z-[2] flex h-full flex-col">
        <span
          className="num inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[color-mix(in_srgb,var(--color-bg)_70%,transparent)] text-[15px] font-semibold tracking-tight"
          style={{ color: "var(--color-accent)" }}
        >
          {step.n}
        </span>
        <h3 className="mt-5 text-[22px] font-semibold leading-tight">{step.title}</h3>
        <p
          className="mt-3 text-[14px] leading-relaxed"
          style={{
            color: solid
              ? "color-mix(in srgb, var(--color-fg) 82%, transparent)"
              : "var(--color-muted)",
          }}
        >
          {step.body}
        </p>
      </div>
    </article>
  );
}

function IconBtn({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-11 w-11 place-items-center rounded-full border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface)_55%,transparent)] text-[var(--color-muted)] backdrop-blur transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-fg)]"
    >
      {children}
    </button>
  );
}
