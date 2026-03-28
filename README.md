# The Gazette Hub

A multi-brand, editorial-style news app built with React, TypeScript, Vite, and Tailwind CSS.

The project lets you:
- Browse multiple newspaper brands with distinct visual identities.
- Navigate sections, full article pages, archive, and search.
- Configure brand styling (palette, typography, theme) from the UI.
- Edit article content in-app and persist changes in `localStorage`.

## Quick Start

Prerequisites:
- Node.js 20+ recommended
- npm 10+ recommended

Install and run:

```bash
npm install
npm run dev
```

Default dev URL:
- `http://localhost:3000`

## Available Scripts

- `npm run dev`: Start Vite dev server on `0.0.0.0:3000`
- `npm run build`: Production build to `dist/`
- `npm run preview`: Preview the production build
- `npm run lint`: Type-check with TypeScript (`tsc --noEmit`)
- `npm run clean`: Remove `dist/`

## Tech Stack

- React 19
- TypeScript
- Vite 6
- Tailwind CSS 4 (`@tailwindcss/vite`)
- React Router 7
- Motion (`motion/react`) for page and UI transitions

## App Routes

- `/`: Home/front page
- `/article/:id`: Full article page
- `/sections` and `/sections/:name`: Section views
- `/search`: Search experience
- `/archive`: Archive page
- `/hub`: Brand hub
- `/config`: Brand and content configuration
- `/editor/:brandId/:articleId`: Article editor
- `/about`, `/contact`, `/terms`: Static pages

## Data and State Model

- Seed data lives in `src/constants.ts` as `MOCK_BRANDS`.
- Global state is managed in `src/context/NewspaperContext.tsx`.
- Brand data is normalized through `src/brandDesign.ts`.
- Runtime edits are saved to browser `localStorage` under:
  - `newspaper_brands`
  - `current_brand_index`

## Project Structure

```text
src/
  components/       # Layout, header, and article presentation components
  context/          # Global state provider for brands and publication data
  pages/            # Route-level pages (home, config, editor, archive, etc.)
  lib/              # Shared utilities
  brandDesign.ts    # Palette/font systems and design normalization
  constants.ts      # Seed brand + article content
  types.ts          # Domain models
```

## Customization Workflow

1. Open `/config` to adjust theme, palette, and typography.
2. Add or remove brands from the same screen.
3. Edit article markdown in the content editor.
4. Refresh the app to verify persisted local state behavior.

If you want permanent baseline content changes, edit `src/constants.ts` directly.

## Notes

- This project no longer depends on AI Studio-specific Vite config behavior.
- `.env.example` exists for optional future integrations, but the current UI works without environment variables.
