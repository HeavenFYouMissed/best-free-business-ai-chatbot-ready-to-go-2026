"use client";

const groups = [
  { label: "send as", items: ["Live URL", "GitHub repo", "Direct files"] },
  { label: "ai", items: ["Lovable", "Bolt", "v0", "Cursor", "Codex", "Replit"] },
  { label: "frameworks", items: ["Next.js", "Vite", "Svelte", "Astro", "Remix", "Vue", "HTML/CSS/JS"] },
  { label: "native", items: ["React Native", "Flutter", "Expo"] },
  { label: "visual", items: ["Framer", "Webflow"] },
];

function toTrackItems() {
  return groups.flatMap((g) => [
    { type: "divider" as const, label: g.label },
    ...g.items.map((name) => ({ type: "pill" as const, name })),
  ]);
}

/**
 * Square, terminal-style pill: left cyan status bar + body.
 * The flicker cycles *only the left bar* from dim → bright, never the whole
 * border — reads as a status LED, not a blinking Christmas-light wall.
 */
function Pill({ name, index }: { name: string; index: number }) {
  /** Randomised so no two adjacent pills pulse together. */
  const delay = (index * 0.61) % 18;
  const duration = 10 + ((index * 1.13) % 8);
  return (
    <span
      className="tools-pill relative shrink-0 overflow-hidden rounded-[4px] border border-white/10 bg-[color-mix(in_srgb,#0a0e18_72%,transparent)] pl-2.5 pr-2.5 py-1.5 text-[12px] font-medium tracking-tight text-[color-mix(in_srgb,var(--color-fg)_80%,transparent)] backdrop-blur-sm transition-[border-color,color] duration-200 md:hover:border-white/30 md:hover:text-[var(--color-fg)]"
    >
      <span
        aria-hidden
        className="tools-pill-bar absolute inset-y-0 left-0 w-[2px] bg-[color-mix(in_srgb,var(--color-accent)_55%,transparent)]"
        style={{
          animation: `pill-bar-pulse ${duration}s ease-in-out ${delay}s infinite`,
        }}
      />
      <span className="relative z-[1] pl-1.5">{name}</span>
    </span>
  );
}

function MarqueeRow({
  items,
  dir,
  durationSec,
  offset,
}: {
  items: ReturnType<typeof toTrackItems>;
  dir: "fwd" | "rev";
  durationSec: number;
  offset: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-clip py-1">
      <div className="marquee-mask">
        <div
          className="flex w-max gap-2"
          style={{
            animation: `marquee ${durationSec}s linear infinite`,
            animationDirection: dir === "rev" ? "reverse" : "normal",
          }}
        >
          {doubled.map((item, i) =>
            item.type === "divider" ? (
              <span
                key={`${dir}-d-${i}`}
                className="flex shrink-0 items-center px-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-subtle)]"
                aria-hidden
              >
                │
              </span>
            ) : (
              <Pill key={`${dir}-p-${i}-${item.name}`} name={item.name} index={offset + i} />
            )
          )}
        </div>
      </div>
    </div>
  );
}

export function ToolLogos() {
  const all = toTrackItems();
  const mid = Math.ceil(all.length / 2);
  const rowA = all.slice(0, mid);
  const rowB = all.slice(mid);

  return (
    <div className="relative z-[2] mt-8">
      <div className="mono-label mb-3">[ works with anything ]</div>
      <div className="flex flex-col gap-2">
        <MarqueeRow items={rowA} dir="fwd" durationSec={52} offset={0} />
        <MarqueeRow items={rowB} dir="rev" durationSec={58} offset={31} />
      </div>
    </div>
  );
}
