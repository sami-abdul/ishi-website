---
name: health-check
description: |
  Use when checking the health of the OpenClaw gateway and all agents.
  Triggers: "health check", "status", "is it running", "check agents", "gateway status".
  Checks container health, agent responsiveness, and runs security audit.
---

# Health Check

MANDATORY: Follow This Runbook Exactly. Do not skip steps.

## Step 1: Docker Status

```bash
docker compose ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}"
```
- Timeout: 15s
- PASS: All containers running
- FAIL: Any container stopped/unhealthy
- Remediation: `docker compose up -d` or `docker compose logs {container} --tail=50`

## Step 2: Gateway Process

```bash
docker compose exec openclaw-gateway openclaw health
```
- Timeout: 30s
- PASS: Gateway responding
- FAIL: Gateway unresponsive
- Remediation: `docker compose restart openclaw-gateway`

## Step 3: Agent Status

```bash
docker compose exec openclaw-gateway openclaw agents list --json
```
- Timeout: 30s
- PASS: All agents loaded and connected
- WARN: Some agents in error state
- FAIL: No agents loaded
- Remediation: Check `local-gateway/openclaw.json` agent entries and workspace dirs

## Step 4: Channel Connectivity

```bash
docker compose exec openclaw-gateway openclaw channels status --json
```
- Timeout: 30s
- PASS: All channels connected
- WARN: Some channels disconnected
- FAIL: No channels connected
- Remediation: Check `.env` for channel tokens, verify bot accounts are active

## Step 5: Resource Usage

```bash
docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.PIDs}}"
```
- Timeout: 15s
- PASS: All containers within limits
- WARN: Any container > 80% memory or CPU
- Remediation: Adjust resource limits in docker-compose.yml

## Step 6: Security Audit

```bash
docker compose exec openclaw-gateway openclaw security audit
```
- Timeout: 120s
- PASS: No critical findings
- WARN: Non-critical findings
- FAIL: Critical findings
- Remediation: Run `/security-audit` for detailed report

## Step 7: Log Check

```bash
docker compose logs --tail=20 --timestamps
```
- Timeout: 15s
- PASS: No errors in recent logs
- WARN: Warning-level entries
- FAIL: Error-level entries
- Remediation: Investigate error logs, check agent MEMORY.md for known failure modes

## Report

```markdown
## Health Check Report
Timestamp: {timestamp}

| Check | Status | Details |
|-------|--------|---------|
| Docker Containers | PASS/FAIL | {healthy}/{total} running |
| Gateway Process | PASS/FAIL | {version} |
| Agents | PASS/WARN/FAIL | {loaded}/{expected} loaded |
| Channels | PASS/WARN/FAIL | {connected}/{total} connected |
| Resources | PASS/WARN | CPU: {max}%, Memory: {max}MB |
| Security Audit | PASS/WARN/FAIL | {findings} findings |
| Recent Logs | PASS/WARN/FAIL | {error_count} errors |

Overall: PASS|PARTIAL|FAIL
Uptime: {uptime}
```
