import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";

import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://publishd.app";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Plain-English terms of service for Publishd. Covers scope, payments, refunds, ownership, and dispute resolution.",
  alternates: { canonical: `${SITE_URL}/terms` },
  openGraph: {
    title: "Terms of Service · Publishd",
    description: "Binding terms for anyone who buys a Publishd service.",
    url: `${SITE_URL}/terms`,
    type: "article",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Publishd — Terms of Service" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service · Publishd",
    description: "Plain-English terms of service for Publishd.",
    images: ["/opengraph-image"],
  },
};

const updated = "April 19, 2026";

export default function TermsPage() {
  return (
    <article className="container-tight py-16">
      <SectionLabel index="TOS" label="Terms of service" />
      <h1 className="mt-4">Terms of Service</h1>
      <p className="mt-3 text-[14px] text-[var(--color-muted)]">
        Last updated: <span className="num">{updated}</span>. Plain-English version. Binding for anyone who buys
        a Publishd service.
      </p>

      <Disclaimer />

      <Section title="1. Who we are">
        <p>
          Publishd (“we,” “us”) is a service operated by Daniel Castellani, a solo engineer based in
          Connecticut, USA. Publishd ships customers&rsquo; web apps to the Apple App Store and Google Play. All
          billing is processed by <strong>SuperClawHub</strong>, the parent SaaS entity that runs Publishd.
          Publishd and SuperClawHub are operated by the same person and share one Stripe account.
        </p>
      </Section>

      <Section title="2. Services">
        <p>
          Depending on the tier you purchase, Publishd delivers one or more of the following:
        </p>
        <ul className="list-disc space-y-1.5 pl-6">
          <li>Wrapping and submission of an existing web app to the App Store and/or Google Play.</li>
          <li>Generation of required store assets (icons, screenshots, metadata, privacy policy).</li>
          <li>Certificate, provisioning, bundle ID, and App Signing management.</li>
          <li>Appeal of Apple or Google rejections, up to a reasonable number of resubmissions.</li>
          <li>Custom native iOS/Android or SaaS build (under the Studio tier only, scoped separately).</li>
          <li>Coaching sessions in place of full submission work (Coaching tier only).</li>
        </ul>
        <p>
          The exact scope for each tier is described on the pricing section of{" "}
          <Link href="/#pricing" className="underline underline-offset-2">publishd.app</Link>.
        </p>
      </Section>

      <Section title="3. Fees and billing">
        <ul className="list-disc space-y-1.5 pl-6">
          <li>Publishd services are priced as a one-time fee, except the optional Retainer add-on which is monthly.</li>
          <li>All prices are in USD. Taxes, if applicable, are added at checkout.</li>
          <li>
            Apple Developer Program ($99/year) and Google Play Console ($25 one-time) fees are paid{" "}
            <strong>directly by you</strong> to Apple and Google. They are not part of Publishd&rsquo;s fee.
          </li>
          <li>
            Payments are processed by <strong>SuperClawHub</strong> via Stripe. Your card statement will show
            <span className="num"> SUPERCLAWHUB</span> or <span className="num">PUBLISHD</span>.
          </li>
          <li>No subscription and no lock-in, unless you explicitly opt into the $49/month Retainer.</li>
        </ul>
      </Section>

      <Section title="4. Refund policy">
        <ul className="list-disc space-y-1.5 pl-6">
          <li>
            If Publishd is unable to deliver the purchased service for reasons within our control (we lose
            access, we disappear, we fail to submit), you get a <strong>full refund</strong>.
          </li>
          <li>
            If Apple or Google permanently rejects your app for reasons we cannot remedy after three good-faith
            submission attempts, you get a <strong>50% refund</strong>. The remaining 50% covers the real work
            already completed (assets, metadata, submissions, appeal writing).
          </li>
          <li>
            Once an app is live in at least one store, refunds are not available &mdash; the service has been
            delivered.
          </li>
          <li>
            Retainer subscriptions can be cancelled at any time. No partial refunds for partial months.
          </li>
        </ul>
      </Section>

      <Section title="5. Intellectual property — you own your app">
        <ul className="list-disc space-y-1.5 pl-6">
          <li>
            <strong>You retain 100% ownership</strong> of your app, its source code, branding, user data, and
            all derivative assets produced during the engagement.
          </li>
          <li>
            For the Studio tier, full source code is delivered to you at completion. No escrow, no residuals,
            no ongoing claim by Publishd.
          </li>
          <li>
            Publishd may, with your written consent, describe the engagement at a high level for marketing
            purposes (e.g. case studies). Without written consent, Publishd will not name, logo, or screenshot
            your work publicly.
          </li>
        </ul>
      </Section>

      <Section title="6. Confidentiality — we will not share your code">
        <p>
          Anything you send us &mdash; source code, design files, business plans, credentials, user data,
          analytics, revenue figures, roadmaps, unreleased features &mdash; is treated as confidential. We
          will not:
        </p>
        <ul className="list-disc space-y-1.5 pl-6">
          <li>Redistribute your code or assets to any third party.</li>
          <li>Publish, sell, license, or reuse your code in any other project.</li>
          <li>Discuss your business with other Publishd customers or with the public.</li>
          <li>Use your work as training data for any AI system.</li>
        </ul>
        <p>
          The only exceptions are (a) disclosure required by law or valid legal process, and (b) information
          that is or becomes publicly available through no fault of ours. Credentials you share (store
          account logins, GitHub access, API keys) are destroyed or revoked at the end of the engagement.
        </p>
      </Section>

      <Section title="7. App revenue routes to you, not us">
        <p>
          Every app we ship under your Apple Developer and Google Play accounts pays its in-app purchase, ad,
          and subscription revenue directly to <strong>your</strong> payout destinations. Publishd never holds
          or routes your app revenue. This is deliberate and keeps both of us aligned with Apple and Google
          platform terms.
        </p>
      </Section>

      <Section title="8. Your responsibilities">
        <ul className="list-disc space-y-1.5 pl-6">
          <li>
            You warrant that you have the legal right to the content, trademarks, images, and data in the app
            you send us. You are responsible for any IP infringement claims.
          </li>
          <li>
            You provide timely access &mdash; dev accounts, repos, URLs, credentials &mdash; as requested.
          </li>
          <li>
            You agree to abide by Apple Developer Program License Agreement and Google Play Developer
            Distribution Agreement. Publishd submits under your accounts; you remain the legal app publisher.
          </li>
          <li>
            You warrant that your app is not malicious, deceptive, illegal, or in violation of Apple or Google
            content policies.
          </li>
        </ul>
      </Section>

      <Section title="9. Right to refuse service">
        <p>
          Publishd reserves the right to decline or end any engagement, with a pro-rated or full refund, if:
        </p>
        <ul className="list-disc space-y-1.5 pl-6">
          <li>The app contains illegal content, malware, deceptive claims, or likely Apple/Google guideline violations we cannot resolve.</li>
          <li>The customer engages in abusive, harassing, discriminatory, or threatening communication.</li>
          <li>The customer provides false information or attempts to use Publishd to violate third-party rights.</li>
          <li>The project scope materially exceeds what was purchased and cannot be re-scoped amicably.</li>
          <li>We determine, in good faith, that completing the engagement would put Publishd, SuperClawHub, or Daniel personally at risk.</li>
        </ul>
        <p>
          If we end the engagement before work is substantially complete, we refund unearned fees. If we end it
          after substantial completion due to policy violations by you, no refund is owed.
        </p>
      </Section>

      <Section title="10. Apple, Google, and no approval guarantee">
        <p>
          Publishd is independent of Apple Inc. and Google LLC. We do not control their review decisions,
          timelines, or policies. We use best efforts to prepare and submit apps in a way that maximizes
          approval odds, but cannot guarantee Apple or Google will approve any specific app.
        </p>
      </Section>

      <Section title="11. Third-party services">
        <p>
          When you use Publishd, you may also be interacting with the following third parties under their own
          terms and privacy policies:
        </p>
        <ul className="list-disc space-y-1.5 pl-6">
          <li>Stripe (payments) &mdash; <a className="underline underline-offset-2" href="https://stripe.com/legal" target="_blank" rel="noopener">stripe.com/legal</a></li>
          <li>Groq (help bot) &mdash; <a className="underline underline-offset-2" href="https://groq.com/privacy-policy" target="_blank" rel="noopener">groq.com/privacy-policy</a></li>
          <li>Cloudflare (hosting) &mdash; <a className="underline underline-offset-2" href="https://www.cloudflare.com/legal/" target="_blank" rel="noopener">cloudflare.com/legal</a></li>
          <li>Apple Developer Program and Google Play Console &mdash; both parties&rsquo; own terms.</li>
        </ul>
      </Section>

      <Section title="12. Limitation of liability">
        <p>
          To the maximum extent permitted by law, Publishd&rsquo;s total liability for any claim arising out of
          your use of our services is limited to the amount you actually paid Publishd for the specific
          service in dispute. We are not liable for indirect, incidental, special, or consequential damages
          &mdash; including lost revenue, lost users, or lost app-store rankings.
        </p>
      </Section>

      <Section title="13. Communication">
        <p>
          Publishd responds within <strong>six (6) business hours</strong> on weekdays. When traveling or
          offline, we post an auto-reply with the expected response window. Post-purchase customers receive a
          direct phone number for SMS contact during the engagement.
        </p>
      </Section>

      <Section title="14. Termination">
        <p>
          Either party may end the engagement at any time by written notice. Fees for work already performed
          remain due. Publishd will deliver all completed assets, source code, and credentials in its
          possession within seven (7) days of termination.
        </p>
      </Section>

      <Section title="15. Governing law">
        <p>
          These terms are governed by the laws of the State of Connecticut, USA, without regard to conflict-of-law
          principles. Venue for any dispute is the state or federal courts located in Connecticut.
        </p>
      </Section>

      <Section title="16. Changes to these terms">
        <p>
          We may update these terms from time to time. The version in effect when you purchase a service
          governs that engagement. Material changes will be announced on this page with an updated date at
          the top.
        </p>
      </Section>

      <Section title="17. Contact">
        <p>
          Questions, dispute notices, or legal process:{" "}
          <a className="underline underline-offset-2" href="mailto:daniel@publishd.app">daniel@publishd.app</a>.
        </p>
      </Section>

      <p className="mt-10 text-[12px] text-[var(--color-subtle)]">
        Plain-English versions of these terms are provided for clarity. They are binding as written. They are
        not a substitute for independent legal advice for your specific situation.
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

function Disclaimer() {
  return (
    <div className="mt-8 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-2)] px-4 py-3 text-[13px] leading-relaxed text-[var(--color-muted)]">
      <span className="mono-label mr-2">[ tldr ]</span>
      You own your app. I keep your code private. You pay once. I reserve the right to refuse projects that
      break laws, break platform rules, or involve abusive conduct. Full language below.
    </div>
  );
}
