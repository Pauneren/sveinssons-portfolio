## Repo quick facts

- Framework: Next.js (App Router) — app/ directory contains routes and layouts.
- Styling: Tailwind CSS v4 + PostCSS. Tailwind content is configured to scan `./app/**/*.{js,ts,jsx,tsx}`.
- Fonts: Uses `next/font/google` (see `app/layout.js` and `app/page.js`).
- Bundler flags: dev/build scripts use `--turbopack` (see `package.json`).

## How this repo is organized (the "why")

- `app/` — App Router. Prefer adding routes as folders under `app/<route>/page.js` or `app/<route>/page.tsx`.
- `app/layout.js` — global layout and font setup (server component). Keep global fonts and metadata here.
- `app/page.js` — the home page; currently a client component (starts with `"use client"`) and contains the navbar, hero, sections.
- `public/` — static assets (e.g. `public/my-hero.jpg` referenced from the hero section).
- `globals.css` — base CSS and CSS variables; PostCSS imports Tailwind. Prefer utility-first styling with Tailwind classes.

Design intent: small portfolio site built in the App Router style. Most global concerns (fonts, vars, layout) live in `app/layout.js` and `app/globals.css`; pages are thin and use Tailwind utilities.

## Developer workflows & commands

- Start dev server (recommended):
  - `npm run dev` — runs `next dev --turbopack`. Open http://localhost:3000.
- Build for production:
  - `npm run build` — runs `next build --turbopack`.
  - `npm run start` — start production server after build.
- Linting:
  - `npm run lint` — runs `eslint` (project uses `eslint-config-next` via `eslint.config.mjs`).

Notes: Turbopack is enabled in scripts; if you hit unexpected bundler issues during local edits, try removing `--turbopack` temporarily from `package.json` scripts.

## Project-specific conventions and patterns

- App Router server vs client components:
  - Files without `"use client"` are server components by default. Keep heavy data-fetching and markup in server components when possible.
  - Add `"use client"` at the top of a file when using React state/hooks (example: `app/page.js`).
- Fonts:
  - Fonts are added via `next/font/google` and exported class names are used on elements (see `orbitron.className` and `inter.className` in `app/page.js`).
- Tailwind usage:
  - Tailwind utilities are used everywhere (e.g. `className="max-w-6xl mx-auto px-6"`). If you extend theme values, do so in `tailwind.config.js`.
- Assets:
  - Put images and static files in `public/`. Examples: hero background referenced as `url('/my-hero.jpg')` in `app/page.js`.

## Integration points & external dependencies

- Next.js (v15) — core framework. Check `next.config.mjs` for modifications (currently minimal).
- Tailwind/PostCSS — configured via `tailwind.config.js` and `postcss.config.mjs`.
- Eslint — configuration lives in `eslint.config.mjs` using `FlatCompat` and `next/core-web-vitals`.

## Examples for common edits (copyable guidance)

- Add a new route `/projects`:
  1. Create `app/projects/page.js` (or `.tsx`).
  2. Export a default React component (no `"use client"` unless you need client hooks).
  3. Use Tailwind utilities for styling; add assets to `public/` if needed.

- Change the hero image:
  - Replace `public/my-hero.jpg` or update the inline style in `app/page.js` where backgroundImage is set.

- Add a site-wide font or variable:
  - Update `app/layout.js` to import a font from `next/font/google` and add to body class.
  - Add CSS variables to `app/globals.css` if needed.

## Guidance for AI agents

- Prefer small, targeted edits. This repo is intentionally minimal—avoid large refactors unless requested.
- When adding components, follow App Router conventions: routes under `app/`, `layout.js` for cross-route UI.
- If a change affects build behavior (e.g., altering `next.config.mjs`, Node targets, images), call out potential local dev differences (Turbopack vs SWC) and include reproduction steps.
- Keep the visual style consistent: use Tailwind utilities and existing fonts (`orbitron`, `inter`, Geist variables in `layout.js`).

## Files to inspect for context (quick links)

- `app/page.js` — homepage (client component with state, navbar/hamburger pattern).
- `app/layout.js` — global fonts and metadata.
- `app/globals.css` — CSS variables and Tailwind import.
- `tailwind.config.js` — theme extensions (fonts).
- `package.json` — scripts, Next/Turbopack usage.
- `eslint.config.mjs` — linting rules and ignores.

If anything here is unclear or you'd like me to expand a section (routing, image handling, or testing), tell me which area to deepen and I'll iterate.
