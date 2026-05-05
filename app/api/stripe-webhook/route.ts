import { NextRequest } from "next/server";
import { getStripe } from "@/lib/stripe";
import { sendNotification } from "@/lib/mail";
import { trackOrderCompleted } from "@/lib/analytics";
import { allTiers } from "@/data/tiers";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  const whsec = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !whsec) return new Response("Missing signature", { status: 400 });

  const body = await req.text();
  let event;
  try {
    const stripe = getStripe();
    event = await stripe.webhooks.constructEventAsync(body, signature, whsec);
  } catch (err) {
    const m = err instanceof Error ? err.message : "invalid";
    return new Response(`Webhook error: ${m}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as import("stripe").Stripe.Checkout.Session;
    const tier = session.metadata?.tier ?? "unknown";
    const email = session.customer_details?.email ?? session.customer_email ?? "unknown";
    const name = session.customer_details?.name ?? "";
    const amount = ((session.amount_total ?? 0) / 100).toFixed(2);

    const text = [
      `NEW PUBLISHD SALE`,
      ``,
      `tier:     ${tier}`,
      `amount:   $${amount} ${session.currency?.toUpperCase() ?? "USD"}`,
      `email:    ${email}`,
      `name:     ${name}`,
      `session:  ${session.id}`,
      ``,
      `Next: send welcome email (docs/WELCOME-PACKET.md template 1).`,
      `Kickoff form they may have filled: https://publishd.app/kickoff`,
      `Stripe dashboard: https://dashboard.stripe.com/payments/${session.payment_intent}`,
    ].join("\n");

    try {
      await sendNotification({
        subject: `[Publishd] SALE · $${amount} · ${tier} · ${email}`,
        text,
        replyTo: typeof email === "string" ? email : undefined,
      });
    } catch (err) {
      console.error("[stripe-webhook] mail failed:", err);
    }

    /* Fire Order Completed into Segment so Trustpilot's Segment destination
       sends the customer a review invite. Email is the identifier. Wrapped
       so analytics failures never break the webhook response. */
    if (typeof email === "string" && email !== "unknown") {
      const tierRecord = allTiers.find((t) => t.id === tier);
      try {
        await trackOrderCompleted({
          email,
          orderId: session.id,
          total: Number(amount),
          tier,
          tierName: tierRecord?.name ?? `Publishd ${tier}`,
          name: name || undefined,
          paymentIntent:
            typeof session.payment_intent === "string"
              ? session.payment_intent
              : undefined,
        });
      } catch (err) {
        console.error("[stripe-webhook] segment track failed:", err);
      }
    }

    // Optional extra fan-out to a webhook (Zapier etc) if you ever set one.
    const url = process.env.INTAKE_WEBHOOK_URL;
    if (url) {
      try {
        await fetch(url, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ type: event.type, data: event.data.object }),
        });
      } catch {
        /* noop */
      }
    }
  }

  return Response.json({ received: true });
}
