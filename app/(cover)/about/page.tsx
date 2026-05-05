import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const GOOGLE_REVIEW_URL = "https://g.page/r/CYvDUmgOyz4qEBM/review";
const LINKEDIN_URL = "https://www.linkedin.com/in/daniel-castellani-475044396";
const INSTAGRAM_URL = "https://www.instagram.com/kanddlabs";
const YOUTUBE_URL = "https://www.youtube.com/@KandDlabs";

export const metadata: Metadata = {
  title: "About Daniel Castellani",
  description:
    "Meet Daniel Castellani, the solo engineer behind Publishd. App shipping, websites, AI builds, and direct founder support from Connecticut.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Daniel Castellani · Publishd",
    description:
      "The solo engineer behind Publishd — shipping apps, websites, and AI builds from Connecticut.",
    url: "/about",
    type: "profile",
    images: [{ url: "/portrait/daniel.png", width: 1200, height: 1200, alt: "Daniel Castellani" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Daniel Castellani · Publishd",
    description:
      "The solo engineer behind Publishd — shipping apps, websites, and AI builds from Connecticut.",
    images: ["/portrait/daniel.png"],
  },
};

export default function AboutPage() {
  return (
    <article className="cover-theme min-w-0 bg-[var(--color-bg)] px-5 py-12 text-[var(--color-fg)] md:px-10 md:py-20 lg:px-16">
      <div className="mx-auto grid w-full max-w-[1100px] gap-10 md:grid-cols-[360px_minmax(0,1fr)] md:items-start">
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)]">
          <Image
            src="/portrait/daniel.png"
            alt="Daniel Castellani, founder of Publishd"
            fill
            sizes="(min-width: 768px) 360px, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
            About Publishd
          </span>
          <h1 className="mt-4 text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-[var(--color-fg)]">
            Daniel Castellani.
            <span className="block text-[color-mix(in_srgb,var(--color-fg)_60%,transparent)]">
              Solo engineer. Direct support. No handoff circus.
            </span>
          </h1>

          <p className="mt-6 max-w-[64ch] text-[15.5px] leading-[1.75] text-[color-mix(in_srgb,var(--color-fg)_78%,transparent)]">
            I run Publishd from Connecticut. I help founders ship web apps to the App Store and
            Google Play, build conversion-focused websites, and add AI features that actually solve
            business problems. If Apple rejects the build, I handle it. If a site needs fixing, you
            talk to me directly. No project manager layer. No offshore support maze. No disappearing freelancer act.
          </p>

          <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.75] text-[color-mix(in_srgb,var(--color-fg)_78%,transparent)]">
            The whole pitch is simple: one senior builder, fixed-scope work, clear communication, and you own the code, accounts, and assets when the job is done.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Fact label="Background" value="Amazon alumni" />
            <Fact label="Focus" value="Apps, sites, AI" />
            <Fact label="Location" value="Connecticut, USA" />
            <Fact label="Response" value="< 6 business hours" />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/kickoff"
              className="inline-flex items-center justify-center rounded-md bg-[var(--color-accent)] px-5 py-3 text-[13px] font-semibold text-[#001018] transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
            >
              Start a project
            </Link>
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center rounded-md border border-[var(--color-border)] px-5 py-3 text-[13px] font-semibold text-[var(--color-fg)] transition-colors duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              Leave a Google review
            </a>
          </div>

          <div className="mt-10 grid gap-3 text-[14px] text-[color-mix(in_srgb,var(--color-fg)_76%,transparent)] sm:grid-cols-2">
            <a href="mailto:daniel@publishd.app" className="rounded-lg border border-[var(--color-border)] px-4 py-3 transition-colors hover:border-[var(--color-accent)]">
              daniel@publishd.app
            </a>
            <a href="tel:+12038186630" className="rounded-lg border border-[var(--color-border)] px-4 py-3 transition-colors hover:border-[var(--color-accent)]">
              (203) 818-6630
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener" className="rounded-lg border border-[var(--color-border)] px-4 py-3 transition-colors hover:border-[var(--color-accent)]">
              LinkedIn
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className="rounded-lg border border-[var(--color-border)] px-4 py-3 transition-colors hover:border-[var(--color-accent)]">
              Instagram
            </a>
            <a href="https://github.com/HeavenFYouMissed" target="_blank" rel="noopener" className="rounded-lg border border-[var(--color-border)] px-4 py-3 transition-colors hover:border-[var(--color-accent)]">
              GitHub
            </a>
            <a href={YOUTUBE_URL} target="_blank" rel="noopener" className="rounded-lg border border-[var(--color-border)] px-4 py-3 transition-colors hover:border-[var(--color-accent)]">
              YouTube
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-ink)_70%,transparent)] px-4 py-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--color-fg)_52%,transparent)]">
        {label}
      </div>
      <div className="mt-2 text-[14px] font-medium text-[var(--color-fg)]">{value}</div>
    </div>
  );
}