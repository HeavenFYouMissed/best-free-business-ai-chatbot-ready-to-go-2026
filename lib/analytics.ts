/**
 * Server-side Segment event tracking.
 *
 * We only track what we actually need on the server: `Order Completed` after
 * a successful Stripe checkout. Trustpilot's Segment destination picks this
 * up and sends the review invite. No user identify calls, no browsing
 * behaviour, no chat transcripts — privacy by default.
 *
 * Uses Segment's HTTP Tracking API:
 * https://segment.com/docs/connections/sources/catalog/libraries/server/http-api/
 */

const SEGMENT_ENDPOINT = "https://api.segment.io/v1/track";

function getWriteKey(): string | null {
  return (
    process.env.SEGMENT_WRITE_KEY ??
    process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY ??
    /* Same fallback as the browser snippet — safe to expose. */
    "xX6JHkThZ29NmAnlnA4ruPJJF4N5xgaT"
  );
}

type OrderCompletedEvent = {
  /** Customer email (used by Trustpilot to send the review invite). */
  email: string;
  /** Stripe checkout session id, used as order_id. */
  orderId: string;
  /** USD total (dollars, not cents). */
  total: number;
  /** Tier id (e.g. "both", "starterSite"). Used as product sku. */
  tier: string;
  /** Display name of the tier. */
  tierName: string;
  /** Customer full name, if available. */
  name?: string;
  /** Stripe payment intent id for cross-reference. */
  paymentIntent?: string;
};

/**
 * Fire an `Order Completed` event into Segment from the server. Safe to
 * call from a webhook — uses HTTP fetch, no SDK install, no blocking. On
 * failure we log and continue: analytics should never break the webhook.
 */
export async function trackOrderCompleted(e: OrderCompletedEvent): Promise<void> {
  const writeKey = getWriteKey();
  if (!writeKey) return;

  const payload = {
    /* Use email as userId — Trustpilot's Segment destination needs a stable
       identifier and this is the one customers recognize. Anonymous users
       don't apply here (they've just paid). */
    userId: e.email,
    event: "Order Completed",
    properties: {
      order_id: e.orderId,
      total: e.total,
      currency: "USD",
      email: e.email,
      name: e.name || undefined,
      payment_intent: e.paymentIntent || undefined,
      products: [
        {
          product_id: e.tier,
          sku: e.tier,
          name: e.tierName,
          price: e.total,
          quantity: 1,
        },
      ],
    },
    context: {
      app: { name: "publishd", version: "1.0" },
    },
    timestamp: new Date().toISOString(),
  };

  try {
    const auth = btoa(`${writeKey}:`);
    await fetch(SEGMENT_ENDPOINT, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Basic ${auth}`,
      },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("[segment] track failed:", err);
  }
}
