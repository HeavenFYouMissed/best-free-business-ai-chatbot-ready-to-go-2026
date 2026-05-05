# Publishd — publishd.app

> You built it. We ship it.

Next.js 15 + Tailwind v4 site. Deploys to Cloudflare Workers via OpenNext.

## Local dev

```bash
npm install
cp .env.example .env.local
# fill STRIPE_SECRET_KEY, GROQ_API_KEY, NEXT_PUBLIC_SITE_URL
npm run dev
```

## Deploy

```bash
npx wrangler login
npx wrangler secret put STRIPE_SECRET_KEY
npx wrangler secret put STRIPE_WEBHOOK_SECRET
npx wrangler secret put GROQ_API_KEY
npx wrangler secret put INTAKE_WEBHOOK_URL
npm run deploy
```

Bind the custom domain in the Cloudflare dashboard:
**Workers & Pages → publishd → Settings → Domains & Routes → Add custom domain →** `publishd.app` and `www.publishd.app`.

Email forwarding: Cloudflare Email Routing → route `daniel@publishd.app` to your inbox.
