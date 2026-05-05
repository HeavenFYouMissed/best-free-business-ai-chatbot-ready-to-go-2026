import Link from "next/link";

export function CoverNav() {
  return (
    <header className="flex flex-col gap-2 px-5 py-2.5 md:flex-row md:items-center md:justify-between md:gap-0 md:px-10 md:py-4 lg:px-16">
      <Link href="/" className="inline-flex shrink-0 items-baseline gap-1.5">
        <span className="text-[15px] font-semibold tracking-[-0.03em] text-[var(--color-fg)]">
          PUBLISHD
        </span>
        <span
          className="inline-block h-[5px] w-[5px] rounded-full bg-[var(--color-accent)]"
          aria-hidden="true"
        />
      </Link>
      <nav
        className="flex w-full items-center justify-between gap-1 md:w-auto md:justify-end md:gap-0.5 lg:gap-1"
        aria-label="Site navigation"
      >
        <Link
          href="/"
          className="rounded-md px-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-subtle)] transition-colors duration-200 hover:text-[var(--color-fg)] md:px-3 md:py-2 md:tracking-[0.16em] lg:text-[11px] lg:tracking-[0.18em]"
        >
          Home
        </Link>
        <Link
          href="/pricing"
          className="rounded-md px-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-subtle)] transition-colors duration-200 hover:text-[var(--color-fg)] md:px-3 md:py-2 md:tracking-[0.16em] lg:text-[11px] lg:tracking-[0.18em]"
        >
          Pricing
        </Link>
        <Link
          href="/kickoff"
          className="rounded-md px-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-subtle)] transition-colors duration-200 hover:text-[var(--color-fg)] md:px-3 md:py-2 md:tracking-[0.16em] lg:text-[11px] lg:tracking-[0.18em]"
        >
          Start
        </Link>
        <Link
          href="/site"
          className="rounded-md px-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-accent)] transition-colors duration-200 hover:text-[var(--color-fg)] md:px-3 md:py-2 md:tracking-[0.16em] lg:text-[11px] lg:tracking-[0.18em]"
        >
          Full Site
        </Link>
      </nav>
    </header>
  );
}
