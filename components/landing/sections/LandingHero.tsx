"use client";

/**
 * LandingHero — built from the Mobile template's 5-phone parallax hero
 * (`magicuidesign-mobile-template/src/components/sections/hero.tsx`) plus the
 * Startup template's `text-shimmer` badge + animated entrance pattern from
 * `dillionverma-startup-template/components/landing/hero-section.tsx`.
 *
 * The 5 "phones" are the user's actual Recent Work screenshots, so the hero
 * IS the social proof. No more static grid hidden below the fold.
 *
 * The cobe Globe sits BEHIND the parallax row (z-0) — it gets the user
 * scrolling and adds depth the device cards alone can't.
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Wrench } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

import { landingConfig } from "@/components/landing/config";
import { BorderBeam } from "@/components/landing/ui/BorderBeam";
import { BrandMarquee } from "@/components/landing/ui/BrandMarquee";
import { IphoneFrame } from "@/components/ui/IphoneFrame";
import TextShimmer from "@/components/landing/ui/TextShimmer";
import { WordRotate } from "@/components/landing/ui/WordRotate";

// Globe is heavy WebGL — keep it client-only and lazy.
const Globe = dynamic(
  () => import("@/components/landing/ui/Globe").then((m) => m.Globe),
  { ssr: false },
);

const ease = [0.16, 1, 0.3, 1] as const;
const easeInOutCubic = [0.65, 0, 0.35, 1] as const;

// Pull the 5 most representative screenshots for the parallax row.
const HERO_DEVICES = [
  {
    src: "/work/superclaw-chat.png",
    alt: "Superclaw chat",
    aspect: "portrait" as const,
  },
  {
    src: "/work/public-secrets.png",
    alt: "Public Secrets app",
    aspect: "portrait" as const,
  },
  {
    src: "/work/ai-builder.png",
    alt: "AI app builder dashboard",
    aspect: "landscape" as const,
  },
  {
    src: "/work/superclawhub-dashboard.png",
    alt: "Superclaw Hub operator dashboard",
    aspect: "landscape" as const,
  },
  {
    src: "/work/model-surgery.png",
    alt: "Model Surgery — AI workbench",
    aspect: "landscape" as const,
  },
];

export function LandingHero() {
  const { hero } = landingConfig;

  // Mobile template parallax: each device row floats up at a different rate
  // as the page scrolls. Five separate Y curves so the row "settles" together.
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [100, 0]);
  const y2 = useTransform(scrollY, [0, 300], [60, 0]);
  const y3 = useTransform(scrollY, [0, 300], [0, 0]);
  const y4 = useTransform(scrollY, [0, 300], [60, 0]);
  const y5 = useTransform(scrollY, [0, 300], [100, 0]);
  const yArr = [y1, y2, y3, y4, y5];

  return (
    <section
      id="hero"
      className="section--no-edge-mask relative w-full overflow-hidden pb-12 pt-6 md:pt-10"
    >
      {/* Backdrop spotlight + faint dot grid (Codeforge engineering aesthetic) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 [background:radial-gradient(120%_80%_at_50%_0%,color-mix(in_srgb,var(--color-accent)_22%,transparent)_0%,transparent_55%)]" />
      </div>

      {/* Ghost wordmark banner — giant scrolling text BEHIND the badge,
          tucked at the very top of the hero. Sits at z-0 (behind content
          which sits at z-10) but above the spotlight backdrop. Faded fill
          so it reads as architectural typography, not a competing line. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[clamp(3.5rem,9vw,7rem)]">
        <BrandMarquee position="ghost" />
        {/* Bottom dissolve so the ghost text fades smoothly into the badge */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-[var(--color-bg)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[80rem] px-6 pt-[clamp(2.25rem,7vw,5rem)] text-center md:px-8">
        {/* Animated badge — Startup template `animate-fade-in` shimmer */}
        <div
          className="group inline-flex h-7 -translate-y-4 animate-fade-in items-center justify-between gap-1 rounded-full border border-white/12 bg-white/5 px-3 text-xs text-white/70 opacity-0 backdrop-blur-md transition-all hover:cursor-pointer hover:bg-white/10"
          style={{ "--animation-delay": "0ms" } as React.CSSProperties}
        >
          <span className="inline-flex items-center justify-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)]" />
            <TextShimmer className="inline-flex items-center justify-center text-[11px] uppercase tracking-[0.18em]">
              2 of 4 Q1 spots filled · booking now
            </TextShimmer>
            <ArrowRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </span>
        </div>

        {/* Headline — Startup template fade-in + brand cyan rotator */}
        <h1
          className="-translate-y-4 animate-fade-in text-balance bg-gradient-to-br from-white from-30% to-white/50 bg-clip-text py-6 text-5xl font-semibold leading-[0.96] tracking-[-0.045em] text-transparent opacity-0 sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          style={{ "--animation-delay": "200ms" } as React.CSSProperties}
        >
          Senior Engineer
          <br className="hidden sm:block" />{" "}
          <span className="inline-flex items-baseline gap-3">
            <span>Who Will</span>
            <WordRotate
              words={["Build", "Fix", "Ship", "Rescue"]}
              durationMs={2200}
              className="font-semibold text-[var(--color-accent)] [text-shadow:0_0_28px_color-mix(in_srgb,var(--color-accent)_55%,transparent)] [-webkit-text-fill-color:var(--color-accent)]"
            />
          </span>
          <br />
          Your Software.
        </h1>

        <p
          className="mb-10 -translate-y-4 animate-fade-in text-balance text-base leading-relaxed tracking-tight text-white/65 opacity-0 md:text-lg"
          style={{ "--animation-delay": "400ms" } as React.CSSProperties}
        >
          {hero.description}
        </p>

        {/* CTA pair */}
        <div
          className="flex -translate-y-4 animate-fade-in flex-col items-center justify-center gap-3 opacity-0 sm:flex-row"
          style={{ "--animation-delay": "600ms" } as React.CSSProperties}
        >
          <Link
            href={hero.primaryCta.href}
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-6 text-[14.5px] font-semibold tracking-tight text-[#001018] shadow-[0_18px_50px_-18px_color-mix(in_srgb,var(--color-accent)_85%,transparent)] transition-all duration-200 hover:translate-y-[-1px] hover:bg-[color-mix(in_srgb,var(--color-accent)_92%,white)] active:scale-[0.98]"
          >
            <span className="font-mono text-[#001018]/80">&gt;_</span>
            {hero.primaryCta.text}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href={hero.secondaryCta.href}
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 text-[14.5px] font-semibold tracking-tight text-white backdrop-blur-md transition-all duration-200 hover:border-white/25 hover:bg-white/10 active:scale-[0.98]"
          >
            <Wrench className="h-4 w-4 text-[var(--color-accent)]" />
            {hero.secondaryCta.text}
          </Link>
        </div>

        {/* Status strip */}
        <div
          className="mt-6 flex -translate-y-4 animate-fade-in flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/50 opacity-0"
          style={{ "--animation-delay": "800ms" } as React.CSSProperties}
        >
          <span className="inline-flex items-center gap-1.5">
            <span
              className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"
              style={{ animation: "status-dot-pulse 2.6s ease-in-out infinite" }}
            />
            Available now
          </span>
          <span aria-hidden="true">·</span>
          <span>Reply &lt; 6 hrs</span>
          <span aria-hidden="true">·</span>
          <span>Connecticut, USA</span>
        </div>

        {/* === Globe + 5-device parallax row ===
            Globe sits behind the device row at the same vertical, scaled to
            fill the row's height. On mobile it sits a touch smaller so the
            device cards stay the visual hero. */}
        <div className="relative mt-16 md:mt-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative h-[60vw] max-h-[520px] w-[60vw] max-w-[520px] sm:h-[44vw] sm:w-[44vw] md:h-[480px] md:w-[480px]">
              <Globe className="opacity-[0.55] [mask-image:radial-gradient(closest-side,black_55%,transparent_92%)]" />
            </div>
          </div>

          <div
            className="relative z-10 flex animate-fade-up flex-nowrap items-end justify-center gap-3 opacity-0 select-none sm:gap-6 md:gap-8"
            style={{ "--animation-delay": "1000ms" } as React.CSSProperties}
          >
            {HERO_DEVICES.map((device, i) => (
              <DeviceCard key={device.src} device={device} y={yArr[i]} index={i} />
            ))}
          </div>
        </div>

        {/* Bottom dissolve so the parallax doesn't hard-edge into the next section */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--color-bg)] via-[color-mix(in_srgb,var(--color-bg)_60%,transparent)] to-transparent"
        />
      </div>
    </section>
  );
}

function DeviceCard({
  device,
  y,
  index,
}: {
  device: (typeof HERO_DEVICES)[number];
  y: ReturnType<typeof useTransform<number, number>>;
  index: number;
}) {
  const isPortrait = device.aspect === "portrait";
  // Initial offset for the entrance: outer cards push in from the sides.
  const xOffsets = [-180, -90, 0, 90, 180];

  // Portrait devices get wrapped in the premium iPhone bezel from the
  // Cruip Appy template (see components/ui/IphoneFrame.tsx). Landscape
  // dashboards stay in their plain rounded-card surface.
  if (isPortrait) {
    return (
      <motion.div
        initial={{ opacity: 0, x: xOffsets[index], y: 30 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1.1, delay: 1.1 + index * 0.08, ease: easeInOutCubic }}
        style={{ y }}
        className="relative w-[44vw] max-w-[200px] sm:w-[140px] md:w-[180px]"
      >
        <IphoneFrame
          src={device.src}
          alt={device.alt}
          sizes="(max-width: 640px) 44vw, (max-width: 1024px) 140px, 180px"
          priority={index === 2}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: xOffsets[index], y: 30 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 1.1, delay: 1.1 + index * 0.08, ease: easeInOutCubic }}
      style={{ y }}
      className="relative w-[58vw] max-w-[260px] overflow-hidden rounded-xl border border-white/12 bg-[var(--color-ink)] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] sm:w-[180px] md:w-[230px]"
    >
      <Image
        src={device.src}
        alt={device.alt}
        width={800}
        height={500}
        sizes="(max-width: 640px) 58vw, (max-width: 1024px) 180px, 230px"
        className="block h-auto w-full"
        priority={index === 2}
      />
      {/* Animated border-beam only on the centerpiece — Startup template trick */}
      {index === 2 && (
        <BorderBeam size={140} duration={9} colorFrom="#00d4ff" colorTo="#7cf0d4" />
      )}
    </motion.div>
  );
}
