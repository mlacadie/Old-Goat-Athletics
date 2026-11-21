# Roadmap

> **Status: planned, not implemented.** This describes where the site is going. Nothing here gets built until a feature is explicitly picked up ("let's build **Group Pages**"). When it is, its section below is the spec. Terms are defined in [GLOSSARY.md](GLOSSARY.md).

## The vision

Old Goat Athletics becomes the home base for former college athletes' Groups. Anyone can browse Groups. Users sign in, add their own Group, and join others. Each Group has its own Group page: a public description for everyone, plus members-only Announcements, Events, and a Members list. Members get a Notification by email or text whenever their Group posts something.

## Features at a glance

Each feature has a short name. Use that name when we talk about building it.

| # | Feature | One-liner | Depends on | Status |
| - | --- | --- | --- | --- |
| 1 | **Accounts** | Sign up, sign in, sign out, profile with contact info | – | Planned |
| 2 | **Group Pages** | Each Group gets its own page, opened from its Group card | – | Planned |
| 3 | **Add a Group** | Signed-in Users add their own Group to the directory | Accounts | Planned |
| 4 | **Joining** | Users join/leave Groups and become Members | Accounts, Group Pages | Planned |
| 5 | **Members-only Content** | Gate Announcements, Events, and the Members list behind membership | Joining | Planned |
| 6 | **Announcements** | Group Owners post updates to their Group | Members-only Content | Planned |
| 7 | **Events & Calendar** | Group Owners post Events; Group page shows upcoming ones | Members-only Content | Planned |
| 8 | **Notifications** | Members get email/text for new Announcements and Events | Announcements or Events | Planned |

**Suggested build order:** 2 → 1 → 3 → 4 → 5 → 6 → 7 → 8. Group Pages can ship first on today's static data, before there are accounts.

When a feature ships, change its status here and remove the **(planned)** marker from its terms in the glossary.

---

## 1. Accounts

**What it is:** People can create an account and sign in. A signed-in person is a **User**; a signed-out one is a **Visitor**.

- Sign up collects a display name plus the contact info used for Notifications: **email** and/or **phone number**.
- Sign in / sign out appears in the Header.
- A simple **profile** where a User edits their name, contact info, and Notification preferences.
- Everything browsable today stays browsable without an account.

**Done when:** a Visitor can sign up, sign out, sign back in, and edit their profile. The Header shows whether you're signed in.

## 2. Group Pages

**What it is:** Every Group gets its own page at `/groups/:groupId` (e.g. `/groups/old-goat-track-club`), using the Group's existing `id` slug.

- Clicking a Group card on the Groups page opens its Group page. The external website link moves onto the Group page instead of being the card's main action.
- The Group page shows **public info**: name, sport, location, description, website, tags.
- Space is reserved for members-only content (filled in by later features).
- Unknown Group ids show a friendly "Group not found" page.

**Done when:** every Group on the Groups page has a working Group page you can link to directly.

## 3. Add a Group

**What it is:** Any User can add a Group. The person who adds it becomes its **Group Owner**.

- An "Add your Group" button on the Groups page. Visitors who click it are asked to sign in first.
- The form uses the same fields the Groups page already uses: name, sport, city, state, country, description, website, tags.
- The Group Owner can edit their Group's info later.
- New Groups appear on the Groups page with the existing ones.

**Done when:** a User can add a Group, see it on the Groups page, open its Group page, and edit it.

## 4. Joining

**What it is:** A User can **join** a Group and become a **Member**. Membership is per Group.

- A **Join** button on the Group page. Visitors are asked to sign in first.
- Members see a **Leave** button instead.
- Joining a Group also turns on its Notifications. Join and subscribe are the same action.
- A User can see the Groups they've joined (e.g. "My Groups" on their profile).

**Done when:** a User can join and leave Groups, and the Group page reflects whether they're a Member.

## 5. Members-only Content

**What it is:** Parts of the Group page that only Members can see.

- Members-only content: **Announcements**, **Events / Calendar**, **Members list**.
- Visitors and non-member Users see the public info plus a prompt to sign in or join where that content would be.
- Enforced on the server: members-only data is never sent to non-members. Hiding it in the UI is not enough.
- The **Members list** shows each Member's display name (not contact info).

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
| **Group** | id (slug), name, sport, city, state, country, description, website, tags, owner (User), created at |
| **Membership** | user, group, role (`member` / `owner`, later maybe `admin`), joined at |
| **Announcement** | id, group, author, title, body, created/updated at |
| **Event** | id, group, author, title, description, location, starts at, ends at, cancelled |
| **Notification** | id, recipient, source (Announcement/Event), channel, sent at, status |

Group fields deliberately match today's [clubs.json](../src/data/clubs.json) so existing Groups can move straight into the database.

## Technical direction

Today the site is fully static (see [ARCHITECTURE.md](ARCHITECTURE.md)). From **Accounts** onward we need:

- **Authentication**: user accounts and sessions.
- **A database** for the entities above.
- **Server-side access control** for members-only content.
- **Email and SMS delivery** for Notifications.

Likely shape: the React front end stays on GitHub Pages and talks to a hosted backend service that provides auth, database, and access rules, plus an email/SMS provider. **No service has been chosen yet.** That decision is made when we start **Accounts**.

## Open questions

Decide these before or while building the feature in brackets.

1. **[Joining]** Can anyone join instantly, or does the Group Owner approve requests?
2. **[Announcements / Events]** Can only the Owner post, or can they promote Members to co-admins?
3. **[Add a Group]** Do new Groups appear immediately, or does a Site Admin approve them first? How do we handle duplicates and spam?
4. **[Add a Group]** The Groups already in `clubs.json` have no Owner. Are they claimed by someone, owned by a Site Admin, or left read-only?
5. **[Accounts]** What happens to a Group if its Owner leaves or deletes their account? Can ownership transfer?
6. **[Accounts]** Is the phone number required, optional, or only asked for if the User wants texts?
7. **[Notifications]** Can Members choose a channel per Group, mute a Group, or get a digest instead of every post?
8. **[Members-only Content]** Can a Member hide themselves from the Members list?
9. **[Members-only Content]** Should non-members see a teaser, e.g. "3 upcoming Events, join to see"?
10. **[Events & Calendar]** Do Events need recurring schedules, RSVPs, or reminder Notifications before they start?
