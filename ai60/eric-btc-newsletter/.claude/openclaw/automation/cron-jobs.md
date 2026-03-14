# Cron Jobs Documentation

## Overview

The OpenClaw Gateway includes a built-in scheduler called **Cron** that persists jobs and executes them at specified times. According to the documentation, "Cron runs **inside the Gateway** (not inside the model)" and stores job data at `~/.openclaw/cron/` to survive restarts.

## Key Execution Modes

Cron supports two distinct execution styles:

1. **Main session**: Enqueues a system event that runs during the next heartbeat with full context
2. **Isolated**: Runs a dedicated agent turn in a `cron:<jobId>` session with optional delivery to external channels

## Schedule Types

The system supports three scheduling approaches:

- **At**: One-shot timestamp using ISO 8601 format
- **Every**: Fixed intervals measured in milliseconds
- **Cron**: Standard 5-field cron expressions with optional IANA timezone support

The documentation notes that "to reduce top-of-hour load spikes across many gateways, OpenClaw applies a deterministic per-job stagger window of up to 5 minutes for recurring top-of-hour expressions."

## Delivery Options

Isolated jobs can deliver output through:

- **Announce**: Sends summaries to target channels (Slack, Discord, Telegram, etc.)
- **Webhook**: POSTs finished event payloads to specified URLs with optional Bearer token authentication
- **None**: Internal execution only, no external delivery

## Storage & Maintenance

Jobs persist in `~/.openclaw/cron/jobs.json`, while run history is stored as JSONL files in `~/.openclaw/cron/runs/<jobId>.jsonl`. The system includes automatic pruning based on configurable retention windows and file size limits.
