"use client";

import dynamic from "next/dynamic";
import { marqueeItems, type MarqueeItem } from "@/data/marquee";
import { PlatformBadge } from "./PlatformBadge";
import { MarqueeTile } from "./MarqueeTile";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

const MarqueeRipples = dynamic(() => import("./MarqueeRipples"), { ssr: false });

function Row({ items, reverse = false }: { items: MarqueeItem[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-clip">
      <div className="marquee-mask">
        <div
          className="marquee-track"
          style={{ animationDirection: reverse ? "reverse" : undefined, animationDuration: reverse ? "48s" : "40s" }}
        >
          {doubled.map((item, i) => (
            <div key={`${item.id}-${i}`} className="shrink-0">
              {item.type === "platform" ? <PlatformBadge kind={item.kind} /> : <MarqueeTile item={item} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PlatformMarquee() {
  const a = marqueeItems.slice(0, Math.ceil(marqueeItems.length / 2));
  const b = marqueeItems.slice(Math.ceil(marqueeItems.length / 2));

  return (
    <section
      id="shelf"
      aria-label="Shipping real apps to stores"
      data-section-mode="dark"
      className="relative isolate overflow-hidden"
    >
      {/* Static CSS grid (fallback + cheap depth layer). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.22] sm:opacity-[0.28]"
        style={{
          backgroundImage:
            "linear-gradient(0deg, color-mix(in srgb, var(--color-accent) 18%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--color-accent) 18%, transparent) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, #000, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, #000, transparent 80%)",
        }}
      />
      {/* Live ripple shader — ambient wave + cursor/touch-driven ripples.
          Enabled on every viewport; on touch devices the WaveDistortion
          keeps the grid rippling autonomously and taps spawn CursorRipples. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] opacity-[0.55] mix-blend-screen">
        <MarqueeRipples />
      </div>
      <div className="relative z-[2]">
        <div className="container-x">
          <Reveal>
            <SectionLabel index="01" label="Shelf" />
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-3 max-w-[18ch] text-balance">Shipping real apps to stores.</h2>
          </Reveal>
        </div>

        <div className="mt-10 space-y-3">
          <Row items={a} />
          <Row items={b} reverse />
        </div>
      </div>
    </section>
  );
}
