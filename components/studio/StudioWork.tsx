"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { studioWork, type StudioWork } from "@/data/studioWork";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { StackReveal } from "@/components/ui/StackReveal";

const LostRays5 = dynamic(
  () => import("@/components/shaders/presets/LostRays5").then((m) => m.LostRays5),
  { ssr: false }
);

export function StudioWork() {
  if (studioWork.length === 0) return null;
  return (
    <SectionShell
      id="studio-work"
      mode="editorial"
      shader={() => <LostRays5 className="h-full w-full" />}
      shaderOpacity={0.35}
      className="py-16 md:py-24"
    >
      <div className="container-x">
        <Reveal>
          <SectionLabel index="09" label="Studio portfolio" />
        </Reveal>
        <Reveal delay={80}>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-[24ch] text-balance">Work I&apos;ve shipped solo.</h2>
            <span
              className="num inline-flex shrink-0 items-center gap-2 rounded-[var(--radius-xs)] border border-[color-mix(in_srgb,var(--color-accent)_35%,var(--color-border-strong))] bg-[color-mix(in_srgb,var(--color-accent)_8%,var(--color-surface-2))] px-2.5 py-1 text-[11.5px] uppercase tracking-[0.14em]"
              style={{ color: "var(--color-accent)" }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--color-accent)", boxShadow: "0 0 8px var(--color-accent)" }}
              />
              Shipped solo · no agency · no handoff
            </span>
          </div>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-3 max-w-[58ch] text-[15px] leading-relaxed text-[var(--color-muted)]">
            Every product below was designed, built, and shipped by me. A small selection — hover any tile to see
            more.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {studioWork.map((w, i) => (
            <StackReveal key={w.name} index={i} count={studioWork.length}>
              <WorkCard item={w} />
            </StackReveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function WorkCard({ item }: { item: StudioWork }) {
  const isPhone = item.kind === "phone";
  const content = (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-2)] transition-colors hover:border-[color-mix(in_srgb,var(--color-accent)_45%,var(--color-border))]"
    >
      <div className="relative aspect-[9/16] overflow-hidden border-b border-[var(--color-border)]">
        {isPhone ? (
          <>
            <Image
              src={item.screenshot}
              alt={`${item.name} — ${item.tagline}`}
              fill
              sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
              className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.14]"
            />
            {item.altScreenshot && (
              <Image
                src={item.altScreenshot}
                alt=""
                aria-hidden
                fill
                sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
                className="object-cover opacity-0 transition-opacity duration-[700ms] group-hover:opacity-100"
              />
            )}
          </>
        ) : (
          <DesktopStack
            main={item.screenshot}
            alt={item.altScreenshot}
            name={item.name}
            tagline={item.tagline}
          />
        )}

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(260px 200px at 50% 80%, color-mix(in srgb, var(--color-accent) 25%, transparent), transparent 70%)",
          }}
        />
        <span className="pointer-events-none absolute left-3 top-3 z-[3] rounded-[var(--radius-xs)] border border-[var(--color-border-strong)] bg-[color-mix(in_srgb,var(--color-bg)_70%,transparent)] px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--color-muted)]">
          {isPhone ? "Mobile" : "SaaS"}
        </span>
        {item.url && (
          <span className="pointer-events-none absolute right-3 top-3 z-[3] flex items-center gap-1 rounded-[var(--radius-xs)] border border-[color-mix(in_srgb,var(--color-accent)_45%,var(--color-border-strong))] bg-[color-mix(in_srgb,var(--color-accent)_18%,var(--color-bg))] px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em]" style={{ color: "var(--color-accent)" }}>
            Live
            <ArrowUpRight className="icon h-3 w-3" aria-hidden />
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mono-label">[ studio ]</div>
        <h3 className="mt-2 text-[17px] font-semibold">{item.name}</h3>
        <p className="mt-1 text-[13.5px] leading-relaxed text-[var(--color-muted)]">{item.tagline}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {item.stack.map((s) => (
            <li
              key={s}
              className="num rounded-[var(--radius-xs)] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface)_60%,transparent)] px-2 py-0.5 text-[10.5px] uppercase tracking-[0.12em] text-[var(--color-muted)]"
            >
              {s}
            </li>
          ))}
        </ul>
        {item.url && (
          <div className="mt-auto pt-4 text-[12.5px] font-medium" style={{ color: "var(--color-accent)" }}>
            <span className="inline-flex items-center gap-1">
              Visit site
              <ArrowUpRight className="icon h-3.5 w-3.5" aria-hidden />
            </span>
          </div>
        )}
      </div>
    </motion.article>
  );

  return item.url ? (
    <a href={item.url} target="_blank" rel="noopener" className="block h-full">
      {content}
    </a>
  ) : (
    content
  );
}

function DesktopStack({
  main,
  alt,
  name,
  tagline,
}: {
  main: string;
  alt?: string;
  name: string;
  tagline: string;
}) {
  return (
    <div className="flex h-full flex-col">
      <BrowserFrame src={main} alt={`${name} — ${tagline}`} swap={alt} />
      {alt ? (
        <div className="relative mt-auto h-[45%] overflow-hidden border-t border-[var(--color-border)]">
          <Image
            src={alt}
            alt=""
            aria-hidden
            fill
            sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
            className="object-cover object-top transition-transform duration-[900ms] group-hover:scale-[1.08]"
          />
        </div>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}

function BrowserFrame({ src, alt, swap }: { src: string; alt: string; swap?: string }) {
  return (
    <div className={`relative ${swap ? "h-[55%]" : "h-full"} overflow-hidden bg-[#0c0c10]`}>
      {/* chrome bar */}
      <div className="absolute inset-x-0 top-0 z-[2] flex items-center gap-1.5 border-b border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface)_80%,var(--color-bg))] px-2.5 py-2">
        <span className="h-2 w-2 rounded-full bg-[#ff5f56]" />
        <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
        <span className="h-2 w-2 rounded-full bg-[#27c93f]" />
        <span className="num ml-2 truncate text-[10px] text-[var(--color-muted)]">https://…</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 top-[29px]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
          className="object-cover object-top transition-transform duration-[900ms] group-hover:scale-[1.08]"
        />
      </div>
    </div>
  );
}
