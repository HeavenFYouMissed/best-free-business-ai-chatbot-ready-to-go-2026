import Link from "next/link";
import { PillarTag } from "@/components/blog/PillarTag";
import type { Post } from "@/lib/blog";

const dateFmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });

export function PostCard({ post, priority = false }: { post: Post; priority?: boolean }) {
  const fm = post.frontmatter;
  const date = dateFmt.format(new Date(fm.date));
  return (
    <Link
      href={`/blog/${fm.slug}`}
      prefetch={priority}
      className="glass-card group relative flex flex-col gap-4 overflow-hidden rounded-[var(--radius-lg)] p-6 transition-[transform] duration-200 active:scale-[0.99]"
    >
      <div className="flex items-center gap-2">
        <PillarTag pillar={fm.pillar} />
        <span className="num text-[11px] text-[var(--color-subtle)]">{date}</span>
        <span aria-hidden className="text-[var(--color-subtle)]">·</span>
        <span className="num text-[11px] text-[var(--color-subtle)]">{post.readingTime}</span>
      </div>

      <h3 className="text-[clamp(1.25rem,2vw,1.5rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--color-fg)]">
        {fm.title}
      </h3>

      <p className="text-[14.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_72%,transparent)]">
        {fm.description}
      </p>

      <div className="mt-auto flex items-center justify-between pt-2 text-[12px] text-[var(--color-muted)] transition-colors duration-200 group-hover:text-[color-mix(in_srgb,var(--color-fg)_82%,transparent)] group-focus-visible:text-[color-mix(in_srgb,var(--color-fg)_82%,transparent)] group-active:text-[var(--color-fg)]">
        <span className="uppercase tracking-[0.14em]">Read post</span>
        <span
          aria-hidden
          className="text-[var(--color-accent)] transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 group-active:translate-x-1"
        >
          →
        </span>
      </div>
    </Link>
  );
}
