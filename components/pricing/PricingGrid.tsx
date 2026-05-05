"use client";

import { useCallback, useState } from "react";
import { Shield } from "lucide-react";
import { tiers, addons, pricingTrustNote, type TierId } from "@/data/tiers";
import { TierCard } from "./TierCard";
import { RejectionRescue } from "./RejectionRescue";
import { TierSelector } from "./TierSelector";
import { ReceiptPricing } from "./ReceiptPricing";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { StackReveal } from "@/components/ui/StackReveal";

export function PricingGrid() {
  const [recommended, setRecommended] = useState<TierId | null>(null);
  const [view, setView] = useState<"cards" | "receipt">("cards");

  const handleBuy = useCallback(async (id: TierId) => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ tier: id }),
    });
    if (!res.ok) {
      const t = await res.text();
      console.error("Checkout failed:", t);
      window.location.hash = "#contact";
      return;
    }
    const { url } = (await res.json()) as { url: string };
    if (url) window.location.href = url;
  }, []);

  const topFour = tiers.filter((t) => t.id !== "rescue");
  const rescue = tiers.find((t) => t.id === "rescue")!;

  return (
    <section id="pricing">
      <div className="container-x">
        <Reveal>
          <SectionLabel index="10" label="Pricing" />
        </Reveal>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <h2 className="max-w-[22ch] text-balance">One flat fee. You own everything. Forever.</h2>
          </Reveal>
          <Reveal delay={60}>
            <p className="max-w-[38ch] text-[14.5px] leading-relaxed text-[var(--color-muted)]">
              No subscription, no lock-in. Apple Developer ($99/yr) and Google Play ($25 one-time) fees are paid
              directly by you.
            </p>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <TierSelector onRecommend={setRecommended} recommended={recommended} />
            </div>
            <div
              role="tablist"
              aria-label="Pricing view"
              className="inline-flex shrink-0 items-center gap-0 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_85%,transparent)] p-0.5 text-[11.5px] font-medium uppercase tracking-[0.14em]"
            >
              <button
                type="button"
                role="tab"
                aria-selected={view === "cards"}
                onClick={() => setView("cards")}
                className={`min-h-[36px] rounded-[var(--radius-xs)] px-3 py-1.5 transition-colors ${
                  view === "cards"
                    ? "bg-[color-mix(in_srgb,var(--color-accent)_18%,transparent)] text-[var(--color-fg)]"
                    : "text-[var(--color-muted)]"
                }`}
              >
                cards
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={view === "receipt"}
                onClick={() => setView("receipt")}
                className={`min-h-[36px] rounded-[var(--radius-xs)] px-3 py-1.5 transition-colors ${
                  view === "receipt"
                    ? "bg-[color-mix(in_srgb,var(--color-accent)_18%,transparent)] text-[var(--color-fg)]"
                    : "text-[var(--color-muted)]"
                }`}
              >
                receipt
              </button>
            </div>
          </div>
        </Reveal>

        {view === "cards" ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
            {topFour.map((t, i) => (
              <StackReveal key={t.id} index={i} count={topFour.length}>
                <TierCard tier={t} onBuy={handleBuy} recommended={recommended === t.id} />
              </StackReveal>
            ))}
          </div>
        ) : (
          <div className="mt-8">
            <Reveal>
              <ReceiptPricing tiers={topFour} onBuy={handleBuy} />
            </Reveal>
          </div>
        )}

        <Reveal delay={80}>
          <div className="mt-5 flex items-start gap-3 rounded-[var(--radius-md)] border border-white/[0.06] bg-[color-mix(in_srgb,var(--color-bg)_94%,transparent)] px-4 py-3.5 backdrop-blur-sm">
            <Shield
              className="icon mt-0.5 shrink-0 opacity-50"
              aria-hidden
              style={{ color: "var(--color-accent)" }}
            />
            <div className="space-y-1.5">
              <p className="text-[12.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_55%,transparent)]">
                {pricingTrustNote}
              </p>
              <p className="text-[11.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-muted)_88%,transparent)]">
                Payments for Publishd services are processed by <span className="font-medium text-[color-mix(in_srgb,var(--color-fg)_62%,transparent)]">SuperClawHub</span> — the SaaS that runs Publishd. You may see
                <span className="num"> SUPERCLAWHUB</span> or <span className="num">PUBLISHD</span> on your card
                statement.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div id={`tier-${rescue.id}`} className="mt-6 scroll-mt-28 md:mt-8">
            <RejectionRescue tier={rescue} onBuy={handleBuy} />
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {addons.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between rounded-[var(--radius-md)] border border-white/[0.06] bg-[color-mix(in_srgb,var(--color-bg)_92%,transparent)] px-4 py-3.5 backdrop-blur-sm transition-colors hover:border-white/[0.1]"
              >
                <div className="min-w-0">
                  <div className="mono-label opacity-60">[ add-on ]</div>
                  <div className="mt-1.5 text-[13.5px] leading-snug text-[color-mix(in_srgb,var(--color-fg)_52%,transparent)]">
                    <span className="font-medium text-[color-mix(in_srgb,var(--color-fg)_72%,transparent)]">
                      {a.name}
                    </span>{" "}
                    <span className="text-[color-mix(in_srgb,var(--color-muted)_85%,transparent)]">
                      — {a.summary}
                    </span>
                  </div>
                </div>
                <span className="num shrink-0 pl-3 text-[17px] font-semibold tracking-[-0.02em] text-[color-mix(in_srgb,var(--color-fg)_65%,transparent)]">
                  ${a.price}
                  <span className="ml-1 text-[11px] font-normal text-[color-mix(in_srgb,var(--color-muted)_90%,transparent)]">
                    {a.interval === "month" ? "/mo" : ""}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
