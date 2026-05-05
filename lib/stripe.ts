import Stripe from "stripe";

let client: Stripe | null = null;

export function getStripe(): Stripe {
  if (client) return client;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set.");
  }
  client = new Stripe(key, {
    apiVersion: "2025-10-29.clover",
    appInfo: { name: "publishd.app" },
    // Cloudflare Workers don't ship Node's http module, so force the fetch-based client.
    httpClient: Stripe.createFetchHttpClient(),
  });
  return client;
}
