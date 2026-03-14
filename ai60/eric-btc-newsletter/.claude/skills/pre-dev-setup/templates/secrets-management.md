## Secrets Management

### Single Source of Truth

All secrets live in `.env` at the project root (or `~/.openclaw/.env` on deployed gateways).

```bash
# Model Provider
MODEL_API_KEY=sk-...

# Channel Tokens
DISCORD_BOT_TOKEN_ORCHESTRATOR=...
DISCORD_BOT_TOKEN_WORKER1=...

# Memory Sync
GITHUB_TOKEN=ghp_...
GITHUB_USERNAME=...
GITHUB_REPO=owner/repo

# Gateway Auth
OPENCLAW_GATEWAY_TOKEN=...
```

### File Permissions

```bash
chmod 600 .env
chmod 600 local-gateway/openclaw.json
chmod 700 ~/.openclaw
chmod 700 ~/.openclaw/credentials
```

### What Goes Where

| Secret Type | Location | Format |
|-------------|----------|--------|
| API keys, tokens | `.env` | `KEY=value` |
| Gateway auth | `.env` → referenced in `openclaw.json` via `${VAR}` | Environment variable |
| Channel tokens | `.env` → referenced in `openclaw.json` via `${VAR}` | Environment variable |
| Agent workspace | NEVER — no secrets in IDENTITY, SOUL, AGENTS, MEMORY | N/A |

### Agent Memory Sync (GitHub API Only)

Agents sync memory via dedicated scripts, NOT git:

| Method | Risk | Used? |
|--------|------|-------|
| `git push` | Can accidentally add secrets with `git add .` | Never |
| GitHub API | Explicit path on every write, no accidental files | Always |

Scripts: `scripts/memory-sync.sh` (push), `scripts/sync-context.js` (pull).

### Token Rotation

1. Generate new token
2. Update `.env` with new value
3. Restart gateway: `docker compose restart`
4. Verify agent functionality
5. Revoke old token

### Secret Scanning

Use gitleaks in CI to scan all commits:
- Scans content for 700+ secret patterns
- Blocks forbidden files (`.env`, `credentials.json`, `*.pem`)
- Auto-creates issue on detection

### Rules

- Never hardcode secrets in source code or config files
- Never log secrets (use structured logging with redaction)
- Never commit `.env` to version control
- `.env.example` contains placeholder values only (never real secrets)
- Rotate tokens immediately if suspected compromise
