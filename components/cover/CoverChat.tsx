"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

const MAX_MESSAGES = 20;

export function CoverChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [failed, setFailed] = useState(false);
  const [stickToBottom, setStickToBottom] = useState(true);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Track whether user is near the bottom; if they scroll up, release the auto-stick.
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
    setStickToBottom(distance < 32);
  };

  // Auto-scroll to bottom on new tokens, only when sticky.
  useLayoutEffect(() => {
    if (!stickToBottom) return;
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, streaming, stickToBottom]);

  const jumpToLatest = () => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    setStickToBottom(true);
  };

  const stop = useCallback(() => {
    abortRef.current?.abort();
    setStreaming(false);
  }, []);

  const send = useCallback(
    async (text: string) => {
      if (!text.trim() || streaming) return;
      if (messages.length >= MAX_MESSAGES) return;

      const userMsg: Message = { role: "user", content: text.trim() };
      const next = [...messages, userMsg];
      setMessages(next);
      setInput("");
      setStreaming(true);
      setFailed(false);
      setStickToBottom(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ messages: next }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          setFailed(true);
          setStreaming(false);
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";

        setMessages([...next, { role: "assistant", content: "" }]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          accumulated += decoder.decode(value, { stream: true });
          setMessages([...next, { role: "assistant", content: accumulated }]);
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setFailed(true);
        }
      } finally {
        setStreaming(false);
        abortRef.current = null;
      }
    },
    [messages, streaming],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const handleSuggestion = (text: string) => {
    send(text);
  };

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const suggestions = [
    "What do you build?",
    "How fast can you ship?",
    "What does $399 get me?",
  ];

  const lastIsAssistant = messages[messages.length - 1]?.role === "assistant";
  const lastAssistantEmpty =
    lastIsAssistant && messages[messages.length - 1].content.length === 0;

  return (
    <section className="cover-chat relative w-full" aria-label="Ask anything about Publishd">
      {/* Suggestions (only when empty) */}
      {messages.length === 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => handleSuggestion(s)}
              className="group rounded-full border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_60%,transparent)] px-3.5 py-1.5 font-mono text-[11px] tracking-wide text-[color-mix(in_srgb,var(--color-fg)_75%,transparent)] transition-all duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-fg)] hover:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-accent)_15%,transparent)]"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Message stream */}
      {messages.length > 0 && (
        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="cover-chat-scroll mb-3 max-h-[320px] space-y-3 overflow-y-auto rounded-lg border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_55%,transparent)] p-4 md:max-h-[400px]"
          >
            {messages.map((m, i) => {
              const isUser = m.role === "user";
              const isLastAssistant = !isUser && i === messages.length - 1;
              return (
                <div
                  key={i}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[14px] leading-[1.6] ${
                      isUser
                        ? "bg-[color-mix(in_srgb,var(--color-accent)_18%,var(--color-surface))] text-[var(--color-fg)] border border-[color-mix(in_srgb,var(--color-accent)_45%,transparent)]"
                        : "bg-[var(--color-ink)] text-[color-mix(in_srgb,var(--color-fg)_92%,transparent)] border border-[var(--color-border)]"
                    }`}
                    style={
                      isLastAssistant && streaming
                        ? {
                            boxShadow:
                              "0 0 0 1px color-mix(in srgb, var(--color-accent) 35%, transparent), 0 0 24px -6px color-mix(in srgb, var(--color-accent) 45%, transparent)",
                          }
                        : undefined
                    }
                  >
                    <span className="mr-2 inline-block font-mono text-[9.5px] uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--color-fg)_45%,transparent)]">
                      {isUser ? "you" : "publishd"}
                    </span>
                    {isLastAssistant && lastAssistantEmpty && streaming ? (
                      <TypingDots />
                    ) : (
                      <span className="whitespace-pre-wrap">{m.content}</span>
                    )}
                    {isLastAssistant && streaming && m.content.length > 0 && (
                      <span
                        aria-hidden
                        className="ml-0.5 inline-block h-[14px] w-[2px] translate-y-[2px] bg-[var(--color-accent)]"
                        style={{ animation: "blink 1s step-end infinite" }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Jump-to-latest pill */}
          {!stickToBottom && (
            <button
              type="button"
              onClick={jumpToLatest}
              className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 rounded-full border border-[var(--color-accent)] bg-[color-mix(in_srgb,var(--color-bg)_85%,transparent)] px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-[var(--color-accent)] backdrop-blur-md transition-all duration-200 hover:bg-[color-mix(in_srgb,var(--color-accent)_15%,transparent)]"
            >
              ↓ Latest
            </button>
          )}
        </div>
      )}

      {failed && (
        <p className="mb-3 text-[12.5px] text-[var(--color-danger)]">
          Connection failed — email{" "}
          <a href="mailto:daniel@publishd.app" className="underline">
            daniel@publishd.app
          </a>{" "}
          for a direct reply.
        </p>
      )}

      {messages.length >= MAX_MESSAGES ? (
        <p className="text-[12.5px] text-[color-mix(in_srgb,var(--color-fg)_55%,transparent)]">
          Session limit reached.{" "}
          <a
            href="mailto:daniel@publishd.app"
            className="text-[var(--color-accent)] underline"
          >
            Email Daniel directly
          </a>{" "}
          for more.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="relative">
          {/* Animated gradient halo on focus */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-[1px] rounded-[10px] opacity-0 transition-opacity duration-300 [.has-focus_&]:opacity-100"
            style={{
              background:
                "linear-gradient(120deg, color-mix(in srgb, var(--color-accent) 60%, transparent), color-mix(in srgb, var(--color-accent-mint) 50%, transparent), color-mix(in srgb, var(--color-accent) 60%, transparent))",
              backgroundSize: "200% 200%",
              animation: "shimmer 4s linear infinite",
              filter: "blur(6px)",
            }}
          />

          <div
            className={`relative flex items-center gap-2 rounded-[10px] border bg-[var(--color-ink)] transition-colors duration-200 ${
              streaming
                ? "border-[color-mix(in_srgb,var(--color-accent)_55%,transparent)]"
                : "border-[var(--color-border)] focus-within:border-[var(--color-accent)]"
            }`}
            style={
              streaming
                ? {
                    boxShadow:
                      "0 0 0 3px color-mix(in srgb, var(--color-accent) 15%, transparent), 0 0 24px -8px color-mix(in srgb, var(--color-accent) 55%, transparent)",
                  }
                : undefined
            }
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={streaming ? "Generating…" : "Ask about pricing, timelines, anything"}
              disabled={streaming}
              aria-label="Message"
              className="w-full bg-transparent px-4 py-3.5 text-[14px] text-[var(--color-fg)] placeholder:text-[color-mix(in_srgb,var(--color-fg)_38%,transparent)] focus:outline-none disabled:opacity-70"
            />

            {streaming ? (
              <button
                type="button"
                onClick={stop}
                aria-label="Stop generating"
                className="mr-1.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[color-mix(in_srgb,var(--color-accent)_50%,transparent)] bg-[color-mix(in_srgb,var(--color-accent)_15%,transparent)] text-[var(--color-accent)] transition-colors duration-150 hover:bg-[color-mix(in_srgb,var(--color-accent)_25%,transparent)]"
              >
                <span aria-hidden className="h-3 w-3 rounded-[2px] bg-[var(--color-accent)]" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Send message"
                className="mr-1.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[var(--color-accent)] text-[color-mix(in_srgb,var(--color-bg)_85%,#000)] transition-all duration-150 hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:bg-[color-mix(in_srgb,var(--color-fg)_15%,transparent)] disabled:text-[color-mix(in_srgb,var(--color-fg)_45%,transparent)]"
              >
                <SendArrow />
              </button>
            )}
          </div>
        </form>
      )}

      {messages.length === 0 && (
        <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--color-fg)_42%,transparent)]">
          Streams in real time · Press Enter to send
        </p>
      )}
    </section>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 align-middle">
      <Dot delay="0s" />
      <Dot delay="0.18s" />
      <Dot delay="0.36s" />
    </span>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      aria-hidden
      className="inline-block h-[6px] w-[6px] rounded-full bg-[var(--color-accent)]"
      style={{
        animation: "chat-bounce 1.1s ease-in-out infinite",
        animationDelay: delay,
      }}
    />
  );
}

function SendArrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 19V5" />
      <path d="m6 11 6-6 6 6" />
    </svg>
  );
}
