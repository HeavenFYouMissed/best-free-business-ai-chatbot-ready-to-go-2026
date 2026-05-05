"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/* ---------- count-up hook ---------- */
function useCountUp(target: number, inView: boolean, duration = 1200) {
  const [value, setValue] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3); // ease-out cubic
      setValue(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);
  return value;
}

/* ---------- mini bar chart ---------- */
function MiniBar({
  label,
  value,
  max,
  color = "var(--color-accent)",
  delay = 0,
  inView,
}: {
  label: string;
  value: number;
  max: number;
  color?: string;
  delay?: number;
  inView: boolean;
}) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setWidth((value / max) * 100), delay);
    return () => clearTimeout(t);
  }, [inView, value, max, delay]);

  return (
    <div className="flex items-center gap-2.5">
      <span className="w-[72px] shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-[color-mix(in_srgb,var(--color-fg)_65%,transparent)]">
        {label}
      </span>
      <div className="relative h-[5px] flex-1 overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--color-fg)_8%,transparent)]">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${width}%`, background: color }}
        />
      </div>
      <span className="w-7 text-right font-mono text-[11px] text-[color-mix(in_srgb,var(--color-fg)_80%,transparent)]">
        {value}
      </span>
    </div>
  );
}

/* ---------- status dot ---------- */
function StatusDot({ label, ok = true }: { label: string; ok?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="h-[7px] w-[7px] shrink-0 rounded-full"
        style={{
          background: ok ? "#3ede7a" : "#ff3d5a",
          boxShadow: ok ? "0 0 8px rgba(62,222,122,0.65)" : "0 0 8px rgba(255,61,90,0.65)",
        }}
        aria-hidden
      />
      <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[color-mix(in_srgb,var(--color-fg)_72%,transparent)]">
        {label}
      </span>
    </div>
  );
}

/* ---------- main component ---------- */
export function CoverProof() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const apps = useCountUp(50, inView, 1100);
  const sites = useCountUp(100, inView, 1300);
  const saas = useCountUp(6, inView, 900);
  const days = useCountUp(14, inView, 800);

  return (
    <section
      ref={ref}
      className="cover-proof px-5 pt-16 md:px-10 md:pt-24 lg:px-16"
      aria-label="Track record"
    >
      {/* Panel header */}
      <div className="mb-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[color-mix(in_srgb,var(--color-fg)_55%,transparent)]">
          Track record
        </span>
      </div>

      {/* Bento grid */}
      <div className="grid gap-3 md:grid-cols-12 md:grid-rows-[auto_auto]">

        {/* ── Hero: apps shipped ── */}
        <div className="relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-ink)_80%,transparent)] p-5 md:col-span-4 md:p-6">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              background:
                "repeating-linear-gradient(0deg, var(--color-accent) 0px, var(--color-accent) 1px, transparent 1px, transparent 18px)",
            }}
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color-mix(in_srgb,var(--color-fg)_55%,transparent)]">
            Apps shipped
          </span>
          <div className="mt-3 flex items-end gap-1.5">
            <span className="font-mono text-[4.2rem] font-semibold leading-none tracking-[-0.04em] text-[var(--color-fg)]" style={{ textShadow: "0 0 40px color-mix(in srgb, var(--color-accent) 30%, transparent)" }}>
              {apps}
            </span>
            <span className="mb-2 font-mono text-[2rem] font-semibold leading-none text-[var(--color-accent)]">+</span>
          </div>
          <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[color-mix(in_srgb,var(--color-fg)_50%,transparent)]">
            App Store & Google Play
          </p>
          <div className="mt-5 space-y-2.5">
            <MiniBar label="iOS" value={30} max={50} inView={inView} delay={200} />
            <MiniBar label="Android" value={20} max={50} color="color-mix(in srgb, var(--color-accent) 65%, var(--color-accent-mint))" inView={inView} delay={350} />
          </div>
        </div>

        {/* ── Websites shipped ── */}
        <div className="relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-ink)_80%,transparent)] p-5 md:col-span-4 md:p-6">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              background:
                "repeating-linear-gradient(90deg, var(--color-accent) 0px, var(--color-accent) 1px, transparent 1px, transparent 22px)",
            }}
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color-mix(in_srgb,var(--color-fg)_55%,transparent)]">
            Websites shipped
          </span>
          <div className="mt-3 flex items-end gap-1.5">
            <span className="font-mono text-[4.2rem] font-semibold leading-none tracking-[-0.04em] text-[var(--color-fg)]" style={{ textShadow: "0 0 40px color-mix(in srgb, var(--color-accent) 30%, transparent)" }}>
              {sites}
            </span>
            <span className="mb-2 font-mono text-[2rem] font-semibold leading-none text-[var(--color-accent)]">+</span>
          </div>
          <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[color-mix(in_srgb,var(--color-fg)_50%,transparent)]">
            Founder-built for real businesses
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              "Service businesses",
              "Landing pages",
              "SaaS marketing sites",
              "E-commerce",
              "Offer-first rebuilds",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-[color-mix(in_srgb,var(--color-accent)_22%,var(--color-border))] bg-[color-mix(in_srgb,var(--color-accent)_8%,transparent)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[color-mix(in_srgb,var(--color-fg)_78%,transparent)]"
              >
                {item}
              </span>
            ))}
          </div>
          <p className="mt-4 text-[12.5px] leading-[1.6] text-[color-mix(in_srgb,var(--color-fg)_65%,transparent)]">
            Over 100 websites built personally — direct founder communication, flat-fee scopes, and no handoff circus.
          </p>
        </div>

        {/* ── Right column: two stacked cells ── */}
        <div className="grid gap-3 md:col-span-4">
          {/* SaaS companies */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-ink)_80%,transparent)] p-5 md:p-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color-mix(in_srgb,var(--color-fg)_55%,transparent)]">
              SaaS co. built
            </span>
            <div className="mt-2 flex items-end gap-1">
              <span className="font-mono text-[3.2rem] font-semibold leading-none tracking-[-0.04em] text-[var(--color-fg)]">
                {saas}
              </span>
              <span className="mb-1.5 font-mono text-[1.4rem] font-semibold leading-none text-[var(--color-accent)]">+</span>
            </div>
            <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[color-mix(in_srgb,var(--color-fg)_50%,transparent)]">
              0 → live, end-to-end
            </p>
          </div>

          {/* Avg ship time */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-ink)_80%,transparent)] p-5 md:p-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color-mix(in_srgb,var(--color-fg)_55%,transparent)]">
              Avg days to live
            </span>
            <div className="mt-2 flex items-end gap-1">
              <span className="font-mono text-[3.2rem] font-semibold leading-none tracking-[-0.04em] text-[var(--color-fg)]">
                {days}
              </span>
              <span className="mb-1.5 font-mono text-[1.1rem] font-semibold leading-none text-[color-mix(in_srgb,var(--color-fg)_55%,transparent)]">
                days
              </span>
            </div>
            <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[color-mix(in_srgb,var(--color-fg)_50%,transparent)]">
              7 min · 14 max
            </p>
          </div>
        </div>

        {/* ── Bottom strip: status / capabilities ── */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-ink)_75%,transparent)] p-4 md:col-span-12 md:p-5">
          <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-3 lg:grid-cols-6">
            <StatusDot label="App Store submission" />
            <StatusDot label="Google Play" />
            <StatusDot label="React / Next.js" />
            <StatusDot label="AI / LLM integration" />
            <StatusDot label="Stripe + payments" />
            <StatusDot label="Reply &lt; 6h" />
          </div>
        </div>

      </div>
    </section>
  );
}
