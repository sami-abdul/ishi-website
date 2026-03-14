# Slash Commands Documentation

This page documents the slash command system for OpenClaw.

## Core Concepts

Commands are processed by the Gateway and work in two forms:
- **Commands**: Standalone `/...` messages
- **Directives**: Special modifiers like `/think`, `/verbose`, `/reasoning` that can persist to sessions or work inline

## Authorization

Commands require authorization through:
- `commands.allowFrom` (highest priority when set)
- Channel allowlists/pairing plus `commands.useAccessGroups` (fallback)

Unauthorized senders see directives treated as plain text.

## Major Command Categories

**Essential commands** include:
- `/help`, `/commands`, `/status`, `/whoami`
- `/skill <name>` (run skills by name)
- `/model <name>` (select AI model)
- `/think`, `/verbose`, `/reasoning`, `/elevated` (behavior modifiers)
- `/reset` or `/new` (start fresh session)

**Management commands** (owner-only):
- `/config` (manage settings on disk)
- `/debug` (runtime-only overrides)
- `/allowlist` (manage access)
- `/session` (manage thread bindings)

**Bash commands** (host-only):
- `! <cmd>` or `/bash <cmd>` (requires enabling in config)

## Key Configuration

The main toggle is `commands.text: true` (enables parsing). Native command support depends on platform (Discord/Telegram by default; Slack requires manual setup).

## Important Notes

- Command-only messages from authorized users bypass the model queue
- Inline shortcuts like `/status` embedded in messages are stripped before the model processes text
- `/verbose` and `/reasoning` can expose internal details—avoid in group settings
