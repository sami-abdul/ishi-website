---
name: security-audit
description: |
  Use when running a comprehensive security audit of the OpenClaw deployment.
  Triggers: "security audit", "security check", "audit security", "is it secure".
  Checks gateway config, sandbox, tool policies, credentials, network, and versions.
---

# Security Audit

MANDATORY: Follow This Runbook Exactly. Every check must produce a PASS/WARN/FAIL result.

## Step 1: Gateway Binding

Check that the gateway is bound to loopback only:

```bash
grep -o '"bind"[[:space:]]*:[[:space:]]*"[^"]*"' local-gateway/openclaw.json
```
- Timeout: 5s
- PASS: `"bind": "loopback"`
- FAIL: `"bind": "0.0.0.0"` or any non-loopback value
- Remediation: Set `"bind": "loopback"` in openclaw.json. Use Tailscale Serve for remote access.

## Step 2: Gateway Authentication

```bash
grep -o '"auth"[[:space:]]*:[[:space:]]*{[^}]*}' local-gateway/openclaw.json
```
- Timeout: 5s
- PASS: `"mode": "token"` present
- FAIL: No auth or auth disabled
- Remediation: Set `"auth": { "mode": "token" }` in openclaw.json

## Step 3: Sandbox Configuration

For each agent in openclaw.json, verify sandbox settings:

| Check | Expected | Severity |
|-------|----------|----------|
| `sandbox.mode` | `"all"` for workers | FAIL if `"off"` without justification |
| `sandbox.scope` | `"agent"` for workers, `"session"` for public-facing | WARN if mismatched |
| `docker.network` | `"none"` | FAIL if `"host"` |
| `docker.readOnlyRoot` | `true` | WARN if `false` |
| `docker.memory` | `"1g"` or less | WARN if over 2g |
| `docker.pidsLimit` | 256 or less | WARN if over 512 |

## Step 4: Tool Policies

For each agent, verify tool policy matches trust level:

| Trust Level | Expected Profile | Expected Denies |
|-------------|-----------------|-----------------|
| Messaging | `messaging` | group:automation, group:runtime, group:fs |
| Minimal | `minimal` | group:automation, group:runtime |
| Coding | `coding` | group:automation (at minimum) |
| Full | `full` | None required (orchestrator) |

Also check:
- `exec.security` should be `"allowlist"` (FAIL if `"off"`)
- `elevated.enabled` should be `false` (WARN if `true`)
- `tools.fs.workspaceOnly` should be `true` for non-orchestrator agents

## Step 5: Credential Security

### .env File Permissions
```bash
stat -f '%Lp' .env 2>/dev/null || stat -c '%a' .env 2>/dev/null
```
- PASS: `600`
- FAIL: Any other permission
- Remediation: `chmod 600 .env`

### openclaw.json Permissions
```bash
stat -f '%Lp' local-gateway/openclaw.json 2>/dev/null || stat -c '%a' local-gateway/openclaw.json 2>/dev/null
```
- PASS: `600`
- WARN: `644` (readable by others)
- Remediation: `chmod 600 local-gateway/openclaw.json`

### Secrets in Workspace Files
Scan all workspace files for secret patterns:
```
sk-[a-zA-Z0-9]{20,}
ghp_[a-zA-Z0-9]{36}
xoxb-[0-9]+-[0-9]+-[a-zA-Z0-9]+
xapp-[0-9]+-[a-zA-Z0-9]+
token=[a-zA-Z0-9]+
password=[^\s]+
```
- PASS: No matches
- FAIL: Any match found
- Remediation: Remove secret, rotate compromised credential, add to .env

### Secrets in Git History
```bash
git log --all --diff-filter=A --name-only -- '*.env' '*credentials*' '*.pem' '*.key' 2>/dev/null | head -20
```
- PASS: No sensitive files in history
- WARN: Sensitive files found in history
- Remediation: Use `git filter-repo` to remove, rotate all affected credentials

## Step 6: Network Exposure

### Docker Port Bindings
```bash
docker compose ps --format "{{.Ports}}" 2>/dev/null
```
- PASS: Only `127.0.0.1:*` bindings
- FAIL: `0.0.0.0:*` bindings found
- Remediation: Change port mapping to `127.0.0.1:18789:18789`

### Agent Network Isolation
For each agent container:
- PASS: `network: "none"` in sandbox config
- WARN: Named network (limited access)
- FAIL: `network: "host"` (container breakout risk)

## Step 7: Version Check

```bash
docker compose exec openclaw-gateway openclaw --version 2>/dev/null
```
- PASS: Version >= 2026.1.29 (CVE-2026-25253 patched)
- FAIL: Older version
- Remediation: Update to latest: `npm install -g @openclaw/cli@latest`

## Step 8: OpenClaw Security Audit

If gateway is running:
```bash
docker compose exec openclaw-gateway openclaw security audit --deep
```
- Timeout: 300s
- PASS: No critical findings
- WARN: Non-critical findings
- FAIL: Critical findings
- If gateway not running: SKIP with note

## Report

```markdown
## Security Audit Report
Timestamp: {timestamp}
Security Tier: {configured_tier}

| # | Check | Status | Details | Remediation |
|---|-------|--------|---------|-------------|
| 1 | Gateway Binding | PASS/FAIL | {bind_value} | {if fail} |
| 2 | Gateway Auth | PASS/FAIL | {auth_mode} | {if fail} |
| 3 | Sandbox Config | PASS/WARN/FAIL | {agents_sandboxed}/{total} sandboxed | {if fail} |
| 4 | Tool Policies | PASS/WARN/FAIL | {compliant}/{total} compliant | {if fail} |
| 5 | .env Permissions | PASS/FAIL | {permissions} | {if fail} |
| 6 | Config Permissions | PASS/WARN | {permissions} | {if warn} |
| 7 | Secrets in Workspace | PASS/FAIL | {matches} found | {if fail} |
| 8 | Secrets in Git | PASS/WARN | {files} found | {if warn} |
| 9 | Network Exposure | PASS/FAIL | {exposed_ports} | {if fail} |
| 10 | Agent Network | PASS/WARN/FAIL | {isolated}/{total} isolated | {if fail} |
| 11 | Version | PASS/FAIL | {version} | {if fail} |
| 12 | OpenClaw Audit | PASS/WARN/FAIL/SKIP | {findings} | {if fail} |

Critical: {count} | Warnings: {count} | Pass: {count}
Overall: PASS|WARN|FAIL

### Immediate Actions Required
{List of FAIL items with remediation commands}

### Recommended Improvements
{List of WARN items with suggestions}
```
