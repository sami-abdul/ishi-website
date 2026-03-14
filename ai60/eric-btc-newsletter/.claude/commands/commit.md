---
description: Create a conventional commit with co-author attribution
allowed-tools: Bash(git *)
---

# Conventional Commit

Create a well-crafted conventional commit following the Conventional Commits specification.

## Step 1: Gather Context (in parallel)

Run these commands **simultaneously**:

1. `git status` — to see all staged, unstaged, and untracked changes
2. `git diff --cached` — to see exactly what is staged for commit
3. `git diff` — to see unstaged changes (in case user forgot to stage)
4. `git log --oneline -10` — to match the repository existing commit style

## Step 2: Analyze Changes

Based on the diff output, determine:

- **Type**: What kind of change is this?
  - `feat` — A new feature
  - `fix` — A bug fix
  - `docs` — Documentation only
  - `style` — Formatting, missing semicolons, etc. (no logic change)
  - `refactor` — Code change that neither fixes a bug nor adds a feature
  - `perf` — Performance improvement
  - `test` — Adding or updating tests
  - `build` — Build system or external dependency changes
  - `ci` — CI configuration changes
  - `chore` — Maintenance tasks
- **Scope** (optional): What module/area is affected? Use parentheses: `feat(auth):`
- **Breaking**: Does this introduce a breaking change? If yes, add `!` after type: `feat!:`
- **Description**: Imperative mood, lowercase, no period at end. Focus on the **why**, not the **what**.

## Step 3: Handle Unstaged Changes

If there are unstaged changes that logically belong in this commit:
- Ask the user if they want to stage them
- If yes, stage specific files with `git add <file>` (never use `git add .` or `git add -A`)

If nothing is staged at all:
- Show the user what is available and ask what to stage
- Do NOT create an empty commit

## Step 4: Create the Commit

Use a heredoc to preserve formatting:

```bash
git commit -m "<type>(<scope>): <description>

<optional body - explain WHY, not WHAT>

Co-Authored-By: Claude <noreply@anthropic.com>"
```

## Rules

- NEVER use `--no-verify` or skip pre-commit hooks
- NEVER amend a previous commit unless the user explicitly asks
- NEVER use `git add .` or `git add -A` — always add specific files
- If a pre-commit hook fails, fix the issue, re-stage, and create a NEW commit
- Keep the subject line under 72 characters
- Separate subject from body with a blank line
- The `Co-Authored-By` trailer is mandatory on every commit
