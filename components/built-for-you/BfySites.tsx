"use client";

import dynamic from "next/dynamic";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { StackReveal } from "@/components/ui/StackReveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { TierCard } from "@/components/pricing/TierCard";
import { bfyTier, SITE_TIERS } from "@/data/builtForYou";
import type { TierId } from "@/data/tiers";
import { openIntake } from "./intakeBus";
import { useBfyBuy } from "./useBfyBuy";

const ChevronNodes4 = dynamic(
  () => import("@/components/shaders/presets/ChevronNodes4").then((m) => m.ChevronNodes4),
  { ssr: false }
);

export function BfySites() {
  const { buy } = useBfyBuy();

  function handleBuy(id: TierId) {
    if (id === "customSite") {
      openIntake({ scope: "custom-site" });
      return;
    }
    void buy(id);
  }

  const tiers = SITE_TIERS.map((id) => bfyTier(id));

  return (
    <SectionShell
      id="sites"
      mode="peak"
      shader={() => <ChevronNodes4 className="h-full w-full" />}
      shaderOpacity={0.28}
      className="scroll-mt-28 py-20 md:py-28"
    >
      <div className="container-x">
        <Reveal>
          <SectionLabel index="01" label="Sites" />
        </Reveal>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <h2 className="max-w-[22ch] text-balance">Sites that look like they cost $10k.</h2>
          </Reveal>
          <Reveal delay={60}>
            <p className="max-w-[38ch] text-[14.5px] leading-relaxed text-[var(--color-muted)]">
              Same design quality as publishd.app. Shipped in days, not months — under your
              domain, with every pixel yours to keep.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {tiers.map((t, i) => (
            <StackReveal key={t.id} index={i} count={tiers.length}>
              <TierCard tier={t} onBuy={handleBuy} />
            </StackReveal>
          ))}
        </div>

      </div>
    </SectionShell>
  );
}

export default BfySites;
