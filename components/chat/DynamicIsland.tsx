"use client";

import { AnimatePresence, motion } from "framer-motion";

type Props = {
  streaming: boolean;
};

/**
 * iPhone-style Dynamic Island — a solid-black pill at the top of the chat
 * panel. Idle = a single cyan LED dot. Streaming = the island expands + a
 * 3-dot matrix pulses inside it, with a soft cyan halo spreading outward.
 */
export function DynamicIsland({ streaming }: Props) {
  return (
    <motion.div
      aria-hidden
      initial={false}
      animate={{
        width: streaming ? 204 : 144,
        height: streaming ? 38 : 34,
      }}
      transition={{ type: "spring", stiffness: 360, damping: 28, mass: 0.6 }}
      className="relative mx-auto mt-[7px] flex items-center justify-center overflow-hidden rounded-full"
      style={{
        background: "#020305",
        /* A 1px cyan-tinted hairline reads clearly against both the bezel
           and the screen interior behind the pill. */
        boxShadow: streaming
          ? "0 0 0 1px color-mix(in srgb, var(--color-accent) 55%, transparent), 0 0 22px -4px color-mix(in srgb, var(--color-accent) 65%, transparent), inset 0 1px 0 rgba(255,255,255,0.05)"
          : "0 0 0 1px color-mix(in srgb, var(--color-accent) 22%, transparent), 0 2px 8px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {/* Halo when streaming */}
      <AnimatePresence>
        {streaming && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-none absolute -inset-6 rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, color-mix(in srgb, var(--color-accent) 55%, transparent), transparent 72%)",
              filter: "blur(10px)",
            }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-[1] flex items-center gap-[6px]">
        {streaming ? (
          <>
            <DotMatrix />
            <WaveForm />
          </>
        ) : (
          <IdleDot />
        )}
      </div>
    </motion.div>
  );
}

function IdleDot() {
  return (
    <motion.span
      initial={{ opacity: 0.7 }}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      className="h-[5px] w-[5px] rounded-full"
      style={{
        background: "var(--color-accent)",
        boxShadow:
          "0 0 8px color-mix(in srgb, var(--color-accent) 85%, transparent)",
      }}
    />
  );
}

function DotMatrix() {
  return (
    <div className="flex items-center gap-[3px]">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15,
          }}
          className="h-[4px] w-[4px] rounded-full"
          style={{
            background: "#c7f4ff",
            boxShadow:
              "0 0 6px color-mix(in srgb, var(--color-accent) 90%, transparent)",
          }}
        />
      ))}
    </div>
  );
}

function WaveForm() {
  const bars = [0.4, 0.7, 1, 0.8, 0.55, 0.35];
  return (
    <div className="flex items-center gap-[2px]">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          initial={{ scaleY: h }}
          animate={{ scaleY: [h, 1, h * 0.6, h] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.06,
          }}
          className="block w-[2px] origin-center rounded-full"
          style={{
            height: 14,
            background: "color-mix(in srgb, var(--color-accent) 90%, #ffffff)",
            boxShadow: "0 0 4px color-mix(in srgb, var(--color-accent) 80%, transparent)",
          }}
        />
      ))}
    </div>
  );
}

export default DynamicIsland;
