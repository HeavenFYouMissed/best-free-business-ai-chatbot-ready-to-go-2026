import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";

import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://publishd.app";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Publishd collects, stores, and handles your data. We collect only what's needed to ship your app, don't sell data, and don't use third-party trackers.",
  alternates: { canonical: `${SITE_URL}/privacy` },
  openGraph: {
    title: "Privacy Policy · Publishd",
    description: "Plain-English privacy policy for Publishd.",
    url: `${SITE_URL}/privacy`,
    type: "article",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Publishd — Privacy Policy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy · Publishd",
    description: "How Publishd handles your data.",
    images: ["/opengraph-image"],
  },
};

const updated = "April 19, 2026";

export default function PrivacyPage() {
  return (
    <article className="container-tight py-16">
      <SectionLabel index="PRV" label="Privacy" />
      <h1 className="mt-4">Privacy Policy</h1>
      <p className="mt-3 text-[14px] text-[var(--color-muted)]">
        Last updated: <span className="num">{updated}</span>. Short version: we collect only what&rsquo;s needed
        to ship your app. We don&rsquo;t sell data. We don&rsquo;t track you with third-party cookies.
      </p>

      <Section title="1. What we collect">
        <p>We collect the following, only when you give it to us:</p>
        <ul className="list-disc space-y-1.5 pl-6">
          <li>
            <strong>Checkout data</strong> &mdash; handled entirely by Stripe. Publishd receives an email
            address, tier, and customer ID from Stripe&rsquo;s webhook or dashboard. We never see your full
            card number.
          </li>
          <li>
            <strong>Chat transcripts</strong> &mdash; messages you type into the help bot are sent to Groq for
            generating the reply. Transcripts are stored in your browser (localStorage); if you opt in, a copy
            is forwarded to Daniel via email so we can continue the conversation.
          </li>
          <li>
            <strong>App materials</strong> &mdash; any URL, repository, file, asset, credential, or description
            you hand us during an engagement.
          </li>
          <li>
            <strong>Contact details</strong> &mdash; email, phone (if you share it), business name.
          </li>
        </ul>
        <p>We do not use analytics cookies. We do not use advertising trackers.</p>
      </Section>

      <Section title="2. Why we collect it">
        <ul className="list-disc space-y-1.5 pl-6">
          <li>To deliver the service you paid for (submission, rebuild, coaching, rescue).</li>
          <li>To handle billing and refunds via Stripe.</li>
          <li>To respond to support questions and kick off new engagements.</li>
        </ul>
      </Section>

      <Section title="3. Who we share it with">
        <p>Short list:</p>
        <ul className="list-disc space-y-1.5 pl-6">
          <li>
            <strong>Stripe</strong> &mdash; for payment processing (<a className="underline underline-offset-2" href="https://stripe.com/privacy" target="_blank" rel="noopener">stripe.com/privacy</a>).
          </li>
          <li>
            <strong>Groq</strong> &mdash; for the help-bot replies (<a className="underline underline-offset-2" href="https://groq.com/privacy-policy" target="_blank" rel="noopener">groq.com/privacy-policy</a>). Groq states it does not retain prompts for model training.
          </li>
          <li>
            <strong>Cloudflare</strong> &mdash; hosts the site and routes email (<a className="underline underline-offset-2" href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener">cloudflare.com/privacypolicy</a>).
          </li>
          <li>
            <strong>Apple &amp; Google</strong> &mdash; only the specific app materials and metadata required to
            submit your app to their platforms, under their terms.
          </li>
        </ul>
        <p>
          We do <strong>not</strong> sell personal data. We do <strong>not</strong> share your source code,
          credentials, or business information with anyone beyond the scope above.
        </p>
      </Section>

      <Section title="4. How long we keep it">
        <ul className="list-disc space-y-1.5 pl-6">
          <li>Payment records: retained as required by Stripe and US tax law.</li>
          <li>App source code and credentials: retained only during the engagement plus 30 days for post-launch support, then deleted or returned to you.</li>
          <li>Chat transcripts on the server: not retained beyond the reply cycle unless you opt into email follow-up.</li>
        </ul>
      </Section>

      <Section title="5. Your rights">
        <p>
          You can email <a className="underline underline-offset-2" href="mailto:daniel@publishd.app">daniel@publishd.app</a>{" "}
          at any time to:
        </p>
        <ul className="list-disc space-y-1.5 pl-6">
          <li>See what we have on you.</li>
          <li>Correct or update any record.</li>
          <li>Delete your records (where not required to retain by law).</li>
          <li>Withdraw consent for any non-required processing.</li>
        </ul>
        <p>Requests are actioned within 30 days.</p>
      </Section>

      <Section title="6. Children">
        <p>
          Publishd is not designed for or directed at children under 13. We do not knowingly collect data from
          children. If you believe a child has submitted data, email us and we will delete it.
        </p>
      </Section>

      <Section title="7. Cookies">
        <p>
          We use a single first-party cookie for session state if you log into a future customer portal. No
          third-party advertising or analytics cookies are set by publishd.app.
        </p>
      </Section>

      <Section title="8. Changes">
        <p>
          We may update this policy. The version in effect when you interact with us governs. Material changes
          get announced on this page with an updated date.
        </p>
      </Section>

      <Section title="9. Contact">
        <p>
          Privacy questions or requests:{" "}
          <a className="underline underline-offset-2" href="mailto:daniel@publishd.app">daniel@publishd.app</a>.
        </p>
      </Section>

      <p className="mt-10 text-[12px] text-[var(--color-subtle)]">
        See also our{" "}
        <Link href="/terms" className="underline underline-offset-2">Terms of Service</Link>.
      </p>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-[20px] font-semibold tracking-[-0.02em]">{title}</h2>
      <div className="mt-3 space-y-3 text-[14.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_86%,transparent)]">
        {children}
      </div>
    </section>
  );
}
