// Startup template — components/magicui/text-shimmer.tsx (verbatim, retargeted)
import { CSSProperties, FC, ReactNode } from "react";
import { cn } from "@/components/landing/utils";

interface TextShimmerProps {
  children: ReactNode;
  className?: string;
  shimmerWidth?: number;
}

const TextShimmer: FC<TextShimmerProps> = ({
  children,
  className,
  shimmerWidth = 100,
}) => {
  return (
    <span
      style={
        {
          "--shimmer-width": `${shimmerWidth}px`,
        } as CSSProperties
      }
      className={cn(
        "mx-auto max-w-md text-white/55",
        // Shimmer effect uses the .animate-shimmer-slide keyframe added in globals.css
        "animate-shimmer-slide bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shimmer-width)_100%]",
        // Shimmer gradient
        "bg-gradient-to-r from-transparent via-white/95 via-50% to-transparent",
        className,
      )}
    >
      {children}
    </span>
  );
};

export default TextShimmer;
