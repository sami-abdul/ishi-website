## Generic Profile

Use this profile when the tech stack doesn't match a specific profile. Customize during `/pre-dev-setup` based on user answers.

### Conventions

- Follow the language's official style guide
- Use the language's standard naming conventions
- Group imports by: stdlib → third-party → local
- Type everything. Use the language's type system fully.
- Handle errors explicitly. No silent failures.

### Commands

- **Build**: `{BUILD_COMMAND}` (configure during setup)
- **Test**: `{TEST_COMMAND}` (configure during setup)
- **Lint**: `{LINT_COMMAND}` (configure during setup)
- **Format**: `{FORMAT_COMMAND}` (configure during setup)

### Project Structure

Adapt to the project's existing structure. Common patterns:

```
src/           # Source code
tests/         # Test files
docs/          # Documentation
scripts/       # Build/deploy scripts
config/        # Configuration files
```

### Security

- Never hardcode secrets — use environment variables
- Validate all external input at system boundaries
- Use parameterized queries for database operations
- Keep dependencies updated and audited
- Follow OWASP Top 10 guidelines

### Notes for Setup

During `/pre-dev-setup`, ask the user for:
1. Build command
2. Test command
3. Lint command
4. Format command
5. Naming conventions (camelCase, snake_case, etc.)
6. Import organization style
7. Preferred error handling pattern
