# Contributing

All changes go through a pull request to keep `main`'s history clean. Aim for one feature, fix, removal, or refactor per PR. Larger changes are sometimes necessary, but keep the work connected and leave unrelated cleanup for another contribution.

Before starting, read [docs/GLOSSARY.md](docs/GLOSSARY.md) for shared terms, [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for how the site works, and [docs/ROADMAP.md](docs/ROADMAP.md) for planned features.

## Issues and ownership

Prefer an issue before code changes, so the intended work has a place for discussion and can be linked to its PR. A missing issue does not prevent a contribution.

Planned work is tracked on the [project board](https://github.com/users/mlacadie/projects/2):

- Move the issue to **In Progress** when you start.
- When the work is complete, close the issue and move it to **Done**. Linking the PR with `Closes #<number>` closes it automatically on merge.

## Branches and commits

Choose a branch name that describes the work, e.g. `group-pages` or `fix-contact-form`.

Write short, specific commit messages in the imperative mood:

- ✅ `Fix track error message layout`
- ✅ `Add Group page route`
- ❌ `feat: add group page` (no category prefixes such as `feat:` or `perf:`)
- ❌ `changes` (too vague)

Branch names, issue titles, and PR titles must not start with `codex/`.

## Pull requests

- **Title:** short and specific, in the same style as a commit message.
- **Description:** just a summary of what changed and why, plus `Closes #<number>` when it completes an issue.
- **Drafts:** open a draft when the maintainer wants CI to run or the work tracked remotely. There is no required stage of completion for a draft.
- Every PR gets a Vercel preview deployment. Use it to check the change before merging.

## Before marking a PR ready

All of these must pass:

| Command | Must be |
| --- | --- |
| `yarn build` | succeeds |
| `yarn lint` | no errors or warnings |
| `yarn doctor` | **100 / 100** React Doctor score |

Fix the underlying code rather than suppressing rules. If a change affects how the site works or a feature's status, update the docs and the project board in the same PR.
