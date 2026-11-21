# Architecture (current)

How the site works **today**. For planned changes see [ROADMAP.md](ROADMAP.md); for terms see [GLOSSARY.md](GLOSSARY.md).

## Stack

- **Next.js 16** (App Router) + **React 19**, written in **TypeScript** with `strict` type checking
- **MUI** (Material UI) for components, styled with the `sx` prop. Wired into Next.js with `@mui/material-nextjs` so styles are rendered on the server.
- **Yarn 4** package manager, **Oxlint** for linting, **React Doctor** for React health checks
- **Hosting:** Vercel. Pushes to `main` deploy to production; every pull request gets a preview deployment.

There is no backend, database, or user accounts yet. All content is in the source code, and every page is prerendered as static HTML at build time.

## Routes

Each route is a folder under [src/app/](../src/app/). Every page is wrapped by [layout.tsx](../src/app/layout.tsx), which renders the Header, the page, and the Footer. [globals.css](../src/app/globals.css) makes `<main>` at least one full screen tall and stretches the page's last section to fill it, so the Footer stays below the fold on short pages. Pages don't need their own `minHeight`.

| Path | Files | Notes |
| --- | --- | --- |
| `/` | [app/page.tsx](../src/app/page.tsx) | Stacked Home page Sections from [components/home/](../src/components/home/). |
| `/groups` | [app/groups/page.tsx](../src/app/groups/page.tsx) | Renders [components/groups/GroupsPage.tsx](../src/components/groups/GroupsPage.tsx): directory of Groups with search (name, sport, city, state, tags), sport pills ([SportPills.tsx](../src/components/groups/SportPills.tsx): scrolls sideways with arrow buttons and edge fades once the pills overflow), and a state filter. Each Group is a [GroupCard.tsx](../src/components/groups/GroupCard.tsx); its "View Group" button opens the Group page. The "Add your Group" and "Join" buttons are placeholders with no action yet. |
| `/groups/[groupId]` | [app/groups/[groupId]/page.tsx](../src/app/groups/[groupId]/page.tsx), [not-found.tsx](../src/app/groups/[groupId]/not-found.tsx) | The Group page, one per Group, prerendered at build time from `generateStaticParams`. Renders [GroupPage.tsx](../src/components/groups/GroupPage.tsx): [GroupHero.tsx](../src/components/groups/GroupHero.tsx) (Group banner or branded fallback, sport and location, name, Join) and an About row with the description, tags, and [GroupLinks.tsx](../src/components/groups/GroupLinks.tsx). Unknown ids show "Group not found". Join is a placeholder. |
| `/contact` | [app/contact/page.tsx](../src/app/contact/page.tsx) | Renders [components/contact/ContactPage.tsx](../src/components/contact/ContactPage.tsx): form posted to Formspree. The endpoint is still a placeholder. |
| anything else | [app/not-found.tsx](../src/app/not-found.tsx) | 404 page with a link home. |

**Pattern:** files in `src/app/` stay thin. Each `page.tsx` is a server component that exports `metadata` (page title and description) and renders a component from `src/components/<page>/`, which holds the UI.

## Server vs. client components

- Files starting with `'use client'` run in the browser too. Anything with state, effects, event handlers, or `component={Link}` needs it.
- Files without it are server components (the `page.tsx` files, `layout.tsx`, and simple Sections like Mission, Merch, Socials).
- [ThemeRegistry.tsx](../src/components/layout/ThemeRegistry.tsx) provides the MUI theme and CSS baseline to the whole app.

## Navigation

- Internal links use Next.js `Link` (`component={Link}` on MUI components).
- Nav links live in [src/data/navLinks.ts](../src/data/navLinks.ts) as `{ label, href }`. Links to a Home page Section use a hash, e.g. `/#socials`. Smooth scrolling comes from `scroll-behavior: smooth` in [globals.css](../src/app/globals.css).

## Folders

```
public/         Static files served from the site root (logos/, team.png)
src/
  app/          Next.js routes only: layout, page.tsx files, 404, global CSS
  components/
    layout/     Site-wide: Header, Footer, ThemeRegistry
    home/       Home page Sections: Hero, Mission, IAmNow, Merch, Community, Socials
    groups/     Groups page and Group page components
    contact/    Contact page components
    icons/      Custom icons not in MUI
  data/         Static content: clubs.json + groups.ts (Groups), navLinks.ts
  lib/          Non-UI logic shared by pages (e.g. viewer.ts: who is looking at a Group page)
  types/        Shared TypeScript types (e.g. `Group`, `User`)
  theme.ts      Brand colors (`colors`) and MUI theme
```

New components go in the folder for the page that uses them. Components shared by several pages go in a folder named for what they are (e.g. `components/common/`) once there is more than one.

Don't create `src/pages/`: Next.js would treat it as the old Pages Router.

## Group data

Groups live in [src/data/clubs.json](../src/data/clubs.json) as an array. Import them through [src/data/groups.ts](../src/data/groups.ts) (`GROUPS`, `getGroup(id)`, `DEFAULT_GROUP_IMAGE`), which types them with the `Group` type from [src/types/group.ts](../src/types/group.ts) and drops any links past `MAX_GROUP_LINKS` (3). Adding or editing a Group currently means editing this file and redeploying.

```json
{
  "id": "old-goat-track-club",   // unique, URL-safe slug
  "name": "Old Goat Track Club",
  "sport": "Running",            // drives the sport filter
  "city": "Waltham",
  "state": "MA",                 // drives the state filter
  "country": "USA",
  "description": "...",
  "tags": ["masters", "..."],    // searchable on the Groups page
  "ownerId": "site-admin",       // required; the User who can edit the Group (see below)
  "links": [                     // up to 3, shown on the Group page; icon picked from the URL's site
    { "label": "Website", "url": "https://..." }
  ],
  "image": "/groups/....jpg",    // optional Group image; defaults to /logos/OGTC_OGoatG_KC.svg
  "banner": "/groups/....jpg"    // optional Group banner; defaults to a branded navy banner
}
```

Every Group has an Owner. Groups listed before Accounts existed are owned by the placeholder `"site-admin"` until someone claims them.

## Who is viewing (groundwork for Accounts)

[src/lib/viewer.ts](../src/lib/viewer.ts) decides how the person looking at a Group page relates to it. `getCurrentUser()` returns the signed-in User (always `null` until **Accounts**), and `getGroupRole(group, user)` turns that into a `GroupRole`: `visitor`, `user`, `member` (once **Joining** exists), or `owner`. The Group page's server component works out the role and passes it down, so members-only content and Owner controls can be added by checking the role without restructuring the page. Members-only data must still be checked on the server, never only hidden in the UI.

## Checks (required before work is done)

| Command | Must be |
| --- | --- |
| `yarn build` | succeeds |
| `yarn lint` | no errors or warnings |
| `yarn doctor` | **100 / 100** |

The site owner runs the dev server (`yarn dev`) themselves.
