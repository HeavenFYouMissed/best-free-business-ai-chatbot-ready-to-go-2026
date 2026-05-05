import { ImageResponse } from "next/og";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { PILLARS } from "@/lib/blog-pillars";

export const alt = "Publishd blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

type Params = { slug: string };

export default async function PostOgImage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post?.frontmatter.title ?? "Publishd";
  const pillarLabel = post ? PILLARS[post.frontmatter.pillar].label : "Blog";
  const author = post?.frontmatter.author ?? "Daniel Castellani";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#05070d",
          backgroundImage:
            "radial-gradient(900px 500px at 12% 8%, rgba(0,212,255,0.28), transparent 60%), radial-gradient(700px 420px at 92% 90%, rgba(255,107,61,0.18), transparent 60%), radial-gradient(600px 400px at 60% 50%, rgba(124,240,212,0.12), transparent 60%)",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 22, fontWeight: 600 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ display: "flex" }}>PUBLISHD</span>
            <span
              style={{
                display: "flex",
                width: 8,
                height: 8,
                marginTop: 14,
                marginLeft: 4,
                borderRadius: 999,
                background: "#00d4ff",
                boxShadow: "0 0 14px #00d4ff",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              padding: "8px 14px",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: 8,
              color: "#00d4ff",
              letterSpacing: "0.16em",
              fontSize: 14,
              textTransform: "uppercase",
            }}
          >
            {pillarLabel}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 600,
              letterSpacing: "-0.035em",
              lineHeight: 1.06,
              maxWidth: 1040,
            }}
          >
            {title.length > 110 ? `${title.slice(0, 107)}…` : title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 18,
            color: "#a0a0a0",
          }}
        >
          <span>By {author}</span>
          <span>publishd.app/blog</span>
        </div>
      </div>
    ),
    size,
  );
}
