"use client";

import { GlassBubbleShader } from "./GlassBubbleShader";

/**
 * Chat FAB — a real refractive glass orb (shaders.com Glass SDF over a cyan
 * spiral). Three cyan dots sit on top as a chat glyph that reads as an
 * iMessage-style typing indicator when at rest, and refracts through the
 * glass courtesy of the shader's chromatic aberration.
 */
export function ChatBubble({ onClick, hidden }: { onClick: () => void; hidden?: boolean }) {
  if (hidden) return null;

  return (
    <button
      type="button"
      aria-label="Open chat"
      onClick={onClick}
      className="group fixed z-[100] block size-[60px] shrink-0 cursor-pointer touch-manipulation rounded-full border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_srgb,var(--color-accent)_70%,transparent)]"
      style={{
        bottom: "max(1.15rem, calc(env(safe-area-inset-bottom, 0px) + 0.75rem))",
        right: "max(1.15rem, calc(env(safe-area-inset-right, 0px) + 0.75rem))",
      }}
    >
      {/* Outer aurora bloom */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[-16px] rounded-full opacity-75 motion-safe:animate-[chat-glow_3s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in srgb, var(--color-accent) 60%, transparent), transparent 72%)",
          filter: "blur(16px)",
        }}
      />

      {/* Expanding ping ring */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full motion-safe:animate-[chat-ping_2.6s_ease-out_infinite]"
        style={{ border: "1px solid color-mix(in srgb, var(--color-accent) 55%, transparent)" }}
      />

      {/* Core — real refractive glass orb */}
      <span
        className="chat-bubble-core relative isolate flex size-full items-center justify-center overflow-hidden rounded-full text-white shadow-[0_18px_44px_-8px_rgba(0,0,0,0.85),0_10px_28px_-10px_color-mix(in_srgb,var(--color-accent)_60%,transparent)] transition-[transform,box-shadow] duration-200 group-hover:-translate-y-0.5 group-hover:shadow-[0_24px_52px_-8px_rgba(0,0,0,0.9),0_14px_32px_-6px_color-mix(in_srgb,var(--color-accent)_72%,transparent)] active:translate-y-0 active:scale-[0.96] motion-reduce:transition-none"
      >
        {/* Shader fill */}
        <span aria-hidden className="pointer-events-none absolute inset-0 z-0">
          <GlassBubbleShader className="h-full w-full" />
        </span>

        {/* Specular hotspot — catches the light on the upper-left */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-[18%] top-[16%] z-[1] h-[28%] w-[28%] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(255,255,255,0.85), rgba(255,255,255,0.3) 45%, transparent 75%)",
            filter: "blur(1.5px)",
          }}
        />

        {/* 3-dot glyph — refracted chat indicator */}
        <span aria-hidden className="chat-bubble-dots relative z-[2] inline-flex items-center gap-[4px]">
          <span className="chat-bubble-dot" />
          <span className="chat-bubble-dot" />
          <span className="chat-bubble-dot" />
        </span>

        {/* Outer rim — thin cyan ring, reads as the glass edge catching light */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[3] rounded-full ring-1 ring-inset"
          style={{ borderColor: "rgba(255,255,255,0.25)" }}
        />
      </span>
    </button>
  );
}
