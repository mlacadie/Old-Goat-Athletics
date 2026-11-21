# Architecture (current)

How the site works **today**. For planned changes see [ROADMAP.md](ROADMAP.md); for terms see [GLOSSARY.md](GLOSSARY.md).

## Stack

- **React 19** + **Vite** single-page app
- **MUI** (Material UI) for components, styled with the `sx` prop
- **React Router** for client-side routing
- **Yarn 4** package manager, **Oxlint** for linting
- **Hosting:** GitHub Pages. Pushing to `main` runs [.github/workflows/deploy.yml](../.github/workflows/deploy.yml), which builds and deploys `dist/`.

There is no backend, database, or user accounts. All content is in the source code.

## Routes

Defined in [src/App.jsx](../src/App.jsx). Every page is wrapped by the Header and Footer.

| Path | Page | Notes |
| --- | --- | --- |
| `/` | [Home](../src/pages/Home.jsx) | Stacked Sections. Supports scrolling to a section via router state (used by the Socials nav link). |
| `/groups` | [Groups](../src/pages/Groups.jsx) | Directory of Groups with sport and state filters. Cards link out to each Group's own website. |
| `/contact` | [Contact](../src/pages/Contact.jsx) | Form posted to Formspree. The endpoint is still a placeholder. |
| `*` | Home | Fallback for unknown paths. |

## Folders

```
src/
  pages/        One component per route
  components/   Header, Footer, and the Home page Sections
  data/         Static content: clubs.json (Groups), navLinks.js
  icons/        Custom icons not in MUI
  theme.js      Brand colors (`colors`) and MUI theme
```

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

## Working conventions

- Check changes with `yarn build` (and `yarn lint`). The site owner runs the dev server themselves.
