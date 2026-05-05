import type { Metadata } from "next";
import { BfyHero } from "@/components/built-for-you/BfyHero";
import { BfySubNav } from "@/components/built-for-you/BfySubNav";
import { BfySites } from "@/components/built-for-you/BfySites";
import { BfyChatbots } from "@/components/built-for-you/BfyChatbots";
import { BfyPolish } from "@/components/built-for-you/BfyPolish";
import { BfyProof } from "@/components/built-for-you/BfyProof";
import { BfyProcess } from "@/components/built-for-you/BfyProcess";
import { BfyFaq } from "@/components/built-for-you/BfyFaq";
import { BfyFinalCta } from "@/components/built-for-you/BfyFinalCta";
import { IntakeDrawer } from "@/components/built-for-you/IntakeDrawer";
import { SectionBridge } from "@/components/ui/SectionBridge";

export const metadata: Metadata = {
  title: "Built for You — Sites, Chatbots, App Polish",
  description:
    "Premium sites ($499+), chatbots that take action ($399+), and app polish ($199) — designed, built, and shipped by one senior engineer. One flat fee. You own everything.",
  alternates: { canonical: "/built-for-you" },
  openGraph: {
    title: "Publishd — Built for You",
    description:
      "Sites. Chatbots. Polish. Everything you need past the App Store, shipped by one builder.",
    url: "/built-for-you",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Publishd — Built for You",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Publishd — Built for You",
    description:
      "Sites, chatbots, app polish. One builder, one flat fee. You own everything.",
    images: ["/opengraph-image"],
  },
};

export default function BuiltForYouPage() {
  return (
    <article aria-labelledby="bfy-headline" className="min-w-0">
      <BfyHero />
      <BfySubNav />
      <SectionBridge
        from="transparent"
        via="color-mix(in srgb, var(--color-accent) 10%, transparent)"
        to="color-mix(in srgb, var(--color-accent) 14%, transparent)"
      />
      <BfySites />
      <SectionBridge
        from="color-mix(in srgb, var(--color-accent) 12%, transparent)"
        via="transparent"
        to="transparent"
      />
      <BfyChatbots />
      <SectionBridge
        via="color-mix(in srgb, var(--color-accent) 8%, transparent)"
        to="color-mix(in srgb, var(--color-accent) 14%, transparent)"
      />
      <BfyPolish />
      <SectionBridge via="color-mix(in srgb, var(--color-accent) 10%, transparent)" />
      <BfyProof />
      <BfyProcess />
      <BfyFaq />
      <SectionBridge
        via="color-mix(in srgb, var(--color-accent) 12%, transparent)"
        to="color-mix(in srgb, var(--color-accent) 16%, transparent)"
      />
      <BfyFinalCta />
      <IntakeDrawer />
    </article>
  );
}
