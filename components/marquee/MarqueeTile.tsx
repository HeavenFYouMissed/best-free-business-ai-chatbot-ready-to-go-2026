"use client";

import type { MarqueeTileItem } from "@/data/marquee";

export function MarqueeTile({ item }: { item: MarqueeTileItem }) {
  return (
    <div
      aria-hidden
      className="group relative grid h-20 w-20 place-items-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[linear-gradient(180deg,#141419,#0c0c10)] transition-all duration-300 hover:border-[color-mix(in_srgb,var(--color-accent)_50%,var(--color-border))]"
    >
      <div className="absolute inset-0 rounded-[inherit] bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--color-accent)_35%,transparent),transparent_70%)] opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
      <Motif motif={item.motif} />
    </div>
  );
}

function Motif({ motif }: { motif: MarqueeTileItem["motif"] }) {
  const stroke = "color-mix(in srgb, var(--color-fg) 78%, transparent)";
  const fill = "color-mix(in srgb, var(--color-fg) 20%, transparent)";
  const style = {
    stroke,
    fill: "none",
    strokeWidth: 1.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const size = 40;
  const half = size / 2;

  switch (motif) {
    case "rings":
      return (
        <svg width={size} height={size} viewBox="0 0 40 40">
          <circle cx={half} cy={half} r="14" {...style} opacity="0.35" />
          <circle cx={half} cy={half} r="9" {...style} opacity="0.6" />
          <circle cx={half} cy={half} r="4" {...style} fill={fill} />
        </svg>
      );
    case "grid":
      return (
        <svg width={size} height={size} viewBox="0 0 40 40">
          {[6, 14, 22, 30].map((x) =>
            [6, 14, 22, 30].map((y) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="1" fill={stroke} />
            ))
          )}
          <rect x="12" y="12" width="16" height="16" {...style} />
        </svg>
      );
    case "wave":
      return (
        <svg width={size} height={size} viewBox="0 0 40 40">
          <path d="M4 22 Q10 10, 20 22 T36 22" {...style} />
          <path d="M4 28 Q10 16, 20 28 T36 28" {...style} opacity="0.4" />
        </svg>
      );
    case "orbit":
      return (
        <svg width={size} height={size} viewBox="0 0 40 40">
          <ellipse cx={half} cy={half} rx="16" ry="6" {...style} opacity="0.5" />
          <ellipse cx={half} cy={half} rx="6" ry="16" {...style} opacity="0.5" />
          <circle cx={half} cy={half} r="3" fill={stroke} />
        </svg>
      );
    case "bars":
      return (
        <svg width={size} height={size} viewBox="0 0 40 40">
          <rect x="8" y="20" width="3" height="12" fill={stroke} />
          <rect x="14" y="14" width="3" height="18" fill={stroke} />
          <rect x="20" y="8" width="3" height="24" fill={stroke} />
          <rect x="26" y="16" width="3" height="16" fill={stroke} />
        </svg>
      );
    case "prism":
      return (
        <svg width={size} height={size} viewBox="0 0 40 40">
          <polygon points="20,6 34,30 6,30" {...style} />
          <line x1="20" y1="6" x2="20" y2="30" {...style} opacity="0.4" />
        </svg>
      );
    case "crescent":
      return (
        <svg width={size} height={size} viewBox="0 0 40 40">
          <path d="M28 8 A14 14 0 1 0 28 32 A10 10 0 1 1 28 8 Z" {...style} fill={fill} />
        </svg>
      );
    case "halo":
      return (
        <svg width={size} height={size} viewBox="0 0 40 40">
          <circle cx={half} cy={half} r="12" {...style} />
          <path d="M4 20 Q20 34, 36 20" {...style} />
        </svg>
      );
    case "mono":
      return (
        <svg width={size} height={size} viewBox="0 0 40 40">
          <rect x="8" y="8" width="24" height="24" {...style} />
          <rect x="12" y="12" width="16" height="16" {...style} opacity="0.5" />
        </svg>
      );
    case "pulse":
      return (
        <svg width={size} height={size} viewBox="0 0 40 40">
          <path d="M4 22 H12 L16 10 L22 32 L26 22 H36" {...style} />
        </svg>
      );
    default:
      return null;
  }
}
