"use client";

import { useState } from "react";
import { Check, Loader2, LifeBuoy } from "lucide-react";
import type { Tier } from "@/data/tiers";

export function RejectionRescue({ tier, onBuy }: { tier: Tier; onBuy?: (id: Tier["id"]) => Promise<void> | void }) {
  const [loading, setLoading] = useState(false);
  async function handleClick() {
    if (!onBuy) return;
    setLoading(true);
    try {
      await onBuy(tier.id);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[linear-gradient(180deg,var(--color-surface),#0f0f13)] p-6 md:p-7">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-[40%] bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--color-warn)_22%,transparent),transparent_75%)] blur-xl"
      />
      <div className="relative grid gap-4 md:grid-cols-[auto_1fr_auto] md:items-center">
        <div className="grid h-11 w-11 place-items-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-warn)]">
          <LifeBuoy className="icon icon-lg" aria-hidden />
        </div>
        <div>
          <div className="mono-label">[ rejection rescue ]</div>
          <h3 className="mt-2 text-[22px] font-semibold">
            Bounced by Apple? <span className="text-[var(--color-muted)]">I write the appeal.</span>
          </h3>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[13.5px] text-[color-mix(in_srgb,var(--color-fg)_80%,transparent)]">
            {tier.bullets.map((b) => (
              <li key={b} className="flex items-center gap-2">
                <Check className="icon shrink-0 text-[var(--color-accent)]" aria-hidden />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-3 md:flex-col md:items-end">
          <span className="num text-[32px] font-semibold tracking-[-0.02em]">${tier.price}</span>
          <button type="button" onClick={handleClick} disabled={loading || !onBuy} className="btn btn--ghost">
            {loading ? (
              <>
                <Loader2 className="icon animate-spin" aria-hidden />
                Redirecting…
              </>
            ) : (
              <>Rescue it <span aria-hidden>→</span></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
