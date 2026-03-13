---
name: pre-dev-setup
description: |
  Use when bootstrapping a new project with Claude Code infrastructure.
  Triggers: "setup project", "initialize", "new project", "bootstrap", "configure claude".
  Interviews the user, then generates CLAUDE.md, customizes rules, agents, hooks, and settings.
---

# Pre-Development Setup

You are the project setup orchestrator. Your job is to interview the user about their project and generate a complete Claude Code infrastructure tailored to their stack.

## Phase 1: Interview

Ask these questions ONE AT A TIME using interactive prompts. Do not batch them.

1. **Project name** — What is the project called?
2. **Project type** — Web app, CLI tool, library, mobile app, or infrastructure?
3. **Tech stack** — Language, runtime, framework, database, test framework?
4. **Key directories** — What is the source directory structure? (src/, lib/, app/, etc.)
5. **Domain description** — Describe the project in 1-2 sentences.
6. **Deployment target** — GCP, AWS, Vercel, Docker, VPS, or other?
7. **Optional features** — Enable Winston structured logging? Enable Ralph Wiggum iterative loops?
8. **MCP integrations** — Need GitHub, Slack, database, Sentry, Linear/Jira MCP servers?
9. **Model preference** — Default to Opus for architecture, Sonnet for dev? Or specific preference?
10. **Evolution protocol** — Enable proactive capability gap detection and instinct learning?

Store all answers before proceeding.

## Phase 2: Generate CLAUDE.md

Read the following template files and assemble a CLAUDE.md customized to the user's answers:

1. Read `.claude/skills/pre-dev-setup/templates/philosophy.md`
2. Read `.claude/skills/pre-dev-setup/templates/core-workflow-rules.md`
3. Read `.claude/skills/pre-dev-setup/templates/development-rules.md`
4. Read `.claude/skills/pre-dev-setup/templates/verification-loops.md`
5. Read the matching profile from `.claude/skills/pre-dev-setup/profiles/{stack}.md`
6. If evolution protocol enabled: read `.claude/skills/pre-dev-setup/templates/evolution-protocol.md`
7. If Ralph Wiggum enabled: read `.claude/skills/pre-dev-setup/templates/ralph-wiggum.md`
8. If Winston logging enabled: read `.claude/skills/pre-dev-setup/templates/logging-winston.md`

Assemble CLAUDE.md with these sections:
- Project header (name, domain, quick start commands)
- Architecture overview (from user's directory structure)
- Tech stack section with language-specific conventions
- Philosophy (from template)
- Core workflow rules (from template)
- Development rules: NEVER/ALWAYS lists adapted to tech stack
- Output format standards
- Verification loops (from template)
- Conditional sections based on user choices

If a CLAUDE.md already exists, back it up to `CLAUDE.md.backup` before overwriting.

## Phase 3: Customize Rules

Read each file in `.claude/rules/`. For each rule:
- Adapt naming conventions to match the project's language (camelCase vs snake_case vs kebab-case)
- Adjust file organization rules to match the project's structure
- Add stack-specific security rules (e.g., SQL injection for DB projects, XSS for web projects)

Write updated rules back to `.claude/rules/`.

## Phase 4: Customize Agents

Read each agent in `.claude/agents/`. Replace these placeholders with project-specific values:
- `{TECH_STACK}` — the user's tech stack
- `{BUILD_COMMAND}` — build command for the stack (e.g., `npm run build`, `cargo build`)
- `{TEST_COMMAND}` — test command (e.g., `npm test`, `pytest`, `cargo test`)
- `{DEPLOY_TARGET}` — deployment target
- `{LINT_COMMAND}` — linter command (e.g., `npm run lint`, `ruff check`)

Write updated agents back to `.claude/agents/`.

## Phase 5: Configure settings.local.json

Generate `.claude/settings.local.json` with permissions based on tech stack:

```json
{
  "permissions": {
    "allow": [
      "Bash({BUILD_COMMAND})",
      "Bash({TEST_COMMAND})",
      "Bash({LINT_COMMAND})",
      "Bash(git status)",
      "Bash(git diff:*)",
      "Bash(git log:*)",
      "Bash(git add:*)"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(git push --force:*)",
      "Bash(git reset --hard:*)"
    ]
  }
}
```

## Phase 6: Configure MCP (.mcp.json)

If the user selected MCP integrations, copy `.mcp.json.example` to `.mcp.json` and guide the user through adding their tokens.

## Phase 7: Optional Setup

- **If Winston logging**: Create a logger utility file appropriate to the stack, add `logs/` to `.gitignore`, create `logs/.gitkeep`.
- **If Ralph Wiggum**: Verify `.claude/scripts/ralph-loop-headless.sh` exists and is executable. Add Ralph Wiggum section to CLAUDE.md.

## Phase 8: Summary

Print a summary of everything that was created:

```
=== Pre-Dev Setup Complete ===

CLAUDE.md          — Generated with [project name] configuration
Rules (8)          — coding-style, git-workflow, testing, security, output-format, agents, performance, parallel-dispatch
Agents (6)         — planner, code-architect, code-reviewer, security-reviewer, work-verifier, tester
Skills (8)         — systematic-debugging, tdd, frontend-design, 10-10-frontend, webapp-testing, feature-dev, new-skill, new-agent
Commands (6)       — /commit, /pr, /plan, /code-review, /prd-init, /ralph-loop

Available commands:
  /commit          — Conventional commit with co-author
  /pr              — Create PR with template compliance
  /plan            — Architecture-first planning
  /code-review     — Parallel code + security review
  /prd-init        — Initialize JSON-based PRD
  /ralph-loop      — Iterative development loop (Ralph Wiggum)

  /systematic-debugging  — 6-phase structured debugging
  /tdd                   — RED-GREEN-REFACTOR cycle
  /frontend-design       — Distinctive UI creation
  /10-10-frontend        — Screenshot loop until 10/10
  /webapp-testing        — Playwright E2E testing
  /feature-dev           — 7-phase feature development
  /new-skill             — Create a new skill
  /new-agent             — Create a new agent
```
