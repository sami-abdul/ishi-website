---
description: Create a pull request with template compliance and preflight checks
allowed-tools: ["Bash(gh:*)", "Bash(git:*)", "Bash(npm:*)", "Read"]
---

# Create Pull Request

Create a PR following Conventional Commits format with preflight checks.

## Step 1: Preflight (in parallel)

Run these simultaneously:
1. `git status` — ensure working tree is clean or changes are committed
2. `git log origin/main..HEAD --oneline` — see all commits in this branch
3. `git diff origin/main...HEAD --stat` — see all changed files
4. Check if `.github/pull_request_template.md` exists

If there are uncommitted changes, ask the user to commit first.

## Step 2: Run Checks

If the project has a preflight script:
```bash
npm run preflight 2>/dev/null || npm test 2>/dev/null || echo "No preflight available"
```

If tests fail, stop and report. Do NOT create a PR with failing tests.

## Step 3: Determine PR Details

Based on the commits in the branch:
- **Title**: Conventional Commits format, under 70 characters. Use the dominant commit type.
  - `feat:` if there are feature commits
  - `fix:` if there are only bug fixes
  - `refactor:` if there are only refactors
- **Body**: If a PR template exists, fill it in. Otherwise use:

```markdown
## Summary
- [bullet points of changes]

## Test plan
- [ ] Tests pass locally
- [ ] Manual testing done for [specific scenarios]
```

## Step 4: Create PR

```bash
# Write body to temp file for proper markdown escaping
gh pr create --title "<title>" --body-file /tmp/pr-body.md
```

Present the PR URL to the user when done.

## Rules

- NEVER create a PR with failing tests
- NEVER push to main directly — always use a branch
- If on main, ask user for a branch name first
- Include `Co-Authored-By: Claude <noreply@anthropic.com>` in PR body if Claude contributed
- Push with `-u` flag if the remote branch doesn't exist yet
