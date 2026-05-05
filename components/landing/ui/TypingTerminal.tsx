"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/components/landing/utils";

type Line =
  | { kind: "input"; text: string }
  | { kind: "output"; text: string; tone?: "ok" | "warn" | "info" };

type TypingTerminalProps = {
  lines: Line[];
  className?: string;
  /** ms per character */
  speed?: number;
  /** ms pause between lines */
  linePause?: number;
  loop?: boolean;
  title?: string;
};

const TONE_CLASS = {
  ok: "text-[var(--color-accent-mint)]",
  warn: "text-[#ffb347]",
  info: "text-[color-mix(in_srgb,var(--color-fg)_72%,transparent)]",
} as const;

/**
 * Animated terminal/console — types each line character-by-character.
 * Lightweight: pure DOM + framer-motion. No canvas, no WebGL.
 * Pauses when offscreen via IntersectionObserver.
 */
export function TypingTerminal({
  lines,
  className,
  speed = 22,
  linePause = 320,
  loop = true,
  title = "publishd@app:~",
}: TypingTerminalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    if (!isInView) return;
    if (lineIdx >= lines.length) {
      if (loop) {
        const t = setTimeout(() => {
          setCompleted([]);
          setLineIdx(0);
          setCharIdx(0);
        }, 2400);
        return () => clearTimeout(t);
      }
      return;
    }
    const current = lines[lineIdx];
    if (charIdx < current.text.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), speed);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setCompleted((c) => [...c, current.text]);
      setLineIdx((i) => i + 1);
      setCharIdx(0);
    }, linePause);
    return () => clearTimeout(t);
  }, [charIdx, isInView, lineIdx, lines, loop, speed, linePause]);

  const currentLine = lines[lineIdx];
  const currentText = currentLine ? currentLine.text.slice(0, charIdx) : "";

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[#04060c] font-mono text-[12px] leading-[1.7]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_85%,transparent)] px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-2 truncate text-[10px] uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--color-fg)_55%,transparent)]">
          {title}
        </span>
      </div>
      <div className="min-h-[180px] space-y-1.5 px-4 py-3">
        {completed.map((text, i) => {
          const line = lines[i];
          if (!line) return null;
          if (line.kind === "input") {
            return (
              <div key={i} className="flex items-start gap-2">
                <span className="select-none text-[var(--color-accent)]">$</span>
                <span className="text-[color-mix(in_srgb,var(--color-fg)_92%,transparent)]">
                  {text}
                </span>
              </div>
            );
          }
          return (
            <div
              key={i}
              className={cn("pl-4", TONE_CLASS[line.tone ?? "info"])}
            >
              {text}
            </div>
          );
        })}
        {currentLine ? (
          <div className="flex items-start gap-2">
            {currentLine.kind === "input" ? (
              <span className="select-none text-[var(--color-accent)]">$</span>
            ) : null}
            <span
              className={cn(
                currentLine.kind === "input"
                  ? "text-[color-mix(in_srgb,var(--color-fg)_92%,transparent)]"
                  : cn("pl-4", TONE_CLASS[currentLine.tone ?? "info"]),
              )}
            >
              {currentText}
              <motion.span
                aria-hidden="true"
                className="ml-0.5 inline-block w-[6px] bg-[var(--color-accent)]"
                style={{ height: "1em", verticalAlign: "-2px" }}
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
              />
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
