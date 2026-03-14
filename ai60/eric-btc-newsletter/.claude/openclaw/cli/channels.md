# OpenClaw Channels Documentation

## Overview

The `openclaw channels` command manages chat channel accounts and their runtime status on the Gateway. It connects to platforms like Discord, Slack, Telegram, WhatsApp, Signal, Matrix, and MS Teams.

## Key Command Categories

**Status and Information:**
- List configured channels
- Check channel status
- Probe provider capabilities
- Resolve channel and user names to IDs
- View gateway logs

**Account Management:**
- Add new channel accounts with `openclaw channels add`
- Remove accounts with `openclaw channels remove`
- Interactive setup supports binding accounts to agents
- Login/logout for WhatsApp and similar platforms

## Configuration Features

When adding accounts, the interactive wizard can:
- Prompt for account credentials
- Collect optional display names
- Optionally bind accounts to specific agents
- Preserve existing routing rules during migration

The system supports both single and multi-account configurations per channel. When adding secondary accounts, "OpenClaw moves account-scoped single-account top-level values into `channels.<channel>.accounts.default`" to maintain backward compatibility.

## Troubleshooting Resources

Use `openclaw doctor` for guided fixes or `openclaw status --deep` for comprehensive diagnostics. The `channels resolve` command is read-only and reports degraded results if credentials are unavailable rather than aborting.
