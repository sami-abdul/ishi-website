# OpenClaw System Documentation

## Overview
The `openclaw system` command provides gateway-level utilities for managing events, heartbeats, and monitoring system presence.

## Key Commands

Three primary operations are available:

1. **Event Management**: Queue system messages via `system event`
2. **Heartbeat Control**: Toggle and monitor heartbeat status
3. **Presence Monitoring**: View active nodes and instances

## System Event Command

This feature enqueues messages on the main session. "The next heartbeat will inject it as a `System:` line in the prompt."

**Options:**
- `--text <text>` (required): Event message content
- `--mode <mode>`: Either `now` (immediate trigger) or `next-heartbeat` (scheduled)
- `--json`: Structured output format

## Heartbeat Management

Three subcommands control heartbeat behavior:
- `last`: Retrieve the most recent heartbeat event
- `enable`: Reactivate paused heartbeats
- `disable`: Temporarily pause heartbeats

Both support `--json` flag for programmatic parsing.

## System Presence

Lists "the current system presence entries the Gateway knows about (nodes, instances, and similar status lines)."

## Requirements

Operations "Require a running Gateway reachable by your current config (local or remote)" and "System events are ephemeral and not persisted across restarts."
