## Development Rules

### NEVER

- Modify code outside the explicit request
- Install packages without explaining why
- Create duplicate code when a utility exists
- Skip types or error handling
- Generate code without stating target directory first
- Assume — if unclear, ASK
- Use `any` type (TypeScript) or equivalent type-escape in other languages
- Commit or push without explicit user instruction
- Create documentation files unless explicitly asked
- Add features, refactoring, or "improvements" beyond what was requested

### ALWAYS

- Read architecture before writing code
- State filepath and reasoning BEFORE creating files
- Show dependencies (imports) and consumers (what uses this)
- Include comprehensive types and documentation for public APIs
- Suggest relevant tests after implementation
- Keep functions small and single-purpose
- Run tests before declaring work complete
- Update CLAUDE.md when making structural changes
- Prefer editing existing files over creating new ones
- Delete dead code immediately — do not comment it out
