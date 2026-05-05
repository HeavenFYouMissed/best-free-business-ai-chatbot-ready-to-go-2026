"use client";

import { memo, type ReactNode } from "react";

import { cn } from "@/components/landing/utils";

type AuroraTextProps = {
  children: ReactNode;
  className?: string;
  colors?: string[];
  speed?: number;
};

/**
 * Animated multi-color gradient text. Cycles through the brand palette.
 * Set CSS vars `--color-1` through `--color-5` in globals.css to match brand.
 */
export const AuroraText = memo(function AuroraText({
  children,
  className,
  colors = [
    "var(--color-1)",
    "var(--color-2)",
    "var(--color-3)",
    "var(--color-4)",
    "var(--color-5)",
  ],
  speed = 1,
}: AuroraTextProps) {
  const gradientStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(135deg, ${colors.join(", ")}, ${colors[0]})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    color: "transparent",
    animationDuration: `${10 / speed}s`,
  };

  return (
    <span className={cn("relative inline-block", className)}>
      <span className="sr-only">{children}</span>
      <span
        aria-hidden="true"
        className="relative animate-aurora-text bg-[length:200%_auto]"
        style={gradientStyle}
      >
        {children}
      </span>
    </span>
  );
});
