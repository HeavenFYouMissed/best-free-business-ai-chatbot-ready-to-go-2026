import Link from "next/link";
import { PostCard } from "@/components/blog/PostCard";
import { ShipButton } from "@/components/ui/ShipButton";
import type { Post } from "@/lib/blog";

type CtaVariant = "kickoff" | "pricing" | "ship";

const CTAS: Record<CtaVariant, { headline: string; sub: string; href: string; label: string }> = {
  kickoff: {
    headline: "Ready to ship?",
    sub: "Tell me about your app. I'll send back a fixed quote and timeline within 24 hours.",
    href: "/kickoff",
    label: "Start a kickoff →",
  },
  pricing: {
    headline: "See the flat fee.",
    sub: "One price. Both stores. Rejection handling included.",
    href: "/pricing",
    label: "View pricing →",
  },
  ship: {
    headline: "From web app to App Store.",
    sub: "Lovable, Bolt, v0, Cursor or your own repo — I'll get it approved.",
    href: "/ship-web-app-to-app-store",
    label: "How it works →",
  },
};

export function PostFooter({ related, cta = "kickoff" }: { related: Post[]; cta?: CtaVariant }) {
  const c = CTAS[cta];
  return (
    <footer className="mt-16 space-y-14">
      <section
        aria-label="Call to action"
        className="glass-card relative overflow-hidden rounded-[var(--radius-lg)] p-8 md:p-10"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[42ch]">
            <h2 className="text-[clamp(1.6rem,3.4vw,2.2rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-[var(--color-fg)]">
              {c.headline}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_75%,transparent)]">
              {c.sub}
            </p>
          </div>
          <ShipButton href={c.href}>{c.label}</ShipButton>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-label="Related posts">
          <div className="mb-5 flex items-baseline justify-between gap-4">
            <h2 className="text-[clamp(1.1rem,2vw,1.35rem)] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
              Keep reading
            </h2>
            <Link
              href="/blog"
              className="text-[12px] uppercase tracking-[0.14em] text-[var(--color-muted)] hover:text-[var(--color-fg)]"
            >
              All posts →
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {related.map((post) => (
              <PostCard key={post.frontmatter.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </footer>
  );
}
