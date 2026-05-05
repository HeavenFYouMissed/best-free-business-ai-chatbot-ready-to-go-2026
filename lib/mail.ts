import { getCloudflareContext } from "@opennextjs/cloudflare";

type SendArgs = {
  subject: string;
  text: string;
  replyTo?: string;
};

/**
 * Send an email via the Resend API.
 * Requires RESEND_API_KEY set as a Cloudflare Worker secret.
 * Falls back to logging in local dev when the key is absent.
 */
export async function sendNotification({ subject, text, replyTo }: SendArgs): Promise<void> {
  let env: Record<string, unknown> = {};
  try {
    env = getCloudflareContext().env as unknown as Record<string, unknown>;
  } catch {
    env = {};
  }

  const apiKey = env.RESEND_API_KEY as string | undefined;

  if (!apiKey) {
    console.log(`[mail:stub] ${subject}\n\n${text}`);
    return;
  }

  const payload: Record<string, unknown> = {
    from: "Publishd <notify@publishd.app>",
    to: ["daniel@publishd.app"],
    subject,
    text,
  };
  if (replyTo) payload.reply_to = replyTo;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend error ${res.status}: ${body}`);
  }
}
