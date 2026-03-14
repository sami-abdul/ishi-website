---
name: workspace-audit
description: |
  Use when auditing agent workspaces for compliance with standards.
  Triggers: "audit workspace", "check workspace", "workspace review", "verify agents".
  Validates all 7 files, required sections, size limits, and security compliance.
---

# Workspace Audit

MANDATORY: Follow This Runbook Exactly. Audit ALL agent workspaces found in the project.

## Step 1: Discover Workspaces

Find all agent workspace directories:
- Check `agents/*/workspace/`
- Check `orchestrator/workspace/` (if exists)
- Cross-reference with `local-gateway/openclaw.json` agent entries

Report any agents in config that lack workspaces, and any workspaces not registered in config.

## Step 2: File Completeness (Per Agent)

For each workspace, verify all 7 required files exist:

| File | Required | Check |
|------|----------|-------|
| `IDENTITY.md` | Yes | Exists + has frontmatter (name, emoji, role, organizations, vibe) |
| `SOUL.md` | Yes | Exists + non-empty |
| `AGENTS.md` | Yes | Exists + has 6 required sections |
| `USER.md` | Yes | Exists + non-empty |
| `TOOLS.md` | Yes | Exists + non-empty |
| `MEMORY.md` | Yes | Exists + has 5 required sections + under 8KB |
| `CRON_JOBS.md` | Yes | Exists (can be empty if no cron jobs) |

## Step 3: AGENTS.md Section Audit (Per Agent)

Verify AGENTS.md contains all 6 required section headings:

1. `Execution Guardrails` — Must mention: one step at a time, no polling loops
2. `Timeout & Retry Policy` — Must include timeout values and max retries
3. `Evidence Output Contract` — Must include per-step report format
4. `Fallback Rules` — Must describe behavior when steps fail
5. `Escalation Rules` — Must define when to escalate
6. `Security & Authentication` — Must reference .env for tokens

Mark each as PASS (heading + content) / WARN (heading only) / FAIL (missing).

## Step 4: MEMORY.md Audit (Per Agent)

Verify MEMORY.md contains all 5 required sections:

1. `Critical Rules`
2. `Hard/Soft Thresholds`
3. `Baselines`
4. `Known Failure Modes`
5. `Lessons Learned`

Also check:
- File size under 8KB (WARN if over, FAIL if over 16KB)
- No secrets or tokens in content (grep for patterns: `sk-`, `ghp_`, `token=`, `password`)

## Step 5: Security Compliance (Per Agent)

Check for security violations:

| Check | Pattern | Severity |
|-------|---------|----------|
| Secrets in workspace files | `sk-`, `ghp_`, `xoxb-`, `xapp-`, `token=`, `password=` | FAIL |
| Hardcoded URLs with credentials | `https://.*:.*@` | FAIL |
| .env file in workspace | `.env` file exists in workspace dir | FAIL |
| Credentials file | `credentials.json`, `*.pem`, `*.key` | FAIL |

## Step 6: Skill Registration (Per Agent)

For each skill in `workspace/skills/`:
- Verify `SKILL.md` exists
- Verify skill is referenced in AGENTS.md commands section (WARN if not)

## Step 7: Config Alignment

Cross-reference with `local-gateway/openclaw.json`:
- Every agent in config has a workspace directory
- Every workspace directory has an agent in config
- `agentDir` paths match actual directory locations
- Binding exists for each agent
- Trust level in config matches TOOLS.md capability set

## Report

```markdown
## Workspace Audit Report
Timestamp: {timestamp}
Workspaces scanned: {count}

### {emoji} {agent-name}
| Check | Status | Details |
|-------|--------|---------|
| Files (7/7) | PASS/FAIL | {present}/{7} files present |
| AGENTS.md sections (6/6) | PASS/WARN/FAIL | {present}/{6} sections |
| MEMORY.md sections (5/5) | PASS/WARN/FAIL | {present}/{5} sections |
| MEMORY.md size | PASS/WARN/FAIL | {size} bytes |
| Security scan | PASS/FAIL | {findings} issues |
| Skill registration | PASS/WARN | {registered}/{total} registered |
| Config alignment | PASS/FAIL | {status} |

### Summary

| Agent | Files | AGENTS.md | MEMORY.md | Security | Config | Overall |
|-------|-------|-----------|-----------|----------|--------|---------|
| {name} | {status} | {status} | {status} | {status} | {status} | {status} |

Total: {pass} PASS, {warn} WARN, {fail} FAIL
Overall: PASS|PARTIAL|FAIL
```
