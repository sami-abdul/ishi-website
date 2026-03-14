# OpenClaw Cron Documentation

## Overview

The `openclaw cron` command manages cron jobs within the Gateway scheduler.

## Key Features

**Delivery Options:**
- Isolated `cron add` jobs default to `--announce` delivery
- Use `--no-deliver` to prevent output delivery
- The `--deliver` flag is deprecated in favor of `--announce`

**Job Types:**
- One-shot (`--at`) jobs automatically delete after successful execution unless `--keep-after-run` is specified
- Recurring jobs employ exponential retry backoff (escalating from 30 seconds to 60 minutes) following consecutive failures, resetting after success

**Manual Execution:**
The command "returns as soon as the manual run is queued for execution" with responses including `{ ok: true, enqueued: true, runId }`.

**Retention Settings:**
Configuration controls include:
- `cron.sessionRetention` (24 hours default)
- `cron.runLog.maxBytes` and `cron.runLog.keepLines`

## Common Operations

Examples include updating delivery settings, disabling delivery, enabling lightweight bootstrap context, and announcing to specific channels. The `--light-context` flag applies exclusively to isolated agent-turn jobs, streamlining bootstrap context injection.

**Upgrade Note:** Running `openclaw doctor --fix` normalizes legacy cron job fields and migrates webhook configurations.
