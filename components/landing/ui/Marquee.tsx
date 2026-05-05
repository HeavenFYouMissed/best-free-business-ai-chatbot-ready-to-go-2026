import { cn } from "@/components/landing/utils";

type MarqueeProps = {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  durationMs?: number;
  gap?: string;
};

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = true,
  children,
  vertical = false,
  repeat = 3,
  durationMs = 40000,
  gap = "2.5rem",
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden p-2",
        vertical ? "flex-col" : "flex-row",
        className,
      )}
      style={{ "--gap": gap, gap } as React.CSSProperties}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex shrink-0 items-center justify-around",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
          )}
          style={
            {
              gap,
              animation: `${
                vertical ? "ln-marquee-vertical" : "ln-marquee"
              } ${durationMs}ms linear infinite`,
              animationDirection: reverse ? "reverse" : "normal",
              "--gap": gap,
            } as React.CSSProperties
          }
        >
          {children}
        </div>
      ))}
    </div>
  );
}
