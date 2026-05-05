"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const DigitalActivation6 = dynamic(
  () =>
    import("@/components/shaders/presets/DigitalActivation6").then(
      (m) => m.DigitalActivation6
    ),
  { ssr: false }
);

type Card = {
  src: string;
  alt: string;
  tag: string;
  href?: string;
};

const cards: Card[] = [
  {
    src: "/work/superclaw-chat.png",
    alt: "SuperClaw — mobile chat",
    tag: "chat",
  },
  {
    src: "/work/public-secrets.png",
    alt: "Public Secrets — social confessions app",
    tag: "social",
  },
  {
    src: "/work/support-bears.png",
    alt: "Support Bears — mobile app",
    tag: "community",
  },
];

export function ProductShowcase() {
  return (
    <>
      <DesktopShowcase />
      <MobileShowcase />
    </>
  );
}

function DesktopShowcase() {
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 130, damping: 22, mass: 0.5 });
  const smy = useSpring(my, { stiffness: 130, damping: 22, mass: 0.5 });

  const rx = useTransform(smy, [-0.5, 0.5], [6, -6]);
  const ry = useTransform(smx, [-0.5, 0.5], [-6, 6]);
  const tx1 = useTransform(smx, [-0.5, 0.5], [-10, 10]);
  const ty1 = useTransform(smy, [-0.5, 0.5], [-10, 10]);
  const tx2 = useTransform(smx, [-0.5, 0.5], [-20, 20]);
  const ty2 = useTransform(smy, [-0.5, 0.5], [-20, 20]);
  const tx3 = useTransform(smx, [-0.5, 0.5], [-30, 30]);
  const ty3 = useTransform(smy, [-0.5, 0.5], [-30, 30]);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  const layers = [
    { card: cards[0], x: tx1, y: ty1, className: "left-[4%] top-[14%] w-[56%] rotate-[-10deg] opacity-90" },
    { card: cards[1], x: tx2, y: ty2, className: "left-1/2 top-[2%] w-[62%] -translate-x-1/2 rotate-[-2deg] z-10" },
    { card: cards[2], x: tx3, y: ty3, className: "right-[2%] top-[22%] w-[54%] rotate-[8deg]" },
  ];

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", transformPerspective: 1200 }}
      className="relative hidden h-[520px] w-full md:block"
    >
      {/* Signature orb — Digital Activation 6 at Hero right column */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-[20%] -inset-y-[10%] z-0 opacity-80 mix-blend-screen"
      >
        <DigitalActivation6 className="h-full w-full" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in srgb, var(--color-accent) 22%, transparent), transparent 65%), radial-gradient(closest-side, color-mix(in srgb, var(--color-accent-mint) 18%, transparent), transparent 65%)",
          filter: "blur(60px)",
        }}
      />
      {layers.map((l, i) => (
        <motion.div
          key={l.card.src}
          style={{ x: l.x, y: l.y }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 + i * 0.14 }}
          className={`absolute z-[2] ${l.className}`}
        >
          <PhoneTile src={l.card.src} alt={l.card.alt} tag={l.card.tag} />
        </motion.div>
      ))}
    </motion.div>
  );
}

/**
 * Mobile showcase — single phone frame that rotates through the cards.
 * Fills the "empty right column" on narrow viewports so the hero doesn't
 * feel like a desktop layout shrunk.
 */
function MobileShowcase() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % cards.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative mx-auto mt-4 h-[320px] w-full max-w-[280px] md:hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-60 mix-blend-screen"
      >
        <DigitalActivation6 className="h-full w-full" />
      </div>
      <div className="relative z-[1] h-full w-full">
        {cards.map((c, i) => (
          <motion.div
            key={c.src}
            initial={false}
            animate={{
              opacity: i === active ? 1 : 0,
              scale: i === active ? 1 : 0.94,
              y: i === active ? 0 : 8,
            }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-0 w-[220px] -translate-x-1/2"
          >
            <PhoneTile src={c.src} alt={c.alt} tag={c.tag} />
          </motion.div>
        ))}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-2 z-[2] flex justify-center gap-1.5"
      >
        {cards.map((_, i) => (
          <span
            key={i}
            className="h-[3px] w-5 rounded-full transition-colors"
            style={{
              background:
                i === active
                  ? "var(--color-accent)"
                  : "color-mix(in srgb, var(--color-fg) 18%, transparent)",
              boxShadow:
                i === active ? "0 0 8px color-mix(in srgb, var(--color-accent) 70%, transparent)" : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function PhoneTile({ src, alt, tag }: { src: string; alt: string; tag: string }) {
  return (
    <div
      className="relative overflow-hidden rounded-[28px] border border-[var(--color-border-strong)] bg-[#0c0c10] p-1.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]"
      style={{ boxShadow: "0 40px 80px -30px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.04)" }}
    >
      <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[22px]">
        <Image src={src} alt={alt} fill sizes="300px" className="object-cover" />
      </div>
      <span className="pointer-events-none absolute left-3 top-3 rounded-[var(--radius-xs)] border border-[var(--color-border-strong)] bg-[color-mix(in_srgb,var(--color-bg)_70%,transparent)] px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--color-muted)]">
        {tag}
      </span>
    </div>
  );
}
