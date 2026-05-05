import { NextRequest } from "next/server";
import { getStripe } from "@/lib/stripe";
import { allTiers, type TierId } from "@/data/tiers";

export const runtime = "nodejs";

const BRAND_TAGLINE =
  "Publishd · we ship your web app to the App Store and Google Play. Billing handled by SuperClawHub, our parent SaaS. By continuing you agree to the Publishd Terms of Service at publishd.app/terms. Questions? daniel@publishd.app";

export async function POST(req: NextRequest) {
  let body: { tier?: TierId; addons?: TierId[] };
  try {
    body = (await req.json()) as { tier?: TierId; addons?: TierId[] };
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const tier = allTiers.find((t) => t.id === body.tier);
  if (!tier) return Response.json({ error: "Unknown tier" }, { status: 400 });
  if (!tier.priceId) {
    return Response.json(
      {
        error:
          "Pricing is being finalized. Email daniel@publishd.app to complete checkout — we'll wire this directly.",
      },
      { status: 503 }
    );
  }

  const addons = (body.addons ?? [])
    .map((id) => allTiers.find((t) => t.id === id))
    .filter((t): t is NonNullable<typeof t> => !!t && !!t.priceId && t.interval !== "month");

  let stripe;
  try {
    stripe = getStripe();
  } catch {
    return Response.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin;
  const description =
    addons.length > 0
      ? `Publishd — ${tier.name} + ${addons.map((a) => a.name).join(", ")}`
      : `Publishd — ${tier.name}`;
  const isSub = tier.interval === "month";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: isSub ? "subscription" : "payment",
      line_items: [
        { price: tier.priceId!, quantity: 1 },
        ...addons.map((a) => ({ price: a.priceId!, quantity: 1 })),
      ],
      success_url: `${base}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/#pricing`,
      customer_creation: isSub ? undefined : "always",
      allow_promotion_codes: true,
      metadata: {
        product: "publishd",
        tier: tier.id,
        ...(addons.length > 0 ? { addons: addons.map((a) => a.id).join(",") } : {}),
      },
      custom_text: {
        submit: { message: BRAND_TAGLINE },
      },
      ...(isSub
        ? {
            subscription_data: {
              description,
              metadata: { product: "publishd", tier: tier.id },
            },
          }
        : {
            payment_intent_data: {
              description,
              metadata: {
                product: "publishd",
                tier: tier.id,
                ...(addons.length > 0
                  ? { addons: addons.map((a) => a.id).join(",") }
                  : {}),
              },
              statement_descriptor_suffix: "PUBLISHD",
            },
          }),
    });
    return Response.json({ url: session.url }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout error";
    return Response.json({ error: message }, { status: 500 });
  }
}
