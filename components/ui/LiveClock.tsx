"use client";

import { useEffect, useState } from "react";

type Props = {
  /**
   * IANA timezone. Defaults to America/New_York (Daniel's home base).
   * Override when a component wants UTC or the viewer's local zone.
   */
  timeZone?: string;
  /** Include seconds. Default true. */
  showSeconds?: boolean;
  className?: string;
};

/**
 * Live ticking clock for drawer/chat status bars. Ticks once per second.
 * Returns an empty string on the first render so SSR and client agree,
 * then fills in once mounted.
 */
export function LiveClock({
  timeZone = "America/New_York",
  showSeconds = true,
  className,
}: Props) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    function tick() {
      const fmt = new Intl.DateTimeFormat("en-US", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        ...(showSeconds ? { second: "2-digit" } : {}),
        hour12: false,
      });
      setTime(fmt.format(new Date()));
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timeZone, showSeconds]);

  return (
    <span
      className={`num tabular-nums ${className ?? ""}`}
      suppressHydrationWarning
    >
      {time || "\u00a0\u00a0:\u00a0\u00a0:\u00a0\u00a0"}
    </span>
  );
}

export default LiveClock;
