import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { marked } from "marked";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const OUT = path.join(process.cwd(), "lib", "blog-manifest.generated.json");

const VALID_PILLARS = new Set([
  "app-shipping",
  "web-apps",
  "ai-integration",
  "freelancer-trust",
  "case-studies",
  "long-tail",
]);

marked.setOptions({ gfm: true, breaks: false });

const files = fs
  .readdirSync(BLOG_DIR)
  .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

const posts = [];

for (const file of files) {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);

  const required = ["title", "description", "slug", "date", "author", "pillar"];
  const missing = required.find((k) => typeof data[k] !== "string" || !data[k]);
  if (missing) {
    console.warn(`[blog-manifest] ${file} missing field: ${missing} — skipped`);
    continue;
  }
  if (!VALID_PILLARS.has(data.pillar)) {
    console.warn(`[blog-manifest] ${file} unknown pillar: ${data.pillar} — skipped`);
    continue;
  }
  if (data.draft === true) continue;

  const stats = readingTime(content);
  const compiledHtml = await marked.parse(content);

  posts.push({
    frontmatter: {
      title: data.title,
      description: data.description,
      slug: data.slug,
      date: data.date,
      updated: typeof data.updated === "string" ? data.updated : undefined,
      author: data.author,
      pillar: data.pillar,
      tags: Array.isArray(data.tags) ? data.tags : [],
      cover: typeof data.cover === "string" ? data.cover : undefined,
      draft: false,
    },
    content,
    compiledHtml,
    readingTime: `${Math.max(1, Math.round(stats.minutes))} min read`,
    readingMinutes: Math.max(1, Math.round(stats.minutes)),
  });
}

posts.sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));

fs.writeFileSync(OUT, JSON.stringify(posts, null, 2));
console.log(`[blog-manifest] wrote ${posts.length} posts → ${OUT}`);
