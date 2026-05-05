type Props = { index: string; label: string };

/**
 * Section label — accent-gradient number, animated underline sweep, live dot.
 * Pure CSS (runs ~20× per page, keeping it GPU-free).
 */
export function SectionLabel({ index, label }: Props) {
  return (
    <div className="section-label" role="presentation">
      <span className="section-label__dot" aria-hidden />
      <span className="section-label__bracket">[</span>
      <span className="section-label__num">{index}</span>
      <span className="section-label__slash">/</span>
      <span className="section-label__text">{label.toLowerCase()}</span>
      <span className="section-label__bracket">]</span>
      <span className="section-label__sweep" aria-hidden />
    </div>
  );
}
