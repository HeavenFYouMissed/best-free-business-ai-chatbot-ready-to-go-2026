"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { ChevronDown, Home, X } from "lucide-react";
import { navItems } from "@/data/nav";
import { useLenis } from "@/components/ui/LenisProvider";
import { ShipButton } from "@/components/ui/ShipButton";
import { LiveClock } from "@/components/ui/LiveClock";

const DrawerShader = dynamic(() => import("./DrawerShader"), { ssr: false });

type Props = { open: boolean; onClose: () => void };

function HomeLink({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const lenis = useLenis();
  return (
    <Link
      href="/"
      onClick={(e) => {
        if (pathname === "/") {
          e.preventDefault();
          onClose();
          setTimeout(() => {
            if (lenis) lenis.scrollTo(0, { duration: 1.0 });
            else window.scrollTo({ top: 0, behavior: "smooth" });
          }, 160);
          return;
        }
        onClose();
      }}
      className="mb-1 flex min-h-[48px] items-center gap-2 rounded-[var(--radius-md)] px-3 py-3 text-[15px] font-medium text-[var(--color-fg)] transition-colors hover:bg-[color-mix(in_srgb,var(--color-fg)_5%,transparent)]"
    >
      <Home className="icon" aria-hidden />
      Home
    </Link>
  );
}

/* Wrap the shared LiveClock with the drawer's styling. */
function DrawerClock() {
  return (
    <LiveClock className="text-[11px] tracking-[0.08em] text-[color-mix(in_srgb,var(--color-accent)_85%,white)]" />
  );
}

/**
 * Mobile navigation drawer.
 *
 * Below `md`: slides UP from the bottom as a sheet with a drag handle. This
 * matches native iOS/Android UI patterns.
 * On `md+` (rare — usually the nav shows full horizontal items above md):
 * slides in from the right.
 *
 * Either way, mounts a DigitalCube shader backdrop behind the content (only
 * while open) for a "digital panel" feel.
 */
export function MobileDrawer({ open, onClose }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsMobile(!mq.matches);
    const handler = () => setIsMobile(!mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* Lock background scroll without losing position. */
  useEffect(() => {
    if (!open) return;
    const body = document.body;
    const scrollY = window.scrollY;
    const prev = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
    };
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    return () => {
      body.style.overflow = prev.overflow;
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.left = prev.left;
      body.style.right = prev.right;
      body.style.width = prev.width;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  function onDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    if (info.offset.y > 110 || info.velocity.y > 500) {
      onClose();
    }
  }

  const sheetInitial = isMobile ? { y: "100%" } : { x: "100%" };
  const sheetAnimate = isMobile ? { y: 0 } : { x: 0 };
  const sheetExit = isMobile ? { y: "100%" } : { x: "100%" };

  /* z-index: above the chat FAB (z-[100]) and ChatPanel (z-[95]) so the orb
     doesn't peek through the drawer in the bottom-right corner. Still below
     the command palette (z-[120]) and easter egg (z-[140]).

     bg-transparent + backdrop-filter = real frosted glass. The site behind
     is visibly blurred through the panel; the DrawerShader overlay adds the
     cyan matrix-rain on top. */
  const sheetClass = isMobile
    ? "drawer-frost fixed inset-x-0 bottom-0 z-[108] flex h-[88dvh] max-h-[88dvh] flex-col overflow-hidden rounded-t-[22px] border-t border-[color-mix(in_srgb,var(--color-accent)_25%,var(--color-border))] pb-[env(safe-area-inset-bottom)]"
    : "drawer-frost fixed right-0 top-0 z-[108] flex h-dvh max-h-dvh w-[min(420px,92vw)] flex-col overflow-hidden border-l border-[var(--color-border)]";

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            aria-label="Close navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[104] bg-[color-mix(in_srgb,var(--color-bg)_60%,transparent)] backdrop-blur-sm"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Primary navigation"
            initial={sheetInitial}
            animate={sheetAnimate}
            exit={sheetExit}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            drag={isMobile ? "y" : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.25}
            onDragEnd={onDragEnd}
            className={sheetClass}
          >
            {/* Untransformed frost layer — Safari (desktop + iOS) cannot
                composite backdrop-filter on a transformed node, and the
                motion.aside carries transforms from framer-motion. So we
                delegate the blur to this plain div child. */}
            <div aria-hidden className="drawer-frost-layer" />

            {/* Cyan matrix-rain digital overlay — mounted only while the
                drawer is open. Screen-blended on top of the frosted aside so
                you see the site blurred behind + the falling data stream
                in the same layer. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-0 opacity-[0.55]"
              style={{ mixBlendMode: "screen" }}
            >
              <DrawerShader />
            </div>

            {/* Drag handle (mobile only) */}
            {isMobile && (
              <div className="relative z-[2] flex justify-center pb-1 pt-2.5">
                <span
                  aria-hidden
                  className="block h-[4px] w-10 rounded-full bg-[color-mix(in_srgb,var(--color-fg)_22%,transparent)]"
                />
              </div>
            )}

            <div className="relative z-[2] flex shrink-0 items-center justify-between border-b border-[var(--color-border)] px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="mono-label">[ menu ]</span>
                <DrawerClock />
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center rounded-[var(--radius-md)] border border-[var(--color-border)] text-[var(--color-fg)] transition-colors hover:border-[var(--color-border-strong)]"
              >
                <X className="icon" />
              </button>
            </div>

            <nav
              data-lenis-prevent
              data-lenis-prevent-touch
              data-lenis-prevent-wheel
              className="relative z-[2] min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-4"
              style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}
            >
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <HomeLink onClose={onClose} />
              </motion.div>

              <ul className="mt-2 grid gap-0.5">
                {navItems.map((item, idx) => {
                  const indexLabel = String(idx + 1).padStart(2, "0");
                  const itemDelay = 0.08 + idx * 0.045;

                  if (!item.children) {
                    const href = item.href ?? "/";
                    const isActive =
                      href.startsWith("/") && !href.startsWith("/#") && pathname === href;
                    return (
                      <motion.li
                        key={item.label}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: itemDelay }}
                      >
                        <Link
                          href={href}
                          onClick={onClose}
                          aria-current={isActive ? "page" : undefined}
                          className="drawer-row relative flex min-h-[48px] items-center gap-3 overflow-hidden rounded-[var(--radius-md)] px-3 py-3 text-[15px] font-medium text-[var(--color-fg)] transition-colors"
                          style={
                            isActive
                              ? {
                                  background:
                                    "linear-gradient(90deg, color-mix(in srgb, var(--color-accent) 14%, transparent), transparent 70%)",
                                }
                              : undefined
                          }
                        >
                          <span className="drawer-row-index font-mono text-[10.5px] uppercase tracking-[0.2em]" style={{ color: "color-mix(in srgb, var(--color-accent) 70%, transparent)" }}>
                            {indexLabel}
                          </span>
                          <span className="relative z-[1]">{item.label}</span>
                          {isActive && (
                            <span
                              aria-hidden
                              className="ml-auto h-[6px] w-[6px] rounded-full"
                              style={{
                                background: "var(--color-accent)",
                                boxShadow: "0 0 10px var(--color-accent)",
                                animation: "status-dot-pulse 3s ease-in-out infinite",
                              }}
                            />
                          )}
                        </Link>
                      </motion.li>
                    );
                  }
                  const isOpen = expanded === item.label;
                  return (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: itemDelay }}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setExpanded(isOpen ? null : item.label)}
                        className="drawer-row relative flex min-h-[48px] w-full items-center gap-3 overflow-hidden rounded-[var(--radius-md)] px-3 py-3 text-[15px] font-medium text-[var(--color-fg)] transition-colors"
                      >
                        <span className="drawer-row-index font-mono text-[10.5px] uppercase tracking-[0.2em]" style={{ color: "color-mix(in srgb, var(--color-accent) 70%, transparent)" }}>
                          {indexLabel}
                        </span>
                        <span className="relative z-[1] flex-1 text-left">{item.label}</span>
                        <ChevronDown
                          className={`relative z-[1] icon transition-transform ${isOpen ? "rotate-180" : ""}`}
                          aria-hidden
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="ml-[28px] border-l border-[color-mix(in_srgb,var(--color-accent)_24%,var(--color-border))] py-1 pl-3">
                              <ul>
                                {item.children.map((c, ci) => (
                                  <motion.li
                                    key={c.label}
                                    initial={{ opacity: 0, x: 8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1], delay: ci * 0.035 }}
                                  >
                                    <Link
                                      href={c.href}
                                      onClick={onClose}
                                      className="drawer-row relative flex min-h-[44px] items-start justify-between gap-3 overflow-hidden rounded-[var(--radius-sm)] px-3 py-2.5 text-[14px] text-[color-mix(in_srgb,var(--color-fg)_86%,transparent)] transition-colors"
                                    >
                                      <span className="relative z-[1]">
                                        <span className="block">{c.label}</span>
                                        {c.description && (
                                          <span className="mt-0.5 block text-[12px] text-[var(--color-muted)]">
                                            {c.description}
                                          </span>
                                        )}
                                      </span>
                                      {c.tag && (
                                        <span className="num relative z-[1] shrink-0 rounded-[var(--radius-xs)] border border-[var(--color-border)] px-1.5 py-0.5 text-[11px] text-[var(--color-muted)]">
                                          {c.tag}
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
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <div className="relative z-[2] shrink-0 border-t border-[color-mix(in_srgb,var(--color-accent)_20%,var(--color-border))] p-4 pb-[max(env(safe-area-inset-bottom),16px)]">
              {/* Terminal-style direct line row */}
              <div className="mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 font-mono text-[10.5px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
                <span style={{ color: "color-mix(in srgb, var(--color-accent) 75%, transparent)" }}>
                  [ direct line ]
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="mailto:daniel@publishd.app"
                    className="transition-colors hover:text-[var(--color-accent)]"
                  >
                    daniel@publishd.app
                  </a>
                  <span aria-hidden className="opacity-40">·</span>
                  <a
                    href="https://www.trustpilot.com/evaluate/publishd.app"
                    target="_blank"
                    rel="noopener"
                    className="transition-colors hover:text-[var(--color-accent)]"
                  >
                    $ review
                  </a>
                </div>
              </div>
              <ShipButton href="/site#pricing" size="large" className="w-full !justify-center" onClick={onClose}>
                Ship my app <span className="num">— $399</span>
              </ShipButton>
              {/* Editorial page marker */}
              <div className="mt-4 flex items-center justify-between text-[10.5px] font-mono uppercase tracking-[0.22em] text-[var(--color-subtle)]">
                <span>
                  <span style={{ color: "var(--color-accent)" }}>◆</span>
                  &nbsp;&nbsp;publishd.app
                </span>
                <DrawerClock />
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
