"use client";

import { useEffect, useState } from "react";
import { ChatBubble } from "./ChatBubble";
import { ChatPanel } from "./ChatPanel";

/**
 * Custom event the rest of the site can dispatch to pop the chat panel open
 * without holding a React ref. Lets the homepage trigger chat from the nav
 * bar (where the FAB is hidden because it conflicted with the sticky mobile
 * CTA) while every other page keeps the floating bubble.
 *
 *   window.dispatchEvent(new Event(CHAT_OPEN_EVENT));
 */
export const CHAT_OPEN_EVENT = "publishd:open-chat";

export function ChatWidget({ hideFab = false }: { hideFab?: boolean }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    function handleOpen() {
      setOpen(true);
    }
    window.addEventListener(CHAT_OPEN_EVENT, handleOpen);
    return () => window.removeEventListener(CHAT_OPEN_EVENT, handleOpen);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {hideFab ? null : <ChatBubble onClick={() => setOpen(true)} hidden={open} />}
      <ChatPanel open={open} onClose={() => setOpen(false)} />
    </>
  );
}
