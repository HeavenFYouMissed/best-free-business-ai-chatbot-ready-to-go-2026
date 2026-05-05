import Link from "next/link";

const GOOGLE_REVIEW_URL = "https://g.page/r/CYvDUmgOyz4qEBM/review";
const LINKEDIN_URL = "https://www.linkedin.com/in/daniel-castellani-475044396";
const INSTAGRAM_URL = "https://www.instagram.com/kanddlabs";

export function CoverFooter() {
  return (
    <footer className="cover-footer px-5 pt-20 pb-12 md:px-10 md:pt-28 md:pb-16 lg:px-16">
      <div className="mx-auto w-full max-w-[1100px]">
        <div className="rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-ink)_70%,transparent)] p-6 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-10">
            <div className="max-w-[52ch]">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
                Full site
              </span>
              <p className="mt-2 text-[15.5px] font-semibold leading-[1.3] text-[var(--color-fg)]">
                The full Publishd experience.
              </p>
              <p className="mt-1.5 text-[13.5px] leading-[1.6] text-[color-mix(in_srgb,var(--color-fg)_68%,transparent)]">
                Shaders, smooth scroll, full portfolio, interactive elements.
                Best on desktop or recent phones.
              </p>
            </div>
            <Link
              href="/site"
              className="inline-flex shrink-0 items-center justify-center rounded-md border border-[var(--color-accent)] bg-[color-mix(in_srgb,var(--color-accent)_10%,transparent)] px-5 py-3 text-[13px] font-semibold text-[var(--color-accent)] transition-all duration-200 hover:bg-[color-mix(in_srgb,var(--color-accent)_18%,transparent)] active:scale-[0.98]"
            >
              Enter full site
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-12 border-t border-[var(--color-border)] pt-12 md:grid-cols-[1fr_auto] md:gap-20">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[color-mix(in_srgb,var(--color-fg)_60%,transparent)]">
              Ready
            </span>
            <h2 className="mt-3 text-[clamp(1.4rem,3vw,2rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-[var(--color-fg)]">
              Start shipping.
            </h2>
            <p className="mt-3 max-w-[42ch] text-[13.5px] leading-[1.65] text-[color-mix(in_srgb,var(--color-fg)_70%,transparent)]">
              Real human reply in under 6 business hours. One builder, not a team.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="/kickoff"
                className="inline-flex items-center justify-center rounded-md bg-[var(--color-accent)] px-5 py-3 text-[13px] font-semibold text-[#001018] transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
              >
                Start a project
              </Link>
              <a
                href="mailto:daniel@publishd.app"
                className="text-[13px] text-[color-mix(in_srgb,var(--color-fg)_70%,transparent)] transition-colors duration-200 hover:text-[var(--color-fg)]"
              >
                daniel@publishd.app
              </a>
            </div>
          </div>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-2.5 md:grid-cols-1" aria-label="Footer navigation">
            <FooterLink href="/about" label="About Daniel" />
            <FooterLink href="/careers" label="Careers" />
            <FooterLink href="/website-design" label="Website design" />
            <FooterLink href="/ai-chatbots" label="AI chatbots" />
            <FooterLink href="/site" label="Full experience" />
            <FooterLink href="/blog" label="Blog" />
            <FooterLink href="/pricing" label="Pricing" />
            <FooterLink href="/kickoff" label="Kickoff form" />
            <FooterLink href="/built-for-you" label="Custom builds" />
            <FooterLink href="/ship-web-app-to-app-store" label="Ship to stores" />
            <FooterLink href="/seo-guide" label="Free SEO guide" />
            <FooterLink href="/seo-title-meta-checker" label="SEO title checker" />
            <FooterLink href={LINKEDIN_URL} label="LinkedIn" />
            <FooterLink href={INSTAGRAM_URL} label="Instagram" />
            <FooterLink href="/terms" label="Terms" />
            <FooterLink href="/privacy" label="Privacy" />
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[var(--color-border)] pt-6 md:flex-row md:items-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--color-fg)_45%,transparent)]">
            Daniel Castellani / Connecticut / 2026
          </span>
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener"
            className="group inline-flex items-center gap-1.5 transition-opacity duration-200 hover:opacity-100 opacity-70"
            aria-label="Leave a review on Google"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M21.35 11.1H12v2.98h5.33c-.23 1.48-1.72 4.35-5.33 4.35-3.21 0-5.82-2.66-5.82-5.93s2.61-5.93 5.82-5.93c1.83 0 3.05.78 3.75 1.45l2.56-2.48C16.68 4.02 14.58 3 12 3 7.03 3 3 7.03 3 12s4.03 9 9 9c5.2 0 8.65-3.65 8.65-8.8 0-.59-.06-1.04-.14-1.1Z" fill="#4285F4"/>
              <path d="M3 7.69 5.9 9.8A5.92 5.92 0 0 1 12 6.07c1.83 0 3.05.78 3.75 1.45l2.56-2.48C16.68 4.02 14.58 3 12 3 8.55 3 5.55 4.98 4.09 7.86L3 7.69Z" fill="#34A853"/>
              <path d="M12 21c2.52 0 4.63-.83 6.17-2.26l-2.85-2.34c-.76.53-1.77.9-3.32.9-3.6 0-5.08-2.87-5.31-4.34l-2.97 2.29C5.17 18 8.31 21 12 21Z" fill="#FBBC05"/>
              <path d="M3.69 14.95A9.03 9.03 0 0 1 3 12c0-1.03.17-2.02.47-2.95l2.98 2.29A5.9 5.9 0 0 0 6.18 12c0 .64.1 1.25.28 1.83l-2.77 1.12Z" fill="#EA4335"/>
            </svg>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#4285F4]">
              Review on Google
            </span>
          </a>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--color-fg)_45%,transparent)]">
            publishd.app
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--color-fg)_65%,transparent)] transition-colors duration-200 hover:text-[var(--color-fg)]"
    >
      {label}
    </Link>
  );
}
