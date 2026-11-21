# Glossary

The shared vocabulary for Old Goat Athletics. When we talk about the site (in issues, commits, code, or conversations with Claude), use these terms with these meanings. If a term here stops matching reality, update this file first.

This describes the site we are building toward, not only what exists today. Terms marked **(planned)** belong to features in [ROADMAP.md](ROADMAP.md) that are not built yet. Remove the marker when the feature ships. Feature names (**Accounts**, **Group Pages**, **Add a Group**, **Joining**, **Members-only Content**, **Announcements**, **Events & Calendar**, **Notifications**) are defined in the roadmap.

## People

| Term | Meaning |
| --- | --- |
| **Visitor** | Anyone browsing the site who is not signed in. Can see public pages, the Groups directory, and each Group's public info. |
| **User** **(planned)** | Someone with an account who is signed in. Every User is also able to do everything a Visitor can. |
| **Member** **(planned)** | A User who has joined a specific Group. Membership is per Group: one User can be a Member of many Groups. |
| **Group Owner** **(planned)** | The User who added a Group to the site. Manages the Group's info, Announcements, and Events. |
| **Site Admin** **(planned)** | Old Goat Athletics staff who can moderate any Group or User. |

"Member" always means *Member of a Group*. Someone with an account is a **User**, not a member of the site.

## Groups

| Term | Meaning |
| --- | --- |
| **Group** | A club, team, or crew listed on the site (e.g. "Old Goat Track Club"). This is the canonical term. In code, Groups are currently stored as `clubs` in [src/data/clubs.json](../src/data/clubs.json); "club" and "group" mean the same thing. |
| **Groups page** | The directory at `/groups` that lists every Group as a card, with sport and state filters. |
| **Group card** | One Group's tile on the Groups page. |
| **Group page** **(planned)** | A page dedicated to a single Group (e.g. `/groups/old-goat-track-club`), opened by clicking its Group card. |
| **Public info** | The parts of a Group anyone can see: name, sport, location, description, website, tags. |
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

## Accounts and notifications (planned)

| Term | Meaning |
| --- | --- |
| **Sign up** | Creating an account. Collects the contact info (email and/or phone) used for Notifications. |
| **Sign in / Sign out** | Starting and ending a session. "Signed in" = User, "signed out" = Visitor. |
| **Notification** | A message sent to a Member when their Group posts an Announcement or Event. |
| **Notification channel** | How a Notification is delivered: **email** or **text (SMS)**. |

## Current site (exists today)

| Term | Meaning |
| --- | --- |
| **Home page** | `/`. Made of sections: Hero, Mission, I Am Now, Merch, Community, Socials. |
| **Section** | One of the stacked blocks on the Home page, each a component in [src/components/](../src/components/). |
| **Contact page** | `/contact`. A form sent through Formspree. |
| **Header / Footer** | Site-wide navigation and footer, shown on every page. Nav links live in [src/data/navLinks.js](../src/data/navLinks.js). |
| **Theme** | Brand colors and MUI settings in [src/theme.js](../src/theme.js). |
