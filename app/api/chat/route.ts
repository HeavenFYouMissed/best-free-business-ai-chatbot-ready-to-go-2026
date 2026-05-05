import { NextRequest } from "next/server";
import { getGroq, HELP_MODEL, SYSTEM_PROMPT } from "@/lib/groq";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Message = { role: "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  let body: { messages?: Message[] };
  try {
    body = (await req.json()) as { messages?: Message[] };
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }
  const messages = (body.messages ?? []).filter(
    (m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string"
  );
  if (messages.length === 0) {
    return new Response("No messages", { status: 400 });
  }

  let client;
  try {
    client = getGroq();
  } catch {
    return new Response("Chat isn't wired up yet — email daniel@publishd.app.", {
      status: 503,
      headers: { "content-type": "text/plain; charset=utf-8" },
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
    },
  });
}
