# Agent notes

## shaders.com MCP (Pro — authenticated)

Server: `project-0-publishd-website-shaders` (Cursor MCP). The Pro subscription on the connected account (`Daniel Castellani`, Pro: true) is authenticated via the MCP. Any agent that needs shader effects should use this MCP rather than hand-writing GLSL or stubbing presets.

**Key tools:**

- `search-presets({ query, limit })` — natural-language preset search. Returns preset IDs, titles, visual descriptions, dominant color hex codes, and thumbnails.
- `get-preset({ id, format: "react" })` — fetch full React code export for a preset. Returns `import`, `code`, `usage`, and `related_docs`.
- `list-presets({ limit, offset, collection_id })` — browse whole collections.
- `list-shaders()` / `get-shader-docs({ name })` — component-level reference.
- `get-user-info()` — confirm Pro status.

**Required reading before writing shader code:**

- `shaders://guidelines` — tool invocations remind you every time; read once per session.
- `shaders://component-directory` — orient on which components are Generators vs Effects before structural edits.
- `shaders://pro-notes/hero-section-masking` — required before masking any shader into UI (use in-shader masks via `Circle`/`Ellipse` + `maskSource`, NOT CSS `mask-image` or `clip-path`).
- `shaders://pro-notes/dynamic-prop-mapping` — for cursor-driven or time-driven animated props (`mouse-position`, `mouse`, `auto-animate`, `map` modes).
- `shaders://pro-notes/composition` — layer ordering, transparency.
- `shaders://pro-notes/finishing-touches` — grain, texture, ambient motion polish.

**Code principles (from guidelines):**

1. One `<Shader>` tag per effect area. Never stack two Shaders for layering — compose children inside one.
2. Position components inside the shader (via props); position the `<Shader>` on the page via CSS.
3. Effects without explicit children fall back to siblings — the idiomatic way to add `FilmGrain`/`Ascii`/`Dither` on top of the whole composition.
4. Never combine heavy CSS filters (`blur`, `backdrop-filter`) with shader content on the same element.
5. RTT effects (`Blur`, `Distortion`) are expensive — avoid stacking more than 1–2 per shader.
6. Never use `DOMTexture` in production — Chrome Canary flag only.

## Preset library used on this site

Live in `components/shaders/presets/` as typed React components. Each wraps a shaders.com preset with brand-colour overrides applied (cyan `#00d4ff` / warm signal `#ff6b3d`).

| Component | Preset ID | Site placement |
|---|---|---|
| `DigitalActivation6` | `9ce36a2a-767c-4cba-9818-c93311d5edc0` | Hero right column |
| `DigitalActivation10` | `2757b00d-f85c-4908-8d2a-2c0be9b9155a` | SignatureCanvas centerpiece |
| `AsciiPeaks` | `7f41b77a-62a2-42df-a227-ad7ed0760327` | RealResults peak |
| `EnterTheMatrix` | `d9df03c5-1515-4e1f-b6fe-304767cdfc17` | Included peak (recoloured cyan) |
| `LostRays5` | `a42e21a8-0420-45ab-bd12-f097a20278ee` | StudioWork editorial peak |
| `Fireworks5` | `011a60f7-d51c-4c48-9ed2-c82dd22e06e4` | FinalCta MAX peak (recoloured cyan/white) |
| `AsciiTunnel4` | `6062c95d-99ec-44b3-9613-ab9864228056` | WhatHappensNext timeline |

## How to add a new preset

```txt
1. search-presets({ query: "plain-English description", limit: 10 })
2. Review visual_descriptions, pick the best fit.
3. get-preset({ id, format: "react" }) — returns runnable React code.
4. Drop into components/shaders/presets/<Name>.tsx with a typed wrapper.
5. Override colors as needed to match brand tokens in app/globals.css.
6. Mount via `next/dynamic(() => import("..."), { ssr: false })` — WebGPU requires browser.
```

## Brand tokens

- `--color-accent: #00d4ff` — brand cyan
- `--color-signal: #ff6b3d` — warm editorial accent (new, replaces removed #7a5aff violet)
- `--color-ink: #0b0f1c` — warmer near-black for card surfaces
- Font: Geist (sans + mono). Mono used for numbers, prices, timestamps, terminal-style copy.
