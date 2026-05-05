import Script from "next/script";
import { faq } from "@/data/faq";
import { tiers, studio } from "@/data/tiers";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://publishd.app";
const GOOGLE_REVIEW_URL = "https://g.page/r/CYvDUmgOyz4qEBM/review";
const GOOGLE_MAPS_URL = "https://www.google.com/maps/place//data=!4m3!3m2!1s0x8aea63e2f9ec7afb:0x2a3ecb0e6852c38b!12e1?source=g.page.m.ia._&laa=nmx-review-solicitation-ia2";
const TRUSTPILOT_URL = "https://www.trustpilot.com/review/publishd.app";
const LINKEDIN_URL = "https://www.linkedin.com/in/daniel-castellani-475044396";
const INSTAGRAM_URL = "https://www.instagram.com/kanddlabs";
const YOUTUBE_URL = "https://www.youtube.com/@KandDlabs";

type JsonLd = Record<string, unknown> | Record<string, unknown>[];

function ld(id: string, data: JsonLd) {
  return (
    <Script
      key={id}
      id={id}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const organizationId = `${SITE_URL}/#organization`;

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": organizationId,
  name: "Publishd",
  url: SITE_URL,
  logo: `${SITE_URL}/icon`,
  founder: { "@id": `${SITE_URL}/about#person` },
  sameAs: [
    "https://github.com/HeavenFYouMissed",
    "https://model-surgery.com",
    "https://superclawhub.com",
    "https://nexus-language.com",
    LINKEDIN_URL,
    INSTAGRAM_URL,
    YOUTUBE_URL,
    GOOGLE_MAPS_URL,
    TRUSTPILOT_URL,
  ],
};

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/about#person`,
  name: "Daniel Castellani",
  url: `${SITE_URL}/about`,
  image: `${SITE_URL}/portrait/daniel.png`,
  jobTitle: "Founder & Lead Developer",
  worksFor: { "@id": organizationId },
  email: "daniel@publishd.app",
  telephone: "+1-203-818-6630",
  address: {
    "@type": "PostalAddress",
    addressRegion: "CT",
    addressCountry: "US",
  },
  alumniOf: {
    "@type": "Organization",
    name: "Amazon",
  },
  knowsAbout: [
    "React",
    "Next.js",
    "Swift",
    "Flutter",
    "Expo",
    "Capacitor",
    "App Store submission",
    "Google Play submission",
    "AI chatbot development",
    "Freelance software development",
  ],
  sameAs: [
    "https://github.com/HeavenFYouMissed",
    "https://model-surgery.com",
    LINKEDIN_URL,
    INSTAGRAM_URL,
    YOUTUBE_URL,
  ],
};

/** No SearchAction — site has no on-site search; fake SearchAction can confuse crawlers. */
const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Publishd",
  inLanguage: "en-US",
  publisher: { "@id": organizationId },
};

const professionalService = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#professional-service`,
  name: "Publishd",
  url: SITE_URL,
  logo: `${SITE_URL}/icon`,
  parentOrganization: { "@id": organizationId },
  founder: { "@id": `${SITE_URL}/about#person` },
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "AdministrativeArea", name: "Connecticut" },
    "Worldwide",
  ],
  address: {
    "@type": "PostalAddress",
    addressRegion: "CT",
    addressCountry: "US",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "daniel@publishd.app",
    telephone: "+1-203-818-6630",
    areaServed: ["US", "Worldwide"],
    availableLanguage: ["en"],
  },
  sameAs: [TRUSTPILOT_URL],
  hasMap: GOOGLE_MAPS_URL,
  serviceType: [
    "App Store submission",
    "Google Play submission",
    "Mobile app wrapping",
    "Apple rejection appeals",
    "App Store optimization",
    "Custom website development",
    "Business website design",
    "AI chatbot development",
    "Web application development",
    "Freelance software development",
    "SaaS development",
  ],
  priceRange: "$$",
  telephone: "+1-203-818-6630",
  email: "daniel@publishd.app",
  slogan: "You need it. We ship it.",
  knowsAbout: [
    "React", "Next.js", "Flutter", "Swift", "Expo", "Capacitor",
    "App Store guidelines", "Google Play policies", "AI chatbots",
  ],
  description:
    "Publishd ships web apps and AI-built apps (Lovable, Bolt, v0, Cursor) to the App Store and Google Play. Also builds custom websites, AI chatbots, and SaaS applications. Solo developer in Connecticut — one flat fee, you own everything, no subscriptions.",
};

/** Homepage-only: FAQPage + Product/Offer per tier. */
export function HomeStructuredData() {
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const products = tiers.map((t) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${t.name} — Publishd`,
    description: t.summary,
    brand: { "@type": "Brand", name: "Publishd" },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/#tier-${t.id}`,
      priceCurrency: "USD",
      price: String(t.price),
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Publishd" },
    },
  }));

  const studioProduct = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${studio.name} — Publishd`,
    description: studio.summary,
    brand: { "@type": "Brand", name: "Publishd" },
    offers: {
      "@type": "AggregateOffer",
      url: `${SITE_URL}/#tier-studio`,
      priceCurrency: "USD",
      lowPrice: String(studio.priceFrom),
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Publishd" },
    },
  };

  return (
    <>
      {ld("ld-faq", faqPage)}
      {ld("ld-products", [...products, studioProduct])}
    </>
  );
}

/** Every-page: core identity schemas. Rendered in root layout. */
export function GlobalStructuredData() {
  return (
    <>
      {ld("ld-person", person)}
      {ld("ld-organization", organization)}
      {ld("ld-website-global", website)}
      {ld("ld-prof-service-global", professionalService)}
    </>
  );
}
