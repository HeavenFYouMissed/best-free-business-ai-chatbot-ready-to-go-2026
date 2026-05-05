// IndexNow ping — tells Bing, Yandex, Seznam, Naver that new URLs are live.
// Run manually with `npm run seo:indexnow` or wire to post-deploy.
// Google ignores IndexNow today but may adopt it later; ping cost is ~0.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const KEY = "7786be55230dc8ca0d3ed14a71188bea8cdcf04d8b8fa898";
const HOST = "publishd.app";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const manifestPath = resolve(process.cwd(), "lib/blog-manifest.generated.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

const postUrls = manifest
  .filter((post) => !post.frontmatter?.draft && post.frontmatter?.slug)
  .map((post) => `https://${HOST}/blog/${post.frontmatter.slug}`);

const URLS = Array.from(
  new Set([
    `https://${HOST}/`,
    `https://${HOST}/blog`,
    `https://${HOST}/seo-guide`,
    `https://${HOST}/seo-guide/checklist`,
    `https://${HOST}/seo-title-meta-checker`,
    `https://${HOST}/kickoff`,
    `https://${HOST}/privacy`,
    `https://${HOST}/terms`,
    ...postUrls,
  ]),
);

async function main() {
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: KEY_LOCATION,
        urlList: URLS,
      }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(`[indexnow] HTTP ${res.status}`, text);
      process.exitCode = 1;
      return;
    }
    console.log(`[indexnow] pinged ${URLS.length} urls (HTTP ${res.status})`);
  } catch (err) {
    console.error("[indexnow] request failed:", err);
    process.exitCode = 1;
  }
}

main();
