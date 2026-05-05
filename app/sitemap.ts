import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://publishd.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/pricing`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE_URL}/site`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/kickoff`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/built-for-you`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${SITE_URL}/website-design`, lastModified: now, changeFrequency: "weekly", priority: 0.84 },
    { url: `${SITE_URL}/ai-chatbots`, lastModified: now, changeFrequency: "weekly", priority: 0.83 },
    { url: `${SITE_URL}/free-ai-chatbot`, lastModified: now, changeFrequency: "weekly", priority: 0.86 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/careers`, lastModified: now, changeFrequency: "monthly", priority: 0.55 },
    {
      url: `${SITE_URL}/ship-web-app-to-app-store`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${SITE_URL}/seo-guide/checklist`, lastModified: now, changeFrequency: "monthly", priority: 0.74 },
    { url: `${SITE_URL}/seo-title-meta-checker`, lastModified: now, changeFrequency: "monthly", priority: 0.72 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const posts: MetadataRoute.Sitemap = getAllPosts().map((post) => {
    const lastMod = post.frontmatter.updated ?? post.frontmatter.date;
    return {
      url: `${SITE_URL}/blog/${post.frontmatter.slug}`,
      lastModified: new Date(lastMod),
      changeFrequency: "monthly",
      priority: 0.75,
    };
  });

  return [...core, ...posts];
}
