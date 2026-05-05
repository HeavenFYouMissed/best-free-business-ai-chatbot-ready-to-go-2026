"use client";

import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ShaderBackdrop } from "@/components/ui/ShaderBackdrop";
import type { Tier } from "@/data/tiers";

const tierBackdrop: Record<string, { variant: "simplex" | "warp" | "ripple" | "dots" | "wave" | "sphere" | "swirl"; color: string }> = {
  coaching: { variant: "simplex", color: "#7cf0d4" },
  single: { variant: "warp", color: "#00d4ff" },
  both: { variant: "ripple", color: "#00d4ff" },
  premium: { variant: "dots", color: "#ff6b3d" },
  rescue: { variant: "wave", color: "#ffb347" },
  /* Built-For-You catalog — distinct variants per tier so the cards feel
     like their own family without breaking the cyan discipline. */
  starterSite: { variant: "dots", color: "#00d4ff" },
  proSite: { variant: "ripple", color: "#00d4ff" },
  customSite: { variant: "swirl", color: "#00d4ff" },
  chatbotInstall: { variant: "warp", color: "#00d4ff" },
  chatbotPro: { variant: "wave", color: "#00d4ff" },
  appPolish: { variant: "sphere", color: "#00d4ff" },
};

type Props = {
  tier: Tier;
  recommended?: boolean;
  onBuy?: (id: Tier["id"]) => Promise<void> | void;
};

export function TierCard({ tier, recommended, onBuy }: Props) {
  const [loading, setLoading] = useState(false);
  /* Per-card ShaderBackdrop respects reduced-motion + IntersectionObserver
     gating internally, so we can mount it at any viewport width. */
  const [allowShader, setAllowShader] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setAllowShader(!mq.matches);
    const handler = () => setAllowShader(!mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 180, damping: 18 });
  const smy = useSpring(my, { stiffness: 180, damping: 18 });
  const rx = useTransform(smy, [-0.5, 0.5], [3, -3]);
  const ry = useTransform(smx, [-0.5, 0.5], [-3, 3]);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  async function handleClick() {
    if (!onBuy) return;
    setLoading(true);
    try {
      await onBuy(tier.id);
    } finally {
      setLoading(false);
    }
  }

  const featured = !!tier.featured;

  return (
    <div id={`tier-${tier.id}`} className="relative h-full scroll-mt-28">
      {featured && (
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 rounded-[var(--radius-xs)] border border-[color-mix(in_srgb,var(--color-accent)_55%,var(--color-border-strong))] bg-[var(--color-bg)] px-2 py-[3px] text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-accent)] shadow-[0_6px_24px_-10px_color-mix(in_srgb,var(--color-accent)_70%,transparent)]"
        >
          Most popular
        </div>
      )}
      {recommended && (
        <div
          aria-hidden
          className="pointer-events-none absolute right-3 top-3 z-20 inline-flex items-center gap-1.5 rounded-[var(--radius-xs)] border border-[color-mix(in_srgb,var(--color-accent)_55%,var(--color-border-strong))] bg-[var(--color-bg)] px-2 py-[3px] text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]"
        >
          <span
            className="h-[5px] w-[5px] rounded-full bg-[var(--color-accent)]"
            style={{ animation: "status-dot-pulse 3s ease-in-out infinite" }}
          />
          Recommended
        </div>
      )}

      <motion.div
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", transformPerspective: 900 }}
        className={`group relative h-full ${featured ? "md:scale-[1.03]" : ""}`}
      >
        {featured && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-[-2px] z-[1] rounded-[var(--radius-lg)] tier-featured-border"
          />
        )}
        <div className="h-full">
          <div
            className={`glass-card relative z-[2] flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] ${
              featured ? "!border-[color-mix(in_srgb,var(--color-accent)_25%,rgba(255,255,255,0.08))]" : ""
            } p-5 md:p-6`}
          >
            {!featured && tierBackdrop[tier.id] && allowShader && (
              <ShaderBackdrop
                variant={tierBackdrop[tier.id].variant}
                color={tierBackdrop[tier.id].color}
                opacity={0.14}
                size={1.5}
              />
            )}
            <div className="relative mono-label">[ {tier.name.toLowerCase()} ]</div>

            <div className="relative mt-4 flex items-baseline gap-1.5">
              <span className="num text-[34px] font-semibold leading-none tracking-[-0.03em] text-[var(--color-fg)] md:text-[38px]">
                ${tier.price}
              </span>
              <span className="text-[12px] text-[var(--color-muted)]">
                {tier.interval === "month" ? "/month" : "one-time"}
              </span>
            </div>

            <p className="relative mt-2.5 text-[13.5px] leading-snug text-[var(--color-muted)]">{tier.summary}</p>

            <ul className="relative mt-4 space-y-1.5 text-[13px] leading-[1.5] text-[color-mix(in_srgb,var(--color-fg)_86%,transparent)]">
              {tier.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <Check className="icon h-[14px] w-[14px] mt-[3px] shrink-0 text-[var(--color-accent)]" aria-hidden />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="relative mt-auto pt-5">
              <button
                type="button"
                onClick={handleClick}
                disabled={loading || !onBuy}
                className={`w-full ${featured ? "btn btn--primary" : "btn"} ${loading ? "opacity-80" : ""}`}
              >
                {loading ? (
                  <>
                    <Loader2 className="icon animate-spin" aria-hidden />
                    Redirecting…
                  </>
                ) : (
                  <>
                    {tier.cta ?? "Choose"}
                    <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                  </>
                )}
              </button>
              {tier.trustNote && (
                <p className="mt-3 text-center text-[11.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_64%,transparent)]">
                  {tier.trustNote}
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
