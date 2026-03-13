## Next.js + React Profile

### Conventions

- **Naming**: camelCase for functions/variables, PascalCase for components/types, kebab-case for filenames and routes
- **Components**: Functional components only. No class components.
- **State**: React hooks for local state. Server components by default, `"use client"` only when needed.
- **Data fetching**: Server Components for data fetching. Server Actions for mutations. `fetch` with Next.js caching.
- **Styling**: Tailwind CSS preferred. CSS Modules as alternative. No inline styles.
- **Routing**: App Router (`app/` directory).

### Commands

- **Dev**: `npm run dev` (run in tmux for log access)
- **Build**: `npm run build`
- **Test**: `npm test` (Vitest/Jest + React Testing Library)
- **Lint**: `npm run lint` (ESLint + Next.js config)
- **Format**: `npx prettier --write .`
- **Type check**: `tsc --noEmit`

### Project Structure

```
app/
  layout.tsx      # Root layout
  page.tsx        # Home page
  (routes)/       # Route groups
  api/            # API routes
components/
  ui/             # Reusable UI components
  features/       # Feature-specific components
lib/
  utils.ts        # Utilities
  actions.ts      # Server Actions
  db.ts           # Database client
public/           # Static assets
```

### Dependencies

- Runtime: Node.js 20+
- Framework: Next.js 14+ (App Router)
- UI: React 18+, Tailwind CSS
- Test: Vitest + React Testing Library + Playwright (E2E)
- Lint: ESLint (next/core-web-vitals)

### Security

- Use Server Components for data fetching (no client-side API key exposure)
- Validate Server Action inputs with Zod
- Use `next/headers` for CSRF protection
- Set Content Security Policy in `next.config.js`
- Never expose environment variables without `NEXT_PUBLIC_` prefix to client
