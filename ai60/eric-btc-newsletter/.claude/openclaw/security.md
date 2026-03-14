# OpenClaw Security Reference

## Defense-in-Depth Layers

OpenClaw implements multiple security layers:

1. **Gateway binding** — Loopback only (`bind: "loopback"`), never `0.0.0.0`
2. **Authentication** — Token-based gateway auth (`auth.mode: "token"`)
3. **Tool policies** — Profile-based access control (messaging/minimal/coding/full)
4. **Tool groups** — Deny entire groups: `group:automation`, `group:runtime`, `group:fs`
5. **Exec security** — Allowlist mode with safe binaries only
6. **Sandbox isolation** — Docker containers per agent (network: none, readOnlyRoot: true)
7. **File permissions** — 600 for configs, 700 for directories
8. **Credential isolation** — `.env` only, never in workspace files

## Tool Security Profiles

| Profile | Access Level | Use Case |
|---------|-------------|----------|
| `messaging` | Message send/receive only | Public-facing agents |
| `minimal` | Read-only + messaging | Read-only workers |
| `coding` | Code exec + browser + messaging | Trusted workers |
| `full` | All tools | Orchestrator |

## Sandbox Configuration

```json
{
  "sandbox": {
    "mode": "all",
    "scope": "agent",
    "workspaceAccess": "rw",
    "docker": {
      "image": "openclaw-sandbox:bookworm-slim",
      "readOnlyRoot": true,
      "network": "none",
      "memory": "1g",
      "cpus": 1,
      "pidsLimit": 256
    }
  }
}
```

- `mode: "all"` — sandbox every tool invocation
- `scope: "agent"` — one container per agent (vs per-session)
- `network: "none"` — no egress by default
- `"host"` network mode is schema-blocked

## Exec Security

```json
{
  "exec": {
    "security": "allowlist",
    "ask": "on-miss",
    "allowlist": ["node", "npm", "curl", "jq"]
  }
}
```

- `allowlist` mode: only whitelisted binaries can execute
- `on-miss`: prompt user when unlisted binary requested
- `elevated.enabled: false` by default

## Known Vulnerabilities

- **CVE-2026-25253** (CVSS 8.8): RCE via browser tool. Patched in v2026.1.29.
- All instances MUST run v2026.1.29 or later.

## ClawHub Marketplace Risk

- 20% of skills on ClawHub found to be malicious (documented by security researchers)
- NEVER auto-install skills from ClawHub without source review
- Verify skill metadata: a "Weather Skill" asking for `shell.execute` is a red flag
- Pin skill versions when installing

## Security Audit

Run before every deployment:
```bash
openclaw security audit --deep
```

Checks: inbound access policies, tool blast radius, network exposure, browser isolation, disk permissions, plugin allowlists, policy drift.

## Incident Response

1. **Contain**: Stop gateway, set `bind: "loopback"`, disable risky channels
2. **Rotate**: Gateway auth token, all provider credentials, API keys
3. **Audit**: Check logs, review transcripts, inspect config changes
4. **Report**: Document timeline, impact, and remediation
