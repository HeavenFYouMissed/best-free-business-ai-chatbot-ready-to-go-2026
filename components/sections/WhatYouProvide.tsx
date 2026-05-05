"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ShaderBackdrop } from "@/components/ui/ShaderBackdrop";
import { StackReveal } from "@/components/ui/StackReveal";

const need = [
  "Your web app URL (live, accessible)",
  "App name + one-line description",
  "Preferred category (I'll advise if unsure)",
  "Apple Developer account access (I help set up if needed)",
  "Google Play Console access (same)",
  "Any existing branding assets (optional — I can generate)",
  "Privacy practices info for Apple's privacy labels",
];

const dontNeed = [
  "A Mac",
  "Xcode",
  "Any coding knowledge",
  "Design skills",
  "App Store Connect experience",
  "Google Play Console experience",
  "Patience for Apple's bureaucracy",
];

export function WhatYouProvide() {
  const dontRef = useRef<HTMLUListElement | null>(null);
  const dontIn = useInView(dontRef, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <section id="you-provide">
      <div className="container-x">
        <Reveal>
          <SectionLabel index="06" label="You provide" />
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-3 max-w-[24ch] text-balance">
            A short list from you. <span className="text-[var(--color-muted)]">A shorter one you can ignore.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 md:gap-6">
          <StackReveal index={0} count={2}>
            <div className="glass-card relative h-full overflow-hidden rounded-[var(--radius-lg)] p-6 md:p-7">
              <ShaderBackdrop variant="dots" opacity={0.2} />
              <div className="relative">
                <div className="mono-label">[ what I need ]</div>
                <ul className="mt-5 space-y-2.5 text-[14.5px] leading-relaxed">
                  {need.map((n) => (
                    <li key={n} className="flex items-start gap-2">
                      <span className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-[var(--color-accent)]" />
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </StackReveal>

          <StackReveal index={1} count={2}>
            <div className="glass-card relative h-full overflow-hidden rounded-[var(--radius-lg)] p-6 md:p-7">
              <ShaderBackdrop variant="sphere" color="#707070" opacity={0.14} />
              <div className="mono-label relative">[ what you don&apos;t need ]</div>
              <ul ref={dontRef} className="relative mt-5 space-y-2.5 text-[14.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_72%,transparent)]">
                {dontNeed.map((d, i) => (
                  <motion.li
                    key={d}
                    initial={{ opacity: 0.4 }}
                    animate={dontIn ? { opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                    className="flex items-start gap-2"
                  >
                    <span className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-[var(--color-border-strong)]" />
                    <span className="relative inline-block">
                      {d}
                      <motion.span
                        aria-hidden
                        initial={{ scaleX: 0 }}
                        animate={dontIn ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.7, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                        style={{ originX: 0 }}
                        className="pointer-events-none absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[color-mix(in_srgb,var(--color-fg)_40%,transparent)]"
                      />
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </StackReveal>
        </div>
      </div>
    </section>
  );
}
