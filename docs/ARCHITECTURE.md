# Architecture (current)

How the site works **today**. For planned changes see [ROADMAP.md](ROADMAP.md); for terms see [GLOSSARY.md](GLOSSARY.md).

## Stack

- **Next.js 16** (App Router) + **React 19**, written in JavaScript (TypeScript is planned: issue #13)
- **MUI** (Material UI) for components, styled with the `sx` prop. Wired into Next.js with `@mui/material-nextjs` so styles are rendered on the server.
- **Yarn 4** package manager, **Oxlint** for linting, **React Doctor** for React health checks
- **Hosting:** Vercel. Pushes to `main` deploy to production; every pull request gets a preview deployment.

There is no backend, database, or user accounts yet. All content is in the source code, and every page is prerendered as static HTML at build time.

## Routes

Each route is a folder under [src/app/](../src/app/). Every page is wrapped by [layout.jsx](../src/app/layout.jsx), which renders the Header, the page, and the Footer.

| Path | Files | Notes |
| --- | --- | --- |
| `/` | [app/page.jsx](../src/app/page.jsx) | Stacked Home page Sections from `src/components/`. |
| `/groups` | [app/groups/](../src/app/groups/) | Directory of Groups with sport and state filters. Cards link out to each Group's own website. |
| `/contact` | [app/contact/](../src/app/contact/) | Form posted to Formspree. The endpoint is still a placeholder. |
| anything else | [app/not-found.jsx](../src/app/not-found.jsx) | 404 page with a link home. |

**Pattern:** `page.jsx` is a server component that exports `metadata` (page title and description) and renders the page's client component (e.g. `GroupsPage.jsx`), which holds the interactive UI.

## Server vs. client components

- Files starting with `'use client'` run in the browser too. Anything with state, effects, event handlers, or `component={Link}` needs it.
- Files without it are server components (the `page.jsx` files, `layout.jsx`, and simple Sections like Mission, Merch, Socials).
- [ThemeRegistry.jsx](../src/components/ThemeRegistry.jsx) provides the MUI theme and CSS baseline to the whole app.

## Navigation

- Internal links use Next.js `Link` (`component={Link}` on MUI components).
- Nav links live in [src/data/navLinks.js](../src/data/navLinks.js) as `{ label, href }`. Links to a Home page Section use a hash, e.g. `/#socials`. Smooth scrolling comes from `scroll-behavior: smooth` in [globals.css](../src/app/globals.css).

## Folders

```
public/         Static files served from the site root (logos/, team.png)
src/
  app/          Next.js routes: layout, pages, 404, global CSS
  components/   Header, Footer, ThemeRegistry, and the Home page Sections
  data/         Static content: clubs.json (Groups), navLinks.js
  icons/        Custom icons not in MUI
  theme.js      Brand colors (`colors`) and MUI theme
```

Don't create `src/pages/`: Next.js would treat it as the old Pages Router.

## Group data

Groups live in [src/data/clubs.json](../src/data/clubs.json) as an array. Adding or editing a Group currently means editing this file and redeploying.

```json
{
  "id": "old-goat-track-club",   // unique, URL-safe slug
  "name": "Old Goat Track Club",
  "sport": "Running",            // drives the sport filter
  "city": "Waltham",
  "state": "MA",                 // drives the state filter
  "country": "USA",
  "description": "...",
  "website": "https://...",      // "Visit Site" button
  "tags": ["masters", "..."]
}
```

## Checks (required before work is done)

| Command | Must be |
| --- | --- |
| `yarn build` | succeeds |
| `yarn lint` | no errors or warnings |
| `yarn doctor` | **100 / 100** |

The site owner runs the dev server (`yarn dev`) themselves.
