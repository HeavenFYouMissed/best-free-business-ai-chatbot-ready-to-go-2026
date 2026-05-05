"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CoverChat } from "./CoverChat";

export function CoverAsk() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      ref={ref}
      className="cover-ask px-5 pt-20 md:px-10 md:pt-28 lg:px-16"
      aria-label="Ask anything"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        className="rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-ink)_72%,transparent)] p-6 md:p-10"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
          Ask anything
        </span>
        <h2 className="mt-3 max-w-[22ch] text-[clamp(1.5rem,3.8vw,2.2rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-[var(--color-fg)]">
          Questions before you start?
        </h2>
        <p className="mt-3 max-w-[48ch] text-[14px] leading-[1.65] text-[color-mix(in_srgb,var(--color-fg)_70%,transparent)] md:text-[15px]">
          Pricing, timelines, what stack we use, how ownership works. Ask anything —
          the assistant knows the services inside and out.
        </p>

        <div className="mt-7 md:mt-9">
          <CoverChat />
        </div>
      </motion.div>
    </section>
  );
}
