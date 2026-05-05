# Publishd chat widget (standalone distribution)

<p align="center">
  <strong>One HTML file · streaming AI · iPhone chrome · no visitor API key</strong>
</p>

<p align="center">
  <a href="https://publishd.app/chat-demo.html">Live demo</a>
  &nbsp;·&nbsp;
  <a href="https://publishd.app">publishd.app</a>
</p>

---

![Mobile chat widget preview](../../docs/images/chat-widget-preview.png)

> **Video:** add your screen recording here (e.g. Loom or YouTube) once uploaded — replace this line with `[![Watch the demo](thumbnail-url)](https://your-video-link)`.

## What this is

This folder documents how to **reuse** the chat surface that ships in the main Publishd website. The canonical file lives at:

**[`public/chat-demo.html`](../../public/chat-demo.html)**

It is a self-contained page (embedded bezel PNG, vanilla JS) that talks to a **server** chat endpoint so end users never paste Groq keys.

## Try it in 60 seconds

| Step | Action |
|------|--------|
| 1 | Clone the parent repo and `npm install` |
| 2 | Add `GROQ_API_KEY` to `.env.local` ([Groq console](https://console.groq.com/) — free tier available) |
| 3 | `npm run dev` → open **http://localhost:3000/chat-demo.html** |

## Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `GROQ_API_KEY` | Yes (for real replies) | Server-side Groq access |
| `CHAT_WIDGET_ALLOWED_ORIGINS` | If embedding cross-origin | CORS allowlist or `*` — see [chat widget setup guide](../../docs/chat-widget-setup.md) |

Never put `GROQ_API_KEY` in the HTML file or client JS.

## Publishing your own repo (optional)

1. Create a new empty GitHub repository.
2. Copy into it (from the parent project):  
   `public/chat-demo.html`, `app/api/chat/route.ts`, and the small Groq helper imports it needs (`lib/groq.ts`, etc.), plus a minimal Next.js scaffold.
3. Add a **fancy** root `README` with badges, your screenshot, and a **“Deploy to Vercel”** button if you like.
4. Configure **secrets** on the host (`GROQ_API_KEY`, optional `CHAT_WIDGET_ALLOWED_ORIGINS`).
5. Push `main` and deploy.

There is no separate “magic” repository maintained here — this README is a template you can copy into your own public repo.

## RAG / knowledge base

The default API route streams from Groq with a fixed system prompt. **Retrieval (RAG)** is not included out of the box. Add embedding search in `app/api/chat/route.ts` and prepend retrieved context to the model input. See **[`docs/chat-widget-setup.md`](../../docs/chat-widget-setup.md)** for notes.

## License / brand

Publishd branding in the demo is for illustration. Forks typically swap copy, colors, and system prompts for their own product.

---

<p align="center">
  Questions: <a href="mailto:daniel@publishd.app">daniel@publishd.app</a>
</p>
