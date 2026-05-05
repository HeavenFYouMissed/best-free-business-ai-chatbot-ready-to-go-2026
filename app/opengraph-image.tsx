import { ImageResponse } from "next/og";

export const alt = "Publishd — You built it. We ship it.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
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
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(900px 500px at 15% 10%, rgba(0,212,255,0.22), transparent 60%), radial-gradient(700px 420px at 88% 84%, rgba(124,240,212,0.14), transparent 60%)",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 22, fontWeight: 600 }}>
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

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 600,
              letterSpacing: "-0.04em",
              lineHeight: 1.02,
            }}
          >
            You built it.
          </div>
          <div
            style={{
              fontSize: 92,
              fontWeight: 600,
              letterSpacing: "-0.04em",
              lineHeight: 1.02,
              background: "linear-gradient(120deg, #7cf0d4, #00d4ff, #ff6b3d)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            We ship it.
          </div>
          <div style={{ marginTop: 24, fontSize: 24, color: "#a0a0a0", maxWidth: 820, lineHeight: 1.35 }}>
            From web app to App Store and Google Play. One flat fee. You own everything.
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
          <span>publishd.app</span>
          <span
            style={{
              padding: "6px 10px",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: 8,
              color: "#00d4ff",
              letterSpacing: "0.08em",
              fontSize: 14,
            }}
          >
            $399 · iOS + ANDROID
          </span>
        </div>
      </div>
    ),
    size
  );
}
