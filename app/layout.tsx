import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SegmentAnalytics } from "@/components/analytics/SegmentAnalytics";
import { GlobalStructuredData } from "@/components/seo/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://publishd.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Publishd — You need it. We ship it.",
    template: "%s · Publishd",
  },
  description:
    "Ship your web app or AI-built app to the App Store and Google Play for one flat fee. No subscriptions. No lock-in. You own everything.",
  keywords: [
    "App Store submission",
    "Google Play submission",
    "ship web app to App Store",
    "Lovable app to App Store",
    "web app to native",
    "Apple 4.2 rejection help",
    "Capacitor app submission",
    "freelance app developer Connecticut",
    "website developer Connecticut",
    "custom website developer",
    "AI chatbot developer",
    "solo developer for hire",
    "build a business website",
  ],
  authors: [{ name: "Daniel Castellani", url: "/about" }],
  creator: "Daniel Castellani",
  publisher: "Publishd",
  alternates: { canonical: "/" },
  applicationName: "Publishd",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Publishd — You need it. We ship it.",
    description:
      "Ship your web app or AI-built app to the App Store and Google Play for one flat fee. You own everything.",
    siteName: "Publishd",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Publishd — ship web and AI-built apps to the App Store and Google Play",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Publishd — You need it. We ship it.",
    description:
      "Ship your web app to the App Store and Google Play for one flat fee. You own everything.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#05070d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <SegmentAnalytics />
      </head>
      <body>
        {children}
        <GlobalStructuredData />
      </body>
    </html>
  );
}
