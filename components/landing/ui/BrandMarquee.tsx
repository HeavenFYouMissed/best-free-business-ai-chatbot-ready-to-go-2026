import { Marquee } from "@/components/landing/ui/Marquee";

/**
 * Scrolling brand banner — re-usable horizontal text marquee.
 *
 * Position controls vertical/typographic scale:
 *   - hero:    slim outline, sits at the very top of the page between
 *              the StickyNav and the hero badge.
 *   - rail:    a slim mid-page divider — outline stroke, slightly larger
 *              than hero, used between content sections to give the page
 *              architecture and reinforce the brand voice.
 *   - top:     fills empty space above the closing Spline cubes on mobile.
 *   - bottom:  large editorial filled wordmark — page sign-off.
 *
 * Tone controls the accent color of the dot punctuation + outline tint:
 *   - cyan   (default): brand cyan accent (#00d4ff).
 *   - signal:           warm signal-orange (`--color-signal`, #ff6b3d). Use
 *                       sparingly — works around pricing / rescue / urgency
 *                       moments where you want a heat shift.
 *   - mono:             white only, no accent dot color shift. Use for
 *                       neutral mid-page rails.
 *
 * Phrases default to the brand chant; pass a custom array to localize a
 * banner to its surrounding section.
 */

export type BrandMarqueePosition = "hero" | "rail" | "top" | "bottom" | "ghost";
export type BrandMarqueeTone = "cyan" | "signal" | "mono";

const DEFAULT_PHRASES = [
  "PUBLISHD",
  "SHIP DATES NOT EXCUSES",
  "SENIOR ENGINEER FOR HIRE",
  "REPLY < 6 HOURS",
  "FLAT FEES NO RETAINERS",
  "CONNECTICUT · WORLDWIDE",
];

// IMPORTANT: these strings are passed straight into inline `style={{}}`
// (NOT Tailwind class names), so they must use real CSS spaces. Tailwind's
// underscore-as-space convention only applies to arbitrary class values
// like `text-[color-mix(in_srgb,...)]`. Mixing them here yields invalid
// CSS and makes the text disappear entirely (only the dots render).
const TONE_DOT: Record<BrandMarqueeTone, string> = {
  cyan: "var(--color-accent)",
  signal: "var(--color-signal, #ff6b3d)",
  mono: "color-mix(in srgb, var(--color-fg) 60%, transparent)",
};

const TONE_STROKE: Record<BrandMarqueeTone, string> = {
  cyan: "color-mix(in srgb, var(--color-fg) 28%, transparent)",
  signal: "color-mix(in srgb, var(--color-signal, #ff6b3d) 60%, transparent)",
  mono: "color-mix(in srgb, var(--color-fg) 22%, transparent)",
};

const TONE_FILL: Record<BrandMarqueeTone, string> = {
  cyan: "color-mix(in srgb, var(--color-fg) 18%, transparent)",
  signal: "color-mix(in srgb, var(--color-signal, #ff6b3d) 36%, transparent)",
  mono: "color-mix(in srgb, var(--color-fg) 15%, transparent)",
};

export function BrandMarquee({
  position,
  tone = "cyan",
  phrases = DEFAULT_PHRASES,
  reverse,
}: {
  position: BrandMarqueePosition;
  tone?: BrandMarqueeTone;
  phrases?: string[];
  reverse?: boolean;
}) {
  const isBottom = position === "bottom";
  const isHero = position === "hero";
  const isRail = position === "rail";
  const isGhost = position === "ghost";

  const containerCls = (() => {
    if (isGhost) {
      // Absolute-positioned ghost layer — caller wraps with relative parent
      // and sets z-index. Sits behind hero content as scrolling backdrop text.
      return "pointer-events-none absolute inset-x-0 top-0 select-none overflow-hidden";
    }
    if (isHero) {
      return "pointer-events-none relative -mt-1 select-none overflow-hidden border-b border-white/5 py-3 md:py-4";
    }
    if (isRail) {
      return "pointer-events-none relative select-none overflow-hidden border-y border-white/5 py-4 md:py-5";
    }
    if (isBottom) {
      return "pointer-events-none relative mt-12 select-none overflow-hidden md:mt-20";
    }
    return "pointer-events-none relative mb-10 select-none overflow-hidden md:mb-16";
  })();

  const stroke = TONE_STROKE[tone];
  const fill = TONE_FILL[tone];

  // Per-position typography. Filled (bottom + ghost) vs outlined.
  const phraseStyle: React.CSSProperties =
    isBottom || isGhost
      ? { color: fill }
      : { color: "transparent", WebkitTextStroke: `1px ${stroke}` };

  const phraseSize = (() => {
    if (isHero) return "text-[clamp(1.1rem,3.5vw,2.4rem)]";
    if (isRail) return "text-[clamp(1.4rem,4.5vw,3rem)]";
    if (isBottom) return "text-[clamp(3rem,11vw,9rem)]";
    if (isGhost) return "text-[clamp(3rem,12vw,9rem)]";
    return "text-[clamp(2rem,7vw,5rem)]";
  })();

  const phraseGap = (() => {
    if (isHero) return "gap-6";
    if (isRail) return "gap-8";
    if (isBottom) return "gap-12";
    if (isGhost) return "gap-12";
    return "gap-8";
  })();

  // Default reverse: rails alternate by their slot, hero/bottom go right→left
  // (which means non-reversed in our marquee).
  const computedReverse =
    reverse ?? (!isHero && !isBottom && !isRail ? true : false);

  // Slower scroll for larger banners so the eye can read.
  const durationMs = isBottom
    ? 36000
    : isGhost
      ? 42000
      : isRail
        ? 28000
        : isHero
          ? 32000
          : 26000;

  const dotColor = TONE_DOT[tone];

  return (
    <div aria-hidden="true" className={containerCls}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[var(--color-bg)] to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[var(--color-bg)] to-transparent sm:w-24" />

      <Marquee
        durationMs={durationMs}
        repeat={3}
        pauseOnHover={false}
        gap={
          isHero
            ? "1.75rem"
            : isRail
              ? "2.25rem"
              : isGhost
                ? "3.5rem"
                : "3rem"
        }
        reverse={computedReverse}
      >
        {phrases.map((phrase) => (
          <span
            key={phrase}
            className={`inline-flex items-center ${phraseGap} ${phraseSize} font-semibold uppercase leading-none tracking-[-0.03em]`}
            style={phraseStyle}
          >
            {phrase}
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
              style={{
                background: dotColor,
                boxShadow:
                  tone === "mono"
                    ? "none"
                    : `0 0 10px ${dotColor}`,
              }}
            />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
