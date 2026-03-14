# OpenClaw Configuration

## Overview

OpenClaw uses an optional JSON5 configuration file located at `~/.openclaw/openclaw.json`. When absent, the system applies safe defaults. The configuration manages channels, models, tools, automation, sessions, and UI settings.

## Key Configuration Methods

Users can edit configurations through four approaches:

1. **Interactive wizard**: `openclaw onboard` or `openclaw configure`
2. **CLI commands**: `openclaw config get/set/unset`
3. **Control UI**: Web interface at `http://127.0.0.1:18789`
4. **Direct editing**: Manual JSON5 file modification with automatic hot reload

## Validation Requirements

OpenClaw enforces strict schema validation. Invalid configurations prevent Gateway startup. Running `openclaw doctor` identifies issues, and `openclaw doctor --fix` applies automatic repairs.

## Common Configuration Tasks

**Channel Setup**: Each provider (WhatsApp, Telegram, Discord, Slack, Signal, iMessage, Google Chat, Mattermost, MS Teams) uses dedicated config sections under `channels.<provider>`. Access control uses `dmPolicy` patterns: "pairing," "allowlist," "open," or "disabled."

**Model Configuration**: Set primary and fallback models using `agents.defaults.model`. The reference format is `provider/model` (e.g., `anthropic/claude-sonnet-4-5`).

**Access Control**: DM policies determine who can message the bot, while group chat requires configurable mention patterns or metadata mentions.

**Sessions**: Control conversation continuity through `dmScope` settings, thread bindings, and reset modes (daily, idle-based).

**Sandboxing**: Optional Docker container isolation for agent sessions with configurable scope levels.

**Automation**: Configure heartbeat check-ins, cron jobs, and webhook endpoints for event-driven workflows.

## Hot Reload Behavior

The Gateway watches the config file and applies changes automatically. Three reload modes exist:

- **Hybrid** (default): Instantly applies safe changes; automatically restarts for critical ones
- **Hot**: Applies safe changes only; warns when restart needed
- **Restart**: Restarts on any change
- **Off**: Disables watching; manual restart required

Most configuration changes hot-apply without downtime. Server infrastructure changes (port, binding, TLS) require restart.

## Advanced Features

**Multi-Agent Routing**: Run isolated agents with separate workspaces using `agents.list` and binding rules.

**Config Inclusion**: Use `$include` to organize large configurations across multiple files with deep merging support.

**Environment Variables**: Reference env vars in config strings using `${VAR_NAME}` syntax. Support includes shell environment import and secret references (env, file, exec sources).

**Programmatic Updates**: Rate-limited RPC methods (`config.apply`, `config.patch`) enable dynamic configuration with validation and optional restart coordination.
