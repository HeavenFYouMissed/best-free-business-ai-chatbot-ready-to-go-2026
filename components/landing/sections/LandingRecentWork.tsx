"use client";

import Image from "next/image";

import { landingConfig } from "@/components/landing/config";
import { SectionHeader } from "@/components/landing/SectionHeader";
import { CornerPlus } from "@/components/landing/ui/CornerPlus";
import { Marquee } from "@/components/landing/ui/Marquee";

function WorkTile({
  image,
  title,
  platforms,
}: {
  image: string;
  title: string;
  platforms: readonly string[];
}) {
  return (
    <div className="group relative h-[200px] w-[320px] shrink-0 snap-start overflow-hidden rounded-xl border border-white/10 bg-[var(--color-ink)] transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25">
      <Image
        src={image}
        alt={`${title} — work shipped by Daniel Castellani`}
        fill
        sizes="320px"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-[color-mix(in_srgb,var(--color-bg)_25%,transparent)] to-transparent"
      />
      <div className="absolute inset-x-3 bottom-2.5 flex items-end justify-between gap-2">
        <span className="text-[13px] font-semibold leading-[1.2] tracking-tight text-white">
          {title}
        </span>
        <div className="flex shrink-0 gap-1">
          {platforms.slice(0, 2).map((p) => (
            <span
              key={p}
              className="inline-flex items-center rounded-full border border-white/15 bg-[color-mix(in_srgb,var(--color-bg)_85%,transparent)] px-1.5 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.16em] text-white/65 backdrop-blur-md"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LandingRecentWork() {
  const { recentWork } = landingConfig;
  // Single row, all items — auto-marquee on desktop, swipe-snap fallback on touch
  const items = recentWork.items;

  return (
    <section
      id="work"
      className="relative border-b border-white/5 py-20 md:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_60%_at_50%_0%,color-mix(in_srgb,var(--color-accent)_8%,transparent)_0%,transparent_60%)]"
      />
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center gap-10 px-0">
        <div className="px-6 md:px-10">
          <SectionHeader
            eyebrow={recentWork.eyebrow}
            title={recentWork.title}
            accentWord="real shipping"
            description={recentWork.description}
          />
        </div>

        {/* Engineering frame */}
        <div className="relative w-full text-white/15">
          <CornerPlus className="hidden md:block" />

          {/* Desktop: auto-marquee. Hidden on small screens. */}
          <div className="relative hidden w-full overflow-hidden md:block">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[var(--color-bg)] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[var(--color-bg)] to-transparent" />
            <Marquee durationMs={28000} repeat={3} pauseOnHover gap="0.875rem">
              {items.map((item) => (
                <WorkTile
                  key={item.slug}
                  image={item.image}
                  title={item.title}
                  platforms={item.platforms}
                />
              ))}
            </Marquee>
          </div>

          {/* Mobile: swipe scroll-snap. Users can flick through tiles directly. */}
          <div className="relative w-full md:hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[var(--color-bg)] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[var(--color-bg)] to-transparent" />
            <div
              className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              style={{ scrollPaddingLeft: 24 }}
              aria-label="Recent work — swipe horizontally"
            >
              {items.map((item) => (
                <WorkTile
                  key={item.slug}
                  image={item.image}
                  title={item.title}
                  platforms={item.platforms}
                />
              ))}
            </div>
            <div className="mt-2 flex items-center justify-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              <span className="inline-block h-1 w-6 rounded-full bg-white/30" />
              swipe
              <span className="inline-block h-1 w-6 rounded-full bg-white/30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
