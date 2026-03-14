# Health Checks

## Overview

The documentation describes CLI-based health check utilities for the OpenClaw system, enabling users to verify channel connectivity and diagnose connection issues.

## Quick Status Commands

The guide offers several diagnostic approaches:

- **`openclaw status`** provides local summary: gateway reachability/mode, update hint, linked channel auth age, sessions + recent activity.
- **`openclaw status --all`** delivers comprehensive local diagnosis with read-only, color-coded output suitable for debugging
- **`openclaw status --deep`** extends probing to include the running Gateway with per-channel support
- **`openclaw health --json`** retrieves full health snapshot from the Gateway via WebSocket

Users can also send `/status` directly in WhatsApp or WebChat for status replies without triggering the agent.

## Log Monitoring

System logs are located at `/tmp/openclaw/openclaw-*.log` and should be filtered for: `web-heartbeat`, `web-reconnect`, `web-auto-reply`, `web-inbound`.

## Troubleshooting Scenarios

**Authentication issues:** Relinking via logout/login resolves status codes 409-515 or `loggedOut` messages

**Gateway problems:** Start the service using `openclaw gateway --port 18789` with `--force` if port conflicts occur

**Missing inbound messages:** Verify the linked phone is online, sender is allowlisted, and group chat mention rules match configured patterns

## Health Command Details

The dedicated health command queries the Gateway (not channel sockets directly) and reports credential status, per-channel probes, and session summaries with configurable timeout settings.
