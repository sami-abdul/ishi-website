## Git Workflow

- Use conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`.
- Commit messages: imperative mood, max 72 chars subject, blank line before body.
- One logical change per commit. Separate refactors from features.
- Branch naming: `feat/short-description`, `fix/issue-number`, `refactor/area`.
- Do NOT commit or push unless the user explicitly asks.
- Always add co-author line: `Co-Authored-By: Claude <noreply@anthropic.com>`
- Before pushing: run tests, check for debug statements, verify no secrets.
- PR titles follow conventional commits format. PR body uses project template if `.github/pull_request_template.md` exists.
- Never force push to main/master.
- Never amend published commits.
