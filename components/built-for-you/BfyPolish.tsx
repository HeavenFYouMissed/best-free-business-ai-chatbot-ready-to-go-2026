"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Check, Loader2, Plus } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { ShaderBackdrop } from "@/components/ui/ShaderBackdrop";
import { bfyTier } from "@/data/builtForYou";
import { useBfyBuy } from "./useBfyBuy";

const SoftPrism3 = dynamic(
  () => import("@/components/shaders/presets/SoftPrism3").then((m) => m.SoftPrism3),
  { ssr: false }
);

/**
 * Polish card — single centered tier, but keeps full parity with the
 * homepage `TierCard` treatment (tilt, ShaderBackdrop, featured glow). The
 * resubmit add-on is a frosted inline toggle above the CTA; flipping it on
 * sends `addons: ["resubmitAddon"]` to the checkout route so both line
 * items are billed in one session.
 */
export function BfyPolish() {
  const polish = bfyTier("appPolish");
  const resubmit = bfyTier("resubmitAddon");
  const { buy, loadingTier } = useBfyBuy();
  const [resubmitOn, setResubmitOn] = useState(false);

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

  const total = polish.price + (resubmitOn ? resubmit.price : 0);
  const loading = loadingTier === polish.id;

  async function handleBuy() {
    await buy(polish.id, resubmitOn ? ["resubmitAddon"] : undefined);
  }

  return (
    <SectionShell
      id="polish"
      mode="peak"
      shader={() => <SoftPrism3 className="h-full w-full" />}
      shaderOpacity={0.38}
      className="scroll-mt-28 py-20 md:py-28"
    >
      <div className="container-x">
        <Reveal>
          <SectionLabel index="03" label="Polish" />
        </Reveal>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <h2 className="max-w-[26ch] text-balance">
              Your app works. It just doesn&apos;t look like it belongs.
            </h2>
          </Reveal>
          <Reveal delay={60}>
            <p className="max-w-[42ch] text-[14.5px] leading-relaxed text-[var(--color-muted)]">
              Icon, screenshots, store copy — all redone. 2–3 day turnaround. You resubmit
              yourself, or flip the toggle and I do it.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-10 w-full max-w-[420px]">
          <motion.div
            onPointerMove={onMove}
            onPointerLeave={onLeave}
            style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", transformPerspective: 900 }}
            className="group relative"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-[-2px] z-[1] rounded-[var(--radius-lg)] tier-featured-border"
            />
            <div
              className="glass-card relative z-[2] flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] !border-[color-mix(in_srgb,var(--color-accent)_25%,rgba(255,255,255,0.08))] p-5 md:p-6"
            >
              <ShaderBackdrop variant="sphere" color="#00d4ff" opacity={0.16} size={1.5} />

              <div className="relative mono-label">[ {polish.name.toLowerCase()} ]</div>

              <div className="relative mt-4 flex items-baseline gap-1.5">
                <span className="num text-[34px] font-semibold leading-none tracking-[-0.03em] text-[var(--color-fg)] md:text-[40px]">
                  ${polish.price}
                </span>
                <span className="text-[12px] text-[var(--color-muted)]">one-time</span>
              </div>

              <p className="relative mt-2.5 text-[13.5px] leading-snug text-[var(--color-muted)]">
                {polish.summary}
              </p>

              <ul className="relative mt-4 space-y-1.5 text-[13px] leading-[1.5] text-[color-mix(in_srgb,var(--color-fg)_86%,transparent)]">
                {polish.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <Check className="icon h-[14px] w-[14px] mt-[3px] shrink-0 text-[var(--color-accent)]" aria-hidden />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {/* Resubmit add-on toggle — frosted pill */}
              <div className="relative mt-5">
                <button
                  type="button"
                  role="switch"
                  aria-checked={resubmitOn}
                  onClick={() => setResubmitOn((v) => !v)}
                  className={`group/toggle flex w-full items-center justify-between gap-3 rounded-[var(--radius-md)] border px-3.5 py-3 text-left transition-colors ${
                    resubmitOn
                      ? "border-[color-mix(in_srgb,var(--color-accent)_55%,var(--color-border))] bg-[color-mix(in_srgb,var(--color-accent)_14%,transparent)]"
                      : "border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_60%,transparent)]"
                  }`}
                >
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span className="mono-label !m-0 !p-0 before:hidden" style={{ color: "color-mix(in srgb, var(--color-accent) 85%, white)" }}>
                      [ add · optional ]
                    </span>
                    <span className="text-[13px] font-medium text-[var(--color-fg)]">
                      <span aria-hidden className="num mr-1 text-[var(--color-accent)]">+${resubmit.price}</span>
                      I resubmit to the store
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className={`grid h-6 w-11 shrink-0 place-items-center rounded-full border transition-colors ${
                      resubmitOn
                        ? "border-[color-mix(in_srgb,var(--color-accent)_55%,var(--color-border))] bg-[color-mix(in_srgb,var(--color-accent)_25%,transparent)]"
                        : "border-[var(--color-border)]"
                    }`}
                  >
                    <span
                      className={`block h-4 w-4 rounded-full transition-transform ${
                        resubmitOn ? "translate-x-[10px]" : "-translate-x-[10px]"
                      }`}
                      style={{
                        background: resubmitOn
                          ? "var(--color-accent)"
                          : "color-mix(in srgb, var(--color-fg) 40%, transparent)",
                        boxShadow: resubmitOn ? "0 0 10px var(--color-accent)" : undefined,
                      }}
                    />
                  </span>
                </button>
              </div>

              <div className="relative mt-5 flex items-center justify-between">
                <span className="num text-[13px] uppercase tracking-[0.14em] text-[var(--color-muted)]">
                  total <span className="ml-1 text-[var(--color-fg)]">${total}</span>
                </span>
                <button
                  type="button"
                  onClick={handleBuy}
                  disabled={loading}
                  className={`btn btn--primary min-h-[44px] px-5 text-[13.5px] ${loading ? "opacity-80" : ""}`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="icon animate-spin" aria-hidden />
                      Redirecting…
                    </>
                  ) : (
                    <>
                      Polish my app
                      <span aria-hidden>→</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Micro-addon chip row — optional future addons dock here */}
          <div className="mt-4 flex items-center justify-center gap-2 text-[11.5px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
            <Plus className="icon h-3 w-3" aria-hidden />
            one-click checkout · both items · one receipt
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

export default BfyPolish;
