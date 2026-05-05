# Deploying publishd.app

## One-time setup

```bash
# 1. Log in to Cloudflare
npx wrangler login

# 2. Create Stripe products + prices (LIVE key — paste into your shell, not chat)
export STRIPE_SECRET_KEY='sk_live_...'
npm run setup:stripe
#   → writes data/stripe-prices.json with real price IDs

# 3. Push secrets to the Worker
echo -n "$STRIPE_SECRET_KEY" | npx wrangler secret put STRIPE_SECRET_KEY
npx wrangler secret put STRIPE_WEBHOOK_SECRET       # optional — only if using webhook route
npx wrangler secret put GROQ_API_KEY
npx wrangler secret put INTAKE_WEBHOOK_URL          # optional — zapier/make/n8n webhook

# 4. Deploy
npm run deploy
```

## Bind the custom domain

Cloudflare dashboard → **Workers & Pages → publishd → Settings → Domains & Routes → Add custom domain**
Add both: `publishd.app` and `www.publishd.app`. DNS is already on Cloudflare so this is one click each.

## Email forwarding (free)

Cloudflare dashboard → **Email → Email Routing → Routes** → add `daniel@publishd.app` → destination: your Gmail (`kanddlabs@gmail.com`).

## Stripe webhook (optional)

Stripe dashboard → **Developers → Webhooks → Add endpoint**
- URL: `https://publishd.app/api/stripe-webhook`
- Events: `checkout.session.completed`, `invoice.paid`
- Copy the signing secret → `npx wrangler secret put STRIPE_WEBHOOK_SECRET`

## Local dev

```bash
cp .env.example .env.local
# fill STRIPE_SECRET_KEY, GROQ_API_KEY, NEXT_PUBLIC_SITE_URL (http://localhost:3000 is fine)
npm run dev
```

## Verification after deploy

1. `https://publishd.app` → 200, hero loads, marquee drifts, dropdowns work
2. Click any pricing tier → redirects to Stripe Checkout
3. Open chat bubble → streaming reply from Claude
4. `/robots.txt`, `/sitemap.xml`, OpenGraph image at `/opengraph-image` all render
