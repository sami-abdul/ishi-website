---
name: deploy-gateway
description: |
  Use when deploying or restarting the OpenClaw gateway via Docker Compose.
  Triggers: "deploy", "restart gateway", "start agents", "docker up", "redeploy".
  Builds containers, deploys workspaces, runs post-deploy health and security checks.
---

# Deploy Gateway

MANDATORY: Follow This Runbook Exactly. Do not skip steps or improvise alternatives.

## Prerequisites Check

Before deploying, verify:
1. Docker is running: `docker info --format '{{.ServerVersion}}'` (timeout: 10s)
2. Docker Compose available: `docker compose version` (timeout: 10s)
3. `.env` file exists and has 600 permissions: `stat -f '%Lp' .env` (timeout: 5s)
4. `local-gateway/openclaw.json` exists: `test -f local-gateway/openclaw.json` (timeout: 5s)
5. `docker-compose.yml` exists: `test -f docker-compose.yml` (timeout: 5s)

If any prerequisite fails → STOP and report with remediation.

## Step 1: Validate Configuration

```bash
docker compose config --quiet
```
- Timeout: 15s
- PASS: Exit code 0
- FAIL: Report YAML errors, suggest fix
- Remediation: `$EDITOR docker-compose.yml`

## Step 2: Build Gateway Image

```bash
docker compose build --no-cache
```
- Timeout: 300s (5 min)
- PASS: "Successfully built" or exit code 0
- FAIL: Report build errors
- Remediation: Check Dockerfile.gateway, verify base image available

## Step 3: Deploy Workspaces

If `scripts/deploy.sh` exists:
```bash
bash scripts/deploy.sh
```
- Timeout: 60s
- PASS: Workspaces copied to container volumes
- FAIL: Report permission or path errors
- Remediation: Check agent workspace directories exist

## Step 4: Start Gateway

```bash
docker compose up -d
```
- Timeout: 60s
- PASS: All containers started
- FAIL: Report container start errors
- Remediation: `docker compose logs --tail=50`

## Step 5: Health Check

Wait 10 seconds for gateway startup, then:
```bash
docker compose ps --format json
```
- Timeout: 15s
- PASS: All containers "running" with healthy status
- FAIL: Report unhealthy containers
- Remediation: `docker compose logs {container} --tail=100`

## Step 6: Security Audit (Post-Deploy)

```bash
docker compose exec openclaw-gateway openclaw security audit
```
- Timeout: 120s
- PASS: No critical findings
- WARN: Non-critical findings → report but continue
- FAIL: Critical findings → report with remediation

## Report

```markdown
## Deploy Gateway Report
Timestamp: {timestamp}

## Step 1: Validate Configuration
Status: PASS|FAIL
Command: `docker compose config --quiet`

## Step 2: Build Gateway Image
Status: PASS|FAIL
Command: `docker compose build`
Duration: {seconds}s

## Step 3: Deploy Workspaces
Status: PASS|FAIL|SKIP
Command: `bash scripts/deploy.sh`

## Step 4: Start Gateway
Status: PASS|FAIL
Command: `docker compose up -d`
Containers: {count} running

## Step 5: Health Check
Status: PASS|FAIL
Containers: {healthy}/{total} healthy

## Step 6: Security Audit
Status: PASS|WARN|FAIL
Findings: {count} critical, {count} warnings

Overall: PASS|PARTIAL|FAIL
```
