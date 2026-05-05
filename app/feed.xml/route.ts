import { getAllPosts } from "@/lib/blog";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://publishd.app";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const posts = getAllPosts();
  const latestPostDate = posts.reduce((latest, post) => {
    const date = new Date(post.frontmatter.updated ?? post.frontmatter.date);
    return date > latest ? date : latest;
  }, new Date(0));

  const items = posts
    .map((post) => {
      const fm = post.frontmatter;
      const url = `${SITE_URL}/blog/${fm.slug}`;
      const categories = [fm.pillar, ...fm.tags]
        .map((category) => `<category>${escapeXml(category)}</category>`)
        .join("");

      return `
        <item>
          <title>${escapeXml(fm.title)}</title>
          <link>${url}</link>
          <guid isPermaLink="true">${url}</guid>
          <pubDate>${new Date(fm.updated ?? fm.date).toUTCString()}</pubDate>
          <description>${escapeXml(fm.description)}</description>
          ${categories}
        </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Publishd Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Tactical writing on shipping apps, building websites, adding AI, and hiring developers who actually ship.</description>
    <language>en-us</language>
    <lastBuildDate>${latestPostDate.toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}