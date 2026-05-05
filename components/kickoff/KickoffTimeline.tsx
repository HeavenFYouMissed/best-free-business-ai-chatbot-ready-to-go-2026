"use client";

import { motion } from "framer-motion";

const NODES = [
  { day: "Day 0", title: "Intake + kickoff call booked", accent: "cyan" },
  { day: "Day 1", title: "Accounts set up · build started", accent: "cyan" },
  { day: "Day 2\u20137", title: "Assets, listings, submission", accent: "signal" },
  { day: "Live", title: "Both stores · under your accounts", accent: "signal" },
] as const;

/**
 * Compact 4-node timeline rail. Sits above the intake form on /kickoff so
 * the user sees the whole trajectory before filling anything out. Each
 * node shader-lit on hover, cyan connector line between them.
 */
export function KickoffTimeline() {
  return (
    <div className="mt-10 overflow-hidden rounded-[var(--radius-md)] border border-[color-mix(in_srgb,var(--color-accent)_18%,var(--color-border))] bg-[color-mix(in_srgb,#050810_72%,transparent)] px-4 py-5 backdrop-blur-sm md:px-6">
      <div className="flex items-center justify-between gap-3">
        <span className="mono-label !m-0 !p-0 before:hidden">[ timeline ]</span>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[var(--color-subtle)]">
          start &#8594; live
        </span>
      </div>

      <ol className="relative mt-5 grid gap-4 md:grid-cols-4 md:gap-0">
        {/* Connector line (desktop only) */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-[7%] right-[7%] top-[14px] hidden h-px md:block"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, color-mix(in srgb, var(--color-accent) 60%, transparent) 15%, color-mix(in srgb, var(--color-accent) 60%, transparent) 85%, transparent 100%)",
            boxShadow: "0 0 8px 0 color-mix(in srgb, var(--color-accent) 45%, transparent)",
          }}
        />
        {NODES.map((n, i) => {
          const accentVar =
            n.accent === "signal" ? "var(--color-signal)" : "var(--color-accent)";
          return (
            <motion.li
              key={n.day}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
              className="relative flex items-start gap-3 md:flex-col md:items-center md:text-center"
            >
              <span
                aria-hidden
                className="relative block h-[12px] w-[12px] shrink-0 rounded-full border"
                style={{
                  borderColor: accentVar,
                  background: "color-mix(in srgb, #05070d 82%, transparent)",
                  boxShadow: `0 0 8px color-mix(in srgb, ${accentVar} 80%, transparent)`,
                }}
              >
                <span
                  aria-hidden
                  className="absolute inset-[3px] rounded-full"
                  style={{
                    background: accentVar,
                    boxShadow: `0 0 6px ${accentVar}`,
                  }}
                />
              </span>
              <div className="min-w-0 md:mt-2">
                <div
                  className="font-mono text-[10.5px] uppercase tracking-[0.22em]"
                  style={{ color: `color-mix(in srgb, ${accentVar} 88%, white)` }}
                >
                  {n.day}
                </div>
                <div className="mt-1 text-[13px] font-medium leading-snug text-[var(--color-fg)] md:max-w-[22ch]">
                  {n.title}
                </div>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}

export default KickoffTimeline;
