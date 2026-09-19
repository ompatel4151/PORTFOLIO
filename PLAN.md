# Portfolio — Plan

Personal portfolio for a senior CS student applying to AI/ML and software engineering roles (targeting May 2027). The goal is a site that reads like it was built by an engineer with taste: clean, technical, restrained.

## Stack

- **Next.js 14+** (App Router) + **TypeScript**
- **Tailwind CSS** for styling (with CSS variables for theming)
- **next-themes** for the dark/light toggle (dark by default, no flash)
- **Framer Motion** for subtle scroll/reveal motion
- **Vercel** for deployment

## Design direction — "Terminal, committed"

Chosen from four pitched directions (see the design-directions gallery). Fully
monospace, typeset like an engineer's spec sheet — deliberately avoids the
default dev-portfolio tells (fake `~/` shell prompt, radial glow, `01/02`
section numbers, neon teal).

- **Dark mode by default**, light toggle in the nav. No flash of wrong theme.
- **Palette**: warm near-black ground with an off-white ink (dark); a warm paper
  ground with near-black ink (light). One restrained **burnt-amber** accent used
  only for signal — markers, the hero cursor, active/hover states.
- **Type**: IBM Plex Mono is the primary structural voice (nav, headings, hero,
  labels, project rows, metadata, tags); IBM Plex Sans carries longer prose for
  readability. Same superfamily, so it stays cohesive.
- **Markers**: section headers read as source comments — `// selected work`,
  `// about` — meaningful in the identity rather than decorative numbering.
- **Hard edges**: minimal border-radius, hairline rules, no glow. Projects are
  monospace rows (`year · title · stack · →`), not card soup.
- **Generous whitespace**, constrained max content width, consistent rhythm.
- **Subtle motion**: fade/translate-in on scroll, respecting
  `prefers-reduced-motion`. Nothing bouncy.

## File structure

```
Portfolio/
├── PLAN.md
├── package.json
├── next.config.mjs
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── .eslintrc.json
├── .gitignore
├── README.md
├── public/
│   └── (static assets, resume PDF later)
└── src/
    ├── app/
    │   ├── layout.tsx          # root layout: fonts, ThemeProvider, metadata
    │   ├── page.tsx            # home: composes all sections
    │   ├── globals.css        # Tailwind + CSS variables (light/dark tokens)
    │   └── projects/
    │       └── [slug]/
    │           └── page.tsx    # project detail page (placeholder + dynamic route)
    ├── components/
    │   ├── theme-provider.tsx  # next-themes wrapper
    │   ├── theme-toggle.tsx    # dark/light button
    │   ├── nav.tsx             # top nav / header
    │   ├── footer.tsx
    │   ├── section.tsx         # shared section wrapper (numbered label + heading)
    │   └── reveal.tsx          # scroll-reveal motion wrapper
    ├── sections/
    │   ├── hero.tsx
    │   ├── about.tsx
    │   ├── projects.tsx
    │   ├── experience.tsx
    │   ├── skills.tsx
    │   └── contact.tsx
    ├── data/
    │   └── projects.ts         # typed project data + slugs (drives list & detail)
    └── lib/
        └── utils.ts            # cn() helper, small utilities
```

## Sections (content is placeholder for now)

1. **Hero** — name, one-line positioning (AI/ML + SWE), short intro, primary links (email, GitHub, LinkedIn, resume). Availability note ("Seeking summer/new-grad roles, 2027").
2. **About** — short bio, what I'm interested in, a photo slot.
3. **Projects** — grid of project cards driven by `data/projects.ts`; each links to a detail page at `/projects/[slug]` with a longer writeup, tech stack, and links.
4. **Experience** — timeline/list of roles and internships.
5. **Skills** — grouped technical skills (languages, ML/AI, infra/tools) rendered as monospace tags.
6. **Contact** — email + social links, clear CTA.

## Build order

1. **Now:** scaffold, dependencies, base layout, global styles, fonts, theme toggle, nav/footer, section scaffolding wired into the home page with placeholders. Project data model + a working detail route.
2. **Next:** fill in real content per section, add project writeups, polish motion, add resume/OG images, deploy to Vercel.
