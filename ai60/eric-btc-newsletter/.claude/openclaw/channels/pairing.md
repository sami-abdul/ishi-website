# OpenClaw Pairing Documentation

## Overview
OpenClaw implements "pairing" as an explicit owner approval mechanism operating in two contexts:

1. **DM pairing** - Controls who can message the bot
2. **Node pairing** - Determines which devices can connect to the gateway network

## DM Pairing (Inbound Chat Access)

When a channel uses `pairing` policy, unknown senders receive a short code, and their messages remain unprocessed until approval occurs.

**Pairing code characteristics:**
- Eight uppercase characters, excluding ambiguous letters
- One-hour expiration window
- Maximum of 3 pending requests per channel

**Approval workflow:**
```bash
openclaw pairing list telegram
openclaw pairing approve telegram <CODE>
```

Supported channels include Telegram, WhatsApp, Signal, iMessage, Discord, Slack, and Feishu.

**Storage location:**
State files reside in `~/.openclaw/credentials/`, with pending requests and approved allowlists separated by channel and account scope.

## Node Device Pairing

Devices connecting as nodes require Gateway approval. The recommended iOS method uses a Telegram `/pair` command that generates a base64-encoded setup code containing the Gateway WebSocket URL and temporary pairing token.

**Device management commands:**
```bash
openclaw devices list
openclaw devices approve <requestId>
openclaw devices reject <requestId>
```

Device pairing state is stored in `~/.openclaw/devices/` with separate files for pending and paired devices.
