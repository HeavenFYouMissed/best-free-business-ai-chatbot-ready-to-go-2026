"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Tell us what you need",
    body: "Fill out the kickoff form or message directly. Three minutes, no calls required.",
  },
  {
    num: "02",
    title: "We reply in hours",
    body: "Scope, timeline, and a flat quote. No retainers, no surprise invoices.",
  },
  {
    num: "03",
    title: "We ship it",
    body: "Built, submitted, live. Days, not months. You own everything end to end.",
  },
];

export function CoverProcess() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="cover-process px-5 pt-20 md:px-10 md:pt-28 lg:px-16"
      aria-label="How it works"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[color-mix(in_srgb,var(--color-fg)_60%,transparent)]">
          Process
        </span>
        <h2 className="mt-3 max-w-[18ch] text-[clamp(1.5rem,3.8vw,2.2rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-[var(--color-fg)]">
          Three steps. No theater.
        </h2>
      </motion.div>

      <ol className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-5">
        {steps.map((step, i) => (
          <motion.li
            key={step.num}
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.45, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
            className="rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-ink)_70%,transparent)] p-6 md:p-7"
          >
            <span className="font-mono text-[11px] tracking-[0.22em] text-[var(--color-accent)]">
              {step.num}
            </span>
            <h3 className="mt-4 text-[17px] font-semibold leading-[1.25] tracking-[-0.015em] text-[var(--color-fg)]">
              {step.title}
            </h3>
            <p className="mt-2 text-[13.5px] leading-[1.65] text-[color-mix(in_srgb,var(--color-fg)_68%,transparent)]">
              {step.body}
            </p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
