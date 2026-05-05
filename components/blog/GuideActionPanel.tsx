import Link from "next/link";
import { ArrowRight, Download, FileText, Search } from "lucide-react";
import { ReviewLink } from "@/components/reviews/ReviewLink";
import { ShipButton } from "@/components/ui/ShipButton";

export function GuideActionPanel() {
  return (
    <section
      aria-label="Guide companion actions"
      className="glass-card mt-14 overflow-hidden rounded-[var(--radius-lg)] p-7 md:p-9"
    >
      <div className="max-w-[54ch]">
        <div className="mono-label">[ companion ]</div>
        <h2 className="mt-4 text-[clamp(1.45rem,3vw,2.1rem)] font-semibold leading-[1.06] tracking-[-0.025em] text-[var(--color-fg)]">
          Want the skim version and the next step?
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_76%,transparent)]">
          Use the printable checklist if you just want the execution list, or book a kickoff if you want me to run this against your site and build the thing properly.
        </p>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Link
          href="/seo-guide/checklist"
          className="group rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_72%,transparent)] p-5 transition-colors hover:border-[color-mix(in_srgb,var(--color-accent)_45%,var(--color-border))]"
        >
          <FileText className="h-5 w-5 text-[var(--color-accent)]" aria-hidden="true" />
          <h3 className="mt-4 text-[18px] font-semibold leading-[1.15] text-[var(--color-fg)]">
            Open the printable checklist
          </h3>
          <p className="mt-2 text-[13.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_72%,transparent)]">
            Web version, print-friendly, quick to review before you touch anything.
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[var(--color-accent)]">
            Open checklist
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </Link>

        <a
          href="/downloads/publishd-seo-audit-checklist.md"
          download
          className="group rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_72%,transparent)] p-5 transition-colors hover:border-[color-mix(in_srgb,var(--color-accent)_45%,var(--color-border))]"
        >
          <Download className="h-5 w-5 text-[var(--color-accent)]" aria-hidden="true" />
          <h3 className="mt-4 text-[18px] font-semibold leading-[1.15] text-[var(--color-fg)]">
            Download the Markdown copy
          </h3>
          <p className="mt-2 text-[13.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_72%,transparent)]">
            Save the checklist locally, paste it into your own docs, or hand it to a teammate.
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[var(--color-accent)]">
            Download file
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </a>

        <Link
          href="/seo-title-meta-checker"
          className="group rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_72%,transparent)] p-5 transition-colors hover:border-[color-mix(in_srgb,var(--color-accent)_45%,var(--color-border))]"
        >
          <Search className="h-5 w-5 text-[var(--color-accent)]" aria-hidden="true" />
          <h3 className="mt-4 text-[18px] font-semibold leading-[1.15] text-[var(--color-fg)]">
            Try the title + meta checker
          </h3>
          <p className="mt-2 text-[13.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_72%,transparent)]">
            Preview a search-result style snippet before you publish and clean up the easy CTR mistakes.
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[var(--color-accent)]">
            Open checker
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </Link>

        <div className="rounded-[var(--radius-md)] border border-[color-mix(in_srgb,var(--color-accent)_24%,var(--color-border))] bg-[color-mix(in_srgb,var(--color-accent)_8%,transparent)] p-5">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
            Want it done?
          </div>
          <p className="mt-3 text-[13.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_76%,transparent)]">
            If you'd rather skip the 90-day DIY phase, I can build the site, fix the structure, and ship the SEO foundations with it.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <ShipButton href="/kickoff">Start a kickoff</ShipButton>
            <ReviewLink variant="inline" className="text-[11.5px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
