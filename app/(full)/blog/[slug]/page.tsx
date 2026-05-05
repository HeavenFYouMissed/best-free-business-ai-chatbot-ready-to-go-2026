import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import Link from "next/link";
import { GuideActionPanel } from "@/components/blog/GuideActionPanel";
import { Prose } from "@/components/blog/Prose";
import { PostHeader } from "@/components/blog/PostHeader";
import { PostFooter } from "@/components/blog/PostFooter";
import { getAllSlugs, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { PILLARS } from "@/lib/blog-pillars";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://publishd.app";

/** Must stay `true` on Cloudflare: OpenNext may not hydrate the incremental prerender cache, and
 * `dynamicParams=false` rejects slugs unless they match stale cache — every article 404'd. Manifest-backed
 * render is tiny; dynamic slugs remain safe (`getPostBySlug` → `notFound()` for unknown). */
export const dynamicParams = true;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const fm = post.frontmatter;
  const url = `${SITE_URL}/blog/${fm.slug}`;
  const ogImage = `${SITE_URL}/blog/${fm.slug}/opengraph-image`;
  return {
    title: fm.title,
    description: fm.description,
    keywords: fm.tags,
    alternates: { canonical: `/blog/${fm.slug}` },
    openGraph: {
      type: "article",
      title: fm.title,
      description: fm.description,
      url,
      publishedTime: fm.date,
      modifiedTime: fm.updated ?? fm.date,
      authors: [fm.author],
      section: PILLARS[fm.pillar].label,
      tags: fm.tags,
      images: [{ url: ogImage, width: 1200, height: 630, alt: fm.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: fm.title,
      description: fm.description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const fm = post.frontmatter;
  const url = `${SITE_URL}/blog/${fm.slug}`;
  const ogImage = `${SITE_URL}/blog/${fm.slug}/opengraph-image`;
  const related = getRelatedPosts(slug, 3);
  const wordCount = post.content.trim().split(/\s+/).filter(Boolean).length;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: fm.title,
    url,
    description: fm.description,
    author: { "@id": `${SITE_URL}/about#person` },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    datePublished: fm.date,
    dateModified: fm.updated ?? fm.date,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: [ogImage],
    articleSection: PILLARS[fm.pillar].label,
    keywords: fm.tags.join(", "),
    wordCount,
    inLanguage: "en-US",
    isPartOf: { "@id": `${SITE_URL}/blog#blog` },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: fm.title, item: url },
    ],
  };

  return (
    <article className="container-tight py-14 md:py-20">
      <Script id={`ld-article-${fm.slug}`} type="application/ld+json">
        {JSON.stringify(articleLd)}
      </Script>
      <Script id={`ld-breadcrumb-${fm.slug}`} type="application/ld+json">
        {JSON.stringify(breadcrumbLd)}
      </Script>

      <nav aria-label="Breadcrumb" className="mb-8 text-[12px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
        <Link href="/blog" className="hover:text-[var(--color-fg)]">
          ← All posts
        </Link>
      </nav>

      <PostHeader post={post} index="POST" />

      <Prose>
        <div dangerouslySetInnerHTML={{ __html: post.compiledHtml }} />
      </Prose>

      {fm.slug === "seo-guide" && <GuideActionPanel />}

      <PostFooter related={related} cta="kickoff" />
    </article>
  );
}
