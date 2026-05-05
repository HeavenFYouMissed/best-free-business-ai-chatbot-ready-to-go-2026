import { cn } from "@/components/landing/utils";

type OrbitingCirclesProps = {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  durationSec?: number;
  delaySec?: number;
  radius?: number;
  /** Starting angle 0–360. Children with different angles spread around the orbit. */
  angle?: number;
  showPath?: boolean;
};

export function OrbitingCircles({
  className,
  children,
  reverse = false,
  durationSec = 22,
  delaySec = 0,
  radius = 90,
  angle = 0,
  showPath = true,
}: OrbitingCirclesProps) {
  return (
    <>
      {showPath ? (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke="color-mix(in srgb, var(--color-fg) 14%, transparent)"
            strokeWidth={1}
            strokeDasharray="4 4"
          />
        </svg>
      ) : null}
      <div
        className={cn(
          "absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_85%,transparent)] backdrop-blur-md",
          className,
        )}
        style={
          {
            "--ln-angle": angle,
            "--ln-radius": radius,
            animation: `ln-orbit ${durationSec}s linear infinite`,
            animationDelay: `-${delaySec}s`,
            animationDirection: reverse ? "reverse" : "normal",
            transformOrigin: "center",
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </>
  );
}
