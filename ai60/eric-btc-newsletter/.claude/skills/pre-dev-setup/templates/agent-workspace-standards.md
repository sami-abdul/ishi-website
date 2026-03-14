## Agent Workspace Standards

### Workspace File Contract

Every agent workspace contains 7 files:

| File | Purpose | Access |
|------|---------|--------|
| `IDENTITY.md` | Agent name, emoji, role, organization, vibe | Read-only |
| `SOUL.md` | Persona, voice, communication style, boundaries | Read-only |
| `AGENTS.md` | Operating instructions with 6 required sections | Read-only |
| `USER.md` | User profile, channel bindings | Read-only |
| `TOOLS.md` | Available tools reference | Read-only |
| `MEMORY.md` | Persistent state (5 required sections, under 8KB) | Read + Write |
| `CRON_JOBS.md` | Scheduled task documentation | Read-only |

Plus directories: `context/` (symlinks, read-only), `skills/` (slash commands), `knowledge/` (static reference), `memory/` (daily logs, writable).

### AGENTS.md Required Sections

Every agent's AGENTS.md must contain these 6 headings:

1. **Execution Guardrails** — One step at a time, no polling loops, progress updates per step
2. **Timeout & Retry Policy** — Per-step timeouts (60s CLI, 120s browser, 300s audits), max 2 retries
3. **Evidence Output Contract** — Per-step report (step_id, status, command, key_output, artifacts, remediation)
4. **Fallback Rules** — If step X fails, continue with independent step Y. Never silently skip.
5. **Escalation Rules** — When to escalate (production failures, security risks, repeated failures)
6. **Security & Authentication** — Token source (.env only), no .github_token, sync via scripts

### MEMORY.md Required Sections

1. **Critical Rules** — Non-negotiable rules learned from experience
2. **Hard/Soft Thresholds** — Performance thresholds and targets
3. **Baselines** — Known-good baseline metrics
4. **Known Failure Modes + Fallbacks** — Documented failures and workarounds
5. **Lessons Learned** — Important insights from operations

Keep MEMORY.md under 8KB. Extract static content (filter tables, scoring rubrics, playbooks) to `knowledge/` files.

### Skill Invocation Pattern

Skills with `user-invocable: true` are exposed as slash commands (`/skill-name`). This is the ONLY reliable way to invoke a skill — plain text does NOT inject SKILL.md context.

Rules:
- Every skill must be listed in AGENTS.md Commands section
- SKILL.md must include "MANDATORY: Follow This Runbook Exactly" language
- Include per-step timeouts, pass/fail criteria, and remediation
- Skills auto-discovered from `<workspace>/skills/` on gateway restart

### Memory Sync Pattern

Agents sync memory via GitHub API scripts (never git):

```
Agent writes to MEMORY.md → Cron or user triggers sync →
scripts/memory-sync.sh → GitHub API create_or_update_file →
Single commit per run → Changes visible in GitHub
```

### Context Access

Shared context via symlinks in `context/`:
- `context/owner/` → Owner profile, expertise, preferences
- `context/{org}/` → Organization context, offerings, voice

Context is read-only to agents. Human-managed, updated via repo.
