# Zalo Bot API Documentation

## Overview
Zalo is a Vietnam-focused messaging platform with Bot API support for direct conversations. The documentation describes it as an experimental feature, suitable for support and notification use cases.

## Installation
The Zalo plugin requires separate installation via CLI: `openclaw plugins install @openclaw/zalo` or selection during onboarding setup.

## Configuration Essentials
Basic setup requires three steps: installing the plugin, setting `ZALO_BOT_TOKEN` as an environment variable or config value, and restarting the gateway. The token format follows the pattern `12345689:abc-xyz`.

## Key Features
- **Deterministic routing**: responses automatically return to the originating Zalo chat
- **Media support**: images can be processed inbound and sent outbound
- **Access control**: DM pairing is default; groups use allowlist policies by default
- **Delivery method options**: long-polling (default) or webhook mode

## Important Limits
Text messages are chunked to "2000 characters (Zalo API limit)." Media uploads and downloads are capped at 5MB by default, and streaming functionality is blocked due to the character limitation.

## Access Models
- **DMs**: Pairing codes expire after one hour; approval uses CLI commands
- **Groups**: Three policies available—open, allowlist (default), or disabled—with optional sender ID filtering

## Unsupported Features
Reactions, threads, polls, native commands, and streaming are not supported by this integration.
