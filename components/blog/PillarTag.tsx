import { PILLARS, type PillarSlug } from "@/lib/blog-pillars";

export function PillarTag({ pillar, size = "default" }: { pillar: PillarSlug; size?: "default" | "small" }) {
  const meta = PILLARS[pillar];
  const padding = size === "small" ? "px-2 py-[2px] text-[10.5px]" : "px-2.5 py-[3px] text-[11px]";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[var(--radius-xs)] border border-[color-mix(in_srgb,var(--color-border-strong)_80%,transparent)] bg-[color-mix(in_srgb,var(--color-ink)_75%,transparent)] uppercase tracking-[0.14em] text-[var(--color-muted)] ${padding}`}
    >
      <span
        aria-hidden
        className="block h-1.5 w-1.5 rounded-full"
        style={{ background: meta.accent, boxShadow: `0 0 8px ${meta.accent}` }}
      />
      {meta.label}
    </span>
  );
}
