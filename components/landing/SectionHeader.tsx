import { AuroraText } from "@/components/landing/ui/AuroraText";
import { cn } from "@/components/landing/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  /** Word(s) inside `title` that should render as AuroraText. Case-sensitive substring match. */
  accentWord?: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  accentWord,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  const alignmentText = align === "center" ? "text-center" : "text-left";
  const alignmentItems = align === "center" ? "items-center" : "items-start";

  // Split title around accent word so we can wrap just that span in AuroraText.
  let titleNodes: React.ReactNode = title;
  if (accentWord && title.includes(accentWord)) {
    const [before, after] = title.split(accentWord);
    titleNodes = (
      <>
        {before}
        <AuroraText>{accentWord}</AuroraText>
        {after}
      </>
    );
  }

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-4 px-5 md:px-8",
        alignmentItems,
        alignmentText,
        className,
      )}
    >
      {eyebrow ? (
        <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
          [ {eyebrow} ]
        </span>
      ) : null}
      <h2 className="text-balance text-[clamp(2rem,5.2vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-[var(--color-fg)]">
        {titleNodes}
      </h2>
      {description ? (
        <p className="max-w-[64ch] text-balance text-[15.5px] leading-[1.7] text-[color-mix(in_srgb,var(--color-fg)_75%,transparent)] md:text-[17px]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
