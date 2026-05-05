"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type Direction = "bottom" | "left" | "right" | "scale";

type Props = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  from?: Direction;
  className?: string;
};

const dirClass: Record<Direction, string> = {
  bottom: "reveal--bottom",
  left: "reveal--left",
  right: "reveal--right",
  scale: "reveal--scale",
};

export function Reveal({ children, as, delay = 0, from = "bottom", className }: Props) {
  const Tag: ElementType = as ?? "div";
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.visible = "true";
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const TagAny: any = Tag;
  return (
    <TagAny
      ref={ref as React.RefObject<HTMLElement>}
      className={`reveal ${dirClass[from]} ${className ?? ""}`}
      style={{ ["--reveal-delay" as string]: `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </TagAny>
  );
}
