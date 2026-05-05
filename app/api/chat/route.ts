import { NextRequest } from "next/server";
import { getGroq, HELP_MODEL, SYSTEM_PROMPT } from "@/lib/groq";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Message = { role: "user" | "assistant"; content: string };

/** CORS for the static `public/chat-demo.html` widget embedded on other origins. */
function corsHeaders(req: NextRequest): Record<string, string> {
  const raw = process.env.CHAT_WIDGET_ALLOWED_ORIGINS?.trim();
  if (!raw) return {};

  const origin = req.headers.get("origin");
  const list = raw.split(",").map((s) => s.trim()).filter(Boolean);
  const base: Record<string, string> = {
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type",
    "access-control-max-age": "86400",
  };

  if (list.includes("*")) {
    return { ...base, "access-control-allow-origin": "*" };
  }
  if (origin && list.includes(origin)) {
    return { ...base, "access-control-allow-origin": origin, Vary: "Origin" };
  }
  return {};
}

export async function OPTIONS(req: NextRequest) {
  const cors = corsHeaders(req);
  return new Response(null, { status: 204, headers: cors });
}

export async function POST(req: NextRequest) {
  const cors = corsHeaders(req);

  let body: { messages?: Message[] };
  try {
    body = (await req.json()) as { messages?: Message[] };
  } catch {
    return new Response("Invalid JSON", { status: 400, headers: cors });
  }
  const messages = (body.messages ?? []).filter(
    (m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string"
  );
  if (messages.length === 0) {
    return new Response("No messages", { status: 400, headers: cors });
  }

  let client;
  try {
    client = getGroq();
  } catch {
    return new Response("Chat isn't wired up yet — email daniel@publishd.app.", {
      status: 503,
      headers: { "content-type": "text/plain; charset=utf-8", ...cors },
    });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const completion = await client.chat.completions.create({
          model: HELP_MODEL,
          temperature: 0.3,
          top_p: 0.9,
          max_tokens: 600,
          stream: true,
          reasoning_effort: "low",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages.map((m) => ({ role: m.role, content: m.content })),
          ],
        });

        for await (const chunk of completion) {
          const delta = chunk.choices?.[0]?.delta?.content;
          if (delta) controller.enqueue(encoder.encode(delta));
        }
        controller.close();
      } catch (err) {
        const detail = err instanceof Error ? err.message : "unknown";
        controller.enqueue(
          encoder.encode(
            `\n\n(Chat hit a snag — ${detail}. Email daniel@publishd.app and I'll reply directly.)`
          )
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-cache, no-transform",
      "x-content-type-options": "nosniff",
      ...cors,
    },
  });
}
