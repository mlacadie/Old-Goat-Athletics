# Old Goat Athletics

Read these before working on the site:

- [docs/GLOSSARY.md](docs/GLOSSARY.md): shared terms. Use them exactly (e.g. "Group", not "club", in new code and copy; "Member" means a member of a Group).
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md): how the site works today (Next.js App Router + MUI on Vercel, JavaScript for now).
- [docs/ROADMAP.md](docs/ROADMAP.md): where the site is headed, split into named features, each with a GitHub issue on the [project board](https://github.com/users/mlacadie/projects/2). **Planned only: do not implement unless asked.** When the user says "let's build <feature>", that feature's section is the spec. Resolve its open questions with the user before coding, then update its status and the glossary when it ships.

## Definition of done

Work is not done until all of these pass:

1. `yarn build` succeeds
2. `yarn lint` has no errors or warnings
3. `yarn doctor` (React Doctor) scores **100/100**. Fix the underlying code; don't suppress rules to get there.

Do not start the dev server; the user checks the app manually.

## Workflow

Follow [CONTRIBUTING.md](CONTRIBUTING.md) for branches, commits, pull requests, and issues. In short:

- One feature, fix, removal, or refactor per branch and PR.
- Imperative commit messages with no prefixes (`Add Group page route`, not `feat: ...`). Nothing starts with `codex/`.
- PR description is just a summary, plus `Closes #<number>`. Close issues and move them to Done on the board when complete.
- Keep the docs in sync: update ARCHITECTURE.md when how the site works changes, and ROADMAP.md / the project board when a feature's status changes.
