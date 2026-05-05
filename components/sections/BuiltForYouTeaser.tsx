"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { HeadlineSplit } from "@/components/hero/HeadlineSplit";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ShipButton } from "@/components/ui/ShipButton";

const LostRays2 = dynamic(
  () => import("@/components/shaders/presets/LostRays2").then((m) => m.LostRays2),
  { ssr: false }
);

const OrbShader = dynamic(
  () => import("./OrbShader").then((m) => m.OrbShader),
  { ssr: false }
);

/**
 * Built-For-You portal — the "not just apps" beat on the homepage.
 * One Lost Rays 2 shader canvas + three cursor-tracked glass orbs + a
 * kinetic word cycler + one pulsing ShipButton. Slots between
 * PlatformMarquee and ProblemFix so anyone thinking "this is an app-store
 * shop" gets corrected before they bounce.
 *
 * Design notes / why this is the hard way:
 *   - Single <Shader> canvas, zero RTT stacking, IntersectionObserver-gated
 *     so it only boots when the section is near the viewport.
 *   - Glass orbs are CSS radial-gradient + backdrop-blur — no extra shader
 *     instances. Cursor parallax uses springed motion values (same system
 *     as TierCard tilt, so it feels native).
 *   - Word cycler animates via CSS keyframes (portal-word-cycle), not JS
 *     intervals — keeps the main thread free while the shader renders.
 *   - Mobile: orbs stack into a 3-row column, headline re-flows, the
 *     shader aspect re-anchors, word cycler stays horizontal.
 */

type OrbKey = "sites" | "chatbots" | "polish";

const orbs: Array<{
  key: OrbKey;
  label: string;
  price: string;
  tagline: string;
  href: string;
  // fractional placement on desktop
  pos: { x: number; y: number };
}> = [
  {
    key: "sites",
    label: "Sites",
    price: "$499+",
    tagline: "premium from simplicity",
    href: "/built-for-you#sites",
    pos: { x: 0.18, y: 0.32 },
  },
  {
    key: "chatbots",
    label: "Chatbots",
    price: "$399+",
    tagline: "they take action",
    href: "/built-for-you#chatbots",
    pos: { x: 0.82, y: 0.28 },
  },
  {
    key: "polish",
    label: "Polish",
    price: "$199",
    tagline: "icons · shots · copy",
    href: "/built-for-you#polish",
    pos: { x: 0.5, y: 0.76 },
  },
];

const CYCLE_WORDS = ["SITES", "CHATBOTS", "POLISH", "CUSTOM"];

export function BuiltForYouTeaser() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  /* Cursor parallax — orbs drift slightly toward the cursor in the opposite
     direction for a parallax-depth feel, plus the shader center shifts. */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 80, damping: 22, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 80, damping: 22, mass: 0.6 });

  function onMove(e: React.PointerEvent<HTMLElement>) {
    if (e.pointerType !== "mouse") return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  /* Scroll-linked entry — headline scales up + orbs disperse as you scroll
     through the section, wordmark shrinks slightly as you exit */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const headlineScale = useTransform(scrollYProgress, [0, 0.35, 0.75, 1], [0.95, 1, 1, 0.97]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.2, 0.78, 1], [0, 1, 1, 0.5]);

  /* Cycling word index (CSS handles the animation itself; this just
     keeps the visible word up-to-date for screen readers). */
  const [cycleIdx, setCycleIdx] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setCycleIdx((i) => (i + 1) % CYCLE_WORDS.length);
    }, 1800);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <section
      ref={sectionRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      aria-labelledby="bfy-teaser-headline"
      className="relative isolate overflow-hidden"
      style={{ minHeight: "clamp(640px, 90vh, 1000px)" }}
    >
      {/* Background shader — pinned full-bleed behind everything */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="h-full w-full">
          <LostRays2 className="h-full w-full" />
        </div>
      </div>

      {/* Vignette — wider on mobile so orbs stay inside the lit area */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: [
            "radial-gradient(ellipse 130% 90% at 50% 50%, transparent 0%, color-mix(in srgb, var(--color-bg) 65%, transparent) 88%)",
            "linear-gradient(180deg, color-mix(in srgb, var(--color-bg) 55%, transparent) 0%, transparent 18%, transparent 82%, color-mix(in srgb, var(--color-bg) 70%, transparent) 100%)",
          ].join(", "),
        }}
      />

      {/* Thin cyan grid overlay — reads as architecture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.12] md:opacity-[0.18]"
        style={{
          backgroundImage: [
            "linear-gradient(90deg, color-mix(in srgb, var(--color-accent) 40%, transparent) 1px, transparent 1px)",
            "linear-gradient(0deg, color-mix(in srgb, var(--color-accent) 40%, transparent) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 70% 50% at 50% 50%, #000 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 50% at 50% 50%, #000 0%, transparent 70%)",
        }}
      />

      {/* Desktop orbs — absolute, cursor-parallaxed */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[2] hidden md:block">
        {orbs.map((orb, i) => (
          <Orb key={orb.key} orb={orb} index={i} mx={smx} my={smy} />
        ))}
      </div>

      {/* Content — centered */}
      <div className="relative z-[3] flex min-h-[inherit] flex-col items-center justify-center px-5 py-24 md:py-32">
        <Reveal>
          <SectionLabel index="02" label="Built for you" />
        </Reveal>

        <motion.h2
          id="bfy-teaser-headline"
          style={{ scale: reduce ? 1 : headlineScale, opacity: reduce ? 1 : headlineOpacity }}
          className="mt-6 text-center font-semibold leading-[0.92] tracking-[-0.035em] text-balance"
        >
          <span className="block text-[44px] sm:text-[64px] md:text-[84px] lg:text-[104px]">
            <HeadlineSplit text="Beyond the app." accentWord="app." />
          </span>
        </motion.h2>

        {/* Kinetic word cycler — vertical flipboard with scanline */}
        <div className="mt-8 flex items-center gap-3 md:mt-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color-mix(in_srgb,var(--color-accent)_85%,white)] md:text-[12.5px]">
            [ also shipped ]
          </span>
          <span
            aria-hidden
            className="h-5 w-px bg-[color-mix(in_srgb,var(--color-accent)_35%,transparent)] md:h-6"
          />
          <div
            className="relative h-[22px] overflow-hidden md:h-[26px]"
            aria-live="polite"
            aria-label={`also shipped ${CYCLE_WORDS[cycleIdx].toLowerCase()}`}
          >
            <ul
              className="flex flex-col"
              style={{
                animation: reduce
                  ? undefined
                  : "portal-flip 7.2s steps(1, end) infinite",
              }}
            >
              {CYCLE_WORDS.map((w) => (
                <li
                  key={w}
                  className="num h-[22px] min-w-[9ch] font-mono text-[14px] font-semibold uppercase leading-[22px] tracking-[0.18em] text-[var(--color-fg)] md:h-[26px] md:text-[16px] md:leading-[26px]"
                >
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile orb row — real shader orbs, compact but premium */}
        <ul className="mt-10 flex w-full max-w-[440px] items-center justify-center gap-3 md:hidden">
          {orbs.map((orb, i) => (
            <li key={orb.key} className="flex-1">
              <MobileOrb orb={orb} index={i} />
            </li>
          ))}
        </ul>

        <Reveal delay={180}>
          <p className="mt-10 max-w-[52ch] text-center text-[15.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_82%,transparent)] md:text-[17px]">
            Publishd isn&apos;t just the store submission. I also ship sites, chatbots, and app polish — same
            one builder, same bar, same flat fee.
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <ShipButton href="/built-for-you" size="large">
              Open the catalog
              <ArrowRight className="icon" aria-hidden />
            </ShipButton>
            <Link
              href="/built-for-you#start"
              className="btn btn--glass inline-flex min-h-[44px] items-center px-5 py-3 text-[14px] font-medium"
            >
              or start a project
              <ArrowRight className="icon opacity-80" aria-hidden />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   MobileOrb — compact shader sphere (touch, no cursor parallax)
   ============================================================ */

function MobileOrb({ orb, index }: { orb: (typeof orbs)[number]; index: number }) {
  return (
    <Link
      href={orb.href}
      className="group relative block"
      aria-label={`${orb.label} · ${orb.price} · ${orb.tagline}`}
    >
      <div
        className="relative mx-auto flex aspect-square w-full max-w-[130px] items-center justify-center rounded-full transition-transform duration-300 ease-out active:scale-[0.96]"
        style={{ animation: `portal-orb-float 7s ease-in-out ${index * 0.9}s infinite` }}
      >
        {/* Real water-ripple shader inside, clipped to circle */}
        <span
          aria-hidden
          className="absolute inset-0 overflow-hidden rounded-full"
          style={{
            boxShadow: [
              "inset 0 0 0 1px color-mix(in srgb, var(--color-accent) 55%, transparent)",
              "inset 0 0 42px -4px color-mix(in srgb, var(--color-accent) 45%, transparent)",
              "0 20px 48px -14px color-mix(in srgb, var(--color-accent) 55%, transparent)",
            ].join(", "),
          }}
        >
          <OrbShader seed={(index + 1) / 4} intensity={0.55 + index * 0.12} />
        </span>

        {/* Iridescent rotating rim — same treatment as desktop */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-[-2px] rounded-full opacity-80 mix-blend-screen"
          style={{
            background: `conic-gradient(from var(--angle, 0deg), transparent 0%, color-mix(in srgb, var(--color-accent) 80%, white) 20%, transparent 40%, color-mix(in srgb, #7cf0d4 85%, white) 62%, transparent 82%)`,
            mask: "radial-gradient(circle, transparent 49%, #000 52%)",
            WebkitMask: "radial-gradient(circle, transparent 49%, #000 52%)",
            animation: `rotate-border ${10 + index * 1.5}s linear infinite`,
          }}
        />

        {/* Specular hotspot */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-[18%] top-[14%] h-[30%] w-[30%] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.18) 45%, transparent 78%)",
            filter: "blur(2px)",
          }}
        />

        {/* Label centered inside */}
        <div className="relative z-[1] flex flex-col items-center gap-0.5 text-center drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
          <span
            className="font-mono text-[8.5px] uppercase leading-none tracking-[0.24em]"
            style={{ color: "color-mix(in srgb, #ffffff 95%, transparent)" }}
          >
            [ {orb.label.toLowerCase()} ]
          </span>
          <span className="num text-[16px] font-semibold leading-none tracking-[-0.02em] text-[#ffffff]">
            {orb.price}
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ============================================================
   Orb — glass sphere with cursor parallax (desktop)
   ============================================================ */

function Orb({
  orb,
  index,
  mx,
  my,
}: {
  orb: (typeof orbs)[number];
  index: number;
  mx: ReturnType<typeof useSpring>;
  my: ReturnType<typeof useSpring>;
}) {
  /* Parallax: orbs drift toward the cursor at different magnitudes so
     they form apparent depth. Larger index = further back = less drift. */
  const drift = [22, 16, 12][index] ?? 16;
  const dx = useTransform(mx, (v) => -v * drift);
  const dy = useTransform(my, (v) => -v * drift);

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${orb.pos.x * 100}%`,
        top: `${orb.pos.y * 100}%`,
        x: dx,
        y: dy,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <Link
        href={orb.href}
        className="pointer-events-auto group relative block"
        aria-label={`${orb.label} · ${orb.price} · ${orb.tagline}`}
      >
        <div
          className="relative flex h-[200px] w-[200px] items-center justify-center rounded-full transition-transform duration-500 ease-out group-hover:scale-[1.08] lg:h-[240px] lg:w-[240px]"
          style={{
            animation: `portal-orb-float 7s ease-in-out ${index * 0.9}s infinite`,
          }}
        >
          {/* Real water-ripple shader interior (IntersectionObserver-gated) */}
          <span
            aria-hidden
            className="absolute inset-0 overflow-hidden rounded-full"
            style={{
              boxShadow: [
                "inset 0 0 0 1px color-mix(in srgb, var(--color-accent) 55%, transparent)",
                "inset 0 0 60px -4px color-mix(in srgb, var(--color-accent) 45%, transparent)",
                "0 30px 72px -14px color-mix(in srgb, var(--color-accent) 60%, transparent)",
              ].join(", "),
            }}
          >
            <OrbShader seed={(index + 1) / 4} intensity={0.55 + index * 0.12} />
          </span>

          {/* Iridescent conic rim that slowly rotates — reads as lensed light edge */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-[-2px] rounded-full opacity-80 mix-blend-screen"
            style={{
              background: `conic-gradient(from var(--angle, 0deg), transparent 0%, color-mix(in srgb, var(--color-accent) 80%, white) 20%, transparent 40%, color-mix(in srgb, #7cf0d4 85%, white) 62%, transparent 82%)`,
              mask: "radial-gradient(circle, transparent 48%, #000 51%)",
              WebkitMask: "radial-gradient(circle, transparent 48%, #000 51%)",
              animation: `rotate-border ${9 + index * 1.5}s linear infinite`,
            }}
          />

          {/* Specular hotspot — catches light on upper-left */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-[18%] top-[14%] h-[34%] w-[34%] rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.2) 45%, transparent 78%)",
              filter: "blur(3px)",
            }}
          />

          {/* Outer expanding ring — pulse */}
          <span
            aria-hidden
            className="absolute inset-[-10px] rounded-full"
            style={{
              border: "1px solid color-mix(in srgb, var(--color-accent) 45%, transparent)",
              animation: `chat-ping ${3.2 + index * 0.4}s ease-out infinite`,
              animationDelay: `${index * 0.5}s`,
            }}
          />

          {/* Label stack — inside the orb, sits above the shader */}
          <div className="relative z-[1] flex flex-col items-center gap-1 text-center drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
            <span
              className="font-mono text-[9.5px] uppercase leading-none tracking-[0.28em]"
              style={{ color: "color-mix(in srgb, #ffffff 94%, transparent)" }}
            >
              [ {orb.label.toLowerCase()} ]
            </span>
            <span className="num text-[28px] font-semibold leading-none tracking-[-0.02em] text-[#ffffff] lg:text-[32px]">
              {orb.price}
            </span>
            <span className="mt-1 max-w-[14ch] text-[11.5px] leading-snug text-[color-mix(in_srgb,#ffffff_85%,transparent)] lg:text-[12.5px]">
              {orb.tagline}
            </span>
          </div>

          {/* Hover arrow reveal */}
          <span
            aria-hidden
            className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
            style={{ color: "var(--color-accent)" }}
          >
            explore →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default BuiltForYouTeaser;
