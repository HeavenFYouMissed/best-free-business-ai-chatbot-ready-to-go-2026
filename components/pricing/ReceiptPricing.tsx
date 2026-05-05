"use client";

import { Check } from "lucide-react";
import type { Tier, TierId } from "@/data/tiers";

type Props = {
  tiers: Tier[];
  onBuy?: (id: TierId) => void;
};

/**
 * Monospace "receipt" view of the pricing grid. Swaps the 4 cards for a
 * single printed invoice — editorial, distinctive, and impossible to
 * confuse with a generic marketing grid.
 */
export function ReceiptPricing({ tiers, onBuy }: Props) {
  const now = new Date();
  const orderId = `PBD-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;

  return (
    <div className="receipt-view relative overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[color-mix(in_srgb,#06080f_88%,transparent)] px-5 py-6 font-mono text-[13px] leading-[1.75] text-[color-mix(in_srgb,var(--color-fg)_86%,transparent)] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] md:px-10 md:py-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0 2px, rgba(255,255,255,0.04) 2px 3px)",
        }}
      />

      <div className="relative">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-dashed border-[var(--color-border-strong)] pb-3 text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
          <span>[ publishd · receipt ]</span>
          <span className="num">{orderId}</span>
        </div>

        <div className="mt-5 space-y-1">
          <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
            vendor
          </div>
          <div className="text-[14px] text-[var(--color-fg)]">Publishd · a studio of one</div>
          <div className="text-[12px] text-[var(--color-muted)]">
            Daniel Castellani · daniel@publishd.app · Connecticut
          </div>
        </div>

        <div className="mt-5 space-y-1">
          <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
            service
          </div>
          <div className="text-[14px] text-[var(--color-fg)]">
            App Store + Google Play submission + store assets + rejection handling
          </div>
        </div>

        <div className="mt-7 border-t border-dashed border-[var(--color-border-strong)] pt-3 text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
          line items
        </div>

        <ul className="mt-3 space-y-1.5">
          {tiers.map((t) => (
            <li
              key={t.id}
              className="grid grid-cols-[1fr_auto] items-baseline gap-3 text-[13px]"
            >
              <div>
                <button
                  type="button"
                  onClick={() => onBuy?.(t.id)}
                  className="group/row inline-flex items-center gap-2 text-left text-[var(--color-fg)] transition-colors hover:text-[var(--color-accent)]"
                >
                  <Check
                    className="icon h-3.5 w-3.5 shrink-0"
                    aria-hidden
                    style={{ color: "var(--color-accent)" }}
                  />
                  <span className="underline decoration-[color-mix(in_srgb,var(--color-accent)_30%,transparent)] decoration-dotted underline-offset-[5px] group-hover/row:decoration-[var(--color-accent)]">
                    {t.name}
                  </span>
                  {t.featured && (
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
                      ← pick me
                    </span>
                  )}
                </button>
                <div className="mt-0.5 pl-[22px] text-[11.5px] text-[var(--color-muted)]">
                  {t.summary}
                </div>
              </div>
              <div className="num whitespace-nowrap text-[14px] text-[var(--color-fg)]">
                ${t.price}
                {t.interval === "month" && (
                  <span className="text-[10.5px] text-[var(--color-muted)]">/mo</span>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-7 border-t border-dashed border-[var(--color-border-strong)] pt-3 text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
          summary
        </div>

        <dl className="mt-3 space-y-1 text-[13px]">
          <div className="grid grid-cols-[1fr_auto] items-baseline">
            <dt className="text-[var(--color-muted)]">subscription</dt>
            <dd className="num text-[var(--color-fg)]">$0.00 / mo</dd>
          </div>
          <div className="grid grid-cols-[1fr_auto] items-baseline">
            <dt className="text-[var(--color-muted)]">ownership transfer</dt>
            <dd className="num text-[var(--color-fg)]">100%</dd>
          </div>
          <div className="grid grid-cols-[1fr_auto] items-baseline">
            <dt className="text-[var(--color-muted)]">apple dev fee (you pay apple)</dt>
            <dd className="num text-[var(--color-muted)]">$99 / yr</dd>
          </div>
          <div className="grid grid-cols-[1fr_auto] items-baseline">
            <dt className="text-[var(--color-muted)]">play dev fee (you pay google)</dt>
            <dd className="num text-[var(--color-muted)]">$25 once</dd>
          </div>
        </dl>

        <div className="mt-6 flex items-end justify-between border-t border-[var(--color-accent)] pt-4">
          <div className="text-[10.5px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
            featured total
          </div>
          <div className="num text-[22px] font-semibold tracking-[-0.02em] text-[var(--color-fg)]">
            ${tiers.find((t) => t.featured)?.price ?? 399}
            <span className="ml-1 text-[11px] font-normal text-[var(--color-muted)]">USD</span>
          </div>
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={() => onBuy?.("both")}
            className="group/confirm w-full rounded-[var(--radius-sm)] border border-[color-mix(in_srgb,var(--color-accent)_55%,transparent)] bg-[color-mix(in_srgb,var(--color-accent)_14%,transparent)] px-4 py-3 text-center text-[12px] uppercase tracking-[0.28em] text-[var(--color-accent)] transition-all hover:bg-[color-mix(in_srgb,var(--color-accent)_22%,transparent)]"
          >
            <span className="inline-flex items-center gap-3">
              confirm ship
              <span aria-hidden className="transition-transform group-hover/confirm:translate-x-1">
                →
              </span>
            </span>
          </button>
        </div>

        <div className="mt-4 text-center text-[10.5px] uppercase tracking-[0.22em] text-[var(--color-subtle)]">
          ◆ one flat fee ◆ no subscription ◆ you own everything ◆
        </div>
      </div>
    </div>
  );
}

export default ReceiptPricing;
