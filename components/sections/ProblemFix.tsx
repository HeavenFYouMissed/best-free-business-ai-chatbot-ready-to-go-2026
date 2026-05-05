"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AlertTriangle, Check } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { WallFixShader } from "@/components/sections/WallFixShader";

const wall = [
  "Apple Developer + Google Play account setup maze",
  "Certificates, provisioning profiles, bundle IDs",
  "20+ icon sizes, 6 device screenshot sizes",
  "Privacy policy + App Store metadata optimization",
  "Apple 4.2 rejections with zero guidance on what to fix",
  "Google Play signing keys",
  "Weeks of your time — or a subscription trap",
];

const fix = [
  "Send me your web app URL",
  "15-min setup call (or skip it if you already have accounts)",
  "I use YOUR accounts. You own everything.",
  "All assets generated: icons, screenshots, metadata",
  "Apple rejects? I write the appeal. Included.",
  "Live in 7–14 days",
  "One flat fee. No subscription. Ever.",
];

export function ProblemFix() {
  const wallRef = useRef<HTMLDivElement | null>(null);
  const fixRef = useRef<HTMLDivElement | null>(null);
  const wallIn = useInView(wallRef, { once: true, margin: "0px 0px -10% 0px" });
  const fixIn = useInView(fixRef, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <section id="problem">
      <div className="container-x">
        <Reveal>
          <SectionLabel index="02" label="The wall / the fix" />
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-3 max-w-[22ch] text-balance">
            You finished the hard part.{" "}
            <span className="text-[var(--color-muted)]">Then hit the wall.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 md:gap-6">
          {/* THE WALL — red */}
          <motion.div
            ref={wallRef}
            initial={{ opacity: 0, x: -40 }}
            animate={wallIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[color-mix(in_srgb,var(--color-danger)_45%,var(--color-border))] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-danger)_9%,var(--color-surface-2)),var(--color-surface-2))] p-6 md:p-8"
          >
            <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.55]">
              <WallFixShader tone="wall" />
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, color-mix(in srgb, var(--color-danger) 18%, transparent) 0%, transparent 35%, color-mix(in srgb, var(--color-surface-2) 80%, transparent) 100%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 right-[-10%] h-56 w-56 rounded-full opacity-60 blur-[60px]"
              style={{
                background:
                  "radial-gradient(closest-side, color-mix(in srgb, var(--color-danger) 55%, transparent), transparent 70%)",
              }}
            />
            <div className="mono-label mb-6 relative" style={{ color: "var(--color-danger)" }}>
              <span
                className="!bg-transparent"
                style={{ color: "var(--color-danger)" }}
              >
                [ the wall ]
              </span>
            </div>
            <ul className="relative space-y-3">
              {wall.map((line, i) => (
                <motion.li
                  key={line}
                  initial={{ opacity: 0, x: -12 }}
                  animate={wallIn ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.12 + i * 0.08 }}
                  className="flex items-start gap-3 text-[15px] text-[color-mix(in_srgb,var(--color-fg)_80%,transparent)]"
                >
                  <AlertTriangle
                    className="icon mt-0.5 shrink-0"
                    aria-hidden
                    style={{
                      color: "var(--color-danger)",
                      filter: "drop-shadow(0 0 8px color-mix(in srgb, var(--color-danger) 60%, transparent))",
                    }}
                  />
                  <span>{line}</span>
                </motion.li>
              ))}
            </ul>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-danger) 60%, transparent), transparent)",
              }}
            />
          </motion.div>

          {/* THE FIX — slides in from the right, lines glow sequentially */}
          <motion.div
            ref={fixRef}
            initial={{ opacity: 0, x: 60 }}
            animate={fixIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[color-mix(in_srgb,var(--color-accent)_35%,var(--color-border))] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-accent)_7%,var(--color-surface)),var(--color-surface-2))] p-6 md:p-8"
          >
            <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.55]">
              <WallFixShader tone="fix" />
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, color-mix(in srgb, var(--color-accent) 15%, transparent) 0%, transparent 30%, color-mix(in srgb, var(--color-surface-2) 85%, transparent) 100%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-[-10%] h-64 w-64 rounded-full opacity-60 blur-[70px]"
              style={{
                background:
                  "radial-gradient(closest-side, color-mix(in srgb, var(--color-accent) 50%, transparent), transparent 70%)",
              }}
            />
            <div className="mono-label mb-6 relative">
              <span style={{ color: "var(--color-accent)" }}>[ the fix ]</span>
            </div>
            <ul className="relative space-y-3">
              {fix.map((line, i) => (
                <motion.li
                  key={line}
                  initial={{ opacity: 0, x: 32, filter: "blur(6px)" }}
                  animate={fixIn ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 + i * 0.13 }}
                  className="flex items-start gap-3 text-[15px]"
                >
                  <Check
                    className="icon mt-0.5 shrink-0"
                    aria-hidden
                    style={{
                      color: "var(--color-accent)",
                      filter: "drop-shadow(0 0 8px color-mix(in srgb, var(--color-accent) 70%, transparent))",
                    }}
                  />
                  <span>{line}</span>
                </motion.li>
              ))}
            </ul>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-accent) 75%, transparent), transparent)",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
