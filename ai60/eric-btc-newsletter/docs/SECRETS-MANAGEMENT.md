# Secrets Management

How secrets and credentials are managed across agent deployments.

---

## Overview

Secrets are split into two categories based on whether the agent needs to update them:

| Type | Storage | Who Updates | Examples |
|------|---------|-------------|----------|
| **Static Secrets** | `.env` file | Human only | API keys, GitHub token |
| **Dynamic State** | JSON files | Agent (auto-refresh) | OAuth tokens |

---

## Security Architecture

### .env as Single Source of Truth

All static secrets are stored in `~/.openclaw/.env` with `chmod 600` permissions. This is the ONLY location agents should read credentials from.

```
~/.openclaw/.env          # chmod 600, human-managed
~/.openclaw/workspace/    # Dynamic state files (agent-managed)
```

### No Git Access for Agents

**CRITICAL:** Agents do NOT have git access on their deployment instances. This is intentional.

```
┌─────────────────────────────────────────────────────────────┐
│                   Agent <-> GitHub                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  NO GIT:                                                    │
│    - No git clone/pull/push                                 │
│    - No local .git directory                                │
│    - No ability to run git commands                         │
│                                                             │
│  GITHUB API ONLY:                                           │
│    - Read: mcp__github__get_file_contents                   │
│    - Write: mcp__github__create_or_update_file              │
│    - Explicit path control on every operation               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Why No Git?

An early incident revealed the risk: an agent with git access accidentally committed secrets (OAuth tokens, config files) to the repository root instead of its designated subdirectory. With git, agents can:
- `git add .` (adds everything, including secrets)
- `git add -A` (same problem)
- Commit to wrong paths (workspace treated as repo root)

With GitHub API:
- Every file write requires an explicit `path` parameter
- Files go exactly where specified
- No way to accidentally add untracked files

### File Permissions

| Path | Permission | Owner |
|------|-----------|-------|
| `~/.openclaw/.env` | `600` | Human |
| `~/.openclaw/` | `700` | Human |
| `~/.openclaw/workspace/` | `700` | Agent runtime |
| `~/.openclaw/workspace/.*.json` | `600` | Agent |
| `~/.openclaw/openclaw.json` | `600` | Human |

---

## Secret Scanning

A GitHub Actions workflow using [gitleaks](https://github.com/gitleaks/gitleaks) scans all pushes for secrets.

**Files:**
- `.github/workflows/secret-scan.yml` - Workflow definition
- `.gitleaks.toml` - Configuration and custom rules

**What it detects (700+ patterns):**
- Forbidden files (`.env`, `*_config.json`, `credentials.json`, `*.pem`, `*.key`)
- OAuth tokens in JSON files (`access_token`, `refresh_token`, `client_secret`)
- API keys for common providers (GitHub, Anthropic, OpenAI, AWS, Slack, Stripe, Google, etc.)
- High-entropy strings that look like secrets
- Bearer tokens in code

**What it allows:**
- Scripts (`.js` files) - content is scanned, not blocked
- JSON files - content is scanned, not blocked
- Documentation that references patterns as examples

**On detection:**
- CI fails
- Auto-creates urgent issue alerting maintainers

**Limitations:**
- Runs post-push (detection, not prevention)
- Branch protection required to block merges
- Cannot catch 100% of secrets (some have no recognizable pattern)

---

## Static Secrets (`.env`)

Location: `~/.openclaw/.env` on deployment instance

These are credentials that never change (or rarely change). The agent reads them but cannot modify them.

### Required Variables

| Variable | Purpose | How to Get |
|----------|---------|------------|
| `{{MODEL_PROVIDER_API_KEY}}` | AI model provider | Provider's API console |
| `GITHUB_TOKEN` | Memory sync via GitHub API | [GitHub Settings > Tokens](https://github.com/settings/tokens) |
| `GITHUB_USERNAME` | Git authentication | Your GitHub username |

### Optional Variables

| Variable | Purpose | How to Get |
|----------|---------|------------|
| `ANTHROPIC_API_KEY` | Alternative model provider | [Anthropic Console](https://console.anthropic.com/) |
| `OPENROUTER_API_KEY` | Multi-model access | [OpenRouter](https://openrouter.ai/) |
| `EXA_API_KEY` | Neural web search | [Exa.ai](https://exa.ai/) |
| `TAVILY_API_KEY` | AI-optimized search | [Tavily](https://tavily.com/) |

### Example `.env`

```bash
# Model Provider (required)
{{MODEL_PROVIDER_API_KEY}}=your-api-key

# GitHub (required for memory sync)
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
GITHUB_USERNAME=your-username

# Channel Bot Tokens
BOT_TOKEN_{{AGENT_ID_1}}=your-bot-token
BOT_TOKEN_{{AGENT_ID_2}}=your-bot-token

# Optional
# ANTHROPIC_API_KEY=sk-ant-xxxxx
# EXA_API_KEY=xxxxx
```

### Security

- File permissions: `chmod 600 ~/.openclaw/.env`
- Never commit `.env` to git
- Rotate tokens periodically

---

## Dynamic State (JSON Files)

Location: `~/.openclaw/workspace/` on deployment instance

These are credentials that the agent must update automatically (e.g., OAuth tokens that expire and need refreshing).

### Example Dynamic Files

| File | Contents | Refresh Cycle |
|------|----------|---------------|
| `.{{platform_name}}_config.json` | OAuth tokens | Automatic (proactive) |
| `.smtp_config.json` | SMTP credentials | Manual |

### Why Not `.env`?

OAuth tokens expire and need to be refreshed. If stored in `.env`:
- Agent cannot write to `.env` (environment variables are read-only at runtime)
- Token would expire, agent would break
- Manual intervention required every time token expires

By storing in JSON files:
- Agent can read current token
- Agent can write refreshed token
- Automatic, unattended operation

### OAuth Token Refresh Pattern

Access tokens typically expire within hours or days. Refresh tokens may have rolling TTLs — they stay alive as long as they're used within their expiry window.

Recommended: **proactive refresh** strategy:

```
┌─────────────────────────────────────────────────────────────┐
│              OAuth Token Refresh Flow                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  On every API call:                                         │
│    1. Load config JSON file                                 │
│    2. Check: is access_token expired? (expires_at)          │
│    3. Check: has 1+ hour passed since last refresh?         │
│       (refreshed_at field)                                  │
│    4. If either YES → attempt refresh_token grant           │
│                                                             │
│  On successful refresh:                                     │
│    - Save new access_token, refresh_token, expires_at       │
│    - Save refreshed_at = now                                │
│    - Refresh token's TTL resets                             │
│                                                             │
│  On proactive refresh failure (token NOT expired):          │
│    - Log WARNING (early revocation signal)                  │
│    - Use existing access_token (still valid)                │
│    - Alert surfaces within 1 hour, not at token expiry      │
│                                                             │
│  On hard failure (token IS expired + refresh failed):       │
│    - Log ALERT                                              │
│    - Agent notifies user on channel                         │
│    - User must re-authenticate via OAuth                    │
│                                                             │
│  Fallback: client_credentials grant (limited API access)    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Why proactive?** Without proactive refresh, if the provider revokes the refresh token, the agent wouldn't notice until the access token expires — potentially a full day of silent failure. With hourly proactive refresh, revocations are detected within 1 hour.

### Example Config JSON

```json
{
  "access_token": "oauth2_xxxxx",
  "refresh_token": "oauth2_xxxxx",
  "token_type": "Bearer",
  "expires_at": "2026-02-06T08:12:57.862Z",
  "refreshed_at": "2026-02-05T08:12:57.862Z"
}
```

### Security

- File permissions: `chmod 600 ~/.openclaw/workspace/.*.json`
- Files stay on instance only — agents use GitHub API (not git) so these files cannot be accidentally committed
- Agent has local read/write access
- These files are in `.gitignore` as a defense-in-depth measure

---

## Token Rotation Procedures

### Rotating Static Tokens (API Keys)

1. Generate new token from the provider's console
2. SSH to deployment instance (or access container)
3. Edit `~/.openclaw/.env` and replace the old value
4. Restart gateway: `openclaw gateway restart`
5. Verify agent still functions correctly
6. Revoke old token from provider's console

### Rotating Dynamic Tokens (OAuth)

1. If refresh token is still valid: the agent handles this automatically
2. If refresh token is revoked:
   a. Complete the OAuth flow to get new tokens
   b. Update the JSON config file on the instance
   c. Restart gateway: `openclaw gateway restart`

### Rotation Schedule

| Secret Type | Recommended Rotation |
|-------------|---------------------|
| Model provider API keys | Every 90 days |
| GitHub tokens | Every 90 days (or use fine-grained tokens with expiry) |
| Channel bot tokens | Only when compromised |
| OAuth refresh tokens | Automatic (proactive refresh) |

---

## Per-Agent Credential Isolation

Each agent may have different secrets. Document in agent's `.env.example`:

```
agents/{{org_name}}/{{agent_name}}/.env.example
```

### Example Agent Credential Map

| Secret | Type | Location |
|--------|------|----------|
| {{MODEL_PROVIDER_API_KEY}} | Static | `.env` |
| GITHUB_TOKEN | Static | `.env` |
| GITHUB_USERNAME | Static | `.env` |
| OAuth tokens | Dynamic | `.{{platform_name}}_config.json` |
| SMTP credentials | Dynamic | `.smtp_config.json` |

### Multi-Agent Secret Sharing

In local gateway mode, all agents share a single `.env` file. Secrets are named with agent-specific prefixes to avoid collisions:

```bash
# Shared
GITHUB_TOKEN=ghp_xxxx
GITHUB_USERNAME=your-username

# Agent-specific
BOT_TOKEN_AGENT1=token-for-agent1
BOT_TOKEN_AGENT2=token-for-agent2
PLATFORM_API_KEY_AGENT1=key-for-agent1
```

**Limitation:** Any agent can theoretically read any other agent's environment variables. For true credential isolation, use separate VPS instances or Docker containers with distinct `.env` files.

---

## Adding New Secrets

### For Static Secrets (API Keys)

1. Access the deployment instance:
   ```bash
   # Docker
   docker compose exec gateway bash

   # Local
   ssh {{instance_host}}

   # Cloud VPS
   ssh {{user}}@{{instance_ip}}
   ```

2. Edit `.env`:
   ```bash
   nano ~/.openclaw/.env
   ```

3. Add the variable:
   ```bash
   NEW_API_KEY=your-key-here
   ```

4. Restart gateway:
   ```bash
   openclaw gateway restart
   ```

### For Dynamic State (OAuth Tokens)

1. Provide credentials to agent via secure channel (e.g., OneTimeSecret)
2. Agent saves to appropriate JSON file
3. Agent manages refresh automatically

---

## Deployment Checklist

Before deploying an agent, ensure:

- [ ] `.env` exists on instance with required static secrets
- [ ] `.env` has correct permissions (`chmod 600`)
- [ ] `~/.openclaw/` directory has correct permissions (`chmod 700`)
- [ ] Dynamic credential files exist (if applicable)
- [ ] Dynamic credential files have correct permissions (`chmod 600`)
- [ ] Agent's `.env.example` documents all required variables
- [ ] Secret scanning workflow is configured in CI
- [ ] `.gitignore` blocks `.env` and credential JSON files

---

## Troubleshooting

### "GITHUB_TOKEN not set" error

```bash
# Check if .env has the variable
grep GITHUB ~/.openclaw/.env

# If missing, add it
echo 'GITHUB_TOKEN=ghp_xxx' >> ~/.openclaw/.env
openclaw gateway restart
```

### OAuth token expired / refresh token revoked

The proactive refresh pattern will detect this within 1 hour and alert on the notification channel. To re-authenticate:

1. Complete the OAuth flow with the provider
2. Obtain new access and refresh tokens
3. Update the config JSON on the instance:
   ```bash
   cat > ~/.openclaw/workspace/.{{platform_name}}_config.json << EOF
   { "access_token": "...", "refresh_token": "...", "token_type": "Bearer", "expires_at": "...", "refreshed_at": "..." }
   EOF
   ```
4. Restart gateway: `openclaw gateway restart`

### Permission denied on secret files

```bash
chmod 600 ~/.openclaw/.env ~/.openclaw/workspace/.*.json
chmod 700 ~/.openclaw/ ~/.openclaw/workspace/
```

---

## Security Best Practices

1. **Never commit secrets** - Use `.gitignore` for `.env` and credential files
2. **Use secure channels** - Share secrets via OneTimeSecret or similar, not plain text
3. **Rotate regularly** - Update API keys periodically (see rotation schedule above)
4. **Least privilege** - Only give agents the permissions they need
5. **Audit access** - Check which secrets each agent can access
6. **Separate environments** - Don't share secrets between dev/prod
7. **GitHub API only** - Agents sync memory via API, never git (prevents accidental secret commits)
8. **Secret scanning** - Enable gitleaks or equivalent in CI for defense-in-depth

---

## Quick Reference

| What | Where | Who Manages |
|------|-------|-------------|
| API keys | `~/.openclaw/.env` | Human |
| GitHub auth | `~/.openclaw/.env` | Human |
| Bot tokens | `~/.openclaw/.env` | Human |
| OAuth tokens | `~/.openclaw/workspace/*.json` | Agent |
| SMTP config | `~/.openclaw/workspace/.smtp_config.json` | Agent |
