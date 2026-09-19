# Portfolio

Personal portfolio built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**. Dark-mode-first with a light toggle, a restrained accent color, monospace labels + a clean sans body, and subtle scroll motion. See [PLAN.md](./PLAN.md) for structure and design direction.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint

## Structure

- `src/app` — App Router entry (`layout.tsx`, `page.tsx`, `projects/[slug]`)
- `src/sections` — page sections (Hero, About, Projects, Experience, Skills, Contact)
- `src/components` — nav, footer, theme toggle, section shell, scroll reveal
- `src/data/projects.ts` — typed project data driving the grid and detail pages
- `src/app/globals.css` — Tailwind + theme tokens (light/dark)

## Editing content

Section copy is placeholder. Replace text in `src/sections/*`, project data in
`src/data/projects.ts`, and the name/links in `src/app/layout.tsx` and
`src/sections/hero.tsx`. Drop a `resume.pdf` and photo into `public/`.

## Deploy

Push to a Git repo and import into [Vercel](https://vercel.com); the defaults
work with no configuration.
