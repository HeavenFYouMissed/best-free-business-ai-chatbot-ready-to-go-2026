import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ShipButton } from "@/components/ui/ShipButton";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://publishd.app";

export const metadata: Metadata = {
  title: "Careers and collaborators",
  description:
    "Careers at Publishd: honest information about future roles, contractor opportunities, and the kinds of senior collaborators Daniel wants to hear from.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Careers and collaborators · Publishd",
    description:
      "Publishd is a founder-run solo studio. No fake agency hiring page — just honest notes on future roles and strong collaborators worth meeting.",
    url: "/careers",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Publishd careers and collaborators" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers and collaborators · Publishd",
    description:
      "Open to exceptional senior collaborators for design, QA, content, and growth work when the fit is real.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

const lanes = [
  {
    title: "Design partners",
    body: "Senior designers who understand conversion, messaging hierarchy, and how to make service pages feel premium without turning them into generic AI-template soup.",
    bullets: ["Figma or coded design systems", "Conversion-first thinking", "Comfort with fast founder feedback loops"],
  },
  {
    title: "SEO and content operators",
    body: "Writers, editors, and content strategists who can help turn service intent into pages that rank, not just blog filler that sits in the dark forever.",
    bullets: ["Service-page SEO", "Internal linking instincts", "Comfort writing sharp, specific B2B copy"],
  },
  {
    title: "QA, implementation, and specialty support",
    body: "Occasional project help for testing, accessibility review, analytics setup, paid traffic landing pages, or niche implementation work when the job actually needs it.",
    bullets: ["Detail oriented", "Senior-level autonomy", "No babysitting required"],
  },
] as const;

const filters = [
  "Senior over junior",
  "Clear communicators over mystery geniuses",
  "Taste plus execution",
  "Comfortable working inside real constraints",
  "No agency theatre",
  "No fake availability",
] as const;

const outreach = [
  "A short intro with what you do best",
  "2–4 links that prove it",
  "Your timezone and typical availability",
  "Whether you prefer contract, project, or referral-based work",
] as const;

export default function CareersPage() {
  return (
    <article className="pb-24 pt-14 md:pb-32 md:pt-20">
      <section className="container-x">
        <div className="max-w-[72ch]">
          <SectionLabel index="CAREERS" label="Collaborators" />
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_72%,transparent)] px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
            Founder-run solo studio · Connecticut · selective by design
          </div>

          <h1 className="mt-6 max-w-[13ch] text-balance text-[clamp(2.4rem,7vw,4.8rem)] font-semibold leading-[0.98] tracking-[-0.05em]">
            Careers, but honest.
          </h1>

          <p className="mt-6 max-w-[64ch] text-[17px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_80%,transparent)]">
            Publishd is not a giant agency pretending to be a boutique. It is a solo studio run by Daniel Castellani. That said, I am always open to meeting strong senior people for overflow, specialty work, future collaborations, or the occasional project that needs more than one set of hands.
          </p>

          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-relaxed text-[var(--color-muted)]">
            So this page is here for two reasons: to make that discoverable, and to tell the truth about the kind of help I actually want.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ShipButton href="mailto:daniel@publishd.app?subject=Publishd%20careers%20%2F%20collaboration" size="large">
              Reach out
              <ArrowRight className="icon h-4 w-4" aria-hidden="true" />
            </ShipButton>
            <Link href="/website-design" className="btn btn--glass inline-flex items-center px-5 py-3 text-[14px]">
              See the kind of work
            </Link>
          </div>
        </div>
      </section>

      <section className="container-x mt-16 md:mt-20">
        <div className="grid gap-4 lg:grid-cols-3">
          {lanes.map((lane) => (
            <article
              key={lane.title}
              className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_74%,transparent)] p-6"
            >
              <div className="mono-label">[ good fit ]</div>
              <h2 className="mt-4 text-[20px] font-semibold leading-[1.15] text-[var(--color-fg)]">{lane.title}</h2>
              <p className="mt-3 text-[14.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_74%,transparent)]">
                {lane.body}
              </p>
              <ul className="mt-5 space-y-2">
                {lane.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-[13.5px] leading-relaxed text-[var(--color-muted)]">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="container-x mt-20 md:mt-24">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_74%,transparent)] p-6 md:p-7">
            <div className="mono-label">[ current status ]</div>
            <h2 className="mt-4 text-[clamp(1.6rem,3.2vw,2.3rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--color-fg)]">
              No fake "always hiring" theatre.
            </h2>
            <p className="mt-4 max-w-[58ch] text-[15px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_76%,transparent)]">
              There are not full-time openings posted right now. But I do keep this page live because I want a place for great people to find me before a project spikes, a referral comes in, or a specialist-shaped problem shows up.
            </p>
            <p className="mt-4 max-w-[58ch] text-[15px] leading-relaxed text-[var(--color-muted)]">
              If you are excellent, fast, low-ego, and actually good at the thing you say you do, it is worth saying hello. If you need layers of management, a ticket queue, and six meetings to move a button 12 pixels, this is probably not your spiritual home.
            </p>
          </article>

          <article className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_74%,transparent)] p-6 md:p-7">
            <div className="mono-label">[ filters ]</div>
            <ul className="mt-4 space-y-2.5">
              {filters.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[14px] leading-relaxed text-[var(--color-muted)]">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="container-x mt-20 md:mt-24">
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_74%,transparent)] p-6 md:p-8">
          <div className="mono-label">[ how to reach out ]</div>
          <h2 className="mt-4 text-[clamp(1.6rem,3.2vw,2.3rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--color-fg)]">
            Make it easy for me to say yes.
          </h2>
          <p className="mt-4 max-w-[58ch] text-[15px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_76%,transparent)]">
            Send one clean email instead of a giant deck. If there is a fit, I will reply quickly. If there is not, you still get clarity instead of disappearing into a black hole.
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {outreach.map((item) => (
              <div
                key={item}
                className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_78%,transparent)] px-4 py-4 text-[14px] text-[var(--color-muted)]"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ShipButton href="mailto:daniel@publishd.app?subject=Publishd%20careers%20%2F%20collaboration" size="large">
              Email Daniel
              <ArrowRight className="icon h-4 w-4" aria-hidden="true" />
            </ShipButton>
            <Link
              href={`${SITE_URL}/blog`}
              className="btn btn--glass inline-flex items-center px-5 py-3 text-[14px]"
            >
              Read the blog first
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
