"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ShaderBackdrop } from "@/components/ui/ShaderBackdrop";
import { SectionShell } from "@/components/ui/SectionShell";
import { DealOutDeck } from "@/components/ui/DealOutDeck";

const AsciiTunnel4 = dynamic(
  () => import("@/components/shaders/presets/AsciiTunnel4").then((m) => m.AsciiTunnel4),
  { ssr: false }
);

const steps = [
  { when: "Hour 1", title: "Welcome email + intake form", variant: "simplex" as const },
  { when: "Day 1", title: "15-min kickoff call", variant: "warp" as const },
  { when: "Day 2\u20134", title: "Wrap, assets, store listings", variant: "ripple" as const },
  { when: "Day 4\u20135", title: "You review before submission", variant: "wave" as const },
  { when: "Day 5\u20137", title: "Submit to App Store + Google Play", variant: "dots" as const },
  { when: "Day 7\u201314", title: "Apple & Google review", variant: "sphere" as const },
  { when: "Live", title: "Store links delivered", variant: "swirl" as const },
];

export function WhatHappensNext() {
  return (
    <>
      {/* MOBILE — plain <section> so `position: sticky` inside the deck
          actually activates. SectionShell wraps its children in
          `overflow-hidden` which silently kills sticky-pin for any
          descendant, and that's what was letting the 7-card deck scroll
          right past without pinning. Ambient AsciiTunnel4 is still mounted
          as a sticky backdrop at the same offset the deck uses. */}
      <MobileTimeline />

      {/* DESKTOP — SectionShell + horizontal snap-scroller (unchanged) */}
      <div className="hidden md:block">
        <DesktopTimeline />
      </div>
    </>
  );
}

function MobileTimeline() {
  return (
    <section id="next" className="md:hidden relative isolate py-16">
      {/* Ambient shader — sticky behind the deck so it rides along with
          the pinned cards. Skipped in reduced-motion via ShaderBackdrop's
          own guard. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.22]"
        style={{ background: "#05070d" }}
      >
        <div className="sticky top-[56px] h-[calc(100svh-56px)] w-full">
          <AsciiTunnel4 className="h-full w-full" />
        </div>
      </div>

      <div className="container-x relative z-[2]">
        <Reveal>
          <SectionLabel index="04" label="What happens next" />
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-3 max-w-[22ch] text-balance">Zero mystery. Every step after you buy.</h2>
        </Reveal>

        <div className="mt-8">
          <DealOutDeck
            cardScrollVh={0.4}
            label="timeline"
            cardLabels={steps.map((_, i) => String(i + 1).padStart(2, "0"))}
            cards={steps.map((s, i) => (
              <TimelineBody key={s.when} step={s} earlyStack={i < 2} />
            ))}
          />
        </div>
      </div>
    </section>
  );
}

function DesktopTimeline() {
  const trackRef = useRef<HTMLOListElement | null>(null);

  function scrollBy(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 300, behavior: "smooth" });
  }

  return (
    <SectionShell
      id="next-desktop"
      mode="dark"
      shader={() => <AsciiTunnel4 className="h-full w-full" />}
      shaderOpacity={0.38}
      className="py-16 md:py-24"
    >
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Reveal>
              <SectionLabel index="04" label="What happens next" />
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-3 max-w-[22ch] text-balance">Zero mystery. Every step after you buy.</h2>
            </Reveal>
          </div>
          <div className="hidden gap-1.5 md:flex">
            <NavBtn onClick={() => scrollBy(-1)} label="Previous">
              <ChevronLeft className="icon" aria-hidden />
            </NavBtn>
            <NavBtn onClick={() => scrollBy(1)} label="Next">
              <ChevronRight className="icon" aria-hidden />
            </NavBtn>
          </div>
        </div>

        <div className="relative z-[2]">
          <ol
            ref={trackRef}
            className="snap-row mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 pt-1"
          >
            {steps.map((s, i) => (
              <TimelineCard key={s.when} step={s} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </SectionShell>
  );
}

function NavBtn({ onClick, label, children }: { onClick: () => void; label: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-[color-mix(in_srgb,#0a0e18_55%,transparent)] text-[var(--color-muted)] backdrop-blur transition-colors hover:border-white/20 hover:text-[var(--color-fg)]"
    >
      {children}
    </button>
  );
}

function TimelineCard({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const ref = useRef<HTMLLIElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 200px" });
  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.05 * index }}
      className="snap-center shrink-0"
    >
      <article className="glass-card relative flex h-full min-h-[160px] w-[240px] flex-col overflow-hidden rounded-[var(--radius-lg)] p-5 sm:w-[280px]">
        <ShaderBackdrop variant={step.variant} opacity={0.16} size={1.4} />
        <div className="relative flex flex-1 flex-col">
          <div className="mono-label" style={{ color: "var(--color-accent)" }}>
            [ {step.when.toLowerCase()} ]
          </div>
          <div className="mt-3 text-[16px] font-semibold leading-snug text-[var(--color-fg)]">
            {step.title}
          </div>
        </div>
      </article>
    </motion.li>
  );
}

/* Body-only version of the timeline card, used inside the mobile DealOutDeck.
   Seven cards stacked = no per-card shader (the section-level AsciiTunnel4
   already carries the shader ambience). Rich CSS-only card treatment keeps
   GPU headroom for the deal-out transforms themselves. */
function TimelineBody({
  step,
  earlyStack,
}: {
  step: (typeof steps)[number];
  /** Hour 1 / Day 1 sit over the full deck — extra lift so they match mid steps */
  earlyStack?: boolean;
}) {
  return (
    <article
      className={`glass-card glass-card--deck relative mx-auto flex min-h-[240px] w-full flex-col overflow-hidden rounded-[var(--radius-lg)] p-7${earlyStack ? " timeline-body--stack-lift" : ""}`}
    >
      {/* Static cyan aura — evokes the shader without the cost */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
        style={{
          background: earlyStack
            ? [
                "radial-gradient(ellipse 75% 58% at 22% 16%, color-mix(in srgb, var(--color-accent) 30%, transparent), transparent 62%)",
                "radial-gradient(ellipse 82% 62% at 95% 100%, color-mix(in srgb, #7cf0d4 22%, transparent), transparent 60%)",
                "radial-gradient(ellipse 90% 55% at 50% 0%, rgba(255,255,255,0.055), transparent 52%)",
                "linear-gradient(135deg, rgba(255,255,255,0.09), transparent 38%), linear-gradient(180deg, transparent 52%, rgba(0,0,0,0.12))",
              ].join(", ")
            : [
                "radial-gradient(ellipse 70% 55% at 20% 18%, color-mix(in srgb, var(--color-accent) 22%, transparent), transparent 65%)",
                "radial-gradient(ellipse 80% 60% at 95% 100%, color-mix(in srgb, #7cf0d4 18%, transparent), transparent 62%)",
                "linear-gradient(135deg, rgba(255,255,255,0.06), transparent 40%), linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.22))",
              ].join(", "),
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-accent) 78%, white) 50%, transparent)",
          boxShadow: earlyStack
            ? "0 0 18px 3px color-mix(in srgb, var(--color-accent) 72%, transparent)"
            : "0 0 14px 2px color-mix(in srgb, var(--color-accent) 60%, transparent)",
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[65%] rounded-[inherit]"
        style={{
          background: earlyStack
            ? "radial-gradient(ellipse 72% 100% at 50% 0%, color-mix(in srgb, var(--color-accent) 36%, transparent) 0%, color-mix(in srgb, var(--color-accent) 14%, transparent) 38%, transparent 78%)"
            : "radial-gradient(ellipse 70% 100% at 50% 0%, color-mix(in srgb, var(--color-accent) 28%, transparent) 0%, color-mix(in srgb, var(--color-accent) 10%, transparent) 35%, transparent 75%)",
          mixBlendMode: "screen",
        }}
      />
      {/* Thin scanline at the bottom — subtle data-ribbon feel */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-6 bottom-4 z-[1] h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-accent) 70%, transparent), transparent)",
        }}
      />
      <div className="relative z-[2] flex flex-1 flex-col">
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="h-[6px] w-[6px] rounded-full"
            style={{
              background: "var(--color-accent)",
              boxShadow: "0 0 10px var(--color-accent)",
            }}
          />
          <div className="mono-label !m-0 !p-0 before:hidden" style={{ color: "var(--color-accent)" }}>
            [ {step.when.toLowerCase()} ]
          </div>
        </div>
        <h3 className="mt-4 text-[24px] font-semibold leading-tight text-[var(--color-fg)]">
          {step.title}
        </h3>
      </div>
    </article>
  );
}
