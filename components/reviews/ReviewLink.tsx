import { Star, ArrowUpRight } from "lucide-react";

/**
 * Simple outbound link to the public Trustpilot review page for publishd.app.
 * Doesn't require the paid TrustBox widget — anyone can link to this URL.
 * If Daniel later upgrades to a paid Trustpilot plan, swap this for TrustBox.
 */
type Props = {
  variant?: "inline" | "cta";
  className?: string;
};

const REVIEW_URL = "https://www.trustpilot.com/evaluate/publishd.app";

export function ReviewLink({ variant = "inline", className }: Props) {
  if (variant === "cta") {
    return (
      <a
        href={REVIEW_URL}
        target="_blank"
        rel="noopener"
        className={`btn btn--glass inline-flex items-center gap-2 px-5 py-2.5 text-[13.5px] ${className ?? ""}`}
      >
        <Star className="icon h-4 w-4" aria-hidden />
        Leave a review on Trustpilot
        <ArrowUpRight className="icon h-4 w-4 opacity-80" aria-hidden />
      </a>
    );
  }

  return (
    <a
      href={REVIEW_URL}
      target="_blank"
      rel="noopener"
      className={`inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[color-mix(in_srgb,var(--color-fg)_70%,transparent)] transition-colors hover:text-[var(--color-fg)] ${className ?? ""}`}
    >
      <Star className="icon h-3.5 w-3.5" aria-hidden />
      Review on Trustpilot
      <ArrowUpRight className="icon h-3 w-3 opacity-70" aria-hidden />
    </a>
  );
}
