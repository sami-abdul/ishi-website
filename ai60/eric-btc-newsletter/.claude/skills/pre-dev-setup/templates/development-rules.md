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
- Modify IDENTITY.md or SOUL.md of deployed agents without owner approval (core personality is human-managed)
- Use git commands for agent memory/context sync (use GitHub API scripts only)
- Put secrets, tokens, or API keys in agent workspace files (IDENTITY, SOUL, AGENTS, MEMORY, etc.)
- Install ClawHub skills without reviewing source code first
- Reuse `agentDir` paths across different agents
- Expose gateway on 0.0.0.0 — use loopback or Tailscale only

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
- Include all 6 required sections in AGENTS.md (Execution Guardrails, Timeout & Retry, Evidence Output Contract, Fallback Rules, Escalation Rules, Security)
- Register all skills in AGENTS.md Commands section
- Keep MEMORY.md under 8KB — extract static content to `knowledge/`
- Run `openclaw security audit --deep` before deploying gateway changes
- Use sandbox mode "all" by default — disable only with documented justification
