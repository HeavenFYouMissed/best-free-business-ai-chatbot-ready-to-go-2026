"use client";

import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Small, focused markdown renderer for the chat.
 *
 * Handles the subset the Anthropic/Groq models actually produce in our
 * system prompt: **bold**, `inline code`, [label](url), `- ` bullet lists,
 * `1. ` numbered lists, and blank-line paragraphs. Everything is rendered
 * as real React nodes — no `dangerouslySetInnerHTML`, no markdown deps.
 *
 * Intentionally tiny. If the bot ever needs headings or blockquotes we can
 * grow this; for now it solves the "literal ** showing up" bug.
 */
export function renderChatContent(content: string): ReactNode {
  if (!content) return null;

  /* Split into blocks on double newline, keep any list block intact. */
  const blocks = content.replace(/\r\n/g, "\n").split(/\n{2,}/);
  return blocks.map((block, i) => <Block key={i} text={block} />);
}

function Block({ text }: { text: string }) {
  const lines = text.split("\n");

  /* Detect a list block: every non-blank line starts with a bullet or number. */
  const isListBlock =
    lines.length > 0 &&
    lines.every((l) => /^\s*([-*•]|\d+\.)\s+/.test(l) || l.trim() === "");

  if (isListBlock) {
    const items = lines
      .filter((l) => l.trim().length > 0)
      .map((l) => l.replace(/^\s*([-*•]|\d+\.)\s+/, ""));
    return (
      <ul className="chat-md-list my-2 space-y-1 pl-1">
        {items.map((it, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span
              aria-hidden
              className="mt-[9px] inline-block h-[5px] w-[5px] shrink-0 rounded-full"
              style={{
                background: "color-mix(in srgb, var(--color-accent) 85%, white)",
                boxShadow: "0 0 4px color-mix(in srgb, var(--color-accent) 70%, transparent)",
              }}
            />
            <span>{renderInline(it)}</span>
          </li>
        ))}
      </ul>
    );
  }

  /* Paragraph — preserve single newlines as <br/>. */
  return (
    <p className="my-1 leading-relaxed">
      {lines.map((line, i) => (
        <span key={i}>
          {renderInline(line)}
          {i < lines.length - 1 && <br />}
        </span>
      ))}
    </p>
  );
}

/* Inline tokens: **bold**, *em*, `code`, [label](href), bare URLs. */
function renderInline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let key = 0;

  /**
   * We scan the string and at each position test which token (if any)
   * starts here; longest-match wins so `**foo**` beats `*foo*`.
   */
  let i = 0;
  while (i < text.length) {
    /* Bold: **...** */
    const boldOpen = text.indexOf("**", i);
    /* Italic: *...* (single asterisk, not part of **) */
    const italicMatch = /\*([^*\n]+)\*/.exec(text.slice(i));
    /* Inline code: `...` */
    const codeMatch = /`([^`\n]+)`/.exec(text.slice(i));
    /* Markdown link: [label](url) */
    const linkMatch = /\[([^\]\n]+)\]\(([^)\s]+)\)/.exec(text.slice(i));
    /* Bare URL: http(s)://... */
    const urlMatch = /https?:\/\/[^\s)]+/.exec(text.slice(i));

    /* Find the earliest hit relative to `i`. */
    const candidates: { pos: number; kind: string; match: RegExpExecArray | number }[] = [];
    if (boldOpen !== -1) {
      const closeRel = text.indexOf("**", boldOpen + 2);
      if (closeRel !== -1) {
        candidates.push({ pos: boldOpen - i, kind: "bold", match: boldOpen });
      }
    }
    if (italicMatch && !startsWithDouble(text, i + italicMatch.index)) {
      candidates.push({ pos: italicMatch.index, kind: "italic", match: italicMatch });
    }
    if (codeMatch) candidates.push({ pos: codeMatch.index, kind: "code", match: codeMatch });
    if (linkMatch) candidates.push({ pos: linkMatch.index, kind: "link", match: linkMatch });
    if (urlMatch) candidates.push({ pos: urlMatch.index, kind: "url", match: urlMatch });

    if (candidates.length === 0) {
      out.push(<span key={key++}>{text.slice(i)}</span>);
      break;
    }

    candidates.sort((a, b) => a.pos - b.pos);
    const first = candidates[0];
    const absPos = i + first.pos;

    /* Push any plain text before this token. */
    if (absPos > i) {
      out.push(<span key={key++}>{text.slice(i, absPos)}</span>);
    }

    if (first.kind === "bold") {
      const close = text.indexOf("**", absPos + 2);
      const inner = text.slice(absPos + 2, close);
      out.push(
        <strong key={key++} className="chat-md-strong">
          {renderInline(inner)}
        </strong>
      );
      i = close + 2;
    } else if (first.kind === "italic") {
      const m = first.match as RegExpExecArray;
      out.push(
        <em key={key++} className="chat-md-em">
          {m[1]}
        </em>
      );
      i = absPos + m[0].length;
    } else if (first.kind === "code") {
      const m = first.match as RegExpExecArray;
      out.push(
        <code key={key++} className="chat-md-code">
          {m[1]}
        </code>
      );
      i = absPos + m[0].length;
    } else if (first.kind === "link") {
      const m = first.match as RegExpExecArray;
      const href = m[2];
      const label = m[1];
      const internal = href.startsWith("/") || href.startsWith("#");
      out.push(
        internal ? (
          <Link
            key={key++}
            href={href}
            className="chat-md-link"
          >
            {label}
          </Link>
        ) : (
          <a
            key={key++}
            href={href}
            target="_blank"
            rel="noopener"
            className="chat-md-link"
          >
            {label}
          </a>
        )
      );
      i = absPos + m[0].length;
    } else if (first.kind === "url") {
      const m = first.match as RegExpExecArray;
      const href = m[0];
      out.push(
        <a
          key={key++}
          href={href}
          target="_blank"
          rel="noopener"
          className="chat-md-link"
        >
          {href}
        </a>
      );
      i = absPos + href.length;
    }
  }

  return out;
}

/** True if position `p` in the full string is part of a `**` bold token. */
function startsWithDouble(text: string, p: number): boolean {
  return text.slice(p, p + 2) === "**" || (p > 0 && text.slice(p - 1, p + 1) === "**");
}

export default renderChatContent;
