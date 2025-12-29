# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal links page (nazzareno.xyz) - Terminal Elegance style.

- **Source**: React + Vite in `/nazzfolio`
- **Built output**: Root folder (for GitHub Pages)

## Development Commands

Run from `/nazzfolio` directory:

```bash
npm run dev      # Start dev server
npm run deploy   # Build and copy to root for GitHub Pages
npm run lint     # Lint code
```

## Tech Stack

- React 18 + Vite
- Tailwind CSS
- Lucide React icons
- Fonts: Playfair Display (titles), Fira Code (body)

## Design

- Dark theme: #0a0a0a background
- Accent color: #382FBC (electric blue)
- Terminal-style `//` section labels
- Blinking cursor animation

## Architecture

Single `App.jsx` component with data arrays for links (social, projects, products, contact). Simple, flat structure - no routing needed.

## Deployment

Automated via GitHub Actions. Just push to master:

```bash
git add -A && git commit -m "Update" && git push
```

The workflow builds the React app and deploys to GitHub Pages automatically.
