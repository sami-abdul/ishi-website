---
name: e2e-loop
description: |
  Use when running automated exploratory E2E testing on a web application.
  Triggers: "e2e loop", "exploratory testing", "test this app", "find bugs", "run e2e tests against the app".
  Claude becomes the tester: navigates with Playwright, clicks through workflows, documents issues.
---

# E2E Testing Loop (Automated Exploratory Testing)

You are an automated E2E tester. You use Playwright to navigate a running web application, interact with every page, and document bugs in a structured FINDINGS.md report.

This skill uses the Ralph Wiggum loop: each iteration tests one phase (page group), and findings accumulate across iterations.

## Phase 1: Reconnaissance

Before generating any test files, map the application.

### 1.1 Discover Routes

Scan the codebase for routes based on the framework:

**Next.js App Router:**
```bash
find . -name "page.tsx" -path "*/app/*" | sort
```

**Next.js Pages Router:**
```bash
find . -name "*.tsx" -path "*/pages/*" | grep -v "_app\|_document\|_error\|api/" | sort
```

**React Router / Other:**
Search for `<Route`, `createBrowserRouter`, or similar route config patterns.

### 1.2 Identify Per Route

For each route, note:
- Page type: **list**, **detail**, **form**, **dashboard**, **settings**
- Interactive elements: buttons, forms, modals, tabs, dropdowns
- Data requirements: does this page need data in the database to be meaningful?

### 1.3 Ask the User

Use AskUserQuestion to collect:

1. **App URL** — where is the app running? (e.g., `http://localhost:3000`)
2. **Login credentials** — email and password for testing
3. **Known issues** — any bugs or gaps the user already knows about (these become MANDATORY test cases)
4. **Database** — is the project using Supabase? (for test data helper generation)

### 1.4 Group Into Phases

Group related routes into phases (one phase per iteration). Example:

| Phase | Name | Routes |
|-------|------|--------|
| 1 | Dashboard | `/` |
| 2 | Items List & Detail | `/items`, `/items/[id]` |
| 3 | Create Item | `/items/new` |
| ... | ... | ... |
| N+1 | Cross-cutting | Mobile viewport, forms, navigation, accessibility |

### 1.5 Generate Files

Create `e2e-results/` directory with customized files from the templates in this skill's `templates/` directory:

| File | Source Template | Customization |
|------|---------------|---------------|
| `loop-prompt.md` | `templates/loop-prompt.md` | Inject discovered routes, phases, known issues, app URL |
| `phase-tracker.md` | Generated | One checkbox per phase from recon |
| `FINDINGS.md` | `templates/findings-template.md` | Add per-phase sections from recon |
| `playwright-helper.ts` | `templates/playwright-helper.ts` | Set routes array, app URL, auth method |
| `run-e2e-loop.sh` | `templates/run-e2e-loop.sh` | Set app URL, iteration count |

If the project uses Supabase:
| `test-data-helper.ts` | `templates/test-data-helper.ts` | Adapt table names and insert patterns |

## Phase 2: Setup

1. Install dependencies:
   ```bash
   # For npm/pnpm/yarn — adapt to project's package manager
   pnpm add -Dw playwright @playwright/test tsx
   npx playwright install chromium
   ```

2. If Supabase:
   ```bash
   pnpm add -Dw @supabase/supabase-js dotenv
   ```

3. Save auth state:
   ```bash
   npx tsx e2e-results/playwright-helper.ts login <email> <password>
   ```

4. Smoke test:
   ```bash
   npx tsx e2e-results/playwright-helper.ts smoke
   ```

## Phase 3: Execute

Run the loop:
```bash
./e2e-results/run-e2e-loop.sh
```

The loop calls `ralph-loop-headless.sh` which runs iterative Claude sessions. Each iteration:
1. Reads `phase-tracker.md` to find next unchecked phase
2. Tests that phase deeply (following rules in `loop-prompt.md`)
3. Documents findings in `FINDINGS.md`
4. Marks the phase complete in `phase-tracker.md`

**Two passes are built into the prompt:**
- Pass 1 (phases 1-N): Deep functional testing per page group
- Pass N+1: Cross-cutting edge cases (mobile 375px, keyboard nav, data accuracy, rapid navigation)

### Database Validation (after each mutation)

After testing any create/update/delete action through the UI:
1. Query the database to verify the record was created/modified/deleted
2. Verify all fields match what was submitted through the UI
3. If the action should have NO database effect, verify nothing changed

Document mismatches as "No Database Interaction" findings. This catches the #1 backend failure: endpoints that return success but never touch the database.

## Phase 3.5: Backend API Validation

For each API endpoint discovered during reconnaissance:
1. Hit the endpoint directly (curl/fetch) — verify it responds with correct status
2. Test with valid input — verify response schema matches what the frontend expects
3. Test with invalid input — verify proper error response (400, not 500)
4. Verify database state changed correctly after each mutation call

Tag findings with backend error categories: `api-not-implemented`, `no-db-interaction`, `db-setup-error`, `connection-failed`

## Phase 4: Review

After the loop completes:
1. Read `FINDINGS.md` and summarize results
2. Present issue counts by severity to the user
3. Optionally create GitHub issues for Critical/Major findings

## QUALITY RULES

These are non-negotiable. They exist because the first version of this tool produced shallow, incorrect results.

1. **"Page loads" is NOT testing.** Every phase must include actual interactions: click buttons, fill forms, submit, verify outcomes.
2. **Empty pages need data.** If a page shows "No data" and has a data table/list, insert mock data before testing.
3. **User reports are TRUTH.** Never dismiss a user-reported issue as a "design decision." Document it as a requirement gap.
4. **Evidence required.** Every test script must console.log what was clicked and what happened. Screenshot before AND after interactions.
5. **Write .ts files, not inline bash.** Complex Playwright scripts must be written as standalone .ts files to avoid escaping issues.
6. **Check server code.** For backend-related issues, read the actual server action / API route code, not just the UI.
7. **Test mobile.** Include a 375px viewport pass in the cross-cutting phase.
8. **Tag every finding.** Use these error categories (MANDATORY):
   - Frontend: `functionality-not-implemented` | `unresponsive-component` | `start-failed` | `data-fetch-failure` | `form-error` | `missing-file` | `missing-module` | `syntax-error`
   - Backend: `no-db-interaction` | `api-not-implemented` | `db-setup-error` | `connection-failed`
   - Database: `db-empty` | `fields-missing` | `tables-missing` | `structure-insufficient`
9. **Minimum depth per page type:**
   - **List page**: Verify items display. **Verify items match database records.** Click at least one item. Test empty state.
   - **Detail page**: Verify all fields. Click every action button. Document result.
   - **Form page**: Fill ALL fields. Submit. Verify success/error. Test validation. **Verify database record was created/updated.**
   - **Delete action**: Confirm dialog. Execute. **Verify record removed from database.**
   - **Dashboard**: Verify metrics accuracy. Check for misleading status indicators.

## ANTI-PATTERNS

| Anti-Pattern | Why It's Wrong | What To Do Instead |
|---|---|---|
| "Page renders, marking complete" | Rendering is not testing | Click every button, fill every form |
| "No data shown — working as expected" | Empty pages hide bugs | Insert mock data, then re-test |
| "This is a design decision" | Dismisses user requirements | Document as requirement gap |
| Inline `npx tsx -e "..."` | Breaks on `!==`, quotes, backticks | Write a .ts file in e2e-results/ |
| "No issues found" on untested page | Absence of evidence is not evidence of absence | Click through every interactive element |
