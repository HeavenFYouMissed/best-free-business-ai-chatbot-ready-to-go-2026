"use client";

/**
 * Red [ WE VALUE YOUR DISCRETION ] brand marker.
 *
 * Single deliberate departure from the cyan monopoly — bright signal-red,
 * bracket typography, double-pulse dot with a scanning highlight sweep.
 * Reads as "confidentiality beacon," not as an error. Used on the homepage
 * near the submission flow + guarantee, and optionally on /built-for-you.
 *
 * Variants:
 *   - "inline"  — chip, sits in a row with other trust signals
 *   - "banner"  — full-width marker with a larger headline + sublabel
 *   - "stamp"   — tilted corner stamp, for layering over card art
 */

type Variant = "inline" | "banner" | "stamp";

type Props = {
  variant?: Variant;
  className?: string;
  /** Override the sublabel on banner/stamp variants. */
  sublabel?: string;
};

const RED = "#ff3b4d";
const RED_DEEP = "#b01525";

export function DiscretionBadge({ variant = "inline", className, sublabel }: Props) {
  if (variant === "banner") {
    return (
      <div
        role="note"
        aria-label="Discretion notice"
        className={`discretion-banner relative isolate overflow-hidden rounded-[var(--radius-md)] border px-4 py-3 md:px-5 md:py-3.5 ${className ?? ""}`}
        style={{
          borderColor: `color-mix(in srgb, ${RED} 55%, var(--color-border))`,
          background: `linear-gradient(135deg, color-mix(in srgb, ${RED} 14%, transparent) 0%, color-mix(in srgb, ${RED_DEEP} 8%, transparent) 55%, transparent 100%), color-mix(in srgb, var(--color-bg) 82%, transparent)`,
          boxShadow: `0 0 24px -8px color-mix(in srgb, ${RED} 55%, transparent), inset 0 0 0 1px color-mix(in srgb, ${RED} 22%, transparent)`,
        }}
      >
        <span
          aria-hidden
          className="discretion-sweep pointer-events-none absolute inset-0"
          style={{
            background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${RED} 35%, transparent), transparent)`,
            mixBlendMode: "screen",
          }}
        />
        <div className="relative flex flex-wrap items-center gap-3 md:gap-4">
          <span className="relative inline-flex h-[10px] w-[10px] shrink-0 items-center justify-center">
            <span
              aria-hidden
              className="discretion-dot-ping absolute inset-0 rounded-full"
              style={{ background: RED, boxShadow: `0 0 14px 2px ${RED}` }}
            />
            <span
              aria-hidden
              className="relative block h-[6px] w-[6px] rounded-full"
              style={{ background: "#ffb5be", boxShadow: `0 0 10px ${RED}` }}
            />
          </span>
          <span
            className="font-mono text-[10.5px] font-semibold uppercase leading-none tracking-[0.28em]"
            style={{ color: `color-mix(in srgb, ${RED} 85%, #ffd4d9)` }}
          >
            [ we value your discretion ]
          </span>
          <span className="hidden h-3 w-px bg-[color-mix(in_srgb,#ffd4d9_24%,transparent)] md:inline-block" />
          <span className="text-[12.5px] leading-snug text-[color-mix(in_srgb,#ffd4d9_82%,transparent)] md:text-[13px]">
            {sublabel ??
              "Customers stay anonymous by default. I never list clients, leak transcripts, or name who built what without permission."}
          </span>
        </div>
      </div>
    );
  }

  if (variant === "stamp") {
    return (
      <span
        aria-label="Discretion stamp"
        className={`discretion-stamp pointer-events-none absolute z-[3] inline-flex select-none items-center gap-1.5 rounded-[var(--radius-xs)] border px-2 py-1 text-[9.5px] font-semibold uppercase tracking-[0.22em] ${className ?? ""}`}
        style={{
          borderColor: RED,
          color: "#ffd4d9",
          background: `color-mix(in srgb, ${RED_DEEP} 60%, var(--color-bg))`,
          boxShadow: `0 0 14px -2px color-mix(in srgb, ${RED} 55%, transparent), inset 0 0 0 1px color-mix(in srgb, ${RED} 35%, transparent)`,
        }}
      >
        <span
          aria-hidden
          className="discretion-dot-ping inline-block h-[5px] w-[5px] rounded-full"
          style={{ background: RED, boxShadow: `0 0 8px ${RED}` }}
        />
        [ confidential ]
      </span>
    );
  }

  /* inline (default) */
  return (
    <span
      aria-label="Discretion notice"
      className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1 font-mono text-[10.5px] font-semibold uppercase leading-none tracking-[0.22em] ${className ?? ""}`}
      style={{
        borderColor: `color-mix(in srgb, ${RED} 55%, var(--color-border))`,
        background: `color-mix(in srgb, ${RED_DEEP} 22%, var(--color-bg))`,
        color: "#ffd4d9",
      }}
    >
      <span
        aria-hidden
        className="discretion-dot-ping inline-block h-[5px] w-[5px] shrink-0 rounded-full"
        style={{ background: RED, boxShadow: `0 0 8px ${RED}` }}
      />
      <span className="whitespace-nowrap">[&nbsp;discretion&nbsp;]</span>
    </span>
  );
}

export default DiscretionBadge;
