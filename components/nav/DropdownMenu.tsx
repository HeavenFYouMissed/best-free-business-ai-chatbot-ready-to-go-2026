"use client";

import dynamic from "next/dynamic";
import { useId, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { NavChild } from "@/data/nav";

const DrawerShader = dynamic(() => import("./DrawerShader"), { ssr: false });

type Props = {
  label: string;
  items: NavChild[];
};

export function DropdownMenu({ label, items }: Props) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const id = useId();

  function openNow() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }
  function closeSoon() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }

  return (
    <div
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onFocus={openNow}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) closeSoon();
      }}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex min-h-[40px] items-center gap-1.5 rounded-[var(--radius-sm)] px-2.5 py-2 text-[13.5px] font-medium transition-colors ${
          open
            ? "text-[var(--color-fg)]"
            : "text-[color-mix(in_srgb,var(--color-fg)_86%,transparent)] hover:text-[var(--color-fg)]"
        }`}
      >
        {label}
        <ChevronDown
          className={`icon h-[14px] w-[14px] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={id}
            role="menu"
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-[calc(100%+10px)] z-50 w-[min(440px,90vw)] -translate-x-1/2"
          >
            <div className="dropdown-panel relative overflow-hidden rounded-[var(--radius-lg)] border border-[color-mix(in_srgb,var(--color-accent)_22%,var(--color-border))] bg-[color-mix(in_srgb,#06080f_88%,transparent)] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9),0_0_0_1px_color-mix(in_srgb,var(--color-accent)_18%,transparent)] backdrop-blur-xl">
              {/* Low-opacity shader behind the content, only while open */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 z-0 opacity-[0.32] mix-blend-screen"
              >
                <DrawerShader />
              </span>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-[1]"
                style={{
                  background:
                    "linear-gradient(180deg, color-mix(in srgb, #06080f 70%, transparent), color-mix(in srgb, #06080f 92%, transparent))",
                }}
              />

              <div className="relative z-[2] flex items-center justify-between border-b border-[color-mix(in_srgb,var(--color-accent)_18%,var(--color-border))] px-3 py-2">
                <span className="mono-label !m-0 !p-0 before:hidden">[ {label.toLowerCase()} ]</span>
                <span
                  className="num text-[10.5px] uppercase tracking-[0.22em]"
                  style={{ color: "color-mix(in srgb, var(--color-accent) 75%, transparent)" }}
                >
                  ◆ publishd.app
                </span>
              </div>

              <ul className="relative z-[2] grid gap-0.5 p-1.5">
                {items.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1], delay: 0.04 + i * 0.035 }}
                  >
                    <Link
                      role="menuitem"
                      href={item.href}
                      className="drawer-row group/item relative flex items-start justify-between gap-3 overflow-hidden rounded-[var(--radius-md)] px-3 py-2.5 transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      <span className="relative z-[1] flex items-start gap-3">
                        <span className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: "color-mix(in srgb, var(--color-accent) 65%, transparent)" }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[13.5px] font-medium text-[var(--color-fg)]">{item.label}</span>
                          {item.description && (
                            <span className="mt-0.5 block text-[12px] leading-snug text-[var(--color-muted)]">
                              {item.description}
                            </span>
                          )}
                        </span>
                      </span>
                      {item.tag && (
                        <span
                          className="num relative z-[1] shrink-0 rounded-[var(--radius-xs)] border px-1.5 py-0.5 text-[11px] transition-colors"
                          style={{
                            borderColor: "color-mix(in srgb, var(--color-border) 92%, transparent)",
                            color: "var(--color-muted)",
                          }}
                        >
                          {item.tag}
                        </span>
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
