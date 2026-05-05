import Link from "next/link";
import { PillarTag } from "@/components/blog/PillarTag";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Post } from "@/lib/blog";

const dateFmt = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" });

export function PostHeader({ post, index }: { post: Post; index: string }) {
  const fm = post.frontmatter;
  const published = dateFmt.format(new Date(fm.date));
  const updated = fm.updated ? dateFmt.format(new Date(fm.updated)) : null;
  return (
    <header className="mb-10">
      <SectionLabel index={index} label="Blog" />
      <h1 className="mt-5 text-balance text-[clamp(2rem,5.4vw,3.6rem)] font-semibold leading-[1.04] tracking-[-0.035em]">
        {fm.title}
      </h1>
      <p className="mt-5 max-w-[62ch] text-[16.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_78%,transparent)]">
        {fm.description}
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] text-[var(--color-muted)]">
        <PillarTag pillar={fm.pillar} />
        <span aria-hidden className="text-[var(--color-subtle)]">·</span>
        <span>
          By{" "}
          <Link href="/about" className="text-[var(--color-fg)] underline-offset-2 hover:underline">
            {fm.author}
          </Link>
        </span>
        <span aria-hidden className="text-[var(--color-subtle)]">·</span>
        <time className="num" dateTime={fm.date}>
          {published}
        </time>
        {updated && (
          <>
            <span aria-hidden className="text-[var(--color-subtle)]">·</span>
            <span className="num text-[var(--color-subtle)]">Updated {updated}</span>
          </>
        )}
        <span aria-hidden className="text-[var(--color-subtle)]">·</span>
        <span className="num">{post.readingTime}</span>
      </div>

      {fm.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {fm.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-[var(--radius-xs)] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-ink)_60%,transparent)] px-2 py-[2px] text-[10.5px] uppercase tracking-[0.12em] text-[var(--color-subtle)]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </header>
  );
}
