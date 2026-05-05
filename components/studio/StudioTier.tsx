"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { studio } from "@/data/tiers";
import { Reveal } from "@/components/ui/Reveal";
import { StudioShader } from "@/components/studio/StudioShader";

export function StudioTier() {
  const showcaseRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(showcaseRef, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <section
      id="tier-studio"
      aria-label="Publishd Studio"
      className="section--no-edge-mask scroll-mt-28"
    >
      <div className="container-x">
        <Reveal>
          <div className="studio-border relative overflow-hidden rounded-[var(--radius-lg)]">
            <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-[linear-gradient(180deg,#131318,#0b0b0f)] p-7 md:p-12">
              {/* Shaders.com Smokescreen 8 — violet palette, cursor-tracked */}
              <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.85]">
                <StudioShader />
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(120% 80% at 50% 100%, color-mix(in srgb, var(--color-bg) 78%, transparent), transparent 55%)",
                }}
              />

              <div className="relative flex flex-wrap items-center justify-between gap-3">
                <div className="mono-label" style={{ color: "var(--color-accent)" }}>
                  <span className="inline-flex items-center gap-2">
                    <Sparkles className="icon h-3.5 w-3.5" aria-hidden />
                    Studio · flagship
                  </span>
                </div>
                <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-muted)]">
                  Consultation only · scoped per project
                </div>
              </div>

              <div className="relative mt-8 grid gap-10 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:items-start">
                <div>
                  <h2 className="max-w-[16ch] text-balance">
                    {studio.name.split(" ").map((w, i) => (
                      <span key={i} className={i > 0 ? "ml-[0.2em]" : ""}>
                        {i === 1 ? (
                          <span className="bg-gradient-to-br from-[#7cf0d4] via-[var(--color-accent)] to-[#ff6b3d] bg-clip-text text-transparent">
                            {w}
                          </span>
                        ) : (
                          w
                        )}
                      </span>
                    ))}
                  </h2>
                  <p className="mt-5 max-w-[52ch] text-[17px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_84%,transparent)]">
                    {studio.summary}
                  </p>
                  <blockquote className="mt-6 border-l-2 border-[color-mix(in_srgb,var(--color-accent)_70%,transparent)] pl-4 text-[15.5px] italic leading-relaxed text-[var(--color-fg)]">
                    {studio.pitch}
                  </blockquote>

                  <div className="mt-8 flex flex-wrap items-baseline gap-3">
                    <span className="num text-[40px] font-semibold tracking-[-0.03em] md:text-[48px]">
                      From ${studio.priceFrom.toLocaleString()}
                    </span>
                    <span className="text-[13px] text-[var(--color-muted)]">Scoped per project. We talk first.</span>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <motion.a
                      whileHover={{ y: -2 }}
                      href={studio.cta.href}
                      className="btn btn--primary"
                    >
                      {studio.cta.label}
                      <ArrowUpRight className="icon" aria-hidden />
                    </motion.a>
                    <Link href="#studio-work" className="btn btn--ghost">
                      See solo-shipped work
                    </Link>
                  </div>
                </div>

                {/* Showcase — two real product screenshots, no copy overlays, zero client content. */}
                <div ref={showcaseRef} className="relative h-[440px] md:h-[480px]">
                  {studio.showcase.map((item, i) => (
                    <motion.div
                      key={item.src}
                      initial={{ opacity: 0, y: 30 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 + i * 0.14 }}
                      className={
                        item.kind === "phone"
                          ? "absolute left-[6%] top-[6%] w-[48%] max-w-[220px] rotate-[-5deg] sm:left-[4%] sm:top-[4%] sm:w-[46%]"
                          : "absolute right-0 top-[28%] w-[68%] rotate-[3deg]"
                      }
                    >
                      <ShowcaseTile item={item} delayMs={200 + i * 140} />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Capability + audience lists */}
              <div className="relative mt-12 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <div>
                  <div className="mono-label">[ what gets built ]</div>
                  <ul className="mt-3 grid gap-2 text-[14px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_86%,transparent)] sm:grid-cols-2">
                    {studio.capabilities.map((c) => (
                      <li key={c} className="flex items-start gap-2">
                        <span className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-[var(--color-accent)]" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="mono-label">[ who this is for ]</div>
                  <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_86%,transparent)]">
                    {studio.who.map((w) => (
                      <li key={w} className="flex items-start gap-2">
                        <span className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-[var(--color-signal)]" />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ShowcaseTile({
  item,
}: {
  item: (typeof studio.showcase)[number];
  delayMs: number;
}) {
  const frameClass =
    item.kind === "phone"
      ? "relative overflow-hidden rounded-[28px] border border-[var(--color-border-strong)] bg-[#0c0c10] p-1.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]"
      : "relative overflow-hidden rounded-[12px] border border-[var(--color-border-strong)] bg-[#0c0c10] p-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]";
  const aspect = item.kind === "phone" ? "aspect-[9/19.5]" : "aspect-[16/10]";
  return (
    <a
      href={item.href ?? "#studio-work"}
      target={item.href ? "_blank" : undefined}
      rel={item.href ? "noopener" : undefined}
      className={`block transition-transform duration-500 hover:translate-y-[-4px] ${frameClass}`}
    >
      <div className={`relative w-full ${aspect} overflow-hidden rounded-[inherit]`}>
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(min-width: 768px) 520px, 90vw"
          className="object-cover"
        />
      </div>
      <div className="absolute left-2 top-2 rounded-[var(--radius-xs)] border border-[var(--color-border-strong)] bg-[color-mix(in_srgb,var(--color-bg)_70%,transparent)] px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--color-muted)]">
        {item.label}
      </div>
    </a>
  );
}
