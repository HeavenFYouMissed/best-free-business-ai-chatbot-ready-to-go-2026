"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

type Props = {
  /** Ordered cards. Index 0 is the card visible first. */
  cards: ReactNode[];
  /**
   * Viewport-heights of scroll allotted per card. Lower = faster deal-out,
   * higher = slower / more dramatic pin.
   * Section height = `(N + 1) * cardScrollVh * 100vh`.
   */
  cardScrollVh?: number;
  /** Bracket label on the counter rail (e.g. "how it works"). */
  label?: string;
  /** Passed to the outer <section> for margin / padding / id. */
  className?: string;
  /** Optional mono label for each card ("01", "02", "03"…) used in the rail. */
  cardLabels?: string[];
};

/**
 * Scroll-pinned card deck. Section pins for its own height; inside the pin
 * the cards start stacked (with descending scale/tilt/blur) and deal out
 * front-first as scroll progresses — the front card translates up + tilts
 * + fades while the next card rises to center.
 *
 * Design principles (the "million dollar" signals):
 *  - Physical-matter deck metaphor (tilt + light blur + scale descent).
 *  - Scroll-linked, not time-based → reactive to user gesture.
 *  - Single MotionValue drives every card's transforms; no per-card useScroll
 *    means no layout thrash, no event listener pile-up.
 *  - Counter rail + progress bar at top so users always know where they are.
 *  - `prefers-reduced-motion` falls back to a plain vertical stack, no pin.
 */
export function DealOutDeck({
  cards,
  cardScrollVh = 0.6,
  label = "catalog",
  className,
  cardLabels,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const N = cards.length;
  const totalVh = Math.max(180, Math.round((N + 1) * cardScrollVh * 100));

  /* Reduced-motion: plain stack with the existing section styling. */
  if (reduce) {
    return (
      <section className={`relative ${className ?? ""}`}>
        <ul className="space-y-4">
          {cards.map((card, i) => (
            <li key={i}>{card}</li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className={`relative ${className ?? ""}`}
      style={{ height: `${totalVh}vh` }}
    >
      <div className="sticky top-[56px] flex h-[calc(100svh-56px)] items-center justify-center overflow-hidden md:top-[64px] md:h-[calc(100svh-64px)]">
        {/* Counter rail */}
        <DeckRail progress={scrollYProgress} total={N} label={label} cardLabels={cardLabels} />

        {/* Deck — each card stacked absolutely so transforms don't reflow */}
        <div className="relative mx-auto w-full max-w-[min(88vw,420px)] px-1">
          <div className="relative" style={{ perspective: "1200px" }}>
            {cards.map((card, i) => (
              <DeckCard key={i} index={i} total={N} progress={scrollYProgress}>
                {card}
              </DeckCard>
            ))}
          </div>
        </div>

        {/* Scroll hint — fades out after the first card deals */}
        <ScrollHint progress={scrollYProgress} />
      </div>
    </section>
  );
}

/* ============================================================
   One card in the deck
   ============================================================ */

function DeckCard({
  index,
  total,
  progress,
  children,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  children: ReactNode;
}) {
  /* Each card's "front moment" at index/(total-1) of overall progress.
     We keep inputs strictly inside [0, 1] with 3 non-decreasing stops. For
     the first card there's no rise phase (it starts at front) — we replace
     the deck output with the front value. For the last card there's no
     exit (it holds at front) — we replace the exit output with the front
     value. This lets us reuse one 3-point hook shape for every card and
     keeps Element.animate offsets valid. */
  const denom = Math.max(1, total - 1);
  const isFirst = index === 0;
  const isLast = index === total - 1;

  const frontAt = index / denom;
  const riseStart = isFirst ? 0 : (index - 1) / denom;
  const exitEnd = isLast ? 1 : (index + 1) / denom;

  /* Deck-rest — gentle falloff so 7+ cards don't compound into
     light/dark/light flicker (low opacity + heavy blur + tight mask).
     Back row stays legible; depth reads from y/scale/tilt, not crushing gamma. */
  const deckY = -Math.min(index * 7, 26);
  const deckScale = 1 - Math.min(index * 0.022, 0.11);
  const deckRotate = Math.min(index * 1.05, 4);
  const deckOpacity = Math.max(0.56, 0.97 ** index);
  const deckBlur = Math.min(index * 0.22, 0.75);

  /* When the rise phase collapses (first card) or the exit phase collapses
     (last card), nudge frontAt so the three input stops stay strictly
     increasing. WAAPI requires monotonically non-decreasing, and framer
     clamps to [0,1] when piping to Element.animate. */
  const input = isFirst
    ? [0, 0.00001, exitEnd]
    : isLast
      ? [riseStart, Math.max(riseStart + 0.00001, frontAt - 0.00001), 1]
      : [riseStart, frontAt, exitEnd];

  /* Output ranges — first card skips rise (uses front value twice at the
     low end), last card skips exit (uses front value twice at the high
     end). Either way a three-stop range is preserved.
     Using raw numbers (pixels) for y so framer interpolates cleanly —
     mixed-unit strings like "px" + "vh" don't animate. 1200px exit is
     safely off any mobile viewport. */
  const yOut: [number, number, number] = isFirst
    ? [0, 0, -1200]
    : isLast
      ? [deckY, 0, 0]
      : [deckY, 0, -1200];

  const scaleOut: [number, number, number] = isFirst
    ? [1, 1, 0.86]
    : isLast
      ? [deckScale, 1, 1]
      : [deckScale, 1, 0.86];

  const rotateOut: [number, number, number] = isFirst
    ? [0, 0, -9]
    : isLast
      ? [deckRotate, 0, 0]
      : [deckRotate, 0, -9];

  const opacityOut: [number, number, number] = isFirst
    ? [1, 1, 0]
    : isLast
      ? [deckOpacity, 1, 1]
      : [deckOpacity, 1, 0];

  const exitBlur = 2.25;
  const blurOut: [number, number, number] = isFirst
    ? [0, 0, exitBlur]
    : isLast
      ? [deckBlur, 0, 0]
      : [deckBlur, 0, exitBlur];

  const y = useTransform(progress, input, yOut);
  const scale = useTransform(progress, input, scaleOut);
  const rotate = useTransform(progress, input, rotateOut);
  const opacity = useTransform(progress, input, opacityOut);
  const blurPx = useTransform(progress, input, blurOut);
  const filter = useTransform(blurPx, (v) => `blur(${v.toFixed(2)}px)`);

  /* Scroll-linked mask — deck peek (higher floor than 0.22) so deep stacks
     don't read as random bright slivers vs full-bleed cards mid-scroll. */
  const maskDeckPeek = 0.36;
  const maskReveal: [number, number, number] = isFirst
    ? [1, 1, maskDeckPeek]
    : isLast
      ? [maskDeckPeek, 1, 1]
      : [maskDeckPeek, 1, maskDeckPeek];
  const maskProgress = useTransform(progress, input, maskReveal);
  const maskImage = useTransform(maskProgress, (v) => {
    const solid = Math.max(0, (v - 0.08) * 100).toFixed(1);
    const fade = (v * 100).toFixed(1);
    return `linear-gradient(to bottom, #000 0%, #000 ${solid}%, transparent ${fade}%)`;
  });

  /* z-index: elevated at front moment, descends in deck ranks otherwise. */
  const zIndex = useTransform(progress, (p) => {
    /* Active band — the card nearest its frontAt gets the top slot. */
    const bandWidth = 1 / Math.max(1, total);
    if (Math.abs(p - frontAt) < bandWidth * 0.55) return total + 10;
    /* After exit (p > exitEnd) — still visible if mid-exit — float on top. */
    if (p > frontAt && p < exitEnd) return total + 8;
    /* In deck — smaller index = closer to front of deck. */
    return total - index;
  });

  return (
    <motion.div
      className="absolute inset-x-0 top-0"
      style={{
        y,
        scale,
        rotate,
        opacity,
        filter,
        zIndex,
        transformOrigin: "50% 38%",
        willChange: "transform, opacity, filter",
        maskImage,
        WebkitMaskImage: maskImage,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   Counter rail + dot progress
   ============================================================ */

function DeckRail({
  progress,
  total,
  label,
  cardLabels,
}: {
  progress: MotionValue<number>;
  total: number;
  label: string;
  cardLabels?: string[];
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  useMotionValueEvent(progress, "change", (p) => {
    const idx = Math.max(0, Math.min(total - 1, Math.floor(p * total + 0.0001)));
    setActiveIdx(idx);
  });

  const activeLabel = cardLabels?.[activeIdx] ?? String(activeIdx + 1).padStart(2, "0");
  const totalLabel = String(total).padStart(2, "0");

  return (
    <>
      {/* Top-left bracket label + counter */}
      <div className="pointer-events-none absolute inset-x-5 top-5 z-[50] flex items-center justify-between font-mono text-[10px] font-semibold uppercase tracking-[0.26em] sm:text-[11px]">
        <span style={{ color: "color-mix(in srgb, var(--color-accent) 88%, white)" }}>
          [ {label} ]
        </span>
        <span className="num text-[color-mix(in_srgb,var(--color-fg)_78%,transparent)]">
          <span style={{ color: "var(--color-accent)" }}>{activeLabel}</span>{" "}
          <span className="opacity-40">/ {totalLabel}</span>
        </span>
      </div>

      {/* Left edge dot column — one dot per card, cyan-filled up to current */}
      <ol
        className="pointer-events-none absolute inset-y-0 left-3 z-[50] m-0 flex list-none flex-col items-center justify-center gap-2 p-0"
        aria-hidden
      >
        {Array.from({ length: total }).map((_, i) => (
          <li
            key={i}
            className="block h-[6px] w-[6px] rounded-full transition-colors duration-300"
            style={{
              background:
                i <= activeIdx
                  ? "var(--color-accent)"
                  : "color-mix(in srgb, var(--color-fg) 18%, transparent)",
              boxShadow:
                i === activeIdx ? "0 0 10px var(--color-accent)" : undefined,
            }}
          />
        ))}
      </ol>

      {/* Bottom progress hairline */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute bottom-4 left-6 right-6 z-[50] h-px origin-left"
        style={{
          background:
            "linear-gradient(90deg, color-mix(in srgb, var(--color-accent) 85%, white), color-mix(in srgb, var(--color-accent) 45%, transparent))",
          scaleX: progress,
          boxShadow: "0 0 10px color-mix(in srgb, var(--color-accent) 60%, transparent)",
        }}
      />
    </>
  );
}

/* ============================================================
   Scroll hint — two small chevrons that fade out after the first card deals
   ============================================================ */

function ScrollHint({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.05, 0.18], [0.7, 0.55, 0]);
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-10 z-[50] flex flex-col items-center gap-1"
      style={{ opacity }}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-muted)]">
        scroll
      </span>
      <span className="block h-6 w-px rounded-full bg-[color-mix(in_srgb,var(--color-accent)_55%,transparent)]" />
    </motion.div>
  );
}

export default DealOutDeck;
