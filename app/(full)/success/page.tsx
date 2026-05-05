import Link from "next/link";
import { ArrowRight, CheckCircle2, Mail, Phone, MessageSquare } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://publishd.app";

export const metadata: Metadata = {
  title: "You're in",
  description: "Your order is confirmed. Daniel will reach out shortly.",
  alternates: { canonical: `${SITE_URL}/success` },
  robots: { index: false, follow: false },
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: id } = await searchParams;
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[1]"
        style={{
          background:
            "radial-gradient(600px 400px at 50% 20%, color-mix(in srgb, var(--color-accent) 18%, transparent), transparent 65%)",
        }}
      />
      <div className="container-tight relative flex min-h-[80dvh] flex-col items-center justify-center text-center">
        <SectionLabel index="00" label="Ordered" />
        <div className="mt-5 grid h-16 w-16 place-items-center rounded-full border border-[color-mix(in_srgb,var(--color-accent)_40%,var(--color-border))] text-[var(--color-accent)] shadow-[var(--shadow-glow)]">
          <CheckCircle2 className="icon icon-lg" aria-hidden />
        </div>
        <h1 className="mt-6 text-balance">You&apos;re in.</h1>
        <p className="mt-4 max-w-[48ch] text-[15.5px] leading-relaxed text-[var(--color-muted)]">
          Payment confirmed. The intake form hits your inbox within a few hours &mdash; usually much faster.
          Reply to that email with your app URL / GitHub repo / files and we&apos;re off.
        </p>

        <div className="mt-10 grid w-full max-w-[560px] gap-4 text-left sm:grid-cols-2">
          <ContactCard
            icon={<Phone className="icon icon-lg" aria-hidden />}
            label="Text Daniel directly"
            value="(203) 818-6630"
            href="sms:+12038186630"
            emphasis
            sub="Save this number. You&rsquo;re on the priority line now."
          />
          <ContactCard
            icon={<Mail className="icon icon-lg" aria-hidden />}
            label="Or email"
            value="daniel@publishd.app"
            href="mailto:daniel@publishd.app"
            sub="Replies within 6 business hours, usually much sooner."
          />
        </div>

        <div className="mt-10 w-full max-w-[560px] rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-2)] p-5 text-left">
          <div className="mono-label">[ what happens next ]</div>
          <ol className="mt-4 space-y-3 text-[14px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_88%,transparent)]">
            <NextStep n="1" title="Welcome email in your inbox">
              Intake form with checklist of what I need (URL, name, description, accounts, assets).
            </NextStep>
            <NextStep n="2" title="15-minute kickoff call">
              We align on scope and set up your Apple + Google accounts (or invite me as a team member to yours).
            </NextStep>
            <NextStep n="3" title="Ship window: 7–14 days">
              You get progress updates along the way. When it&apos;s live, you get the store links.
            </NextStep>
          </ol>
        </div>

        {id && (
          <p className="num mt-6 text-[11px] text-[var(--color-muted)]">
            Stripe session: <span className="text-[color-mix(in_srgb,var(--color-fg)_70%,transparent)]">{id}</span>
          </p>
        )}

        <p className="mt-3 max-w-[46ch] text-[11.5px] leading-relaxed text-[var(--color-subtle)]">
          Receipt and card statement will show <span className="num">SUPERCLAWHUB</span> or{" "}
          <span className="num">PUBLISHD</span>. SuperClawHub is the SaaS that runs Publishd.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn--ghost">
            Back home
          </Link>
          <Link href="/kickoff" className="btn btn--primary">
            Fill the 2-minute kickoff form
            <ArrowRight className="icon" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
  sub,
  emphasis,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  sub?: string;
  emphasis?: boolean;
}) {
  return (
    <a
      href={href}
      className={`group relative flex items-start gap-3 overflow-hidden rounded-[var(--radius-lg)] border p-4 transition-all hover:-translate-y-0.5 ${
        emphasis
          ? "border-[color-mix(in_srgb,var(--color-accent)_50%,var(--color-border-strong))] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-accent)_10%,var(--color-surface-2)),var(--color-surface-2))]"
          : "border-[var(--color-border)] bg-[var(--color-surface-2)]"
      }`}
    >
      <span
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-[var(--radius-md)] border ${
          emphasis
            ? "border-[color-mix(in_srgb,var(--color-accent)_50%,var(--color-border-strong))] text-[var(--color-accent)]"
            : "border-[var(--color-border)] text-[var(--color-fg)]"
        }`}
        aria-hidden
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="mono-label" style={emphasis ? { color: "var(--color-accent)" } : undefined}>
          {label}
        </span>
        <span className="num mt-1 block text-[16px] font-semibold tracking-[-0.01em] text-[var(--color-fg)]">
          {value}
        </span>
        {sub && <span className="mt-1 block text-[11.5px] leading-snug text-[var(--color-muted)]">{sub}</span>}
      </span>
      <MessageSquare
        className="icon mt-1 shrink-0 opacity-50 transition-opacity group-hover:opacity-100"
        aria-hidden
      />
    </a>
  );
}

function NextStep({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span
        aria-hidden
        className="num grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[color-mix(in_srgb,var(--color-accent)_40%,var(--color-border-strong))] text-[11px]"
        style={{ color: "var(--color-accent)" }}
      >
        {n}
      </span>
      <div>
        <div className="font-medium text-[var(--color-fg)]">{title}</div>
        <div className="mt-0.5 text-[13px] text-[var(--color-muted)]">{children}</div>
      </div>
    </li>
  );
}
