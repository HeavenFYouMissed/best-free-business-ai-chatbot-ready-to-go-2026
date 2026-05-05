import { memo } from "react";

import { cn } from "@/components/landing/utils";

type RippleProps = {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
  className?: string;
};

export const Ripple = memo(function Ripple({
  mainCircleSize = 220,
  mainCircleOpacity = 0.3,
  numCircles = 8,
  className,
}: RippleProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 select-none [mask-image:linear-gradient(to_bottom,white,transparent)]",
        className,
      )}
    >
      {Array.from({ length: numCircles }).map((_, i) => {
        const size = mainCircleSize + i * 70;
        const opacity = mainCircleOpacity - i * 0.03;
        const animationDelay = `${i * 0.08}s`;
        const borderStyle = i === numCircles - 1 ? "dashed" : "solid";
        return (
          <span
            key={i}
            className="absolute rounded-full border bg-[color-mix(in_srgb,var(--color-accent)_8%,transparent)]"
            style={{
              width: size,
              height: size,
              opacity: Math.max(opacity, 0),
              animation: "ln-ripple 3.4s ease-in-out infinite",
              animationDelay,
              borderStyle,
              borderWidth: 1,
              borderColor: `color-mix(in srgb, var(--color-accent) ${
                Math.max(40 - i * 4, 8)
              }%, transparent)`,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) scale(1)",
              boxShadow: i < 3
                ? "0 0 30px -8px color-mix(in srgb, var(--color-accent) 40%, transparent)"
                : undefined,
            }}
          />
        );
      })}
    </div>
  );
});
