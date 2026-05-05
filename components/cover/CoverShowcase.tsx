"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/** Watches a container's width and returns the scale needed to fit `nativeW` inside it. */
function useContainerScale(nativeW: number) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0.3);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      if (w > 0) setScale(w / nativeW);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [nativeW]);

  return { ref, scale };
}

const IFRAME_W = 1360;
const IFRAME_H = 960;

function BrowserFrame({ src, title }: { src: string; title: string }) {
  const { ref, scale } = useContainerScale(IFRAME_W);

  return (
    <div className="group relative w-full">
      <div
        className="pointer-events-none absolute -inset-6 -z-10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: "radial-gradient(ellipse, color-mix(in srgb, var(--color-accent) 10%, transparent), transparent 70%)" }}
      />
      <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]">
        <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-4 py-2.5">
          <div className="flex gap-1.5">
            <div className="h-[10px] w-[10px] rounded-full bg-[#ff5f57]" />
            <div className="h-[10px] w-[10px] rounded-full bg-[#febc2e]" />
            <div className="h-[10px] w-[10px] rounded-full bg-[#28c840]" />
          </div>
          <div className="mx-auto flex items-center gap-2 rounded-md bg-[color-mix(in_srgb,var(--color-fg)_5%,transparent)] px-3 py-1">
            <svg className="h-3 w-3 text-[var(--color-subtle)]" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="12" height="12" rx="2" />
              <path d="M2 6h12" />
            </svg>
            <span className="font-mono text-[10px] text-[var(--color-subtle)]">{title}</span>
          </div>
        </div>
        <div
          ref={ref}
          className="relative w-full overflow-hidden"
          style={{ height: Math.round(IFRAME_H * scale) }}
        >
          <iframe
            src={src}
            title="Website demo"
            style={{
              width: IFRAME_W,
              height: IFRAME_H,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              display: "block",
            }}
            loading="lazy"
            sandbox="allow-scripts"
          />
        </div>
      </div>
    </div>
  );
}

const PHONE_W = 375;
const PHONE_H = 812;

function PhoneFrame({ src }: { src: string }) {
  const { ref, scale } = useContainerScale(PHONE_W);

  return (
    <div className="group relative mx-auto w-full max-w-[280px] sm:max-w-[300px]">
      <div
        className="pointer-events-none absolute -inset-6 -z-10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: "radial-gradient(ellipse, color-mix(in srgb, var(--color-accent) 8%, transparent), transparent 70%)" }}
      />
      <div
        className="overflow-hidden rounded-[28px] border border-[var(--color-border-strong)] bg-[#0c0c10] p-1.5"
        style={{ boxShadow: "0 40px 80px -30px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.04)" }}
      >
        <div className="relative z-10 flex justify-center pt-2 pb-1">
          <div className="h-[16px] w-[72px] rounded-full bg-[#000]" />
        </div>
        <div
          ref={ref}
          className="relative overflow-hidden rounded-[22px] w-full"
          style={{ height: Math.round(PHONE_H * scale) }}
        >
          <iframe
            src={src}
            title="Mobile app demo"
            style={{
              width: PHONE_W,
              height: PHONE_H,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              display: "block",
            }}
            loading="lazy"
            sandbox="allow-scripts"
          />
        </div>
        <div className="flex justify-center py-1.5">
          <div className="h-[4px] w-[80px] rounded-full bg-[rgba(255,255,255,0.12)]" />
        </div>
      </div>
    </div>
  );
}

const CHAT_W = 1360;
const CHAT_H = 900;

function ChatFrame({ src }: { src: string }) {
  const { ref, scale } = useContainerScale(CHAT_W);

  return (
    <div className="group relative w-full">
      <div
        className="pointer-events-none absolute -inset-6 -z-10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: "radial-gradient(ellipse, color-mix(in srgb, var(--color-accent) 6%, transparent), transparent 70%)" }}
      />
      <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]">
        <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-4 py-2.5">
          <div className="flex gap-1.5">
            <div className="h-[10px] w-[10px] rounded-full bg-[#ff5f57]" />
            <div className="h-[10px] w-[10px] rounded-full bg-[#febc2e]" />
            <div className="h-[10px] w-[10px] rounded-full bg-[#28c840]" />
          </div>
          <div className="mx-auto flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_6px_color-mix(in_srgb,var(--color-accent)_60%,transparent)]" />
            <span className="font-mono text-[10px] text-[var(--color-subtle)]">AI Chat Assistant</span>
          </div>
        </div>
        <div
          ref={ref}
          className="relative w-full overflow-hidden"
          style={{ height: Math.round(CHAT_H * scale) }}
        >
          <iframe
            src={src}
            title="Chat interface demo"
            style={{
              width: CHAT_W,
              height: CHAT_H,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              display: "block",
            }}
            loading="lazy"
            sandbox="allow-scripts"
          />
        </div>
      </div>
    </div>
  );
}

const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function CoverShowcase() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="cover-showcase px-5 py-20 md:px-10 md:py-28 lg:px-16"
      aria-label="Work showcase"
    >

      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={STAGGER}
      >
        <motion.div variants={FADE_UP} className="mb-6 md:mb-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
            [ what I build ]
          </span>
        </motion.div>
        <motion.h2
          variants={FADE_UP}
          className="mb-4 text-[clamp(1.6rem,4vw,2.8rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--color-fg)]"
        >
          Websites. Apps. AI.
        </motion.h2>
        <motion.p
          variants={FADE_UP}
          className="mb-14 max-w-[44ch] text-[15px] leading-[1.7] text-[var(--color-muted)] md:mb-20 md:text-[16px]"
        >
          Every project is built by one senior engineer. No templates, no
          outsourcing, no lock-in. You own the code.
        </motion.p>

        {/* Row 1: Browser + Phone side by side on desktop, stacked on mobile */}
        <motion.div
          variants={FADE_UP}
          className="mb-10 flex flex-col items-center gap-8 md:mb-14 lg:flex-row lg:items-start lg:gap-10"
        >
          <div className="w-full min-w-0 lg:flex-1">
            <BrowserFrame
              src="/cover/artifacts/landing-page.html"
              title="atelier-craft.com"
            />
            <p className="mt-4 text-center font-mono text-[11px] text-[var(--color-subtle)]">
              Custom websites &amp; landing pages
            </p>
          </div>
          <div className="flex-shrink-0">
            <PhoneFrame src="/cover/artifacts/mobile-app.html" />
            <p className="mt-4 text-center font-mono text-[11px] text-[var(--color-subtle)]">
              Mobile apps — iOS &amp; Android
            </p>
          </div>
        </motion.div>

        {/* Row 2: Chat interface */}
        <motion.div variants={FADE_UP} className="flex justify-center">
          <div className="w-full max-w-[680px]">
            <ChatFrame src="/cover/artifacts/chat-interface.html" />
            <p className="mt-4 text-center font-mono text-[11px] text-[var(--color-subtle)]">
              AI chatbots &amp; integrations
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
