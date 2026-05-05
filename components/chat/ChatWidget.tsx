"use client";

import { useEffect, useState } from "react";
import { ChatBubble } from "./ChatBubble";
import { ChatPanel } from "./ChatPanel";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <>
      <ChatBubble onClick={() => setOpen(true)} hidden={open} />
      <ChatPanel open={open} onClose={() => setOpen(false)} />
    </>
  );
}
