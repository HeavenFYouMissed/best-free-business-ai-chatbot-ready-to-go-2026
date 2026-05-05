"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ShaderBackdrop } from "@/components/ui/ShaderBackdrop";
import { StackReveal } from "@/components/ui/StackReveal";
import { SectionShell } from "@/components/ui/SectionShell";

const AsciiPeaks = dynamic(
  () => import("@/components/shaders/presets/AsciiPeaks").then((m) => m.AsciiPeaks),
  { ssr: false }
);

type Stat = {
  valueTo: number;
  suffix?: string;
  label: string;
  sub: string;
  format?: (n: number) => string;
  variant: "simplex" | "wave" | "warp" | "ripple";
};

const stats: Stat[] = [
  {
    valueTo: 50,
    suffix: "+",
    label: "products shipped solo",
    sub: "Mobile apps + production SaaS. Every one designed, built, and shipped by Daniel.",
    variant: "wave",
  },
  {
    valueTo: 14,
    label: "day ship window",
    sub: "From kickoff call to live in both stores.",
    format: (n) => `7\u2013${n}`,
    variant: "warp",
  },
  {
    valueTo: 6,
    suffix: "h",
    label: "response time",
    sub: "Text or email. A real human reply in under six business hours.",
    variant: "ripple",
  },
  {
    valueTo: 0,
    label: "subscriptions",
    sub: "No monthly lock-in. One flat fee, keep everything, forever.",
    variant: "simplex",
  },
];

function useCountUp(to: number, inView: boolean, duration = 1200) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, inView, duration]);
  return n;
}

export function RealResults() {
  return (
    <SectionShell
      id="results"
      mode="peak"
      shader={() => <AsciiPeaks className="h-full w-full" />}
      shaderOpacity={0.55}
      className="tight py-16 md:py-24"
    >
      <div
        className="container-x"
        style={{ ["--hotspot-x" as string]: "58%", ["--hotspot-y" as string]: "28%" }}
      >
        <Reveal>
          <SectionLabel index="02" label="Real results" />
        </Reveal>
        <Reveal delay={60}>
          <h2 className="mt-3 max-w-[30ch] text-balance text-[clamp(1.35rem,3.2vw,2.25rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
            Proof in numbers — not agency theater.
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-4 md:gap-4">
          {stats.map((s, i) => (
            <StackReveal key={s.label} index={i} count={stats.length}>
              <StatCard stat={s} />
            </StackReveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function StatCard({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const n = useCountUp(stat.valueTo, inView);
  const display = stat.format ? stat.format(n) : `${n}`;

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card relative h-full overflow-hidden rounded-[var(--radius-lg)] p-5"
    >
      <ShaderBackdrop variant={stat.variant} opacity={0.18} size={1.5} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-16 rounded-t-[inherit]"
        style={{
          background:
            "radial-gradient(80% 100% at 50% 0%, color-mix(in srgb, var(--color-accent) 16%, transparent), transparent 70%)",
        }}
      />
      <div className="relative">
        <p className="num m-0 text-[42px] font-semibold leading-none tracking-[-0.03em] md:text-[48px]">
          <span style={{ color: "var(--color-accent)" }}>
            {display}
            {stat.suffix}
          </span>
        </p>
        <h3 className="mt-3 text-[14px] font-medium leading-snug text-[var(--color-fg)]">{stat.label}</h3>
        <p className="mt-1.5 text-[12.5px] leading-snug text-[var(--color-muted)]">{stat.sub}</p>
      </div>
    </motion.div>
  );
}
