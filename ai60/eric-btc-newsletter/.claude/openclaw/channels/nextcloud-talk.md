# Nextcloud Talk Documentation

## Overview
Nextcloud Talk integration is supported through a plugin-based webhook bot system. The plugin enables direct messages, rooms, reactions, and markdown messaging capabilities.

## Installation

The plugin requires separate installation via npm or local checkout:

**npm registry:**
```bash
openclaw plugins install @openclaw/nextcloud-talk
```

**Local git repository:**
```bash
openclaw plugins install ./extensions/nextcloud-talk
```

## Setup Process

Initial configuration involves four key steps:

1. Install the Nextcloud Talk plugin
2. Create a bot on the Nextcloud server using the `occ` command with a shared secret
3. Enable the bot within target room settings
4. Configure OpenClaw with base URL and bot secret credentials

**Minimal configuration example:**
```json5
{
  channels: {
    "nextcloud-talk": {
      enabled: true,
      baseUrl: "https://cloud.example.com",
      botSecret: "shared-secret",
      dmPolicy: "pairing",
    },
  },
}
```

## Key Limitations

- Bots cannot initiate direct messages
- Media uploads aren't supported; files are shared as URLs
- Webhook payload requires API credentials to distinguish between DMs and room contexts
- Threads are not supported

## Access Control

**Direct messages** use a pairing system by default, requiring users to message the bot first. Unknown senders receive a pairing code for approval.

**Rooms** operate on an allowlist basis with mention-gating enabled by default. Configuration can restrict bot participation to specific rooms.

## Feature Support Matrix

| Feature | Status |
|---------|--------|
| Direct messages | Supported |
| Rooms | Supported |
| Threads | Not supported |
| Media | URL-only |
| Reactions | Supported |
| Native commands | Not supported |

## Configuration Options

The system offers extensive customization including webhook listener settings, history limits, text chunking preferences, media size caps, and per-room/per-DM overrides. Additional details available in the full configuration reference section.
