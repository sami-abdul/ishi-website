# IRC Configuration Guide

This documentation covers connecting OpenClaw to IRC channels and direct messages.

## Setup Basics
To enable IRC, you configure the `channels.irc` section in `~/.openclaw/openclaw.json` with essential settings like host, port, TLS status, bot nickname, and target channels.

## Security Defaults
The system implements two access control layers:
1. **Channel access** — determines if the bot accepts messages from specific channels
2. **Sender access** — controls which users can trigger the bot

Key security defaults include: "DM allowlists default to `pairing`" and "group channels default to `allowlist`" mode.

## Common Configuration Issues
A frequent mistake involves confusing DM allowlists with channel sender allowlists. If logs show "drop group sender," you likely need to set `groupAllowFrom` or per-channel `allowFrom` rules instead of DM-specific settings.

## Mention Requirements
By default, the bot requires mentions in group contexts. To disable this, set `requireMention: false` at the channel level.

## Tool Restrictions for Public Channels
When allowing anyone to prompt the bot with `allowFrom: ["*"]`, the documentation recommends restricting available tools via `deny` lists or implementing different tool policies per sender using `toolsBySender`.

## Optional Features
The guide also covers NickServ authentication, environment variable configuration, and troubleshooting steps for common connection problems.
