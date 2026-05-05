# Publishd chat widget — setup & usage

This site ships a **single-file** demo at [`public/chat-demo.html`](../public/chat-demo.html). It mirrors the in-app chat look (glass FAB, iPhone bezel, streaming replies) without React.

## Quick start (local)

1. Copy `.env.example` → `.env.local` and set **`GROQ_API_KEY`** (server-side only; [Groq](https://console.groq.com/) offers a free tier with limits).
2. Run `npm run dev`.
3. Open **http://localhost:3000/chat-demo.html**  
   The page calls **same-origin** `/api/chat` — no CORS configuration needed.

## Hosted copy

- **Live demo:** https://publishd.app/chat-demo.html  
- **API:** https://publishd.app/api/chat (POST JSON `{ "messages": [...] }`, streamed plain text)

## Embedding on another site

Browsers will **block** cross-origin `fetch` unless the API sends CORS headers.

1. On the Next/Workers host, set **`CHAT_WIDGET_ALLOWED_ORIGINS`** in the deployment environment:
   - Strict: `https://your-marketing-site.com,https://www.your-marketing-site.com`
   - Permissive (higher abuse risk): `*`
2. Deploy. The static HTML can live on GitHub Pages, Netlify, S3, etc.; it will POST to `https://publishd.app/api/chat` (or your fork’s URL).

Same-origin rules (no env needed): `publishd.app`, `www.publishd.app`, `localhost`, `127.0.0.1`, `*.localhost`.

## Download / source path

- From the demo page, use **“Download this HTML file”** (cyan link) to save the exact document you’re viewing.
- In git: **`public/chat-demo.html`**

## RAG / custom knowledge (advanced)

The stock route [`app/api/chat/route.ts`](../app/api/chat/route.ts) sends **`SYSTEM_PROMPT`** + the chat transcript only. To add RAG:

1. Store embeddings (e.g. pgvector, Cloudflare Vectorize, Pinecone).
2. On each request, retrieve top‑k chunks for the latest user message.
3. Inject them into the `messages` array as a **`system`** or extra **`user`** block *before* the model call, or extend `SYSTEM_PROMPT` with the retrieved text (keep an eye on token limits).

There is no RAG pipeline in this repo by default — it’s the right place to wire your own retrieval.

## “Fresh repo” for a free/open distribution

**Easy path:** fork this project (or copy `public/chat-demo.html` + `app/api/chat/route.ts` + `lib/groq.ts` into a minimal Next app), add your **`GROQ_API_KEY`** in the host’s secrets, set **`CHAT_WIDGET_ALLOWED_ORIGINS`** if you embed off-domain, and deploy to Vercel / Cloudflare / Railway.

A starter layout for your **own** public repo:

- `README.md` — product story, env vars, screenshots, Loom link  
- `public/chat-demo.html` — the widget  
- `app/api/chat/route.ts` — streaming proxy  
- `.env.example` — documented keys only (never commit real secrets)

You cannot safely ship a “free Groq key” in public code; each deployer adds **`GROQ_API_KEY`** in the server environment. Groq’s free tier is per account/API key.

## Preview image

See [`docs/images/chat-widget-preview.png`](images/chat-widget-preview.png) for a mobile screenshot reference you can reuse in READMEs or marketing.
