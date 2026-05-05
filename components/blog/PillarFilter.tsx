"use client";

import { useMemo, useState } from "react";
import { PostCard } from "@/components/blog/PostCard";
import { PILLARS, PILLAR_ORDER, type PillarSlug } from "@/lib/blog-pillars";
import type { Post } from "@/lib/blog";

type FilterValue = "all" | PillarSlug;

export function PillarFilter({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState<FilterValue>("all");

  const counts = useMemo(() => {
    const map = new Map<PillarSlug, number>();
    for (const p of posts) {
      map.set(p.frontmatter.pillar, (map.get(p.frontmatter.pillar) ?? 0) + 1);
    }
    return map;
  }, [posts]);

  const filtered = useMemo(
    () => (active === "all" ? posts : posts.filter((p) => p.frontmatter.pillar === active)),
    [active, posts],
  );

  const filters: Array<{ key: FilterValue; label: string; count: number }> = [
    { key: "all", label: "All", count: posts.length },
    ...PILLAR_ORDER.filter((slug) => (counts.get(slug) ?? 0) > 0).map((slug) => ({
      key: slug as FilterValue,
      label: PILLARS[slug].label,
      count: counts.get(slug) ?? 0,
    })),
  ];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter posts by pillar"
        className="mb-8 flex flex-wrap gap-2"
      >
        {filters.map((f) => {
          const isActive = active === f.key;
          return (
            <button
              key={f.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(f.key)}
              className={`group inline-flex min-h-[40px] items-center gap-1.5 rounded-[var(--radius-xs)] border px-3 py-2 text-[12px] uppercase tracking-[0.14em] transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-out [-webkit-tap-highlight-color:color-mix(in_srgb,var(--color-accent)_25%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] active:scale-[0.97] ${
                isActive
                  ? "border-[var(--color-accent)] bg-[color-mix(in_srgb,var(--color-accent)_22%,transparent)] text-[var(--color-fg)] shadow-[0_0_28px_-10px_color-mix(in_srgb,var(--color-accent)_42%,transparent)]"
                  : "border-[color-mix(in_srgb,#ffffff_20%,transparent)] bg-[color-mix(in_srgb,#ffffff_7%,transparent)] text-[color-mix(in_srgb,var(--color-fg)_86%,transparent)] hover:border-[color-mix(in_srgb,var(--color-accent)_55%,transparent)] hover:bg-[color-mix(in_srgb,var(--color-accent)_16%,transparent)] hover:text-[var(--color-fg)] hover:shadow-[0_0_24px_-12px_color-mix(in_srgb,var(--color-accent)_38%,transparent)] active:border-[var(--color-accent)] active:bg-[color-mix(in_srgb,var(--color-accent)_20%,transparent)] active:text-[var(--color-fg)] active:shadow-[0_0_32px_-8px_color-mix(in_srgb,var(--color-accent)_48%,transparent)]"
              }`}
            >
              <span>{f.label}</span>
              <span
                className={`num text-[10.5px] transition-colors duration-200 ${
                  isActive
                    ? "text-[color-mix(in_srgb,var(--color-fg)_78%,transparent)]"
                    : "text-[var(--color-subtle)] group-hover:text-[color-mix(in_srgb,var(--color-fg)_82%,transparent)] group-active:text-[var(--color-fg)]"
                }`}
              >
                {f.count}
              </span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="text-[14px] text-[var(--color-muted)]">No posts in this pillar yet. Check back soon.</p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => (
            <PostCard key={post.frontmatter.slug} post={post} priority={i < 3} />
          ))}
        </div>
      )}
    </div>
  );
}
