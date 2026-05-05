"use client";

import { FeatureCard1 } from "@/components/animated-feature-card-1";
import { FeatureCard3 } from "@/components/animated-feature-card-3";
import { FeatureCard4 } from "@/components/animated-feature-card-4";
import { FeatureCard5 } from "@/components/animated-feature-card-5";
import { FeatureCard7 } from "@/components/animated-feature-card-7";
import { FeatureCard8 } from "@/components/animated-feature-card-8";
import { CornerPlus } from "@/components/landing/ui/CornerPlus";
import { DotPattern } from "@/components/landing/ui/DotPattern";

/**
 * LandingProcessCards — 3×2 capability bento built from MagicUI Pro
 * `animated-feature-card-N` primitives. Each card is a self-contained
 * Framer Motion composition with hover-driven micro-animation, no shaders,
 * no emojis. Zero WebGPU contexts (replaces the previous shader marquee
 * which was hitting the THREE.TSL context limit).
 *
 * Card → capability mapping is intentional:
 *   01 Build    → card-5  (SVG zoom + saturation morph — "spinning up")
 *   02 Ship     → card-1  (stacked layers fan out — "layered deploys")
 *   03 Fix      → card-3  (UI chip pops with green halo — "surgical patch")
 *   04 Rescue   → card-8  (rising notification stack — "lifting it up")
 *   05 AI       → card-7  (glowing icon marquee — "every provider")
 *   06 Automate → card-4  (avatars snap into a row — "pieces line up")
 */

type CardEntry = {
  index: string;
  title: string;
  description: string;
  Card: React.ComponentType<{ title?: string; description?: string }>;
};

const CARDS: CardEntry[] = [
  {
    index: "01",
    title: "Build",
    description: "Apps, web platforms, SaaS, AI tools — shipped end-to-end.",
    Card: FeatureCard5,
  },
  {
    index: "02",
    title: "Ship",
    description: "App Store, Google Play, prod deploys — metadata, ASO, appeals.",
    Card: FeatureCard1,
  },
  {
    index: "03",
    title: "Fix",
    description: "Stuck builds, failing APIs, hostile codebases — surgical patches.",
    Card: FeatureCard3,
  },
  {
    index: "04",
    title: "Rescue",
    description: "Bolt / Lovable / Cursor handoffs lifted to production-grade.",
    Card: FeatureCard8,
  },
  {
    index: "05",
    title: "AI",
    description: "Chatbots, RAG, agents, BYOK builders, provider routing.",
    Card: FeatureCard7,
  },
  {
    index: "06",
    title: "Automate",
    description: "Stripe, webhooks, queues, cron, internal tools, dashboards.",
    Card: FeatureCard4,
  },
];

export function LandingProcessCards() {
  return (
    <section
      id="process-cards"
      className="relative overflow-hidden border-t border-[var(--color-border)] py-20 md:py-28"
      aria-label="Capability matrix — build, ship, fix, rescue, AI, automate"
    >
      <DotPattern
        className="absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        width={22}
        height={22}
        cr={0.6}
      />

      <div className="relative mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-6 md:gap-14 md:px-10">
        <header className="flex flex-col items-start gap-3 md:max-w-[60ch]">
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
            [ Capability matrix ]
          </span>
          <h2 className="text-balance text-[clamp(1.8rem,4vw,2.8rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--color-fg)]">
            Six lanes, one engineer, every shipping milestone covered.
          </h2>
          <p className="max-w-[55ch] text-[15px] leading-[1.65] text-[color-mix(in_srgb,var(--color-fg)_70%,transparent)]">
            Hover any tile to see the motion. Every lane runs through me — no
            agency layers, no handoffs, no &quot;our junior will pick this
            up.&quot;
          </p>
        </header>

        {/* `dark` class activates Tailwind's `dark:` variant inside the
            MagicUI Pro animated cards. Site root doesn't toggle .dark
            (it uses CSS vars + color-scheme instead), so we scope it here. */}
        <div className="dark relative">
          <CornerPlus />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {CARDS.map((c) => (
              <CardCell key={c.index} entry={c} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CardCell({ entry }: { entry: CardEntry }) {
  const { index, title, description, Card } = entry;
  return (
    <div className="group relative h-[460px] overflow-hidden rounded-2xl ring-1 ring-inset ring-white/8 transition-all duration-300 hover:ring-[color-mix(in_srgb,var(--color-accent)_45%,transparent)] hover:-translate-y-1 sm:h-[480px]">
      {/* Glowing accent halo on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 30%, color-mix(in srgb, var(--color-accent) 32%, transparent) 0%, transparent 70%)",
        }}
      />

      {/* Index badge */}
      <span
        aria-hidden="true"
        className="absolute right-4 top-4 z-10 font-mono text-[11px] uppercase tracking-[0.28em] text-[color-mix(in_srgb,var(--color-accent)_85%,transparent)]"
      >
        / {index}
      </span>

      {/* The actual MagicUI Pro animated card */}
      <Card title={title} description={description} />
    </div>
  );
}
