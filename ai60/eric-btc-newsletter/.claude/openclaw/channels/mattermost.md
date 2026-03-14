# Mattermost Plugin Documentation

## Overview

OpenClaw supports Mattermost through a plugin offering bot token and WebSocket event integration. The platform handles channels, groups, and direct messages.

## Installation

The Mattermost plugin requires separate installation via npm or local checkout:

```bash
openclaw plugins install @openclaw/mattermost
```

## Basic Configuration

Essential setup involves three steps: installing the plugin, creating a bot account, and configuring OpenClaw with the bot token and base URL.

A minimal configuration looks like:

```json5
{
  channels: {
    mattermost: {
      enabled: true,
      botToken: "mm-token",
      baseUrl: "https://chat.example.com",
      dmPolicy: "pairing",
    },
  },
}
```

## Key Features

**Chat Modes:** The system supports three response patterns—`oncall` (mention-based), `onmessage` (all messages), and `onchar` (prefix-triggered).

**Native Slash Commands:** Optional registration of `oc_*` commands requires enabling via configuration with callback path specification.

**Access Control:** Direct messages use pairing codes by default for unknown senders, while channels enforce allowlist-based access.

**Message Tools:** Features include emoji reactions and interactive buttons with HMAC-SHA256 verification for security.

**Directory Adapter:** Automatically resolves channel and user names through the Mattermost API.

**Multi-Account Support:** Configuration allows multiple Mattermost instances under separate account identifiers.

## Important Setup Notes

The callback endpoint for commands and buttons must be reachable from the Mattermost server. Local addresses work only when both services share the same host. Button action IDs require alphanumeric characters exclusively; hyphens and underscores cause routing failures.
