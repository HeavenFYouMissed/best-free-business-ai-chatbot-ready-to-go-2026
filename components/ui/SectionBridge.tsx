type Props = {
  from?: string;
  to?: string;
  /** Mid-stop color for a stronger blend between sections (legacy API, still honored). */
  via?: string;
  className?: string;
  /**
   * Sharp 3-stop "cut" transition: dark → 1px cyan pixel-grid strip → bright.
   * Reads as a hard scene-cut, not a soft blur. Default true.
   */
  snap?: boolean;
};

/**
 * Section-to-section bridge. Two modes:
 *  - `snap` (default) — hard 40px cut with a 1px cyan pixel-grid stripe in the
 *    middle. Signals mode-change between dark/peak sections.
 *  - legacy soft gradient (via / from / to) — kept for ProblemFix → HowItWorks
 *    style longer fades.
 */
export function SectionBridge({
  from = "transparent",
  to = "transparent",
  via,
  className,
  snap = true,
}: Props) {
  if (!snap) {
    const mid = via ?? "transparent";
    return (
      <div
        aria-hidden
        className={`section-bridge pointer-events-none relative z-0 ${className ?? ""}`}
        style={{
          mixBlendMode: "screen",
          background: `linear-gradient(180deg, ${from} 0%, ${mid} 50%, ${to} 100%)`,
        }}
      />
    );
  }

  return (
    <div
      aria-hidden
      className={`section-bridge relative z-0 h-10 w-full overflow-hidden ${className ?? ""}`}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[18px]"
        style={{
          background: `linear-gradient(180deg, ${from} 0%, color-mix(in srgb, var(--color-bg) 80%, transparent) 100%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-[19px] h-px"
        style={{
          background:
            "repeating-linear-gradient(90deg, color-mix(in srgb, var(--color-accent) 92%, white) 0 3px, transparent 3px 6px)",
          boxShadow: "0 0 12px 1px color-mix(in srgb, var(--color-accent) 55%, transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[18px]"
        style={{
          background: `linear-gradient(180deg, color-mix(in srgb, var(--color-bg) 80%, transparent) 0%, ${to} 100%)`,
        }}
      />
    </div>
  );
}
