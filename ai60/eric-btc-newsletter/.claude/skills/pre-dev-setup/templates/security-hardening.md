## Security Hardening

This project implements defense-in-depth security for OpenClaw agents.

### Gateway Security

- **Binding**: Loopback only (`bind: "loopback"`). Never 0.0.0.0.
- **Authentication**: Token-based (`auth.mode: "token"`).
- **Remote access**: Use Tailscale Serve (keeps gateway on loopback).
- **File permissions**: `openclaw.json` at 600, `~/.openclaw` at 700.

### Docker Sandbox (Default: All Agents)

All agents run in isolated Docker containers:

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

- `network: "none"` — no egress by default
- `readOnlyRoot: true` — immutable container filesystem
- `"host"` network mode is schema-blocked (prevents container breakout)

### Tool Policies

Default: deny everything, whitelist per-agent.

| Trust Level | Profile | Sandbox | Additional |
|-------------|---------|---------|-----------|
| Orchestrator | `full` | `off` or `non-main` | sessions_send, sessions_spawn |
| Worker (trusted) | `coding` | `all`, scope `agent` | exec allowlist |
| Worker (read-only) | `minimal` | `all`, scope `agent` | read + message only |
| Public-facing | `messaging` | `all`, scope `session` | message only |

Exec security: `allowlist` mode with safe binaries (`node`, `npm`, `curl`, `jq`). Elevated mode disabled by default.

### Credential Management

- All secrets in `.env` file only (600 permissions)
- Never in workspace files, MEMORY.md, or openclaw.json values
- Short-lived, scoped tokens preferred over long-lived full-access
- GitHub API for memory/context sync (never git)
- Auth preflight before any sync operation

### Skill Safety

- Never auto-install from ClawHub without source review (20% malicious rate documented)
- Verify skill metadata: a "Weather Skill" asking for `shell.execute` is a red flag
- Pin skill versions when installing

### Security Audit

Run before every deployment:

```bash
openclaw security audit --deep
```

Checks: inbound access policies, tool blast radius, network exposure, browser isolation, disk permissions, plugin allowlists, policy drift.

### CVE Awareness

- **CVE-2026-25253** (CVSS 8.8): RCE via browser. Patched in v2026.1.29.
- All instances must run v2026.1.29 or later.
- Monitor OpenClaw security advisories.

### Incident Response

1. **Contain**: Stop gateway, set `bind: "loopback"`, disable risky channels
2. **Rotate**: Gateway auth token, all provider credentials, API keys
3. **Audit**: Check logs, review transcripts, inspect config changes, run `security audit --deep`
