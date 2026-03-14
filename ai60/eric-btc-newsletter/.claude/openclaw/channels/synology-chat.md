# Synology Chat Integration for OpenClaw

## Overview

The Synology Chat plugin enables OpenClaw to function as a direct-message channel through Synology Chat webhooks. According to the documentation, it "accepts inbound messages from Synology Chat outgoing webhooks and sends replies through a Synology Chat incoming webhook."

## Installation & Setup

The plugin requires separate installation via:
```bash
openclaw plugins install ./extensions/synology-chat
```

Basic configuration involves creating webhooks in Synology Chat and configuring OpenClaw's `channels.synology-chat` settings with authentication tokens and URLs.

## Key Features

**Access Control**: The system supports three DM policy modes—allowlist (recommended), open, and disabled—with user ID-based filtering.

**Multi-Account Support**: Multiple Synology Chat accounts can be configured under separate settings, each with custom tokens, URLs, and access policies.

**Outbound Messaging**: Messages can be sent to numeric user IDs, with media delivery supported through URL-based file transfer.

## Configuration & Security

The setup requires environment variables or JSON configuration for:
- Authentication tokens
- Incoming webhook URLs
- DM policies and allowed user lists
- Rate limiting settings

Security recommendations include "Keep `token` secret and rotate it if leaked" and maintaining `allowInsecureSsl: false` in production environments unless trusting self-signed certificates.

Webhook requests include token verification and per-sender rate limiting for protection.
