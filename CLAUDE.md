# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website (nazzarenogiannelli.github.io) with two versions:
- **Active**: React + Vite application in `/nazzfolio`
- **Legacy**: Static HTML at root level (superseded)

## Development Commands

All commands run from the `/nazzfolio` directory:

```bash
# Start dev server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Tech Stack

- **Runtime**: Node.js with npm
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React, Simple Icons
- **Animation**: react-typed for text effects

## Architecture

Single-page portfolio with monolithic `App.jsx` component containing all sections (hero, about, expertise, projects, products, contact). Data for projects, expertise areas, and products are defined as arrays within the component and rendered via map.

Design uses dark theme with purple accent (#4037db) and fonts from Google Fonts (Playfair Display, Fira Sans, Roboto Mono).

## Deployment

Static site hosted on GitHub Pages. The `CNAME` file configures custom domain settings.
