import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ServiceKey = "app-shipping" | "website-design" | "ai-chatbots";

const LINKS: Array<{
  key: ServiceKey | "about" | "seo-guide";
  href: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
}> = [
  {
    key: "app-shipping",
    href: "/ship-web-app-to-app-store",
    eyebrow: "App shipping",
    title: "Need the last mile handled?",
    body: "Turn a live web app, repo, or AI-built product into real App Store and Google Play listings.",
    cta: "See app shipping",
  },
  {
    key: "website-design",
    href: "/website-design",
    eyebrow: "Website design",
    title: "Need the site to convert first?",
    body: "Sharper offer, cleaner trust signals, and landing pages built for real leads instead of vague compliments.",
    cta: "See website builds",
  },
  {
    key: "ai-chatbots",
    href: "/ai-chatbots",
    eyebrow: "AI chatbots",
    title: "Need AI that actually helps?",
    body: "Grounded chatbots that answer real questions, capture intent, and route people somewhere useful.",
    cta: "See chatbot builds",
  },
  {
    key: "seo-guide",
    href: "/seo-guide",
    eyebrow: "Free SEO guide",
    title: "Need the traffic layer tighter first?",
    body: "Use the guide, checklist, and title checker to clean up rankings and click-through before you pile more features onto a quiet page.",
    cta: "Read the SEO guide",
  },
  {
    key: "about",
    href: "/about",
    eyebrow: "About Daniel",
    title: "Want the human behind the work?",
    body: "See the founder-run setup, the Connecticut angle, and why the whole service is built around direct support.",
    cta: "Read the about page",
  },
];

export function ServiceDiscoveryLinks({ current }: { current: ServiceKey }) {
  const cards = LINKS.filter((item) => item.key !== current);

  return (
    <section aria-label="Related services and trust pages">
      <div className="max-w-[70ch]">
        <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-muted)]">
          Related paths
        </div>
        <h2 className="mt-4 max-w-[18ch] text-balance text-[clamp(1.7rem,3.7vw,2.5rem)] font-semibold leading-[1.06] tracking-[-0.035em]">
          Keep moving through the right part of the site.
        </h2>
        <p className="mt-4 max-w-[60ch] text-[14.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_74%,transparent)]">
          If this page is close but not quite the right fit, these are the next places worth checking.
        </p>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group flex h-full flex-col rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_74%,transparent)] p-6 transition-colors hover:border-[color-mix(in_srgb,var(--color-accent)_45%,var(--color-border))]"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
              {card.eyebrow}
            </div>
            <h3 className="mt-4 text-[20px] font-semibold leading-[1.15] text-[var(--color-fg)]">
              {card.title}
            </h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_74%,transparent)]">
              {card.body}
            </p>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[12.5px] font-semibold text-[var(--color-accent)]">
              {card.cta}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}