"use client";

import { LiveClock } from "@/components/ui/LiveClock";

/**
 * iOS-style status bar inside the chat panel chrome.
 * Left: live clock.  Right: signal dots + label + battery.
 * Everything rendered in cyan to tie into the accent palette.
 */
export function StatusBar() {
  return (
    <div
      aria-hidden
      className="relative flex items-center justify-between px-5 pb-2 pt-[6px] font-mono text-[10.5px] font-medium uppercase tracking-[0.18em]"
      style={{ color: "color-mix(in srgb, var(--color-accent) 88%, white)" }}
    >
      <LiveClock className="!tracking-[0.14em]" showSeconds={false} />
      <div className="flex items-center gap-2">
        <SignalBars />
        <span className="tracking-[0.28em]">5G</span>
        <Battery />
      </div>
    </div>
  );
}

function SignalBars() {
  const heights = [3, 5, 7, 9];
  return (
    <div className="flex items-end gap-[2px]">
      {heights.map((h, i) => (
        <span
          key={i}
          className="block w-[2px] rounded-[0.5px]"
          style={{
            height: h,
            background:
              "color-mix(in srgb, var(--color-accent) 85%, white)",
            boxShadow: "0 0 2px color-mix(in srgb, var(--color-accent) 70%, transparent)",
          }}
        />
      ))}
    </div>
  );
}

function Battery() {
  return (
    <span
      className="relative inline-flex items-center"
      style={{
        width: 22,
        height: 10,
      }}
    >
      <span
        className="block h-full w-full rounded-[2px] border"
        style={{
          borderColor: "color-mix(in srgb, var(--color-accent) 75%, transparent)",
          borderWidth: 1,
        }}
      />
      <span
        className="absolute left-[1.5px] top-[1.5px] block rounded-[1px]"
        style={{
          width: 15,
          height: 7,
          background: "color-mix(in srgb, var(--color-accent) 88%, white)",
          boxShadow: "0 0 4px color-mix(in srgb, var(--color-accent) 50%, transparent)",
        }}
      />
      <span
        className="absolute"
        style={{
          right: -2,
          top: 3,
          width: 1.5,
          height: 4,
          background: "color-mix(in srgb, var(--color-accent) 75%, transparent)",
          borderRadius: 1,
        }}
      />
    </span>
  );
}

export default StatusBar;
