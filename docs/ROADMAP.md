# Roadmap

> **Status: planned, not implemented.** This describes where the site is going. Nothing here gets built until a feature is explicitly picked up ("let's build **Group Pages**"). When it is, its section below is the spec. Terms are defined in [GLOSSARY.md](GLOSSARY.md).

## The vision

Old Goat Athletics becomes the home base for former college athletes' Groups. Anyone can browse Groups. Users sign in, add their own Group, and join others. Each Group has its own Group page: a public description for everyone, plus members-only Announcements, Events, and a Members list. Members get a Notification by email or text whenever their Group posts something.

## Features at a glance

Each feature has a short name. Use that name when we talk about building it. Each one has a matching GitHub issue, tracked on the [project board](https://github.com/users/mlacadie/projects/2). Everything is due **Jan 1, 2027** (milestone *Roadmap v1*).

| Issue | Feature | One-liner | Depends on | Status |
| - | --- | --- | --- | --- |
| #12 | **Next.js Migration** | Move from Vite on GitHub Pages to Next.js on Vercel, with no visible changes | – | Done |
| #13 | **TypeScript** | Convert the codebase to TypeScript (`strict`), with no behavior changes | Next.js Migration | Done |
| #1 | **Accounts** | Sign up, sign in, sign out, profile with contact info | Next.js Migration | Done |
| #2 | **Group Pages** | Each Group gets its own page, opened from its Group card | Next.js Migration | Done |
| #3 | **Add a Group** | Signed-in Users add their own Group to the directory | Accounts | Done |
| #19 | **Group Approval** | A Site Admin approves new Groups before they're listed. **Needed before launch.** | Add a Group | Planned |
| #20 | **Group Images** | Owners upload a Group image and Group banner | Add a Group | Planned |
| #4 | **Joining** | Users join/leave Groups and become Members | Accounts, Group Pages | Done |
| #5 | **Members-only Content** | Gate Announcements, Events, and the Members list behind membership | Joining | Done |
| #6 | **Announcements** | Group Owners post updates to their Group | Members-only Content | Planned |
| #7 | **Events & Calendar** | Group Owners post Events; Group page shows upcoming ones | Members-only Content | Planned |
| #8 | **Notifications** | Members get email/text for new Announcements and Events | Announcements or Events | Planned |
| #9 | **Site Redesign** | Update Header and Home page for Visitors and signed-in Users | Accounts, Joining | Planned |
| #10 | **Group View Redesign** | Redesign the Groups page and Group page for Members and Owners | Group Pages | Planned |
| #11 | **Shopify Store** | Replace the Merch placeholder with a real store | – | Planned |

**Suggested build order:** Next.js Migration → TypeScript → Group Pages → Accounts → Add a Group → Group Approval (before launch) → Joining → Members-only Content → Announcements → Events & Calendar → Notifications. **Group View Redesign** and **Site Redesign** follow the features they depend on. **Shopify Store** can happen any time after the migration.

When a feature ships, change its status here, close its issue, and remove the **(planned)** marker from its terms in the glossary.

---

## 0. Next.js Migration

**What it is:** Move the site from Vite + React Router on GitHub Pages to **Next.js (App Router) on Vercel** before building any features. This is a platform move only: the site should look and behave exactly as it does today.

- Existing pages become Next.js routes: `/`, `/groups`, `/contact`, plus a 404 page
- MUI, the theme in `src/theme.ts`, the fonts, all Sections, and `clubs.json` carry over
- React Router, the Vite config, and the GitHub Pages workflow are removed
- Vercel deploys `main` to production and gives every pull request a preview link

**Done when:** the live site runs on Vercel from Next.js, looks the same as before, and GitHub Pages is switched off.

## 0b. TypeScript

**What it is:** Convert every `.js`/`.jsx` file to `.ts`/`.tsx` with `strict` type checking, on its own branch and pull request after the Next.js Migration merges. No behavior or design changes.

- Types for Group data matching the data model below
- Typed theme, nav links, and component props

**Done when:** no JavaScript source files remain, the build type-checks with `strict`, and React Doctor scores 100/100.

---

## 1. Accounts

**What it is:** People can create an account and sign in. A signed-in person is a **User**; a signed-out one is a **Visitor**.

- Sign up collects an **email** (used for Notifications) and an optional first and last name. Users sign in with an email code, a password, or Google.
- **Phone numbers are deferred past the January release.** Notifications start email-only; texts come later (see **Notifications**).
- Sign in / sign out appears in the Header.
- A simple **profile** where a User edits their name, contact info, and Notification preferences.
- Everything browsable today stays browsable without an account.
- Users who set no name show as "Old Goat", never their email.

**Built with:** Clerk for sign-in and the profile, and a Neon Postgres `users` table kept in sync by a Clerk webhook (details in [ARCHITECTURE.md](ARCHITECTURE.md)).

**Done when:** a Visitor can sign up, sign out, sign back in, and edit their profile. The Header shows whether you're signed in.

## 2. Group Pages

**What it is:** Every Group gets its own page at `/groups/:groupId` (e.g. `/groups/old-goat-track-club`), using the Group's existing `id` slug.

- The Group card's "Visit Site" button is removed. Cards get a **View Group** button that opens the Group page; the external website link moves onto the Group page. (Cards also get a **Join** button once **Joining** exists.)
- The Group page shows **public info**: name, sport, location, description, tags, and up to 3 **Group links** (website, socials). Links replace the old single `website` field.
- Every Group has a required Owner (`ownerId`). Existing Groups are owned by the Site Admin until claimed. The page works out the viewer's role (Visitor, User, Member, Owner) on the server so later features can add members-only content and Owner controls by role.
- Built from design **G** in [Groups Page Designs](https://claude.ai/artifact/V31KU4Zmjb31sPajZsLQ6d#artboard-GroupLinks), public parts only.
- The Group page has a banner across the top: the Group banner if one exists (from **Add a Group**), otherwise a branded banner using the default Group image (`public/logos/OGTC_OGoatG_KC.svg`).
- Space is reserved for members-only content (filled in by later features).
- Unknown Group ids show a friendly "Group not found" page.

**Done when:** every Group on the Groups page has a working Group page you can link to directly.

## 3. Add a Group

**What it is:** Any User can add a Group. The person who adds it becomes its **Group Owner**.

- An "Add your Group" button on the Groups page. Visitors who click it are asked to sign in first.
- The form uses the same fields the Groups page already uses: name, sport, city, state, country, description, tags.
- The form prompts the Owner for up to 3 optional **Group links** (label + URL), such as the Group's website, Instagram, or Strava.
- **Sport** is picked from a set list of sports that we maintain, not typed in, so the Groups page's sport filter stays clean (no "Running" and "running" as separate pills). **Other** is always the last option in the list. The list lives in the code (e.g. `src/data/sports.ts`) and grows as new sports come up.
- The Group Owner can edit their Group's info and links later, from **Edit Group** on the Group page.
- New Groups appear on the Groups page with the existing ones, **right away**. Approval comes later with **Group Approval**.
- Group image and banner uploads are split out into **Group Images**.
- The three Groups that were in `clubs.json` are test placeholders owned by `"site-admin"`. There is no claiming flow.

**Done when:** a User can add a Group, see it on the Groups page, open its Group page, and edit it.

## 3b. Group Approval

**What it is:** Before the site goes live, a Site Admin approves new Groups so nobody can list just anything (spam, duplicates, junk).

- New Groups start as **pending**: hidden from the Groups page, but their Owner can see and edit them.
- A Site Admin sees pending Groups and approves or rejects each one.
- Decide how someone becomes a Site Admin (e.g. an `admin` role in Clerk public metadata), whether editing an approved Group sends it back for review, and whether the Owner gets an email when their Group is approved or rejected.

**Done when:** a Group added by a User only appears on the Groups page after a Site Admin approves it.

## 3c. Group Images

**What it is:** Group Owners upload an optional **Group image** (shown on the Group card and Group page) and an optional **Group banner** (shown across the top of the Group page) when adding or editing a Group. Without them the default Group image (`public/logos/OGTC_OGoatG_KC.svg`) is used, as today.

- Likely stored in **Vercel Blob** (a Blob store in Vercel adds `BLOB_READ_WRITE_TOKEN`).
- Replacing or removing an image deletes the old file.

**Done when:** an Owner can add, replace, and remove their Group's image and banner, and they show on the Group card and Group page.

## 4. Joining

**What it is:** A User can **join** a Group and become a **Member**. Membership is per Group.

- A **Join** button on the Group page and on each Group card. Visitors are asked to sign in first.
- Members see a **Leave** button instead.
- Joining a Group also turns on its Notifications. Join and subscribe are the same action.
- A User can see the Groups they've joined, and the ones they own, in **My Groups** on their profile, filtered by All / Owned / Joined.
- **Decided:** anyone can join instantly (no Owner approval). The Group Owner counts as a Member by owning the Group, with no separate Membership. Leave takes effect right away, without a confirmation. No member counts are shown.

**Done when:** a User can join and leave Groups, and the Group page reflects whether they're a Member.

## 5. Members-only Content

**What it is:** Parts of the Group page that only Members can see.

- Members-only content: **Announcements**, **Events / Calendar**, **Members list**.
- Visitors and non-member Users see the public info plus a prompt to sign in or join where that content would be.
- Enforced on the server: members-only data is never sent to non-members. Hiding it in the UI is not enough.
- The **Members list** shows each Member's display name (not contact info).
- **Decided:** built from design **G**. Members see Next up, Latest Announcements, the Calendar, and the Members list (avatars plus **See all**, a dialog of display names). Non-members see the join prompt in place of Next up and locked, grayed-out placeholders of the other cards, with no counts. Members can't hide themselves from the list. Next up, Announcements, and the Calendar's Events show empty states until **Announcements** and **Events & Calendar** fill them through the same server-side gate.

**Done when:** a non-member cannot get members-only content by any means, and a Member sees all of it.

## 6. Announcements

**What it is:** Posts from a Group to its Members: news, updates, reminders.

- The Group Owner writes an Announcement (title + body) from the Group page.
- Members see Announcements newest first on the Group page.
- The Owner can edit or delete their Announcements.
- Posting an Announcement triggers a Notification (once **Notifications** exists).

**Done when:** an Owner can post, edit, and delete Announcements, and Members see them.

## 7. Events & Calendar

**What it is:** Things happening on a date: workouts, races, socials.

- An Event has a title, date, start time (optional end time), location, and description.
- The Group page shows **upcoming Events** as a list and/or **Calendar**. Past Events drop off or move to a "past" view.
- The Owner can edit or cancel Events.
- Creating, changing, or cancelling an Event triggers a Notification (once **Notifications** exists).

**Done when:** an Owner can manage Events, and Members see upcoming Events on the Group page.

## 8. Notifications

**What it is:** Messages sent to Members when their Group posts something.

- Sent for: new Announcements, new Events, and Event changes or cancellations.
- **Channels:** email and text (SMS), using contact info from the User's profile.
- Users pick their channel(s) in their profile. Text requires a phone number and explicit opt-in.
- Every Notification links back to the Group page.
- Every email has an unsubscribe link, and texts support STOP.

**Done when:** a Member reliably gets a Notification on their chosen channel when their Group posts, and can turn Notifications off.

## 9. Site Redesign

**What it is:** Update the overall site, especially the **Header** and **Home page**, so it fits the new features and works for both Visitors and signed-in Users.

- Header: Sign in / Sign up for Visitors; profile, My Groups, and Sign out for Users
- Hero buttons may change to "Join a Group" / "Add your Group"
- Community section could feature real Groups instead of one external link
- Merch section changes once the **Shopify Store** exists
- Decide whether signed-in Users get a different Home page (their Groups, upcoming Events, recent Announcements)

**Done when:** the Header and Home page design covers Visitors and Users, and is built.

## 10. Group View Redesign

**What it is:** Redesign the **Groups page** and the **Group page** so they hold up once Groups have Members, Announcements, and Events.

- Group cards: Group image (or default), View Group and Join buttons, member count, next Event, "Joined" badge; search alongside sport/state filters; works with many Groups
- "Add your Group" on the Groups page, which asks Visitors to sign in first
- The Groups page layout from design A is built (see [ARCHITECTURE.md](ARCHITECTURE.md)); its View Group, Join, and Add your Group buttons get wired up by **Group Pages**, **Joining**, and **Add a Group**
- Design directions to choose from (photo cards, directory list, badge cards, plus the Group page banner): [Groups Page Designs](https://claude.ai/artifact/V31KU4Zmjb31sPajZsLQ6d)
- Group page: design **G** is chosen (Next up + Calendar for Members, Group links, Owner toolbar strip). **Group Pages** built its public parts; the members-only and Owner parts are built with the features they depend on
- Group page: clear split between public info and members-only content; placement of Join / Leave and the sign in / join prompt
- Owner-only controls (edit Group, post Announcement, add Event) that don't clutter the Member view

**Done when:** both pages are designed and built for Visitors, Members, and Group Owners.

## 11. Shopify Store

**What it is:** Sell Old Goat Athletics merch through Shopify, replacing the "In the works" Merch placeholder.

- Either link out to the Shopify storefront, or show products on the site (Buy Button / Storefront API)
- Checkout always happens through Shopify
- Possibly a "Shop" link in the Header

**Done when:** a Visitor can find merch from the site and buy it.

---

## Data model (conceptual)

The things the site will need to store, whatever technology we pick:

```
User ──< Membership >── Group
                          │
                          ├──< Announcement
                          └──< Event
Group ── owner ──> User
Notification ──> User (recipient), Announcement | Event (source)
```

| Entity | Key fields |
| --- | --- |
| **User** | id, display name, email, phone (optional), notification preferences, created at |
| **Group** | id (slug), name, sport, city, state, country, description, tags, links (up to 3, each label + URL), image (optional), banner (optional), owner (User, required), created at |
| **Membership** | user, group, joined at. Stored in the `memberships` table. The Owner has no Membership (ownership is `Group.owner`); a role column (e.g. co-admins) may come later. |
| **Announcement** | id, group, author, title, body, created/updated at |
| **Event** | id, group, author, title, description, location, starts at, ends at, cancelled |
| **Notification** | id, recipient, source (Announcement/Event), channel, sent at, status |

Groups are stored in the `groups` table (see [ARCHITECTURE.md](ARCHITECTURE.md)). `image` and `banner` are optional, so Groups without them use the default Group image.

## Technical direction

Today the site is a static Vite app on GitHub Pages (see [ARCHITECTURE.md](ARCHITECTURE.md)).

**Decided:** move to **Next.js (App Router) hosted on Vercel** (see **Next.js Migration**). Next.js lets server code live in the same project: pages rendered on the server, server-side data access, API routes, and scheduled jobs.

From **Accounts** onward we also need:

- **Authentication**: user accounts and sessions.
- **A database** for the entities above.
- **Server-side access control** for members-only content, enforced in Next.js server code and/or database rules.
- **Email and SMS delivery** for Notifications.

**Decided with Accounts:** **Clerk** for authentication and **Neon** Postgres (with Drizzle ORM) for the database, both through the Vercel Marketplace. Group images and banners will likely use **Vercel Blob** (decide with **Add a Group**).

**Not decided yet:** which email/SMS services to use. Choose them with **Notifications**.

## Open questions

Decide these before or while building the feature in brackets.

1. ~~**[Joining]** Can anyone join instantly, or does the Group Owner approve requests?~~ Instantly. Owner approval can be added later if Groups need it.
2. **[Announcements / Events]** Can only the Owner post, or can they promote Members to co-admins?
3. ~~**[Add a Group]** Do new Groups appear immediately, or does a Site Admin approve them first?~~ Immediately for now. Site Admin approval is required before launch (**Group Approval**), which also handles duplicates and spam.
4. ~~**[Add a Group]** The Groups already in `clubs.json` have no Owner. Are they claimed by someone, owned by a Site Admin, or left read-only?~~ They are test placeholders owned by `"site-admin"`. No claiming flow is needed.
5. **[Accounts]** What happens to a Group if its Owner leaves or deletes their account? Can ownership transfer?
6. ~~**[Accounts]** Is the phone number required, optional, or only asked for if the User wants texts?~~ Not collected for the January release. Revisit with **Notifications** when texts are added.
7. **[Notifications]** Can Members choose a channel per Group, mute a Group, or get a digest instead of every post?
8. ~~**[Members-only Content]** Can a Member hide themselves from the Members list?~~ No, not for now. Add a setting later if Members ask for one.
9. ~~**[Members-only Content]** Should non-members see a teaser, e.g. "3 upcoming Events, join to see"?~~ No counts. They see the join prompt and locked, grayed-out placeholders of the cards instead.
10. **[Events & Calendar]** Do Events need recurring schedules, RSVPs, or reminder Notifications before they start?
11. ~~**[Next.js Migration]** Is there a custom domain to move?~~ No domain yet; the site uses its Vercel URL for now.
12. **[Shopify Store]** Does the Shopify store already exist? Link out or show products on the site? Do Members get perks?
13. **[Site Redesign]** Should signed-in Users get a different Home page?
14. **[Group Images]** Where are uploaded Group images and banners stored, and what are the limits (file types, max size, crop or aspect ratio)? Do they need moderation?
