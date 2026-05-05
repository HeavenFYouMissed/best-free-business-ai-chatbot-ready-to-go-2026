import type { Metadata } from "next";
import Script from "next/script";

import { CoverFooter } from "@/components/cover/CoverFooter";
import { landingConfig } from "@/components/landing/config";
import { MobileStickyCTA } from "@/components/landing/MobileStickyCTA";
import { LandingAI } from "@/components/landing/sections/LandingAI";
import { LandingAppPublishing } from "@/components/landing/sections/LandingAppPublishing";
import { LandingClosing } from "@/components/landing/sections/LandingClosing";
import { LandingCTA } from "@/components/landing/sections/LandingCTA";
import { SphereMask } from "@/components/landing/ui/SphereMask";
import { LandingFAQ } from "@/components/landing/sections/LandingFAQ";
import { LandingHero } from "@/components/landing/sections/LandingHero";
import { LandingHowItWorks } from "@/components/landing/sections/LandingHowItWorks";
import { LandingPricing } from "@/components/landing/sections/LandingPricing";
import { LandingRecentWork } from "@/components/landing/sections/LandingRecentWork";
import { LandingServices } from "@/components/landing/sections/LandingServices";
import { LandingTestimonials } from "@/components/landing/sections/LandingTestimonials";
import { LandingTrust } from "@/components/landing/sections/LandingTrust";
import { LandingWhatIDo } from "@/components/landing/sections/LandingWhatIDo";
import { LandingWhyHire } from "@/components/landing/sections/LandingWhyHire";
import { BrandMarquee } from "@/components/landing/ui/BrandMarquee";

export const metadata: Metadata = {
  title: "Senior Engineer for Hire — Apps, Websites, AI · Publishd",
  description:
    "Solo senior engineer (Amazon alum) based in Connecticut. Ship web apps to the App Store and Google Play, build custom websites, fix broken apps, deploy AI chatbots. Flat fees, 7–14 day delivery, you own everything.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Senior Engineer for Hire — Apps, Websites, AI · Publishd",
    description:
      "Solo senior engineer based in Connecticut. Apps to both stores, custom websites, AI tools. Flat fees, fast delivery, you own everything.",
    url: "/",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Publishd — Senior Engineer for Hire" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Senior Engineer for Hire — Apps, Websites, AI · Publishd",
    description: "Solo senior engineer. Apps, websites, AI. Flat fees.",
    images: ["/opengraph-image"],
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://publishd.app";

export default function Home() {
  // FAQ — homepage-specific FAQ block, distinct from the /site FAQ.
  // Person + ProfessionalService schemas are emitted globally via
  // GlobalStructuredData (with stable @id refs) so we no longer redeclare
  // them here — duplicate @id collisions confuse Google's parsers.
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq-home`,
    mainEntity: landingConfig.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  // Recent Work → ItemList. Helps Google understand the showcase as a
  // structured portfolio rather than free-floating images.
  const recentWorkLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/#recent-work`,
    name: "Recent work — apps and software shipped by Daniel Castellani",
    itemListElement: landingConfig.recentWork.items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: item.title,
        description: item.body,
        image: `${SITE_URL}${item.image}`,
        keywords: item.platforms.join(", "),
      },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}/#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
    ],
  };

  return (
    <article className="relative min-w-0 overflow-hidden bg-[var(--color-bg)] text-[var(--color-fg)]">
      <Script
        id="ld-faq-home"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(faqLd)}
      </Script>
      <Script
        id="ld-recent-work"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(recentWorkLd)}
      </Script>
      <Script
        id="ld-breadcrumb-home"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(breadcrumbLd)}
      </Script>

      <LandingHero />
      <LandingTrust />

      {/* Mid-page rail #1 — leads into Recent Work. Cyan tone so it
          carries the brand voice forward without a heat shift yet. */}
      <BrandMarquee
        position="rail"
        tone="cyan"
        phrases={[
          "REAL APPS",
          "LIVE STORES",
          "SHIPPED SOLO",
          "100+ WEBSITES",
          "AMAZON ALUM",
          "NO AGENCIES",
        ]}
      />
      <LandingRecentWork />
      <LandingWhatIDo />
      <LandingServices />
      <LandingHowItWorks />
      <LandingWhyHire />
      <LandingTestimonials />

      {/* Mid-page rail #2 — heat shift into pricing. Signal-orange tone
          flips the temperature right where the visitor is about to
          consider price; pulls focus to "all under $999". */}
      <BrandMarquee
        position="rail"
        tone="signal"
        reverse
        phrases={[
          "FLAT FEES",
          "ALL UNDER $999",
          "NO SUBSCRIPTIONS",
          "ONE PAYMENT",
          "YOU OWN EVERYTHING",
          "TRANSPARENT SCOPE",
        ]}
      />
      <LandingPricing />
      <LandingAppPublishing />
      <LandingAI />

      {/* Mid-page rail #3 — leads into FAQ. Mono tone (white-on-stroke)
          to give a quieter beat between the noisy AI section and the
          dense FAQ accordion. */}
      <BrandMarquee
        position="rail"
        tone="mono"
        phrases={[
          "STILL CURIOUS",
          "ASK ANYTHING",
          "DIRECT LINE TO DANIEL",
          "REPLY < 6 HOURS",
          "203 818 6630",
          "DANIEL@PUBLISHD.APP",
        ]}
      />
      <LandingFAQ />
      <LandingCTA />
      {/* LandingProcessCards removed — redundant with LandingWhatIDo above
          (both covered Build/Ship/Fix/Rescue/AI/Automate). The MagicUI Pro
          stock cards came with off-brand demo content (lorem ipsum, sparkle
          glyph, fake avatars) that didn't map to actual services. */}
      <SphereMask reverse />
      <LandingClosing />
      <CoverFooter />
      <MobileStickyCTA />
    </article>
  );
}
