import Link from "next/link";
import { Logo } from "@/components/nav/Logo";
import { ReviewLink } from "@/components/reviews/ReviewLink";

const GOOGLE_REVIEW_URL = "https://g.page/r/CYvDUmgOyz4qEBM/review";
const LINKEDIN_URL = "https://www.linkedin.com/in/daniel-castellani-475044396";
const INSTAGRAM_URL = "https://www.instagram.com/kanddlabs";
const YOUTUBE_URL = "https://www.youtube.com/@KandDlabs";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-20 bg-[color-mix(in_srgb,var(--color-bg)_92%,transparent)]">
      <div className="section-divider" aria-hidden />
      <div className="container-x py-12">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div className="max-w-[36ch]">
            <Logo />
            <p className="mt-4 text-[14px] leading-relaxed text-[var(--color-muted)]">
              You built it. We ship it. One flat fee, both stores, zero lock-in.
            </p>
            <div className="mt-4">
              <div className="flex flex-wrap items-center gap-3">
                <ReviewLink />
                <a
                  href={GOOGLE_REVIEW_URL}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[color-mix(in_srgb,var(--color-fg)_70%,transparent)] transition-colors hover:text-[var(--color-fg)]"
                >
                  Review on Google
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-14 gap-y-8 sm:grid-cols-3">
            <FooterCol
              title="Service"
              items={[
                { label: "How it works", href: "/#how-it-works" },
                { label: "Kickoff intake", href: "/kickoff" },
                { label: "Website design", href: "/website-design" },
                { label: "AI chatbots", href: "/ai-chatbots" },
                { label: "Live chat demo", href: "/chat-demo.html" },
                { label: "Web app → stores", href: "/ship-web-app-to-app-store" },
                { label: "What's included", href: "/#included" },
                { label: "Comparison", href: "/#comparison" },
              ]}
            />
            <FooterCol
              title="Pricing"
              items={[
                { label: "Both platforms", href: "/#pricing" },
                { label: "Coaching", href: "/#pricing" },
                { label: "Rejection rescue", href: "/#pricing" },
              ]}
            />
            <FooterCol
              title="Connect"
              items={[
                { label: "Email", href: "mailto:daniel@publishd.app" },
                { label: "About Daniel", href: "/about" },
                { label: "Careers", href: "/careers" },
                { label: "LinkedIn", href: LINKEDIN_URL },
                { label: "Instagram", href: INSTAGRAM_URL },
                { label: "YouTube", href: YOUTUBE_URL },
                { label: "GitHub", href: "https://github.com/HeavenFYouMissed" },
                { label: "Model Surgery", href: "https://model-surgery.com" },
                { label: "Google reviews", href: GOOGLE_REVIEW_URL },
              ]}
            />
            <FooterCol
              title="Learn"
              items={[
                { label: "Blog", href: "/blog" },
                { label: "Case studies", href: "/blog?pillar=case-studies" },
              ]}
            />
            <FooterCol
              title="Legal"
              items={[
                { label: "Terms of service", href: "/terms" },
                { label: "Privacy policy", href: "/privacy" },
              ]}
            />
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-border)] pt-6 text-[12.5px] text-[var(--color-muted)]">
          <span>© {year} Publishd · Made by Daniel Castellani · Solo engineer · Connecticut</span>
          <span className="num">publishd.app</span>
        </div>
        <div className="mt-3 text-[11.5px] leading-relaxed text-[var(--color-subtle)]">
          Billing processed by SuperClawHub — the SaaS that runs Publishd. All app revenue routes directly to
          your Apple and Google accounts. By purchasing you agree to our{" "}
          <Link href="/terms" className="underline underline-offset-2 hover:text-[var(--color-fg)]">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-[var(--color-fg)]">
            Privacy Policy
          </Link>
          .
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: Array<{ label: string; href: string }>;
}) {
  return (
    <div>
      <div className="mono-label mb-3">[ {title.toLowerCase()} ]</div>
      <ul className="space-y-2 text-[13.5px]">
        {items.map((it) => (
          <li key={it.label}>
            <Link
              href={it.href}
              className="text-[color-mix(in_srgb,var(--color-fg)_82%,transparent)] transition-colors hover:text-[var(--color-fg)]"
            >
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
