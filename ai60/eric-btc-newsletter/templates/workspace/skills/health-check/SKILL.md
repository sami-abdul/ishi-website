---
name: health-check
description: Run bounded, evidence-first health checks on agent infrastructure
user-invocable: true
---

# Health Check

Run a deterministic health check for this agent's infrastructure. All checks run **locally** -- no cloud CLI required.

## MANDATORY: Follow This Runbook Exactly

You MUST execute **every step below in order**. Do NOT substitute your own checks, skip steps, or improvise alternative checks. Each step has an **exact command** -- run that command and report its output. If a step fails, follow the fallback rules for that step, then continue to the next step.

Do NOT consider the health check complete until all steps have been executed and reported.

## Core Reliability Rules

1. Execute one step at a time, in order.
2. Run the **exact command** specified for each step.
3. Apply per-step timeout.
4. Retry each failed step at most 2 times.
5. Emit at most one progress message per step.
6. Always emit a final report (even partial failure).

## Step Runbook

### Step 1: Gateway Check

Command:

```bash
timeout 60s bash -c 'export PATH=$HOME/.npm-global/bin:$PATH && openclaw gateway status --deep 2>&1'
```

Pass criteria:
- Output contains `running`

Checks to extract:
- Gateway process status (running/stopped)
- Connected channels count
- Uptime duration

Thresholds:
- Gateway running with channels connected -> OK
- Gateway running but 0 channels -> WARNING
- Gateway not running -> CRITICAL

### Step 2: GitHub Token Check

Command:

```bash
timeout 30s bash -c 'export PATH=/usr/local/bin:/usr/bin:/bin:$PATH && source ~/.openclaw/.env && curl -sS -o /dev/null -w "%{http_code}" -H "Authorization: Bearer $GITHUB_TOKEN" -H "Accept: application/vnd.github+json" "https://api.github.com/repos/{{github_repo}}"'
```

Pass criteria:
- HTTP 200

Thresholds:
- 200 -> OK
- 401/403 -> CRITICAL (token expired or revoked)
- Other -> WARNING

### Step 3: Cron Jobs Check

Command:

```bash
timeout 30s bash -c 'export PATH=$HOME/.npm-global/bin:$PATH && openclaw cron list 2>&1'
```

Pass criteria:
- memory-backup job is present and enabled
- context-pull job is present and enabled

Required jobs:

| Job | Expected Schedule | Critical? |
|-----|-------------------|-----------|
| memory-backup | Daily | Yes |
| context-pull | Every 4 hours | Yes |

Thresholds:
- All critical jobs active -> OK
- Non-critical job missing -> WARNING
- Any critical job missing or disabled -> CRITICAL

### Step 4: Delivery Channel Check

Verify {{channel_type}} connectivity:

```bash
timeout 30s bash -c 'export PATH=/usr/local/bin:/usr/bin:/bin:$PATH && source ~/.openclaw/.env && {{channel_health_command}}'
```

Pass criteria:
- {{channel_health_pass_criteria}}

Thresholds:
- Channel reachable -> OK
- Channel unreachable -> WARNING

### Step 5: {{custom_check_name}}

Add your agent's primary function check here. Examples:
- Website agent: HTTP check on the managed site
- Upwork agent: API token validity + search dry run
- Social agent: Platform API connectivity

## Fallback Behavior

### Gateway check fails
- Retry up to 2 times
- If still failing, mark FAIL and continue with remaining checks
- Include remediation: `openclaw gateway restart`

### Token check fails
- Retry up to 2 times
- If token expired, mark CRITICAL and include remediation for token rotation
- Remediation: update `GITHUB_TOKEN` in `~/.openclaw/.env`

### Cron jobs check fails
- Retry up to 2 times
- If still failing, mark FAIL with exact `openclaw cron add` commands for missing jobs

### Delivery channel check fails
- Retry up to 2 times
- If channel fails, include token/credential verification remediation

## Output Contract (Required)

For each step, include:

- `step_id`
- `status` (`PASS|FAIL|WARN`)
- `command`
- `key_output`
- `artifacts`
- `fallback_used`
- `remediation`

Template:

```markdown
## Step <step_id>: <title>
Status: PASS|FAIL|WARN
Command: `<command>`
Key Output: <key lines>
Artifacts: <path/id/none>
Fallback Used: yes/no (<detail>)
Remediation: <exact command/action>
```

## Severity Mapping

| Severity | Trigger |
|----------|---------|
| HEALTHY | all required checks pass |
| WARNING | one or more soft-threshold warnings |
| CRITICAL | outage, hard-threshold failure, or repeated timeout |

## Delivery

Send the final health check report to {{channel_type}} {{channel_group_id}} (never DM by default).

## Final Report

The report must include:
- per-step evidence entries
- overall status
- next recommended actions
- explicit note if any required data was unavailable

Never output "all good" without per-step evidence.
