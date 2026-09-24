# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal landing page (nazzareno.xyz). Real-time 3D look: three.js wireframes, text-to-mesh hover on the name, GSAP scroll choreography, Lenis smooth scroll. Motion and interactivity are part of the identity (real-time 3D, digital twins), so keep them; only `prefers-reduced-motion` turns them off.

- **Source**: React + Vite in `/nazzfolio`
- **Built output**: deployed by GitHub Actions from `nazzfolio/dist` (the root `index.html`/`assets` are legacy artifacts)

## Development Commands

Run from `/nazzfolio` directory:

```bash
npm run dev      # Fetch GitHub contributions + stats, start dev server
npm run build    # Same fetches, then vite build
npm run fetch:stats   # Refresh stars / npm numbers only
```

`npm run lint` is currently broken: ESLint 9 needs a flat `eslint.config.js`, the repo still has `.eslintrc.cjs`.

## Tech Stack

- React 19 + Vite, Tailwind CSS 3
- three.js (background scene), GSAP + ScrollTrigger, Lenis
- Phosphor Icons (`@phosphor-icons/react`)
- Fonts: Archivo Black (display, uppercase, solid/hollow), IBM Plex Mono (everything else)

## Design

- Background `--bg: #060608`, text `--ink: #eceaf6`, body `--ink-soft: #c3c0d6`, secondary `--muted: #8f8ca8` (keep secondary text at 4.5:1 or better)
- Accent `--accent: #382fbc`, bright accent `--accent-bright: #5a51e8`
- Terminal-style `//` section labels, blinking cursor
- All tokens live in `src/index.css`

## Architecture

- `src/content.js`: all copy, links and data arrays (socials, lanes, projects, tools, now). Edit copy here.
- `src/App.jsx`: page shell, hero, marquee, proof strip, contact, footer, and the GSAP scroll choreography.
- `src/components/`: `Nav`, `WorkWithMe`, `Projects` (+ `TiltMedia`), `Tools`, `HowIWork` (typing terminal), `GitHubCalendar`, `Scene3D`, `MeshText`, `Cursor`, `LocalTime`.
- `scripts/fetch-github-contributions.mjs` and `scripts/fetch-stats.mjs` write `src/data/*.json` at build time (gitignored). Stats cover GitHub stars, npm downloads/version and Gumroad ratings (read from the `data-page` JSON on the public profile, keyed by product permalink). Any number that fails to fetch is hidden.
- Media for project previews in `public/media/`, social card in `public/og.png`.

## Copy rules

All user-facing text in English, first person, conversational. No em dashes, no AI-tell phrasing. Update the `now` block in `content.js` monthly (it shows its date).

## Deployment

Automated via GitHub Actions on push to master (also daily at 04:17 UTC to refresh the calendar and stats).
