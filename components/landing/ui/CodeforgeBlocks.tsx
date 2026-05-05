"use client";

/**
 * Codeforge template animation blocks — ported verbatim from
 * `magicuidesign-codeforge-template/src/components/animations/sections/`
 *
 * Retargeted Tailwind shadcn tokens to our brand palette:
 *   bg-card / bg-background  → bg-[var(--color-ink)] / bg-[var(--color-bg)]
 *   bg-muted                 → bg-white/5
 *   border-border            → border-white/10
 *   text-foreground          → text-white
 *   text-muted-foreground    → text-white/60
 *   text-primary / bg-primary → text-[var(--color-accent)] / bg-[var(--color-accent)]
 *   text-destructive         → text-[var(--color-danger)]
 *   text-success/bg-success  → text-[var(--color-accent-mint)]
 */

import { useRef, useState, useEffect, useMemo, memo } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Check, ChevronUp, Globe, List, Loader2, Plus, Search } from "lucide-react";

import { cn } from "@/components/landing/utils";

// ============================================================================
// CodeReviewBlock — diff-and-apply animation. Visualizes a code suggestion.
// Source: codeforge/animations/sections/code-review-block.tsx
// ============================================================================

const CR_BUTTON_TEXT = "Apply suggestion";
const CR_CODE = {
  fileName: "utils.ts",
  imports: [
    "import { useState, useEffect } from 'react';",
    "import { cn } from '@/lib/utils';",
  ],
  before: [
    "const [count, setCount] = useState(0);",
    "useEffect(() => {",
    "  console.log(count);",
    "}, [count]);",
  ],
  after: [
    "const [count, setCount] = useState(0);",
    "",
    "useEffect(() => {",
    "  console.log('Count changed:', count);",
    "}, [count]);",
  ],
  rest: [
    "export function useCounter() {",
    "  return { count, setCount };",
    "}",
  ],
};

const CR_SEQUENCE = [
  { action: "buttonClick", delay: 1200 },
  { action: "applied", delay: 600 },
] as const;

const crContainerVariants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } };
const crDeletionVariants = {
  visible: { opacity: 1, height: "auto" as const },
  hidden: {
    opacity: 0,
    height: 0,
    marginBottom: 0,
    marginTop: 0,
    transition: {
      opacity: { duration: 0.2 },
      height: { duration: 0.4, delay: 0.2, ease: "easeInOut" as const },
      marginBottom: { duration: 0.4, delay: 0.2, ease: "easeInOut" as const },
      marginTop: { duration: 0.4, delay: 0.2, ease: "easeInOut" as const },
    },
  },
};
const crAdditionVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const crButtonVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  clicked: { scale: [1, 0.95, 1] },
};
const springTransition = { type: "spring" as const, stiffness: 100, damping: 20 };

export function CodeReviewBlock() {
  const codeBlockRef = useRef<HTMLDivElement>(null);
  const inView = useInView(codeBlockRef, { amount: 0.6, margin: "100px 0px -80px 0px" });
  const [isApplied, setIsApplied] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const seqIdxRef = useRef(0);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (!inView) {
      setIsApplied(false);
      setIsButtonClicked(false);
      seqIdxRef.current = 0;
      return;
    }

    seqIdxRef.current = 0;
    const run = () => {
      if (seqIdxRef.current >= CR_SEQUENCE.length) return;
      const { action, delay } = CR_SEQUENCE[seqIdxRef.current];
      seqIdxRef.current += 1;
      timerRef.current = setTimeout(() => {
        if (action === "buttonClick") setIsButtonClicked(true);
        if (action === "applied") setIsApplied(true);
        if (seqIdxRef.current < CR_SEQUENCE.length) run();
      }, delay);
    };
    run();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      seqIdxRef.current = 0;
    };
  }, [inView]);

  return (
    <div
      ref={codeBlockRef}
      className="relative flex h-full min-h-[280px] items-center justify-center overflow-visible p-4"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ ...springTransition, delay: 0.2 }}
        variants={crContainerVariants}
        className="relative w-full max-w-md"
      >
        <CodeEditor isApplied={isApplied} />
        <AnimatePresence>
          {!isApplied && <ApplyButton text={CR_BUTTON_TEXT} isClicked={isButtonClicked} />}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

const CodeEditor = memo(function CodeEditor({ isApplied }: { isApplied: boolean }) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-[var(--color-ink)]">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="ml-2 text-[11px] text-white/55">{CR_CODE.fileName}</span>
        </div>
      </div>

      <div className="overflow-hidden bg-[var(--color-bg)] p-4 font-mono text-[11px] leading-relaxed">
        <div className="space-y-0.5">
          {CR_CODE.imports.map((line, i) => (
            <div key={i} className="text-white/85">
              {line}
            </div>
          ))}

          <div>&nbsp;</div>

          <div className="text-white/85">{CR_CODE.rest[0]}</div>

          <AnimatePresence>
            {!isApplied && (
              <motion.div
                variants={crDeletionVariants}
                initial="visible"
                exit="hidden"
                className="space-y-0.5"
              >
                {CR_CODE.before.map((line, i) => (
                  <div
                    key={i}
                    className="flex border-l-2 border-[var(--color-danger)] bg-[color-mix(in_srgb,var(--color-danger)_10%,transparent)] pl-2"
                  >
                    <span className="text-[var(--color-danger)] line-through">- {line}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            variants={crAdditionVariants}
            initial="hidden"
            animate="visible"
            transition={{ ...springTransition, delay: 0.3 }}
            className="space-y-0.5"
          >
            {CR_CODE.after.map((line, i) => (
              <div
                key={i}
                className={cn(
                  "flex border-l-2 pl-2",
                  !isApplied
                    ? "border-[var(--color-accent-mint)] bg-[color-mix(in_srgb,var(--color-accent-mint)_10%,transparent)]"
                    : "border-transparent",
                )}
              >
                <span className={!isApplied ? "text-[var(--color-accent-mint)]" : "text-white/85"}>
                  {!isApplied ? "+ " : ""}
                  {line}
                </span>
              </div>
            ))}
          </motion.div>

          {CR_CODE.rest.slice(1).map((line, i) => (
            <div key={i} className="text-white/85">
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

const ApplyButton = memo(function ApplyButton({
  text,
  isClicked,
}: {
  text: string;
  isClicked: boolean;
}) {
  const buttonAnimation = useMemo(
    () => ({ opacity: 1, scale: isClicked ? [1, 0.95, 1] : 1 }),
    [isClicked],
  );

  return (
    <motion.div
      variants={crButtonVariants}
      initial="hidden"
      animate={buttonAnimation}
      exit="hidden"
      transition={{ scale: { duration: 0.2, ease: "easeInOut" }, opacity: { duration: 0.2 } }}
      className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2"
    >
      <span className="inline-flex h-9 items-center rounded-full border border-white/20 bg-gradient-to-b from-white/15 to-white/5 px-4 text-xs font-medium text-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.6)] backdrop-blur-md">
        {text}
      </span>
    </motion.div>
  );
});

// ============================================================================
// TerminalBrowserPreviewBlock — terminal that runs cmds, then a browser
// preview slides up. Source: terminal-browser-preview.tsx
// ============================================================================

type CloningStatus = "idle" | "cloning" | "cloned" | "starting" | "started" | "preview";

const TBP_SEQUENCE: Array<{ status: CloningStatus; delay: number }> = [
  { status: "cloning", delay: 600 },
  { status: "cloned", delay: 1400 },
  { status: "starting", delay: 800 },
  { status: "started", delay: 800 },
  { status: "preview", delay: 600 },
];

const tbpTerminalVariants = {
  idle: { x: "0%", y: "0%" },
  active: { x: "8%", y: "-12%" },
};

const tbpBrowserVariants = {
  hidden: { opacity: 0, y: 100, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export function TerminalBrowserPreviewBlock() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5, margin: "40px 0px -40px 0px" });
  const [status, setStatus] = useState<CloningStatus>("idle");
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const seqIdxRef = useRef(0);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (!inView) {
      setStatus("idle");
      seqIdxRef.current = 0;
      return;
    }

    seqIdxRef.current = 0;
    const run = () => {
      if (seqIdxRef.current >= TBP_SEQUENCE.length) return;
      const { status: next, delay } = TBP_SEQUENCE[seqIdxRef.current];
      seqIdxRef.current += 1;
      timerRef.current = setTimeout(() => {
        setStatus(next);
        if (seqIdxRef.current < TBP_SEQUENCE.length) run();
      }, delay);
    };
    run();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      seqIdxRef.current = 0;
    };
  }, [inView]);

  const isPreviewState = status === "starting" || status === "started" || status === "preview";

  return (
    <div
      ref={ref}
      className="relative flex h-full min-h-[300px] items-center justify-center overflow-visible p-4"
    >
      <motion.div
        animate={isPreviewState ? tbpTerminalVariants.active : tbpTerminalVariants.idle}
        transition={springTransition}
        className="relative w-full max-w-md"
      >
        <CloningStatusIndicator status={status} />
        <TerminalWindow
          command="publishd ship"
          output={[
            "Building production bundle...",
            "Resolving deltas: 100% (1234/1234), done.",
            "Provisioning Cloudflare Worker...",
            "Wiring DNS + edge cache...",
            "Live in production",
          ]}
        />
      </motion.div>

      <AnimatePresence>
        {status === "preview" && (
          <BrowserPreview
            title="Live in 90 minutes"
            description="Every push hits the edge. No staging dance, no retainer."
          />
        )}
      </AnimatePresence>
    </div>
  );
}

const TerminalWindow = memo(function TerminalWindow({
  command,
  output,
}: {
  command: string;
  output: string[];
}) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-[var(--color-ink)]">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2.5">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
        </div>
      </div>

      <div className="bg-[var(--color-bg)] p-4 font-mono text-[11px] leading-relaxed">
        <div className="space-y-0.5 text-white/85">
          <div className="flex">
            <span className="text-[var(--color-accent)]">$</span>
            <span className="ml-2">{command}</span>
          </div>
          {output.map((line, i) => {
            const parts = line.split("100%");
            return (
              <div key={i} className="text-white/55">
                {parts.length > 1 ? (
                  <>
                    {parts[0]}
                    <span className="font-semibold text-white">100%</span>
                    {parts[1]}
                  </>
                ) : (
                  line
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

const BrowserPreview = memo(function BrowserPreview({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <motion.div
      variants={tbpBrowserVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ ...springTransition, delay: 0.2 }}
      className="absolute bottom-4 left-1/2 z-20 w-full max-w-[18rem] -translate-x-1/2 overflow-hidden rounded-xl border border-white/12 bg-[var(--color-ink)]"
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-3 py-1.5">
        <div className="flex gap-1.5">
          <div className="h-2 w-2 rounded-full bg-red-500/80" />
          <div className="h-2 w-2 rounded-full bg-yellow-500/80" />
          <div className="h-2 w-2 rounded-full bg-green-500/80" />
        </div>
      </div>
      <div className="flex h-32 flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_30%,color-mix(in_srgb,var(--color-accent)_18%,transparent),transparent_70%)] p-4">
        <div className="space-y-1.5 text-center">
          <h3 className="text-[15px] font-semibold leading-tight tracking-tight text-white">
            {title}
          </h3>
          <p className="text-[11px] leading-relaxed text-white/65">{description}</p>
        </div>
      </div>
    </motion.div>
  );
});

function CloningStatusIndicator({ status }: { status: CloningStatus }) {
  const isVisible = status !== "idle";
  const isLoading = status === "cloning" || status === "starting";

  const statusText = useMemo(() => {
    switch (status) {
      case "cloning":
        return "Building";
      case "cloned":
        return "Built";
      case "starting":
        return "Deploying";
      case "started":
      case "preview":
        return "Shipped";
      default:
        return "";
    }
  }, [status]);

  const animationKey = status === "preview" ? "started" : status;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key={animationKey}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute -top-3.5 left-1/2 z-10 flex -translate-x-1/2 items-center justify-center"
        >
          <span className="inline-flex h-9 items-center gap-2 rounded-full border border-white/15 bg-[var(--color-ink)] py-2 pl-2 pr-4 text-xs font-medium shadow-[0_8px_20px_-8px_rgba(0,0,0,0.6)]">
            <span className="flex size-4 shrink-0 items-center justify-center">
              {isLoading ? (
                <Loader2 className="size-4 animate-spin text-white" />
              ) : (
                <span className="flex size-4 items-center justify-center rounded-full bg-[var(--color-accent)]">
                  <Check className="size-3 stroke-2 text-[var(--color-bg)]" />
                </span>
              )}
            </span>
            <span className="whitespace-nowrap text-white">{statusText}</span>
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// PlanSearchCard — chat-style "compose" pill with sources popover
// Source: plan-search-card.tsx + integrations-popover.tsx + connection-status-indicator.tsx
// ============================================================================

const INTEGRATIONS = [
  { name: "Next.js", installed: true },
  { name: "Cloudflare Workers", installed: true },
  { name: "Supabase", installed: true },
  { name: "Resend", installed: false },
];

function IntegrationsPopover({ open }: { open: boolean }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-full left-1/2 mb-2 w-[260px] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/12 bg-[var(--color-ink)] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)] md:left-4 md:translate-x-0"
        >
          <div className="flex flex-col divide-y divide-white/8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/45" />
              <input
                type="text"
                placeholder="Search sources"
                readOnly
                className="pointer-events-none h-11 w-full border-none bg-transparent pl-10 pr-4 text-xs text-white placeholder:text-white/40"
              />
            </div>
            {INTEGRATIONS.map((it) => (
              <div key={it.name} className="flex items-center gap-3 px-3 py-2">
                <div className="size-7 shrink-0 rounded-md border border-white/10 bg-white/5" />
                <span className="flex-1 text-xs font-medium text-white">{it.name}</span>
                {it.installed && (
                  <span className="rounded-md bg-[color-mix(in_srgb,var(--color-accent)_15%,transparent)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--color-accent)]">
                    Wired
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const PSC_TYPED_TEXT = "Build me a publish-on-push pipeline...";

export function PlanSearchCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-30% 0px -30% 0px", once: false });
  const [showDialog, setShowDialog] = useState(false);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let i = 0;
    if (!inView) {
      setShowDialog(false);
      setTyped("");
      return;
    }

    const t = setInterval(() => {
      i += 1;
      setTyped(PSC_TYPED_TEXT.slice(0, i));
      if (i >= PSC_TYPED_TEXT.length) clearInterval(t);
    }, 45);

    const d = setTimeout(() => setShowDialog(true), 1200);

    return () => {
      clearInterval(t);
      clearTimeout(d);
    };
  }, [inView]);

  return (
    <div
      ref={ref}
      className="relative flex h-full min-h-[260px] items-end justify-center overflow-visible p-4"
    >
      <div className="relative flex h-32 w-full max-w-md flex-col justify-between rounded-2xl border border-white/12 bg-[var(--color-ink)] px-5 py-4">
        <p className="font-mono text-[12px] text-white/85">
          {typed}
          <span className="ml-0.5 inline-block h-3 w-[2px] animate-pulse bg-[var(--color-accent)] align-middle" />
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Add"
              className="rounded-lg p-1.5 transition-colors hover:bg-white/8"
            >
              <Plus className="size-4 text-white/65" />
            </button>
            <button
              type="button"
              aria-label="Web"
              className="rounded-lg p-1.5 transition-colors hover:bg-white/8"
            >
              <Globe className="size-4 text-white/65" />
            </button>
            <div className="relative">
              <IntegrationsPopover open={showDialog} />
              <button
                type="button"
                className={cn(
                  "flex h-7 items-center gap-1.5 rounded-full border border-transparent px-2 transition-colors",
                  showDialog && "border-white/12 bg-white/8",
                )}
              >
                <List className="size-3 text-white/70" />
                <span className="text-[11px] text-white/85">Sources</span>
              </button>
            </div>
          </div>
          <span className="flex size-7 items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-bg)]">
            <ChevronUp className="size-3.5 stroke-[2.5]" />
          </span>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// IntegrationBlock — connected services with stagger reveal
// Source: integration-block.tsx (simplified)
// ============================================================================

const SERVICES = [
  { name: "Stripe", glow: "from-violet-400 to-fuchsia-500" },
  { name: "Cloudflare", glow: "from-orange-400 to-amber-500" },
  { name: "Supabase", glow: "from-emerald-400 to-teal-500" },
  { name: "Resend", glow: "from-cyan-400 to-sky-500" },
  { name: "Vercel", glow: "from-zinc-300 to-zinc-500" },
  { name: "GitHub", glow: "from-violet-300 to-violet-500" },
];

export function IntegrationGridBlock() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <div
      ref={ref}
      className="relative flex h-full min-h-[260px] items-center justify-center overflow-visible p-6"
    >
      <div className="grid w-full max-w-md grid-cols-3 gap-3">
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : undefined}
            transition={{ delay: i * 0.08, type: "spring", stiffness: 100, damping: 15 }}
            className="group relative flex aspect-square items-center justify-center rounded-xl border border-white/10 bg-[var(--color-ink)] p-3 text-center"
          >
            <div
              className={cn(
                "pointer-events-none absolute inset-1 rounded-lg bg-gradient-to-br opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-50",
                s.glow,
              )}
            />
            <span className="relative z-10 font-mono text-[10px] uppercase tracking-[0.18em] text-white/85">
              {s.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
