"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  Activity,
  AppleIcon,
  CheckCircle2,
  Cpu,
  GitBranch,
  Hammer,
  LifeBuoy,
  PlayIcon,
  RefreshCw,
  Sparkles,
  Workflow,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { landingConfig } from "@/components/landing/config";
import { SectionHeader } from "@/components/landing/SectionHeader";
import {
  CodeReviewBlock,
  IntegrationGridBlock,
  PlanSearchCard,
  TerminalBrowserPreviewBlock,
} from "@/components/landing/ui/CodeforgeBlocks";
import { CornerPlus } from "@/components/landing/ui/CornerPlus";
import { DotPattern } from "@/components/landing/ui/DotPattern";
import { TypingTerminal } from "@/components/landing/ui/TypingTerminal";
import { cn } from "@/components/landing/utils";

/* ============ Bento cell visuals ============ */

function BuildVisual() {
  return (
    <TypingTerminal
      title="publishd@build:~"
      className="absolute inset-x-4 top-4"
      lines={[
        { kind: "input", text: "pnpm build && next start" },
        { kind: "output", text: "▲ next 15.5  building...", tone: "info" },
        { kind: "output", text: "compiled successfully", tone: "ok" },
        { kind: "output", text: "deployed to publishd.app", tone: "ok" },
        { kind: "input", text: "open https://publishd.app" },
      ]}
      speed={28}
      linePause={420}
    />
  );
}

function FixVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setStep((s) => (s + 1) % 3), 2200);
    return () => clearInterval(id);
  }, [inView]);

  const lines = [
    {
      red: "  let user = await db.user.findOne({ id })",
      green: '  const user = await db.user.findOne({ where: { id } })',
    },
    {
      red: '  if (!user) return res.send("404")',
      green: "  if (!user) return notFound()",
    },
    {
      red: "  return user.subscription.tier",
      green: "  return user.subscription?.tier ?? null",
    },
  ];

  return (
    <div
      ref={ref}
      className="absolute inset-x-4 top-4 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[#04060c] font-mono text-[11.5px] leading-[1.65]"
    >
      <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_85%,transparent)] px-3 py-2">
        <GitBranch className="h-3 w-3 text-[var(--color-accent)]" />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--color-fg)_60%,transparent)]">
          fix/auth-bug · 3 changed
        </span>
      </div>
      <div className="space-y-1 px-3 py-3 text-[11px]">
        {lines.map((l, i) => (
          <div key={i} className="space-y-0.5">
            <AnimatePresence mode="wait">
              {step >= i ? (
                <>
                  <motion.div
                    key={`r-${i}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 0.6, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="flex items-start gap-2 line-through"
                  >
                    <span className="select-none text-[#ff5f56]">-</span>
                    <span className="text-[#ff8a8a]">{l.red}</span>
                  </motion.div>
                  <motion.div
                    key={`g-${i}`}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    className="flex items-start gap-2"
                  >
                    <span className="select-none text-[#27c93f]">+</span>
                    <span className="text-[var(--color-accent-mint)]">
                      {l.green}
                    </span>
                  </motion.div>
                </>
              ) : null}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

function RescueVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  return (
    <div
      ref={ref}
      className="absolute inset-x-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 font-mono text-[12px]"
    >
      {[
        { label: "main", state: "broken", color: "danger" },
        { label: "feature/payments", state: "abandoned", color: "warn" },
        { label: "rescue/by-daniel", state: "shipping", color: "ok" },
      ].map((b, i) => (
        <motion.div
          key={b.label}
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 + i * 0.25, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "flex items-center gap-3 rounded-lg border px-3 py-2",
            b.color === "danger" &&
              "border-[#ff5f56]/40 bg-[#ff5f56]/8 text-[#ff8a8a]",
            b.color === "warn" &&
              "border-[#ffbd2e]/40 bg-[#ffbd2e]/8 text-[#ffbd2e]",
            b.color === "ok" &&
              "border-[var(--color-accent)]/45 bg-[color-mix(in_srgb,var(--color-accent)_10%,transparent)] text-[var(--color-accent-mint)]",
          )}
        >
          <GitBranch className="h-3.5 w-3.5 shrink-0" />
          <span className="flex-1 text-[12px]">{b.label}</span>
          <span className="text-[10px] uppercase tracking-[0.2em] opacity-90">
            {b.state}
          </span>
          {b.color === "ok" ? (
            <span
              className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"
              style={{ animation: "status-dot-pulse 2s ease-in-out infinite" }}
            />
          ) : null}
        </motion.div>
      ))}
    </div>
  );
}

function PublishVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  return (
    <div
      ref={ref}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="relative grid grid-cols-2 gap-3">
        {[
          { name: "App Store", icon: AppleIcon, delay: 0 },
          { name: "Google Play", icon: PlayIcon, delay: 0.3 },
        ].map((s) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: s.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex h-24 w-32 flex-col items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-ink)_85%,transparent)] p-3"
          >
            <s.icon className="h-7 w-7 text-[var(--color-fg)]" />
            <span className="text-center font-mono text-[10px] uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--color-fg)_72%,transparent)]">
              {s.name}
            </span>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, scale: 0.4 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-[var(--color-accent)] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#001018] shadow-[0_10px_30px_-8px_color-mix(in_srgb,var(--color-accent)_70%,transparent)]"
        >
          <CheckCircle2 className="h-3 w-3" strokeWidth={3} />
          Approved
        </motion.div>
      </div>
    </div>
  );
}

function AIVisual() {
  // Fixed angles distributed evenly per ring — no Math.random (would cause
  // SSR/CSR hydration mismatch since random differs between server + client).
  const orbitItems = [
    { label: "OpenAI", angle: 0, delay: 0, radius: 90, dur: 18 },
    { label: "Anthropic", angle: 120, delay: -6, radius: 90, dur: 18 },
    { label: "Groq", angle: 240, delay: -12, radius: 90, dur: 18 },
    {
      label: "Cloudflare",
      angle: 60,
      delay: -3,
      radius: 130,
      dur: 26,
      reverse: true,
    },
    {
      label: "Vercel",
      angle: 240,
      delay: -16,
      radius: 130,
      dur: 26,
      reverse: true,
    },
  ] as const;

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(40%_40%_at_50%_50%,color-mix(in_srgb,var(--color-accent)_22%,transparent),transparent_70%)]" />
      <div className="relative h-44 w-44">
        {orbitItems.map((p) => (
          <span
            key={p.label}
            className="absolute left-1/2 top-1/2 inline-flex h-8 -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_85%,transparent)] px-2.5 font-mono text-[9.5px] uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--color-fg)_82%,transparent)] backdrop-blur-md"
            style={
              {
                "--ln-angle": p.angle,
                "--ln-radius": p.radius,
                animation: `ln-orbit ${p.dur}s linear infinite`,
                animationDelay: `${p.delay}s`,
                animationDirection: "reverse" in p && p.reverse ? "reverse" : "normal",
              } as React.CSSProperties
            }
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
            {p.label}
          </span>
        ))}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color-mix(in_srgb,var(--color-accent)_45%,var(--color-border))] bg-[color-mix(in_srgb,var(--color-bg)_70%,transparent)] p-3 backdrop-blur-md">
          <Cpu className="h-7 w-7 text-[var(--color-accent)]" />
        </div>
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <circle
            cx="50%"
            cy="50%"
            r="90"
            fill="none"
            stroke="color-mix(in srgb, var(--color-accent) 18%, transparent)"
            strokeDasharray="3 4"
          />
          <circle
            cx="50%"
            cy="50%"
            r="130"
            fill="none"
            stroke="color-mix(in srgb, var(--color-accent) 12%, transparent)"
            strokeDasharray="2 5"
          />
        </svg>
      </div>
    </div>
  );
}

function AutomateVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const nodes = [
    { id: "trigger", label: "Trigger", icon: Activity, x: 8, y: 50 },
    { id: "process", label: "Process", icon: Workflow, x: 50, y: 30 },
    { id: "ai", label: "AI", icon: Sparkles, x: 50, y: 70 },
    { id: "deploy", label: "Deploy", icon: CheckCircle2, x: 92, y: 50 },
  ];

  return (
    <div
      ref={ref}
      className="absolute inset-4 flex items-center justify-center"
    >
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {[
          ["8,50", "50,30"],
          ["8,50", "50,70"],
          ["50,30", "92,50"],
          ["50,70", "92,50"],
        ].map((p, i) => (
          <motion.line
            key={i}
            x1={p[0].split(",")[0]}
            y1={p[0].split(",")[1]}
            x2={p[1].split(",")[0]}
            y2={p[1].split(",")[1]}
            stroke="color-mix(in srgb, var(--color-accent) 50%, transparent)"
            strokeWidth="0.6"
            strokeLinecap="round"
            strokeDasharray="2 2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease: "easeOut" }}
          />
        ))}
      </svg>
      {nodes.map((n, i) => (
        <motion.div
          key={n.id}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="absolute flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-0.5 rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-ink)_88%,transparent)] backdrop-blur-md"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <n.icon className="h-4 w-4 text-[var(--color-accent)]" strokeWidth={1.6} />
          <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-[color-mix(in_srgb,var(--color-fg)_72%,transparent)]">
            {n.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* ============ Section ============ */

// Bento visuals — Build/Rescue keep their hand-built versions, the other four
// are now full Codeforge animation blocks ported from the template.
const VISUALS = [
  BuildVisual,                    // Build  — TypingTerminal
  CodeReviewBlock,                // Fix    — Codeforge code-review-block
  RescueVisual,                   // Rescue — hand-built fallback animation
  TerminalBrowserPreviewBlock,    // Publish — Codeforge terminal-browser-preview
  PlanSearchCard,                 // AI     — Codeforge plan-search-card
  IntegrationGridBlock,           // Automate — Codeforge integration grid
];

const ICONS = [Hammer, LifeBuoy, RefreshCw, AppleIcon, Cpu, Workflow];

export function LandingWhatIDo() {
  const { whatIDo } = landingConfig;

  return (
    <section
      id="what"
      className="border-b border-white/5 py-24 md:py-32"
    >
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-14 px-6 md:px-10">
        <SectionHeader
          eyebrow={whatIDo.eyebrow}
          title={whatIDo.title}
          accentWord="End-to-End"
          description={whatIDo.description}
        />

        {/* Engineering-doc frame: CornerPlus marks the corners of the bento;
            DotPattern dusts a faint grid behind it. Codeforge primitives. */}
        <div className="relative w-full text-white/15">
          <CornerPlus />
          <div className="grid w-full grid-cols-1 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
            {whatIDo.bullets.map((b, i) => {
              const Visual = VISUALS[i] ?? BuildVisual;
              const Icon = ICONS[i] ?? Hammer;
              return (
                <div
                  key={i}
                  className="group relative flex min-h-[480px] flex-col overflow-hidden bg-[var(--color-bg)] transition-colors duration-200 hover:bg-[color-mix(in_srgb,var(--color-surface)_60%,var(--color-bg))]"
                >
                  <div className="relative h-[340px] overflow-hidden border-b border-white/10 bg-[color-mix(in_srgb,var(--color-ink)_55%,transparent)] sm:h-[300px]">
                    <DotPattern
                      className="opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_85%)]"
                      width={18}
                      height={18}
                      cr={0.7}
                    />
                    <Visual />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[var(--color-bg)] to-transparent"
                    />
                  </div>
                  <div className="flex flex-col gap-2 p-6">
                    <div className="flex items-center gap-2">
                      <Icon
                        className="h-3.5 w-3.5 text-[var(--color-accent)]"
                        strokeWidth={1.8}
                      />
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="text-[1.15rem] font-semibold tracking-tight text-[var(--color-fg)]">
                      {b.title}
                    </h3>
                    <p className="text-[13.5px] leading-[1.65] text-[color-mix(in_srgb,var(--color-fg)_72%,transparent)]">
                      {b.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
