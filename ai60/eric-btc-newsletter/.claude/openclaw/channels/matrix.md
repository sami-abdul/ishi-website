# Matrix Plugin Documentation

## Overview
The Matrix plugin enables OpenClaw to connect as a user to any Matrix homeserver, supporting direct messages, rooms, threads, media, reactions, polls, location sharing, and end-to-end encryption.

## Installation
Users can install via npm registry with `openclaw plugins install @openclaw/matrix` or from a local git checkout using `openclaw plugins install ./extensions/matrix`.

## Setup Requirements
1. Create a Matrix account on a homeserver
2. Obtain an access token using the Matrix login API
3. Configure credentials via environment variables or config file
4. Enable encryption if using Beeper or encrypted rooms

## Key Configuration Options
The documentation provides minimal configuration examples, including:
- Homeserver URL
- Access token (or user ID + password)
- Optional encryption settings
- DM and group policies

## Access Control
- **DMs**: Default pairing mode requires approval codes for unknown senders; alternatively supports allowlist or open policies
- **Rooms**: Mention-gated allowlist by default; can specify allowed room IDs, aliases, or names

## Multi-Account Support
Users can configure multiple Matrix accounts with different settings, homeservers, and access tokens. Each account runs as a separate Matrix user and crypto state is stored separately per account.

## Encryption
E2EE is supported via the Rust crypto SDK. Device verification through another Matrix client is required for key sharing on first connection.

## Troubleshooting
The guide recommends running diagnostic commands (`openclaw status`, `openclaw doctor`, `openclaw channels status --probe`) and checking pairing state when DMs are ignored.
