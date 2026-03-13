---
name: webapp-testing
description: |
  Use when writing E2E tests for a web application using Playwright.
  Triggers: "E2E tests", "end-to-end", "Playwright tests", "browser testing", "integration tests for the web app".
  Reconnaissance-first: map all pages before writing any tests.
---

# Webapp Testing (Playwright E2E)

Write comprehensive E2E tests using Playwright with a reconnaissance-then-action approach.

## Phase 1: Reconnaissance

Before writing any tests, map the application:

1. **Discover routes**: Read the routing config, sitemap, or navigate manually
2. **Catalog pages**: List every page with its URL pattern and purpose
3. **Identify flows**: Map key user journeys (auth, CRUD operations, navigation)
4. **Note interactive elements**: Forms, buttons, modals, dropdowns, tabs
5. **Check data requirements**: What test data/fixtures are needed?

Output a test plan before writing code:
```
Page Map:
  / (Home) - hero, nav, CTA buttons
  /login - email/password form, OAuth buttons
  /dashboard - data table, filters, pagination
  /settings - form with multiple tabs

User Flows:
  1. Sign up → verify email → first login → onboarding
  2. Create item → edit → delete
  3. Search → filter → paginate → select
```

## Phase 2: Page Object Model

Create page objects for each key page:

```typescript
// pages/login.page.ts
export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.page.fill('[data-testid="email"]', email);
    await this.page.fill('[data-testid="password"]', password);
    await this.page.click('[data-testid="submit"]');
  }

  async expectError(message: string) {
    await expect(this.page.getByText(message)).toBeVisible();
  }
}
```

## Phase 3: Write Tests

For each user flow, write tests covering:
- **Happy path**: The expected successful flow
- **Error states**: Invalid input, network errors, edge cases
- **Navigation**: Back button, direct URL access, deep links

## Phase 4: Artifacts

Collect artifacts automatically:
- **Screenshots on failure**: `await page.screenshot({ path: 'artifacts/failure.png' })`
- **Traces**: `await context.tracing.start({ screenshots: true, snapshots: true })`
- **Videos**: Configure in `playwright.config.ts` for CI

## Selector Strategy

Prefer in this order:
1. `data-testid` attributes (most stable)
2. `getByRole` (accessible, semantic)
3. `getByText` (user-visible text)
4. CSS selectors (last resort)

## Rules

- NEVER use `page.waitForTimeout()` — use `page.waitForSelector()` or `expect().toBeVisible()`
- NEVER hardcode URLs — use relative paths or config
- Clean up test data after each test
- Tests must be independent — no shared state between tests
- Run in CI with `--retries 2` for flaky network tests
