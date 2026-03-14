# Cron Job Configuration

This file documents the cron jobs configured by `setup.sh`. Use this as a portable reference to re-create jobs in a new environment.

---

## Active Jobs

### 1. memory-backup

- **Schedule:** Daily at midnight (`0 0 * * *`)
- **Timezone:** {{timezone}}
- **Session:** isolated
- **Task:** Run `bash scripts/memory-sync.sh`. Uses GITHUB_TOKEN from `~/.openclaw/.env` only. Never reads or writes `.github_token`. Syncs MEMORY.md to `agents/{{org_slug}}/{{agent_slug}}/workspace/MEMORY.md`.

### 2. context-pull

- **Schedule:** Every 4 hours (`0 */4 * * *`)
- **Timezone:** {{timezone}}
- **Session:** isolated
- **Task:** Run `node scripts/sync-context.js`. Uses GITHUB_TOKEN from `~/.openclaw/.env` only. Never reads or writes `.github_token`. On auth failure, reports once and stops.

### 3. {{custom_cron_name}}

- **Schedule:** {{custom_cron_schedule}}
- **Timezone:** {{timezone}}
- **Session:** isolated
- **Task:** {{custom_cron_task}}

---

## Standard Cron Patterns

| Pattern | Schedule | Use Case |
|---------|----------|----------|
| `0 0 * * *` | Daily at midnight | Memory backup, daily reports |
| `0 */4 * * *` | Every 4 hours | Context pull, periodic checks |
| `0 */6 * * *` | Every 6 hours | Content refresh, monitoring |
| `0 9 * * 1-5` | Weekdays at 9 AM | Business-hours tasks |
| `*/30 * * * *` | Every 30 minutes | High-frequency monitoring |
| `0 0 * * 0` | Weekly (Sunday midnight) | Weekly summaries, cleanup |

---

## Re-creation Commands

To recreate these jobs from scratch, run `setup.sh` on the VPS:

```bash
bash ~/setup.sh
```

Or deploy with setup from local:

```bash
./deploy.sh --setup
```

## Adding New Cron Jobs

Use the OpenClaw CLI to add cron jobs:

```bash
openclaw cron add \
  --name "{{job_name}}" \
  --cron "{{cron_expression}}" \
  --tz "{{timezone}}" \
  --session isolated \
  --message "{{cron_message}}"
```

## Listing and Managing Jobs

```bash
# List all cron jobs
openclaw cron list

# Remove a job by ID
openclaw cron rm <job-id>

# List in JSON format (for scripting)
openclaw cron list --json
```
