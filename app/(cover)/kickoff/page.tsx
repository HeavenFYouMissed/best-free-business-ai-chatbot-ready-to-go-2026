import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Mail, Phone } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { IntakeForm } from "@/components/intake/IntakeForm";
import { KickoffBackdrop } from "@/components/kickoff/KickoffBackdrop";
import { KickoffTimeline } from "@/components/kickoff/KickoffTimeline";
import { ShipButton } from "@/components/ui/ShipButton";
import { HeadlineSplit } from "@/components/hero/HeadlineSplit";
import { ArrowDown } from "lucide-react";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://publishd.app";

export const metadata: Metadata = {
  title: "Kickoff — App Store and Google Play intake",
  description:
    "Start your App Store and Google Play submission: intake form for web apps, AI-built apps (Lovable, Bolt, v0, Cursor), and repos. Reply within 6 business hours with kickoff call link and checklist.",
  keywords: [
    "App Store submission intake",
    "Google Play submission form",
    "publish app to stores",
    "Lovable app submission",
    "Bolt app store",
    "Publishd kickoff",
  ],
  alternates: { canonical: `${SITE_URL}/kickoff` },
  openGraph: {
    title: "Kickoff — App Store and Google Play intake · Publishd",
    description:
      "Intake for web and AI-built apps. Reply within 6 business hours with a kickoff call link and prep checklist.",
    url: `${SITE_URL}/kickoff`,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Publishd — App Store and Google Play intake form" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kickoff — App Store and Google Play intake · Publishd",
    description:
      "Intake form for store submission. Reply within 6 business hours with next steps.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

const breadcrumbs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Kickoff", item: `${SITE_URL}/kickoff` },
  ],
};

const webPageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Kickoff — App Store and Google Play intake",
  url: `${SITE_URL}/kickoff`,
  description:
    "Intake form to start App Store and Google Play submission with Publishd. Confidential; reply within 6 business hours.",
  isPartOf: { "@type": "WebSite", name: "Publishd", url: SITE_URL },
  about: {
    "@type": "Service",
    name: "Mobile app store submission",
    serviceType: ["App Store submission", "Google Play submission"],
    provider: { "@type": "Organization", name: "Publishd", url: SITE_URL },
    areaServed: "Worldwide",
  },
};

const stats: Array<{ value: string; label: string }> = [
  { value: "14", label: "days to live" },
  { value: "solo", label: "no agency · no handoff" },
  { value: "$399", label: "flat · no subs" },
];

export default function KickoffPage() {
  return (
    <div className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden">
      <KickoffBackdrop />
      {/* Bright bloom hotspot — single point of brightness behind the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[1]"
        style={{
          background:
            "radial-gradient(360px 280px at 72% 28%, color-mix(in srgb, var(--color-accent) 38%, transparent), transparent 58%)",
          mixBlendMode: "screen",
        }}
      />
      <article className="container-tight relative z-[2] py-14 md:py-20">
        <SectionLabel index="K" label="Kickoff" />

        <h1 className="mt-4 max-w-[20ch] text-balance font-semibold leading-[0.96]">
          <HeadlineSplit text="Let's ship" />{" "}
          <HeadlineSplit text="yours." accentWord="yours." />
        </h1>

        <p className="mt-5 max-w-[62ch] text-[15.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_82%,transparent)]">
          Fill this out and you&rsquo;ll get a reply within 6 business hours with a 15-minute kickoff call link, a
          checklist of what to prep, and next steps. Everything you send is confidential
          (<Link href="/terms" className="underline underline-offset-2">terms</Link>).
        </p>

        {/* Stat chips */}
        <div className="mt-6 flex flex-wrap gap-2">
          {stats.map((s, i) => (
            <span
              key={s.label}
              className="inline-flex items-baseline gap-2 rounded-[var(--radius-xs)] border border-[color-mix(in_srgb,var(--color-accent)_25%,var(--color-border))] bg-[color-mix(in_srgb,#050810_82%,transparent)] px-3 py-1.5"
            >
              <span className="font-mono text-[10.5px] uppercase tracking-[0.2em]" style={{ color: "color-mix(in srgb, var(--color-accent) 75%, transparent)" }}>
                0{i + 1}
              </span>
              <span className="num text-[16px] font-semibold tracking-[-0.02em]" style={{ color: "var(--color-fg)" }}>
                {s.value}
              </span>
              <span className="text-[11.5px] uppercase tracking-[0.12em] text-[var(--color-muted)]">
                {s.label}
              </span>
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <ShipButton href="#intake-form" size="large">
            Fast-track my intake
            <ArrowDown className="icon h-4 w-4" aria-hidden />
          </ShipButton>
          <a href="sms:+12038186630" className="btn btn--ghost btn--tiny min-h-[44px]">
            <Phone className="icon" aria-hidden /> Text (203) 818-6630
          </a>
          <a href="mailto:daniel@publishd.app" className="btn btn--ghost btn--tiny min-h-[44px]">
            <Mail className="icon" aria-hidden /> daniel@publishd.app
          </a>
        </div>

        {/* Timeline rail */}
        <KickoffTimeline />

        <div id="intake-form" className="mt-10 scroll-mt-24">
          <IntakeForm />
        </div>
      </article>
      <Script
        id="ld-kickoff-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <Script
        id="ld-kickoff-webpage"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
      />
    </div>
  );
}
