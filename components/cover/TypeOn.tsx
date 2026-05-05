"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Props = {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
};

export function TypeOn({ text, speed = 38, delay = 0, className = "", onComplete }: Props) {
  const [visible, setVisible] = useState(0);
  const [started, setStarted] = useState(false);
  const completedRef = useRef(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setVisible(text.length);
      onComplete?.();
      return;
    }
    if (delay <= 0) {
      setStarted(true);
      return;
    }
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay, reduce, text.length, onComplete]);

  useEffect(() => {
    if (reduce) return;
    if (!started) return;
    if (visible >= text.length) {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete?.();
      }
      return;
    }

    const char = text[visible];
    const pause = /[.,;:]/.test(char) ? speed * 3 : speed;

    const t = setTimeout(() => setVisible((v) => v + 1), pause);
    return () => clearTimeout(t);
  }, [visible, started, text, speed, onComplete, reduce]);

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">
        {text.slice(0, visible)}
        {visible < text.length && (
          <span className="inline-block w-[2px] h-[1em] align-[-0.15em] bg-[var(--color-accent)] animate-[blink_1s_step-end_infinite] ml-[1px]" />
        )}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
