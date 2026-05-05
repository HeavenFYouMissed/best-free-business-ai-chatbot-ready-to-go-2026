"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/ui/SectionShell";

const proofCards = [
  {
    label: "This page",
    body: "Shader presets, tilt cards, bracket typography, scroll-reveal rhythm — all of it is on publishd.app too.",
    anchor: "/",
    anchorLabel: "publishd.app",
  },
  {
    label: "Studio work",
    body: "4 solo-shipped products. Public Secrets, Vibed, Model Surgery, SuperClawHub.",
    anchor: "/#studio-work",
    anchorLabel: "See work",
  },
  {
    label: "Shelf",
    body: "Every product I've shipped, rolling. Real URLs, real installs.",
    anchor: "/#shelf",
    anchorLabel: "Open shelf",
  },
];

export function BfyProof() {
  return (
    <SectionShell id="proof" mode="dark" className="scroll-mt-28 py-20 md:py-24">
      <div className="container-x">
        <Reveal>
          <SectionLabel index="04" label="Proof" />
        </Reveal>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <h2 className="max-w-[22ch] text-balance">This site is the portfolio.</h2>
          </Reveal>
          <Reveal delay={60}>
            <p className="max-w-[42ch] text-[14.5px] leading-relaxed text-[var(--color-muted)]">
              Every pixel on publishd.app — the page you&apos;re on — was built solo. Same
              engineer, same bar, same tool vocabulary you&apos;ll get on your project.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {proofCards.map((c, i) => (
            <Reveal key={c.label} delay={60 + i * 40}>
              <Link
                href={c.anchor}
                className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_75%,transparent)] p-5 transition-colors hover:border-[color-mix(in_srgb,var(--color-accent)_45%,var(--color-border))] md:p-6"
              >
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(320px 200px at 30% 20%, color-mix(in srgb, var(--color-accent) 22%, transparent), transparent 70%)",
                  }}
                />
                <span className="mono-label relative">[ {c.label.toLowerCase()} ]</span>
                <p className="relative mt-4 text-[14.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_88%,transparent)]">
                  {c.body}
                </p>
                <span className="relative mt-auto pt-5 inline-flex items-center gap-1.5 text-[12.5px] font-semibold" style={{ color: "var(--color-accent)" }}>
                  {c.anchorLabel}
                  <ArrowRight className="icon h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

export default BfyProof;
