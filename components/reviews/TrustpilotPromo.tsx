import { ArrowUpRight } from "lucide-react";

const TRUSTPILOT_READ = "https://www.trustpilot.com/review/publishd.app";
const TRUSTPILOT_RATE = "https://www.trustpilot.com/evaluate/publishd.app";

/**
 * Static Trustpilot block — no TrustBox script, so no third-party cookies.
 * Links go to the public profile and the review form.
 */
export function TrustpilotPromo() {
  return (
    <div className="mt-5 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-ink)_55%,transparent)] p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[13px] leading-none tracking-tight text-[#00b67a]" aria-hidden="true">
          ★★★★★
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-fg)]">
          Trustpilot
        </span>
      </div>
      <p className="mt-2 text-[13px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_72%,transparent)]">
        Independent reviews from real clients. If we worked together, a quick rating helps other founders find
        Publishd.
      </p>
      <div className="mt-3 flex flex-wrap gap-3">
        <a
          href={TRUSTPILOT_READ}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-1 text-[12.5px] font-medium text-[var(--color-accent)] underline underline-offset-4 transition-opacity hover:opacity-90"
        >
          Read reviews
          <ArrowUpRight className="icon h-3 w-3 opacity-80" aria-hidden />
        </a>
        <a
          href={TRUSTPILOT_RATE}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-[color-mix(in_srgb,var(--color-fg)_88%,transparent)] transition-colors hover:text-[var(--color-fg)]"
        >
          Rate your experience
          <ArrowUpRight className="icon h-3 w-3 opacity-70" aria-hidden />
        </a>
      </div>
    </div>
  );
}
