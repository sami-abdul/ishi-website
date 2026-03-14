# WhatsApp Channel Documentation

## Overview
OpenClaw's WhatsApp integration is production-ready via WhatsApp Web (Baileys). The gateway owns linked sessions and supports both direct messages and group chats with configurable access policies.

## Key Setup Steps
The quick setup involves four main actions:

1. **Configure access policy** - Set `dmPolicy` (pairing/allowlist/open/disabled) and define `allowFrom` numbers in E.164 format
2. **Link account** - Run `openclaw channels login --channel whatsapp` to scan a QR code
3. **Start gateway** - Execute `openclaw gateway` to activate the connection
4. **Approve pairings** - If using pairing mode, approve requests via `openclaw pairing approve whatsapp <CODE>`

## Deployment Options
The documentation distinguishes two primary approaches:

- **Dedicated number** - Recommended for cleaner operations with separate WhatsApp identity
- **Personal number fallback** - Supports self-chat mode with safeguards like skipped read receipts

## Access Control Features
The system implements layered security:

- DM policies control direct chat access with allowlist/pairing options
- Group policies require sender authorization and mention-based activation
- Multi-account support with per-account credential storage at `~/.openclaw/credentials/whatsapp/<accountId>/creds.json`

## Message Handling
Messages support quoted reply context injection, media placeholder normalization, and configurable text chunking (default 4000 characters). Group history can be buffered and injected as context when the bot is triggered.

## Delivery & Media
Outbound supports image, video, audio, and document payloads with automatic optimization. Default media size limit is 50MB, with automatic resizing on overflow.
