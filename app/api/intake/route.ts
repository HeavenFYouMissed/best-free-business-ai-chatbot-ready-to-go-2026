import { NextRequest } from "next/server";
import { sendNotification } from "@/lib/mail";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const at = new Date().toISOString();
  const ip = req.headers.get("cf-connecting-ip") ?? req.headers.get("x-forwarded-for") ?? "unknown";
  const ua = req.headers.get("user-agent") ?? "unknown";

  // Pretty-print the form for the email body.
  const entries = Object.entries(body).filter(([k]) => k !== "website"); // honeypot
  const padLen = Math.max(...entries.map(([k]) => k.length), 0);
  const lines = entries.map(([k, v]) => {
    const label = k.padEnd(padLen);
    const value = typeof v === "string" ? v : JSON.stringify(v);
    return `${label}  ${value || "—"}`;
  });

  const source = typeof body.source === "string" ? body.source : "web";
  const email = typeof body.email === "string" ? body.email : undefined;
  const name = typeof body.email === "string" ? String(body.name ?? "anonymous") : "anonymous";
  const subject = `[Publishd] ${source} — ${name}`;

  const text = [
    lines.join("\n"),
    "",
    "——",
    `at:  ${at}`,
    `ip:  ${ip}`,
    `ua:  ${ua}`,
  ].join("\n");

  try {
    await sendNotification({ subject, text, replyTo: email });
  } catch (err) {
    console.error("[intake] mail send failed:", err);
  }

  // Still forward to the optional webhook for anyone who wants Zapier/Make later.
  const url = process.env.INTAKE_WEBHOOK_URL;
  if (url) {
    try {
      await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ at, ip, ua, payload: body }),
      });
    } catch {
      /* noop */
    }
  }

  console.log("[intake]", subject);
  return Response.json({ ok: true });
}
