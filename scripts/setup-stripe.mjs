// Create or reuse Publishd products + prices in your Stripe account.
// Usage: STRIPE_SECRET_KEY=sk_live_... node scripts/setup-stripe.mjs
//
// Reads tiers from data/tiers.ts at runtime via a small ESM shim and writes
// data/stripe-prices.json — price ids are picked up automatically by the site.

import Stripe from "stripe";
import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";

const __filename = url.fileURLToPath(import.meta.url);
const root = path.resolve(path.dirname(__filename), "..");

// Tiers declared here to keep this script dependency-free. Keep in sync with data/tiers.ts.
const tiers = [
  { id: "coaching", name: "Publishd Coaching", price: 299, interval: "once" },
  { id: "single", name: "Publishd Single Platform", price: 200, interval: "once" },
  { id: "both", name: "Publishd Both Platforms", price: 399, interval: "once" },
  { id: "premium", name: "Publishd Done For You Premium", price: 699, interval: "once" },
  { id: "rescue", name: "Publishd Rejection Rescue", price: 199, interval: "once" },
  { id: "aiRemoval", name: "Publishd AI Removal", price: 99, interval: "once" },
  { id: "retainer", name: "Publishd Retainer", price: 49, interval: "month" },
  { id: "update", name: "Publishd One-off Update", price: 99, interval: "once" },
  /* Built-For-You catalog (sites, chatbots, app polish). Custom Site is
     quote-only, intentionally absent here. */
  { id: "starterSite", name: "Publishd Starter Site", price: 499, interval: "once" },
  { id: "proSite", name: "Publishd Pro Site", price: 999, interval: "once" },
  { id: "chatbotInstall", name: "Publishd Chatbot Install", price: 399, interval: "once" },
  { id: "chatbotPro", name: "Publishd Chatbot Pro", price: 799, interval: "once" },
  { id: "appPolish", name: "Publishd App Polish", price: 199, interval: "once" },
  { id: "resubmitAddon", name: "Publishd Resubmit Add-on", price: 99, interval: "once" },
];

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error("STRIPE_SECRET_KEY is not set. Aborting.");
  process.exit(1);
}
const stripe = new Stripe(key);
const mode = key.startsWith("sk_live_") ? "LIVE" : key.startsWith("sk_test_") ? "TEST" : "UNKNOWN";
console.log(`Using Stripe key in ${mode} mode.`);

async function findOrCreateProduct(tier) {
  const list = await stripe.products.search({
    query: `metadata['publishd_tier']:'${tier.id}'`,
  });
  if (list.data[0]) return list.data[0];
  const product = await stripe.products.create({
    name: tier.name,
    metadata: { publishd_tier: tier.id },
  });
  return product;
}

async function findOrCreatePrice(product, tier) {
  const prices = await stripe.prices.list({ product: product.id, active: true, limit: 10 });
  const existing = prices.data.find((p) => {
    if (p.unit_amount !== tier.price * 100) return false;
    if (tier.interval === "month") return p.recurring?.interval === "month";
    return !p.recurring;
  });
  if (existing) return existing;

  const common = {
    product: product.id,
    currency: "usd",
    unit_amount: tier.price * 100,
    metadata: { publishd_tier: tier.id },
  };
  if (tier.interval === "month") {
    return stripe.prices.create({ ...common, recurring: { interval: "month" } });
  }
  return stripe.prices.create(common);
}

const result = {};
for (const tier of tiers) {
  const product = await findOrCreateProduct(tier);
  const price = await findOrCreatePrice(product, tier);
  result[tier.id] = { productId: product.id, priceId: price.id };
  console.log(`  ${tier.id.padEnd(10)} ${product.id}  →  ${price.id}`);
}

const out = path.join(root, "data", "stripe-prices.json");
await fs.writeFile(out, JSON.stringify({ mode, created: new Date().toISOString(), prices: result }, null, 2));
console.log(`\nWrote ${path.relative(root, out)}.`);
console.log("Restart the dev server (or redeploy) to pick up the new price IDs.");
