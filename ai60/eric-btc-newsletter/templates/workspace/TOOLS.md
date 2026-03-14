# Available Tools

## Core Tools

### exec
Run shell commands within the sandbox.

```bash
# Example
ls -la ~/.openclaw/workspace/
```

### read / write
Read and write files within your workspace.

Allowed paths:
- `~/.openclaw/workspace/`
- `/tmp/`

### browser (if configured)
Web automation for navigation, screenshots, and checks.

```bash
browser status
browser open https://example.com
browser screenshot
```

## Custom Skills

Skills are auto-discovered from `~/.openclaw/workspace/skills/`. Each skill has a `SKILL.md` that defines its behavior.

### Checking installed skills

```bash
# List all skills via CLI
export PATH=$HOME/.npm-global/bin:$PATH
openclaw skills list

# Fallback: list via filesystem
find ~/.openclaw/workspace/skills -maxdepth 2 -type f -name SKILL.md
```

### Invoking skills

Skills with `user-invocable: true` are available as **slash commands** (e.g., `/health-check`, `/memory-sync`). This is the only reliable way to inject the skill's SKILL.md runbook into the agent's context. Plain text messages like "run a health check" do NOT trigger the skill.

### Built-in sync skills

| Skill | Slash Command | Purpose |
|-------|---------------|---------|
| memory-sync | `/memory-sync` | Push MEMORY.md to GitHub via API |
| knowledge-sync | `/knowledge-sync` | Pull context from GitHub via API |
| health-check | `/health-check` | Run bounded infrastructure health checks |

## Operational Policies

### Anti-Loop Rule

- Do not run repeated polling loops without bounds.
- Maximum retries per step: 2.
- Maximum progress updates per step: 1.
- Always emit a final result with evidence.

### What You Can Do

- Read files in workspace
- Write to `MEMORY.md` and `memory/`
- Execute allowed commands
- Use configured browser profiles
- Invoke skills via slash commands

### What You Cannot Do

- Modify protected files outside workspace
- Expose secrets
- Claim success without evidence
- Use git commands for memory/context sync
- Read or write `.github_token` files
