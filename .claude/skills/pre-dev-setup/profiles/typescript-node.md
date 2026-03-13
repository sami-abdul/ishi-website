## TypeScript + Node.js Profile

### Conventions

- **Naming**: camelCase for functions/variables, PascalCase for classes/types/interfaces, SCREAMING_SNAKE_CASE for constants, kebab-case for filenames
- **Imports**: Use path aliases (`@/` prefix). Group: external → internal → types.
- **Types**: All type definitions in `src/types/`. No `any` — use `unknown` with type guards.
- **Async**: `async/await` for all I/O. Never mix callbacks and promises.
- **Error handling**: Explicit try/catch with typed errors. Use custom error classes.
- **Exports**: Named exports preferred. Default exports only for page/route components.

### Commands

- **Build**: `npm run build` or `tsc`
- **Test**: `npm test` (Vitest/Jest)
- **Lint**: `npm run lint` (ESLint)
- **Format**: `npx prettier --write .`
- **Type check**: `tsc --noEmit`

### Project Structure

```
src/
  types/        # Type definitions
  lib/          # Shared utilities
  services/     # Business logic
  routes/       # API routes (if applicable)
  components/   # UI components (if applicable)
  __tests__/    # Test files (or colocated .test.ts)
```

### Dependencies

- Runtime: Node.js 20+
- Package manager: npm (or pnpm/yarn per project)
- Test: Vitest or Jest
- Lint: ESLint + Prettier
- Build: tsc or tsup/esbuild

### Security

- Use `helmet` for HTTP headers (Express/Fastify)
- Validate request bodies with Zod or similar
- Use `npm audit` regularly
- Pin dependency versions in production
