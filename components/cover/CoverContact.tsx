"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export function CoverContact() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      source: "cover-contact",
      name: data.get("name") as string,
      email: data.get("email") as string,
      message: data.get("message") as string,
    };

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Email daniel@publishd.app directly.");
      }
    } catch {
      setError("Connection failed. Email daniel@publishd.app directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      ref={ref}
      className="cover-contact px-5 pt-20 md:px-10 md:pt-28 lg:px-16"
      aria-label="Contact"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        className="rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-ink)_72%,transparent)] p-6 md:p-10"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[color-mix(in_srgb,var(--color-fg)_60%,transparent)]">
          Contact
        </span>
        <h2 className="mt-3 max-w-[20ch] text-[clamp(1.5rem,3.8vw,2.2rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-[var(--color-fg)]">
          Drop a line.
        </h2>
        <p className="mt-3 max-w-[44ch] text-[14px] leading-[1.65] text-[color-mix(in_srgb,var(--color-fg)_68%,transparent)]">
          Tell me what you need. I reply within 6 business hours — usually faster.
          Or email{" "}
          <a
            href="mailto:daniel@publishd.app"
            className="text-[var(--color-fg)] underline decoration-[color-mix(in_srgb,var(--color-accent)_60%,transparent)] underline-offset-4 transition-colors duration-200 hover:text-[var(--color-accent)]"
          >
            daniel@publishd.app
          </a>
          .
        </p>

        {submitted ? (
          <div className="mt-8 rounded-lg border border-[color-mix(in_srgb,var(--color-accent)_55%,var(--color-border))] bg-[color-mix(in_srgb,var(--color-accent)_8%,transparent)] p-5">
            <p className="text-[14px] font-semibold text-[var(--color-fg)]">Message sent.</p>
            <p className="mt-1.5 text-[13px] leading-[1.6] text-[color-mix(in_srgb,var(--color-fg)_70%,transparent)]">
              Reply in your inbox within 6 business hours.
            </p>
            <div className="mt-4 border-t border-[color-mix(in_srgb,var(--color-accent)_20%,transparent)] pt-4">
              <p className="text-[12px] text-[color-mix(in_srgb,var(--color-fg)_60%,transparent)]">
                Already worked together?
              </p>
              <a
                href="https://www.trustpilot.com/review/publishd.app"
                target="_blank"
                rel="noopener"
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md border border-[color-mix(in_srgb,#00b67a_35%,var(--color-border))] bg-[color-mix(in_srgb,#00b67a_7%,transparent)] px-3.5 py-3 text-center transition-colors duration-200 hover:border-[color-mix(in_srgb,#00b67a_65%,transparent)] hover:bg-[color-mix(in_srgb,#00b67a_12%,transparent)] sm:w-auto sm:justify-start sm:py-2"
              >
                <svg width="14" height="14" viewBox="0 0 128 128" fill="none" aria-hidden="true">
                  <rect width="128" height="128" rx="4" fill="#00b67a"/>
                  <polygon points="64,14 78.5,49.5 117,52 88,77 97.5,114 64,94 30.5,114 40,77 11,52 49.5,49.5" fill="white"/>
                </svg>
                <span className="font-mono text-[10.5px] font-semibold tracking-[0.1em] text-[#00b67a] sm:text-[11px]">
                  Leave a Trustpilot review
                </span>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-3.5">
            <div className="grid gap-3.5 sm:grid-cols-2">
              <input
                type="text"
                name="name"
                required
                placeholder="Name"
                aria-label="Your name"
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-[14px] text-[var(--color-fg)] placeholder:text-[color-mix(in_srgb,var(--color-fg)_45%,transparent)] transition-colors duration-200 focus:border-[var(--color-accent)] focus:outline-none"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                aria-label="Your email"
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-[14px] text-[var(--color-fg)] placeholder:text-[color-mix(in_srgb,var(--color-fg)_45%,transparent)] transition-colors duration-200 focus:border-[var(--color-accent)] focus:outline-none"
              />
            </div>
            <textarea
              name="message"
              required
              rows={4}
              placeholder="What do you need? App submission, website, AI chatbot, consulting…"
              aria-label="Your message"
              className="w-full resize-none rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-[14px] leading-[1.55] text-[var(--color-fg)] placeholder:text-[color-mix(in_srgb,var(--color-fg)_45%,transparent)] transition-colors duration-200 focus:border-[var(--color-accent)] focus:outline-none"
            />

            {error && (
              <p className="text-[12.5px] text-[var(--color-danger)]">{error}</p>
            )}

            <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center justify-center rounded-md bg-[var(--color-accent)] px-6 py-3 text-[14px] font-semibold text-[#001018] transition-all duration-200 hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
              >
                {sending ? "Sending…" : "Send message"}
              </button>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[color-mix(in_srgb,var(--color-fg)_45%,transparent)]">
                Reply in &lt; 6h
              </span>
            </div>
          </form>
        )}
      </motion.div>
    </section>
  );
}
