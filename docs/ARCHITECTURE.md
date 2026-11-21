# Architecture (current)

How the site works **today**. For planned changes see [ROADMAP.md](ROADMAP.md); for terms see [GLOSSARY.md](GLOSSARY.md).

## Stack

- **Next.js 16** (App Router) + **React 19**, written in **TypeScript** with `strict` type checking
- **MUI** (Material UI) for components, styled with the `sx` prop. Wired into Next.js with `@mui/material-nextjs` so styles are rendered on the server.
- **Yarn 4** package manager, **Oxlint** for linting, **React Doctor** for React health checks
- **Hosting:** Vercel. Pushes to `main` deploy to production; every pull request gets a preview deployment.
- **Accounts:** Clerk (sign in, sign up, profile, sessions). Installed through the Vercel Marketplace.
- **Database:** Neon Postgres (via the Vercel Marketplace), queried with **Drizzle ORM** over Neon's HTTP driver.

Groups are still in the source code (see **Group data**). Pages that don't depend on who is viewing are prerendered as static HTML at build time; Group pages and account pages are rendered per request.

## Routes

Each route is a folder under [src/app/](../src/app/). Every page is wrapped by [layout.tsx](../src/app/layout.tsx), which renders the Header, the page, and the Footer. [globals.css](../src/app/globals.css) makes `<main>` at least one full screen tall and stretches the page's last section to fill it, so the Footer stays below the fold on short pages. Pages don't need their own `minHeight`.

| Path | Files | Notes |
| --- | --- | --- |
| `/` | [app/page.tsx](../src/app/page.tsx) | Stacked Home page Sections from [components/home/](../src/components/home/). |
| `/groups` | [app/groups/page.tsx](../src/app/groups/page.tsx) | Renders [components/groups/GroupsPage.tsx](../src/components/groups/GroupsPage.tsx): directory of Groups with search (name, sport, city, state, tags), sport pills ([SportPills.tsx](../src/components/groups/SportPills.tsx): scrolls sideways with arrow buttons and edge fades once the pills overflow), and a state filter. Each Group is a [GroupCard.tsx](../src/components/groups/GroupCard.tsx); its "View Group" button opens the Group page. The "Add your Group" and "Join" buttons are placeholders with no action yet. |
| `/groups/[groupId]` | [app/groups/[groupId]/page.tsx](../src/app/groups/[groupId]/page.tsx), [not-found.tsx](../src/app/groups/[groupId]/not-found.tsx) | The Group page, one per Group (ids from `generateStaticParams`), rendered per request because it checks who is viewing. Renders [GroupPage.tsx](../src/components/groups/GroupPage.tsx): [GroupHero.tsx](../src/components/groups/GroupHero.tsx) (Group banner or branded fallback, sport and location, name, Join) and an About row with the description, tags, and [GroupLinks.tsx](../src/components/groups/GroupLinks.tsx). Unknown ids show "Group not found". Join is a placeholder. |
| `/sign-in`, `/sign-up` | [app/sign-in/[[...sign-in]]/page.tsx](../src/app/sign-in/[[...sign-in]]/page.tsx), [app/sign-up/[[...sign-up]]/page.tsx](../src/app/sign-up/[[...sign-up]]/page.tsx) | Clerk's `<SignIn>` / `<SignUp>` forms inside [AccountSection.tsx](../src/components/account/AccountSection.tsx). Catch-all folders because Clerk adds its own sub-steps (e.g. `/sign-in/factor-one`). |
| `/profile` | [app/profile/page.tsx](../src/app/profile/page.tsx), [actions.ts](../src/app/profile/actions.ts) | Signed-in Users only. Renders [ProfileView.tsx](../src/components/account/ProfileView.tsx): Clerk's `<UserProfile>` (name, email, password, Google) with hash routing (tabs switch in the browser, e.g. `/profile#/security`) plus our own Notifications tab ([NotificationSettings.tsx](../src/components/account/NotificationSettings.tsx)), saved by a server action. |
| `/api/webhooks/clerk` | [app/api/webhooks/clerk/route.ts](../src/app/api/webhooks/clerk/route.ts) | Clerk calls this on account create, update, and delete; keeps the `users` table in sync. |
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
    account/    Sign in, sign up, and profile page components
    home/       Home page Sections: Hero, Mission, IAmNow, Merch, Community, Socials
    groups/     Groups page and Group page components
    contact/    Contact page components
    icons/      Custom icons not in MUI
  data/         Static content: clubs.json + groups.ts (Groups), navLinks.ts
  db/           Database: schema.ts (Drizzle tables) and index.ts (the `db` client)
  lib/          Non-UI logic shared by pages (viewer.ts: who is looking; users.ts: users table; displayName.ts)
  types/        Shared TypeScript types (e.g. `Group`, `User`)
  theme.ts      Brand colors (`colors`) and MUI theme
  proxy.ts      Clerk on every request; protects User-only routes (Next.js 16's name for middleware)
drizzle/        Generated SQL migrations (committed)
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

## Accounts

- **Clerk owns sign-in.** Users sign in with an email code, a password, or Google (switched on in the Clerk dashboard, not in code). Names are Clerk's optional first and last name. [layout.tsx](../src/app/layout.tsx) wraps the app in `<ClerkProvider>`, which points at our `/sign-in` and `/sign-up` pages and styles Clerk's forms with the theme's navy, font, and corner radius.
- **[proxy.ts](../src/proxy.ts)** runs Clerk on every request. Every page is public except those in `isUserOnlyRoute` (currently `/profile`), which send Visitors to sign in.
- **Header:** Visitors get **Sign in** (and **Sign up** in the mobile menu); signed-in Users get Clerk's `<UserButton>` avatar menu with Profile and Sign out. It uses Clerk's `useAuth()` because the Header is a client component.
- **Display name:** first and last name, or `"Old Goat"` if neither is set. Never fall back to the email: the Members list must not show contact info. Lives in `getDisplayName()` in [displayName.ts](../src/lib/displayName.ts).
- **Phone numbers** are not collected yet (deferred past the January release), so Notifications are email-only.

## Database

Neon Postgres, accessed with Drizzle. The schema is [src/db/schema.ts](../src/db/schema.ts); server code calls `getDb()` from [src/db/index.ts](../src/db/index.ts), which connects on first use, so pages that never query the database (and `yarn build`) work without `DATABASE_URL`. Only server code may touch the database ([users.ts](../src/lib/users.ts) imports `server-only` to enforce this).

**`users`** mirrors each Clerk account: `id` (the Clerk user id), `display_name`, `email` (primary email; null if the account has none), `email_notifications` (default on), `created_at`, `updated_at`. It is kept in sync two ways:

1. **Clerk webhook** (`/api/webhooks/clerk`): on `user.created` / `user.updated` it upserts the row from the event's own user data (no call back to Clerk, so late or retried events still succeed); on `user.deleted` it deletes it.
2. **Profile page:** opening `/profile` upserts the row too, writing only if the name or email changed. This covers local development, where Clerk can't reach the webhook, and any missed webhook.

### Environment variables

Set in Vercel by the Clerk and Neon integrations (Preview and Production). They are secret, so `vercel env pull` can't download them; copy them into `.env.local` by hand for local work.

| Variable | From |
| --- | --- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY` | Clerk dashboard → API keys (Development instance until there's a domain) |
| `CLERK_WEBHOOK_SIGNING_SECRET` | Clerk dashboard → Webhooks → the endpoint's signing secret. Add to Vercel by hand. |
| `DATABASE_URL` | Neon. Locally, use the connection string of the Neon **`dev` branch**, never production. |

### Changing the schema

1. Edit [schema.ts](../src/db/schema.ts).
2. `yarn db:generate --name <what_changed>` writes a SQL migration to `drizzle/`. Commit it.
3. `yarn db:migrate` applies it to the database in `.env.local` (the `dev` branch).
4. On Vercel, the `vercel-build` script runs `drizzle-kit migrate` before `next build`, so each deployment migrates the database it's connected to. Local `yarn build` doesn't migrate.

## Who is viewing

[src/lib/viewer.ts](../src/lib/viewer.ts) decides how the person looking at a Group page relates to it. `getCurrentUserId()` returns the signed-in User's id from the session token (no network call; `null` for a Visitor), and `getGroupRole(group, userId)` turns that into a `GroupRole`: `visitor`, `user`, `member` (once **Joining** exists), or `owner`. The Group page's server component works out the role and passes it down, so members-only content and Owner controls can be added by checking the role without restructuring the page. Members-only data must still be checked on the server, never only hidden in the UI.

## Checks (required before work is done)

| Command | Must be |
| --- | --- |
| `yarn build` | succeeds |
| `yarn lint` | no errors or warnings |
| `yarn doctor` | **100 / 100** |

The site owner runs the dev server (`yarn dev`) themselves.
