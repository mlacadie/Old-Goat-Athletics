# Old Goat Athletics

Read these before working on the site:

- [docs/GLOSSARY.md](docs/GLOSSARY.md): shared terms. Use them exactly (e.g. "Group", not "club", in new code and copy; "Member" means a member of a Group).
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md): how the site works today (static React + Vite + MUI on GitHub Pages; moving to Next.js on Vercel).
- [docs/ROADMAP.md](docs/ROADMAP.md): where the site is headed, split into named features, each with a GitHub issue on the [project board](https://github.com/users/mlacadie/projects/2) (Next.js Migration, Accounts, Group Pages, Add a Group, Joining, Members-only Content, Announcements, Events & Calendar, Notifications, Site Redesign, Group View Redesign, Shopify Store). **Planned only: do not implement unless asked.** When the user says "let's build <feature>", that feature's section is the spec. Resolve its open questions with the user before coding, then update its status and the glossary when it ships.

Verify changes with `yarn build` / `yarn lint`. Do not start the dev server.
