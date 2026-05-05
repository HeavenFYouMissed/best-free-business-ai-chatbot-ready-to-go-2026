import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          borderRadius: 12,
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: 34,
          fontWeight: 700,
          letterSpacing: "-0.04em",
        }}
      >
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <span style={{ display: "flex" }}>P</span>
          <span
            style={{
              display: "flex",
              position: "absolute",
              right: -8,
              bottom: 6,
              width: 8,
              height: 8,
              borderRadius: 999,
              background: "#00d4ff",
              boxShadow: "0 0 14px #00d4ff",
            }}
          />
        </div>
      </div>
    ),
    size
  );
}
