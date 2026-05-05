import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { RealResults } from "@/components/sections/RealResults";
import { PlatformMarquee } from "@/components/marquee/PlatformMarquee";
import { BuiltForYouTeaser } from "@/components/sections/BuiltForYouTeaser";
import { ProblemFix } from "@/components/sections/ProblemFix";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhatHappensNext } from "@/components/sections/WhatHappensNext";
import { Included } from "@/components/sections/Included";
import { WhatYouProvide } from "@/components/sections/WhatYouProvide";
import { RejectionHandling } from "@/components/sections/RejectionHandling";
import { StudioTier } from "@/components/studio/StudioTier";
import { StudioWork } from "@/components/studio/StudioWork";
import { SignatureCanvas } from "@/components/sections/SignatureCanvas";
import { PricingGrid } from "@/components/pricing/PricingGrid";
import { ComparisonTable } from "@/components/pricing/ComparisonTable";
import { Testimonials } from "@/components/sections/Testimonials";
import { BrandBanner } from "@/components/sections/BrandBanner";
import { HumanLayer } from "@/components/sections/HumanLayer";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { SectionBridge } from "@/components/ui/SectionBridge";
import { HomeStructuredData } from "@/components/seo/StructuredData";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://publishd.app";

export const metadata: Metadata = {
  title: "Full Experience — Portfolio, pricing, and interactive showcase",
  description:
    "The immersive Publishd experience: shader effects, interactive portfolio, detailed pricing, FAQ, and full case studies. Best on desktop or recent phones.",
  alternates: { canonical: `${SITE_URL}/site` },
  openGraph: {
    title: "Full Experience — Publishd interactive showcase",
    description:
      "Shaders, smooth scroll, detailed pricing, portfolio, and FAQ. The full Publishd experience.",
    url: `${SITE_URL}/site`,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Publishd — full interactive portfolio and pricing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Full Experience — Publishd interactive showcase",
    description: "Shaders, portfolio, detailed pricing, FAQ. The full Publishd experience.",
    images: ["/opengraph-image"],
  },
};

export default function Home() {
  return (
    <article aria-labelledby="site-headline" className="min-w-0">
      <HomeStructuredData />
      <Hero />
      <RealResults />
      <SectionBridge
        from="transparent"
        via="color-mix(in srgb, var(--color-accent) 12%, transparent)"
        to="color-mix(in srgb, var(--color-accent) 14%, transparent)"
      />
      <PlatformMarquee />
      <SectionBridge
        from="transparent"
        via="color-mix(in srgb, var(--color-accent) 16%, transparent)"
        to="color-mix(in srgb, var(--color-accent) 20%, transparent)"
      />
      <BuiltForYouTeaser />
      <SectionBridge
        from="color-mix(in srgb, var(--color-accent) 18%, transparent)"
        via="color-mix(in srgb, var(--color-danger) 10%, transparent)"
        to="color-mix(in srgb, var(--color-danger) 14%, transparent)"
      />
      <ProblemFix />
      <SectionBridge
        from="color-mix(in srgb, var(--color-accent) 12%, transparent)"
        via="transparent"
        to="transparent"
      />
      <HowItWorks />
      <WhatHappensNext />
      <SectionBridge
        via="color-mix(in srgb, var(--color-accent) 8%, transparent)"
        to="color-mix(in srgb, var(--color-accent) 12%, transparent)"
      />
      <Included />
      <WhatYouProvide />
      <SectionBridge
        via="color-mix(in srgb, var(--color-warn) 10%, transparent)"
        to="color-mix(in srgb, var(--color-warn) 14%, transparent)"
      />
      <RejectionHandling />
      <SectionBridge
        from="color-mix(in srgb, var(--color-warn) 10%, transparent)"
        via="color-mix(in srgb, var(--color-signal) 8%, transparent)"
        to="color-mix(in srgb, var(--color-signal) 12%, transparent)"
      />
      <StudioTier />
      <StudioWork />
      <SignatureCanvas />
      <SectionBridge via="color-mix(in srgb, var(--color-accent) 8%, transparent)" to="transparent" />
      <PricingGrid />
      <ComparisonTable />
      <SectionBridge
        via="color-mix(in srgb, var(--color-accent) 10%, transparent)"
        to="color-mix(in srgb, var(--color-accent) 14%, transparent)"
      />
      <Testimonials />
      <BrandBanner />
      <HumanLayer />
      <Faq />
      <SectionBridge
        via="color-mix(in srgb, var(--color-accent) 12%, transparent)"
        to="color-mix(in srgb, var(--color-accent) 16%, transparent)"
      />
      <FinalCta />
    </article>
  );
}
