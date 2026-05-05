"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SegmentAnalytics } from "@/components/analytics/SegmentAnalytics";
import { type CookieConsentValue, readStoredConsent, writeConsent } from "@/components/consent/cookie-consent-storage";

/**
 * GDPR-style gate: Segment (analytics.js + destinations) loads only after
 * explicit opt-in. Essential browsing works with no third-party analytics.
 */
export function CookieAndAnalytics() {
  const [hydrated, setHydrated] = useState(false);
  const [consent, setConsent] = useState<CookieConsentValue | null>(null);

  useEffect(() => {
    setConsent(readStoredConsent());
    setHydrated(true);
  }, []);

  function accept() {
    writeConsent("analytics");
    setConsent("analytics");
  }

  function reject() {
    writeConsent("essential");
    setConsent("essential");
  }

  if (!hydrated) return null;

  return (
    <>
      {consent === "analytics" ? <SegmentAnalytics /> : null}

      {consent === null ? (
        <div
          className="fixed bottom-0 left-0 z-[88] w-full p-4 md:bottom-6 md:left-6 md:max-w-[min(100%-2rem,26rem)] md:p-0"
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-desc"
        >
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-ink)_94%,transparent)] p-5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.65)] backdrop-blur-xl">
            <h2
              id="cookie-consent-title"
              className="text-[15px] font-semibold tracking-tight text-[var(--color-fg)]"
            >
              Cookies &amp; analytics
            </h2>
            <p
              id="cookie-consent-desc"
              className="mt-2 text-[13px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_76%,transparent)]"
            >
              We use Segment for anonymous page analytics (no ad pixels). That helps improve the site. If
              you decline, we skip loading analytics entirely. See our{" "}
              <Link href="/privacy" className="text-[var(--color-accent)] underline underline-offset-2">
                Privacy Policy
              </Link>
              .
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={reject}
                className="btn btn--glass min-h-[40px] px-4 py-2 text-[13px] font-medium"
              >
                Essential only
              </button>
              <button
                type="button"
                onClick={accept}
                className="inline-flex min-h-[40px] items-center justify-center rounded-[var(--radius-sm)] border border-[color-mix(in_srgb,var(--color-accent)_50%,transparent)] bg-[color-mix(in_srgb,var(--color-accent)_12%,transparent)] px-4 py-2 text-[13px] font-semibold text-[var(--color-fg)] transition-colors hover:bg-[color-mix(in_srgb,var(--color-accent)_22%,transparent)]"
              >
                Accept analytics
              </button>
            </div>
            <p className="mt-3 text-[11px] text-[var(--color-subtle)]">
              You can change this anytime from <span className="text-[var(--color-muted)]">Cookie settings</span> in the
              footer.
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
