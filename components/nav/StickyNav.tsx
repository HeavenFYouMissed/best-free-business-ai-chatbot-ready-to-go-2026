"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Logo } from "./Logo";
import { DropdownMenu } from "./DropdownMenu";
import { MobileDrawer } from "./MobileDrawer";
import { MenuGlyph } from "./MenuGlyph";
import { ShipButton } from "@/components/ui/ShipButton";
import { CHAT_OPEN_EVENT } from "@/components/chat/ChatWidget";
import { navItems } from "@/data/nav";

export function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuHover, setMenuHover] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          paddingBlock: scrolled ? 10 : 16,
        }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className={`sticky top-0 z-50 w-full pt-[env(safe-area-inset-top)] transition-colors duration-300 ${
          scrolled
            ? "glass border-b border-[var(--color-border)]"
            : "border-b border-transparent bg-[color-mix(in_srgb,var(--color-bg)_85%,transparent)] backdrop-blur-[10px]"
        }`}
      >
        <nav className="container-x flex items-center justify-between gap-3" aria-label="Primary">
          <Logo />

          <ul className="hidden items-center gap-0.5 md:flex">
            {navItems.map((item) =>
              item.children ? (
                <li key={item.label}>
                  <DropdownMenu label={item.label} items={item.children} />
                </li>
              ) : (() => {
                const href = item.href ?? "/";
                const isActive =
                  href.startsWith("/") && !href.startsWith("/#") && pathname === href;
                return (
                  <li key={item.label}>
                    <Link
                      href={href}
                      aria-current={isActive ? "page" : undefined}
                      className={`relative inline-flex min-h-[40px] items-center gap-1.5 rounded-[var(--radius-sm)] px-2.5 py-2 text-[13.5px] font-medium transition-colors ${
                        isActive
                          ? "text-[var(--color-fg)]"
                          : "text-[color-mix(in_srgb,var(--color-fg)_86%,transparent)] hover:text-[var(--color-fg)]"
                      }`}
                    >
                      {isActive && (
                        <span
                          aria-hidden
                          className="h-[5px] w-[5px] rounded-full"
                          style={{
                            background: "var(--color-accent)",
                            boxShadow: "0 0 8px var(--color-accent)",
                            animation: "status-dot-pulse 3s ease-in-out infinite",
                          }}
                        />
                      )}
                      {item.label}
                      {isActive && (
                        <span
                          aria-hidden
                          className="absolute inset-x-2.5 -bottom-0.5 h-px"
                          style={{
                            background:
                              "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-accent) 70%, transparent), transparent)",
                          }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })()
            )}
          </ul>

          <div className="flex items-center gap-2">
            {/* AI launcher — homepage only. The (cover) layout hides the
                floating chat FAB on `/` because it overlapped the mobile
                sticky CTA + the closing Spline scene. This button takes
                its place and fires the same panel-open event. */}
            {pathname === "/" ? (
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event(CHAT_OPEN_EVENT))}
                aria-label="Ask the AI assistant"
                className="group relative inline-flex h-10 items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 text-[12.5px] font-semibold tracking-tight text-white backdrop-blur-md transition-all duration-200 hover:border-[color-mix(in_srgb,var(--color-accent)_55%,transparent)] hover:bg-white/10 active:scale-[0.97]"
              >
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)]"
                />
                <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
                  AI
                </span>
                <span className="hidden sm:inline">Ask anything</span>
              </button>
            ) : null}
            <ShipButton href="/site#pricing" size="compact" className="hidden xs:inline-flex sm:inline-flex">
              <span className="hidden sm:inline">Ship my app</span>
              <span className="sm:hidden">Ship it</span>
              <span aria-hidden>→</span>
            </ShipButton>
            <button
              type="button"
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              onPointerEnter={() => setMenuHover(true)}
              onPointerLeave={() => setMenuHover(false)}
              className="group relative grid h-11 w-11 place-items-center overflow-hidden rounded-[var(--radius-md)] border border-white/10 bg-[color-mix(in_srgb,#0a0e18_72%,transparent)] text-[var(--color-fg)] transition-all active:scale-95 md:hidden"
            >
              <MenuGlyph open={open} hovered={menuHover} />
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
