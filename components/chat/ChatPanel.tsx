"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Check, Mail, RotateCcw, X } from "lucide-react";
import { DynamicIsland } from "./DynamicIsland";
import { StatusBar } from "./StatusBar";
import { renderChatContent } from "./renderChatContent";

/**
 * Pearl iridescence overlay — renders as a low-opacity tint over the
 * CSS-frosted screen. The real frost (blur of the site behind) is handled
 * by `backdrop-filter` on `.chat-iphone-screen` in globals.css.
 */
const ChatPanelBackdrop = dynamic(
  () => import("./ChatPanelBackdrop").then((m) => m.ChatPanelBackdrop),
  { ssr: false }
);

type ChatMessage = { role: "user" | "assistant"; content: string };

const STORAGE_KEY = "publishd.chat.v1";
const EMAIL_KEY = "publishd.chat.email";
const SUGGESTIONS = [
  "How fast can you ship?",
  "What's included in $399?",
  "Do I need a Mac?",
  "Who owns the app?",
];

type Props = {
  open: boolean;
  onClose: () => void;
};

export function ChatPanel({ open, onClose }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [streamed, setStreamed] = useState(0);
  const [email, setEmail] = useState<string | null>(null);
  const [emailDraft, setEmailDraft] = useState("");
  const [dismissed, setDismissed] = useState(false);
  const [typed, setTyped] = useState("");
  const [summarySent, setSummarySent] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setMessages(JSON.parse(raw));
      const em = localStorage.getItem(EMAIL_KEY);
      if (em) setEmail(em);
    } catch {
      /* noop */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* noop */
    }
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, sending]);

  /* Typewriter empty-state readout */
  useEffect(() => {
    if (!open || messages.length !== 0) return;
    const full = "ready · ask me anything";
    let i = 0;
    setTyped("");
    const id = setInterval(() => {
      i += 1;
      setTyped(full.slice(0, i));
      if (i >= full.length) clearInterval(id);
    }, 48);
    return () => clearInterval(id);
  }, [open, messages.length]);

  const userTurns = useMemo(() => messages.filter((m) => m.role === "user").length, [messages]);
  const needsEmail = !email && userTurns >= 3;
  const lastMessage = messages[messages.length - 1];
  const streamingIndex =
    sending && lastMessage?.role === "assistant" ? messages.length - 1 : -1;

  async function handleSend(text?: string) {
    const content = (text ?? input).trim();
    if (!content || sending) return;
    if (!text) setInput("");

    const next = [...messages, { role: "user", content } as ChatMessage];
    setMessages(next);
    setSending(true);
    setStreamed(0);

    try {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next, email }),
        signal: controller.signal,
      });
      if (!res.body) throw new Error("No body");

      setMessages((m) => [...m, { role: "assistant", content: "" }]);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setStreamed((s) => s + chunk.length);
        setMessages((m) => {
          const clone = m.slice();
          const last = clone[clone.length - 1];
          if (last && last.role === "assistant") {
            clone[clone.length - 1] = { ...last, content: last.content + chunk };
          }
          return clone;
        });
      }
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Connection dropped on my end. Three options: **retry the message**, [email daniel@publishd.app](mailto:daniel@publishd.app?subject=Publishd%20%E2%80%94%20chat%20escape) directly, or [start a project intake](/built-for-you#start). I reply within 6 hours either way.",
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  async function captureEmail() {
    const value = emailDraft.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return;
    setEmail(value);
    try {
      localStorage.setItem(EMAIL_KEY, value);
    } catch {
      /* noop */
    }
    try {
      await fetch("/api/intake", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: value, transcript: messages, source: "chat" }),
      });
      setSummarySent(true);
      window.setTimeout(() => setSummarySent(false), 6000);
    } catch {
      /* noop */
    }
  }

  function resetChat() {
    abortRef.current?.abort();
    setMessages([]);
    setInput("");
    setSending(false);
    setStreamed(0);
    setDismissed(false);
    setEmailDraft("");
    setSummarySent(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* noop */
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-label="Publishd assistant"
          data-streaming={sending ? "true" : "false"}
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          className="chat-iphone fixed bottom-5 right-5 z-[95] flex h-[min(680px,82dvh)] w-[min(388px,calc(100vw-2.5rem))] flex-col md:bottom-6 md:right-6"
        >
          {/* Untransformed frost layer — has to be a separate element from
              the motion.div, because Safari (both desktop and iOS) refuses
              to composite backdrop-filter on a transformed node. This is
              what actually blurs the page behind the panel. */}
          <div aria-hidden className="chat-iphone-frost" />

          {/* Pearl iridescent tint overlay — low-opacity shader layer on top
              of the frost, screen-blended so pearl colors light up the
              frosted glass without blocking the blur beneath. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 opacity-[0.38]"
            style={{ mixBlendMode: "screen" }}
          >
            <ChatPanelBackdrop className="h-full w-full" />
          </span>

          {/* Neon paint wash while streaming */}
          <span aria-hidden className="chat-neon-wash pointer-events-none absolute inset-0 z-[1]" />

          {/* iPhone chrome: Dynamic Island + status bar */}
          <div className="relative z-[2] shrink-0">
            <DynamicIsland streaming={sending} />
            <StatusBar />
          </div>

          {/* Header strip — Apple-orb + label + close */}
          <div className="relative z-[2] flex shrink-0 items-center justify-between border-b border-[color-mix(in_srgb,#ffffff_15%,transparent)] px-4 py-2">
            <div className="flex items-center gap-2">
              <AppleOrbGlyph streaming={sending} />
              <span className="chat-header-label text-[12.5px] font-medium tracking-[0.02em]">
                Assistant
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={resetChat}
                  aria-label="New chat"
                  className="chat-close grid h-9 w-9 place-items-center rounded-full border border-[color-mix(in_srgb,#c7b4ff_22%,transparent)] text-[color-mix(in_srgb,#ffffff_86%,transparent)] transition-colors hover:border-[color-mix(in_srgb,#c7b4ff_55%,transparent)] hover:text-[#ffffff]"
                >
                  <RotateCcw className="icon h-3.5 w-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close chat"
                className="chat-close grid h-9 w-9 place-items-center rounded-full border border-[color-mix(in_srgb,#c7b4ff_22%,transparent)] text-[color-mix(in_srgb,#ffffff_86%,transparent)] transition-colors hover:border-[color-mix(in_srgb,#c7b4ff_55%,transparent)] hover:text-[#ffffff]"
              >
                <X className="icon h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Message area */}
          <div
            ref={scrollRef}
            data-lenis-prevent
            data-lenis-prevent-touch
            data-lenis-prevent-wheel
            className="relative z-[2] flex-1 overflow-y-auto px-4 py-4 text-[14px] leading-relaxed"
          >
            {messages.length === 0 && (
              <div className="space-y-4">
                <div className="font-mono text-[12px] uppercase tracking-[0.22em] text-[color-mix(in_srgb,#c7b4ff_92%,white)]">
                  <span className="mr-1 opacity-70">&gt;</span>
                  {typed}
                  <span className="chat-caret ml-0.5 inline-block align-[-2px]">_</span>
                </div>
                <p className="text-[13px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_86%,transparent)]">
                  Pricing, timelines, what&apos;s included, Apple rejections — anything.
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s, i) => (
                    <ChatChip key={s} label={s} index={i} onClick={() => void handleSend(s)} />
                  ))}
                </div>
              </div>
            )}

            <ul className="space-y-3">
              {messages.map((m, i) => (
                <MessageRow
                  key={i}
                  message={m}
                  streaming={i === streamingIndex}
                  streamedCount={i === streamingIndex ? streamed : -1}
                />
              ))}
            </ul>

            {needsEmail && !dismissed && (
              <EmailGate
                draft={emailDraft}
                onDraftChange={setEmailDraft}
                onSubmit={captureEmail}
                onDismiss={() => setDismissed(true)}
              />
            )}
          </div>

          {/* Summary-sent success pill */}
          <AnimatePresence>
            {summarySent && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="relative z-[2] mx-4 mb-1 flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,#7cf0d4_45%,transparent)] bg-[color-mix(in_srgb,#7cf0d4_12%,transparent)] px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-[color-mix(in_srgb,#c8ffed_92%,white)]"
              >
                <Check className="icon h-3 w-3" aria-hidden />
                summary en route · check your inbox
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input bar — frosted pill */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void handleSend();
            }}
            className="chat-input-bar relative z-[2] flex shrink-0 flex-wrap items-center gap-2 px-3 pb-4 pt-3"
          >
            <div className="chat-input-wrap relative flex min-w-0 flex-1 items-center">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={sending}
                placeholder="Ask anything…"
                className="chat-input chat-glass min-w-0 flex-1 rounded-full border border-[color-mix(in_srgb,#ffffff_18%,transparent)] px-4 py-3 text-[14px] text-[var(--color-fg)] outline-none placeholder:text-[color-mix(in_srgb,#ffffff_45%,transparent)]"
                autoComplete="off"
                spellCheck
              />
            </div>
            <button
              type="submit"
              aria-label="Send"
              disabled={sending || !input.trim()}
              className="chat-send group relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full text-white transition-[transform,opacity] active:scale-95 disabled:opacity-50"
            >
              <span
                aria-hidden
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, #9a3dfc 0%, #ff3b82 100%)",
                  boxShadow:
                    "0 6px 18px -4px color-mix(in srgb, #9a3dfc 60%, transparent), inset 0 1px 0 rgba(255,255,255,0.25)",
                }}
              />
              <ArrowUp className="icon relative z-[1] h-4 w-4" aria-hidden strokeWidth={2.6} />
            </button>
            {/* Zero-friction escape — always visible, wraps below on mobile */}
            <a
              href="mailto:daniel@publishd.app?subject=Publishd%20%E2%80%94%20direct%20line&body=Hey%20Daniel%2C%20your%20AI%20chat%20couldn%27t%20quite%20answer%20my%20question.%20Here%27s%20what%20I%20need%3A%0A%0A"
              className="chat-escape inline-flex basis-full items-center justify-center gap-1.5 rounded-full border border-[color-mix(in_srgb,#c7b4ff_22%,transparent)] bg-[color-mix(in_srgb,#ffffff_4%,transparent)] px-3 py-1.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.2em] text-[color-mix(in_srgb,#ffffff_72%,transparent)] transition-colors hover:border-[color-mix(in_srgb,#c7b4ff_55%,transparent)] hover:text-[#ffffff]"
            >
              <Mail className="icon h-3 w-3" aria-hidden />
              stuck? email daniel directly
            </a>
          </form>

          {/* Home indicator */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-[6px] z-[3] flex justify-center"
          >
            <span
              className="block h-[4px] w-[120px] rounded-full"
              style={{
                background: "color-mix(in srgb, #ffffff 40%, transparent)",
                boxShadow: "0 0 6px color-mix(in srgb, #ffffff 28%, transparent)",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================================================
   Apple-style orb header glyph
   ============================================================ */

function AppleOrbGlyph({ streaming }: { streaming: boolean }) {
  return (
    <span
      aria-hidden
      className="relative inline-block h-[18px] w-[18px] overflow-hidden rounded-full"
      style={{
        background:
          "conic-gradient(from var(--orb-angle, 0deg), #ff2d7c 0deg, #b847ff 90deg, #00d4ff 180deg, #7cf0d4 270deg, #ff2d7c 360deg)",
        animation: streaming
          ? "chat-orb-spin 2.4s linear infinite"
          : "chat-orb-spin 9s linear infinite",
        boxShadow:
          "0 0 10px color-mix(in srgb, #c7b4ff 55%, transparent), inset 0 0 4px rgba(255,255,255,0.4)",
      }}
    >
      <span
        className="absolute inset-[3px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,255,255,0.75), rgba(255,255,255,0.15) 55%, transparent 78%)",
        }}
      />
    </span>
  );
}

/* ============================================================
   Message row — iMessage pill, stagger, ripple spawn
   ============================================================ */

function MessageRow({
  message,
  streaming,
  streamedCount,
}: {
  message: ChatMessage;
  streaming: boolean;
  streamedCount: number;
}) {
  const isUser = message.role === "user";
  const [rippleKey, setRippleKey] = useState(0);

  useEffect(() => {
    setRippleKey((k) => k + 1);
  }, [message.role]);

  return (
    <motion.li
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className={`relative max-w-[86%] ${isUser ? "ml-auto" : "mr-auto"}`}
    >
      <span
        key={rippleKey}
        aria-hidden
        className={`msg-ripple ${isUser ? "msg-ripple--user" : "msg-ripple--bot"}`}
      />
      <div
        className={`chat-bubble ${
          isUser ? "chat-bubble--user" : "chat-bubble--bot"
        } relative px-3.5 py-2.5 text-[14px] leading-relaxed`}
      >
        {message.content ? (
          streaming && !isUser ? (
            <StreamingText content={message.content} streamedCount={streamedCount} />
          ) : (
            <div className="chat-msg-body">{renderChatContent(message.content)}</div>
          )
        ) : streaming ? (
          <StreamingDots />
        ) : null}
      </div>
    </motion.li>
  );
}

function StreamingText({
  content,
  streamedCount,
}: {
  content: string;
  streamedCount: number;
}) {
  /* Longer neon tail (24) so more characters are visibly lit at any moment. */
  const NEON_TAIL = 24;
  const lastNewline = content.lastIndexOf("\n");
  const safeSplit = Math.max(
    0,
    Math.min(content.length - NEON_TAIL, lastNewline + 1)
  );
  const settled = content.slice(0, safeSplit);
  const recent = content.slice(safeSplit);

  return (
    <span className="chat-msg-body">
      {settled && <span className="streaming-settled">{renderChatContent(settled)}</span>}
      {recent.split("").map((ch, i) => (
        <span
          key={`${streamedCount}-${safeSplit + i}`}
          className="neon-char"
          style={{ animationDelay: `${i * 16}ms` }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

function StreamingDots() {
  return (
    <span aria-label="Assistant is typing" className="inline-flex items-center gap-1.5 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0.3, scale: 0.8 }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
          transition={{
            duration: 1.1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.16,
          }}
          className="inline-block h-1.5 w-1.5 rounded-full"
          style={{
            background: "color-mix(in srgb, #c7b4ff 90%, white)",
            boxShadow: "0 0 6px color-mix(in srgb, #c7b4ff 78%, transparent)",
          }}
        />
      ))}
    </span>
  );
}

/* ============================================================
   Pearl chat chip (renamed visual class)
   ============================================================ */

function ChatChip({
  label,
  index,
  onClick,
}: {
  label: string;
  index: number;
  onClick: () => void;
}) {
  const delay = (index * 0.47) % 9;
  const duration = 9 + ((index * 1.13) % 6);
  return (
    <button
      type="button"
      onClick={onClick}
      className="chat-chip relative inline-flex shrink-0 items-center overflow-hidden rounded-full border border-[color-mix(in_srgb,#ffffff_18%,transparent)] bg-[color-mix(in_srgb,#ffffff_6%,transparent)] pl-3 pr-3 py-1.5 text-left text-[12.5px] font-medium tracking-tight text-[color-mix(in_srgb,#ffffff_92%,transparent)] backdrop-blur-sm transition-[border-color,color,transform] duration-200 hover:border-[color-mix(in_srgb,#c7b4ff_55%,transparent)] hover:text-[#ffffff] active:scale-[0.98]"
    >
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-[2px] rounded-full"
        style={{
          background: "color-mix(in srgb, #c7b4ff 65%, transparent)",
          animation: `pill-bar-pulse ${duration}s ease-in-out ${delay}s infinite`,
        }}
      />
      <span className="relative z-[1] pl-1.5">{label}</span>
    </button>
  );
}

/* ============================================================
   Email gate — frosted card with corner brackets + purple send
   ============================================================ */

function EmailGate({
  draft,
  onDraftChange,
  onSubmit,
  onDismiss,
}: {
  draft: string;
  onDraftChange: (s: string) => void;
  onSubmit: () => void;
  onDismiss: () => void;
}) {
  return (
    <div className="chat-glass relative mt-5 overflow-hidden rounded-[var(--radius-sm)] border border-[color-mix(in_srgb,#c7b4ff_28%,transparent)] p-4">
      <span aria-hidden className="ship-btn-brackets pointer-events-none absolute inset-[6px]" />
      <div
        className="mono-label !m-0 !p-0 before:hidden"
        style={{ color: "color-mix(in srgb, #c7b4ff 95%, white)" }}
      >
        [ gate · optional ]
      </div>
      <p className="mt-2 text-[13px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_88%,transparent)]">
        Drop your email and I&apos;ll send a summary of this thread plus a pricing breakdown.
      </p>
      <div className="mt-3 flex flex-wrap items-stretch gap-2">
        <input
          type="email"
          inputMode="email"
          value={draft}
          onChange={(e) => onDraftChange(e.target.value)}
          placeholder="you@domain.com"
          className="chat-input chat-glass min-w-0 flex-1 basis-40 rounded-full border border-[color-mix(in_srgb,#ffffff_18%,transparent)] px-4 py-2.5 text-[13.5px] text-[var(--color-fg)] outline-none placeholder:text-[color-mix(in_srgb,#ffffff_42%,transparent)]"
        />
        <button
          type="button"
          onClick={onSubmit}
          className="chat-send-mini inline-flex items-center justify-center rounded-full px-4 py-2.5 text-[12.5px] font-semibold text-white"
          style={{
            background: "linear-gradient(135deg, #9a3dfc 0%, #ff3b82 100%)",
            boxShadow:
              "0 6px 18px -4px color-mix(in srgb, #9a3dfc 60%, transparent), inset 0 1px 0 rgba(255,255,255,0.25)",
          }}
        >
          Send summary
        </button>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="mt-3 text-[11.5px] font-mono uppercase tracking-[0.2em] text-[color-mix(in_srgb,#ffffff_55%,transparent)] underline underline-offset-[5px] hover:text-[#ffffff]"
      >
        no thanks · just chatting
      </button>
    </div>
  );
}
