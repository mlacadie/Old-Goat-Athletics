# Glossary

The shared vocabulary for Old Goat Athletics. When we talk about the site (in issues, commits, code, or conversations with Claude), use these terms with these meanings. If a term here stops matching reality, update this file first.

This describes the site we are building toward, not only what exists today. Terms marked **(planned)** belong to features in [ROADMAP.md](ROADMAP.md) that are not built yet. Remove the marker when the feature ships. Feature names (**Next.js Migration**, **TypeScript**, **Accounts**, **Group Pages**, **Add a Group**, **Joining**, **Members-only Content**, **Announcements**, **Events & Calendar**, **Notifications**, **Site Redesign**, **Group View Redesign**, **Shopify Store**) are defined in the roadmap.

## People

| Term | Meaning |
| --- | --- |
| **Visitor** | Anyone browsing the site who is not signed in. Can see public pages, the Groups directory, and each Group's public info. |
| **User** | Someone with an account who is signed in. Every User is also able to do everything a Visitor can. |
| **Member** **(planned)** | A User who has joined a specific Group. Membership is per Group: one User can be a Member of many Groups. |
| **Group Owner** **(planned)** | The User who owns a Group, usually the one who added it. Every Group has exactly one (the `ownerId` field). Edits the Group's page and info, and manages its Announcements and Events. Groups listed before Accounts existed are owned by the Site Admin until someone claims them. |
| **Site Admin** **(planned)** | Old Goat Athletics staff who can moderate any Group or User. |

"Member" always means *Member of a Group*. Someone with an account is a **User**, not a member of the site.

## Groups

| Term | Meaning |
| --- | --- |
| **Group** | A club, team, or crew listed on the site (e.g. "Old Goat Track Club"). This is the canonical term. In code, Groups are currently stored as `clubs` in [src/data/clubs.json](../src/data/clubs.json); "club" and "group" mean the same thing. |
| **Groups page** | The directory at `/groups` that lists every Group as a card, with search, sport pills, and a state filter. |
| **Sport pills** | The row of sport filter buttons on the Groups page. One pill per sport that has a Group. When the pills don't fit, the row scrolls sideways, shows left/right arrow buttons, and fades the pills out toward the arrows. |
| **Group card** | One Group's tile on the Groups page: Group image, sport, name, location, description, and two buttons, **View Group** (opens the Group page) and **Join**. Join doesn't do anything until **Joining** ships. The Group's links live on the Group page, not the card. |
| **Group page** | A page dedicated to a single Group (e.g. `/groups/old-goat-track-club`), opened from its Group card. Shows the Group banner across the top, then the Group's public info and Group links. |
| **Group links** | Up to 3 links on a Group page, each with a label and a URL: the Group's website or socials (Instagram, Strava, ...). Shown with an icon for the site they point to. **(planned)** The Group Owner adds them when adding or editing a Group. |
| **Group image** | An optional picture of the Group, shown on the Group card (the `image` field). **(planned)** The Group Owner uploads it when adding or editing a Group, and it also shows on the Group page. Without one, the default Group image is used. |
| **Group banner** | An optional wide image shown across the top of the Group page (the `banner` field). Without one, the Group page uses a plain branded banner with the default Group image. **(planned)** The Group Owner uploads it. |
| **Default Group image** | The fallback when a Group has no Group image (and, once planned features ship, no Group banner): the Old Goat logo at [public/logos/OGTC_OGoatG_KC.svg](../public/logos/OGTC_OGoatG_KC.svg). |
| **Sport list** **(planned)** | The set list of sports a Group Owner picks from when adding a Group, with **Other** always last. |
| **Public info** | The parts of a Group anyone can see: name, sport, location, description, tags, Group links, Group image, and Group banner. |
| **Members-only content** **(planned)** | The parts of a Group page only Members can see: Announcements, Events/Calendar, and the Members list. |
| **Join** **(planned)** | The action a User takes to become a Member of a Group. Joining also subscribes them to that Group's Notifications. We use "join" rather than "subscribe" in the UI and code. |
| **Leave** **(planned)** | The opposite of Join. Stops membership and Notifications. |

## Group content (planned)

| Term | Meaning |
| --- | --- |
| **Announcement** | A post from a Group (news, updates, reminders). Sent to Members as a Notification. |
| **Event** | Something with a date/time and usually a location (a workout, race, social). Sent to Members as a Notification. |
| **Calendar** | The view on a Group page showing that Group's upcoming Events. |
| **Members list** | The list of a Group's Members shown on its Group page. |

## Accounts

| Term | Meaning |
| --- | --- |
| **Sign up** | Creating an account at `/sign-up` (email code, password, or Google). Collects the email used for Notifications and an optional first and last name. Phone numbers come later. |
| **Sign in / Sign out** | Starting and ending a session. "Signed in" = User, "signed out" = Visitor. |
| **Profile** | `/profile`, where a User edits their name, email, password, and Notification preferences. |
| **Display name** | How a User is shown to others: their first and last name, or "Member" if they set none. Never their email or other contact info. |

## Notifications (planned)

| Term | Meaning |
| --- | --- |
| **Notification** | A message sent to a Member when their Group posts an Announcement or Event. |
| **Notification channel** | How a Notification is delivered: **email** or **text (SMS)**. Email only for the January release; Users already choose it on their Profile. |

## Current site (exists today)

| Term | Meaning |
| --- | --- |
| **Home page** | `/`. Made of sections: Hero, Mission, I Am Now, Merch, Community, Socials. |
| **Section** | One of the stacked blocks on the Home page, each a component in [src/components/home/](../src/components/home/). |
| **Contact page** | `/contact`. A form sent through Formspree. |
| **Header / Footer** | Site-wide navigation and footer, shown on every page. Nav links live in [src/data/navLinks.ts](../src/data/navLinks.ts). |
| **Theme** | Brand colors and MUI settings in [src/theme.ts](../src/theme.ts). |
