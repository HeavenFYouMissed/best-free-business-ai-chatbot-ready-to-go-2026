"use client";

import dynamic from "next/dynamic";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { StackReveal } from "@/components/ui/StackReveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { TierCard } from "@/components/pricing/TierCard";
import { bfyTier, CHATBOT_TIERS } from "@/data/builtForYou";
import type { TierId } from "@/data/tiers";
import { useBfyBuy } from "./useBfyBuy";

const CascadingLines3 = dynamic(
  () => import("@/components/shaders/presets/CascadingLines3").then((m) => m.CascadingLines3),
  { ssr: false }
);

export function BfyChatbots() {
  const { buy } = useBfyBuy();
  const tiers = CHATBOT_TIERS.map((id) => bfyTier(id));

  return (
    <SectionShell
      id="chatbots"
      mode="editorial"
      shader={() => <CascadingLines3 className="h-full w-full" />}
      shaderOpacity={0.32}
      className="scroll-mt-28 py-20 md:py-28"
    >
      <div className="container-x">
        <Reveal>
          <SectionLabel index="02" label="Chatbots" />
        </Reveal>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <h2 className="max-w-[24ch] text-balance">Chatbots that actually help.</h2>
          </Reveal>
          <Reveal delay={60}>
            <p className="max-w-[40ch] text-[14.5px] leading-relaxed text-[var(--color-muted)]">
              Not the &quot;hi how can I help you&quot; kind. The kind that books
              appointments, answers real questions, and moves the needle.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {tiers.map((t, i) => (
            <StackReveal key={t.id} index={i} count={tiers.length}>
              <TierCard tier={t} onBuy={(id: TierId) => void buy(id)} />
            </StackReveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

export default BfyChatbots;
