"use client";

type Props = { kind: "appstore" | "googleplay" };

export function PlatformBadge({ kind }: Props) {
  return (
    <div
      role="presentation"
      className="group grid h-20 w-36 place-items-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface)_60%,transparent)] px-3 transition-all duration-300 hover:border-[color-mix(in_srgb,var(--color-accent)_50%,var(--color-border))] hover:bg-[var(--color-surface)]"
      style={{
        boxShadow: "0 1px 0 0 rgba(255,255,255,0.03) inset",
      }}
    >
      {kind === "appstore" ? <AppStoreMark /> : <PlayMark />}
    </div>
  );
}

function AppStoreMark() {
  return (
    <svg
      width="110"
      height="30"
      viewBox="0 0 140 36"
      fill="none"
      aria-hidden
      className="text-[color-mix(in_srgb,var(--color-fg)_72%,transparent)] transition-colors group-hover:text-[var(--color-fg)]"
    >
      <path
        d="M23.5 10.6c-1.2 1.4-3.2 2.5-5 2.4-.2-1.8.7-3.7 1.9-4.8 1.3-1.3 3.3-2.3 5-2.4.2 1.9-.6 3.7-1.9 4.8zm1.9 2.9c-2.8-.2-5.1 1.6-6.5 1.6-1.4 0-3.3-1.5-5.5-1.5-2.9 0-5.6 1.7-7 4.3-3 5.2-.8 12.8 2.2 17 1.4 2.1 3.1 4.3 5.3 4.3 2.1-.1 2.9-1.4 5.5-1.4s3.3 1.4 5.5 1.3c2.3-.1 3.7-2.1 5.1-4.1.9-1.3 2.1-3.5 2.6-5.4-3-1.1-5.4-3.8-5.4-7.6 0-4.4 3.6-6.5 3.7-6.6-2-3.3-5.3-3.8-6.4-3.9z"
        fill="currentColor"
      />
      <g>
        <text
          x="44"
          y="14"
          fontFamily="ui-sans-serif, system-ui, -apple-system, sans-serif"
          fontSize="8"
          fill="currentColor"
          letterSpacing="0.08em"
        >
          DOWNLOAD ON THE
        </text>
        <text
          x="44"
          y="28"
          fontFamily="ui-sans-serif, system-ui, -apple-system, sans-serif"
          fontSize="14"
          fontWeight="600"
          fill="currentColor"
          letterSpacing="-0.01em"
        >
          App Store
        </text>
      </g>
    </svg>
  );
}

function PlayMark() {
  return (
    <svg
      width="110"
      height="30"
      viewBox="0 0 140 36"
      fill="none"
      aria-hidden
      className="text-[color-mix(in_srgb,var(--color-fg)_72%,transparent)] transition-colors group-hover:text-[var(--color-fg)]"
    >
      <g transform="translate(8,6)">
        <path d="M1 1v22l11-11L1 1z" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M1 1l19 11-19 11" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M12 12l8.5 4.8L24 14.7c1.8-1 1.8-2.6 0-3.6L20.5 9.2 12 12z" fill="currentColor" opacity="0.55" />
      </g>
      <g>
        <text
          x="44"
          y="14"
          fontFamily="ui-sans-serif, system-ui, -apple-system, sans-serif"
          fontSize="8"
          fill="currentColor"
          letterSpacing="0.08em"
        >
          GET IT ON
        </text>
        <text
          x="44"
          y="28"
          fontFamily="ui-sans-serif, system-ui, -apple-system, sans-serif"
          fontSize="14"
          fontWeight="600"
          fill="currentColor"
          letterSpacing="-0.01em"
        >
          Google Play
        </text>
      </g>
    </svg>
  );
}
