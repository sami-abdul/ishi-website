# iMessage Integration Documentation

## Overview

The iMessage integration is a **legacy external CLI tool** that the OpenClaw gateway spawns as `imsg rpc`, communicating via JSON-RPC over standard input/output without requiring a separate daemon or port.

**Key Warning:** New iMessage deployments should use BlueBubbles instead, as the `imsg` integration may be removed in future releases.

## Quick Setup

### Local Mac Installation
1. Install the `imsg` CLI tool via Homebrew
2. Configure OpenClaw with the CLI path and Messages database location
3. Start the gateway
4. Approve DM pairing requests (which expire after 1 hour)

### Remote Mac via SSH
Point the `cliPath` configuration at a wrapper script that SSHes to a remote Mac and executes `imsg`. When attachments are enabled, configure `remoteHost` for SCP-based file fetching.

## Requirements

- Messages must be signed into the Mac running `imsg`
- Full Disk Access permission required for database access
- Automation permission needed to send messages through Messages.app
- Permissions are context-specific; headless deployments may need one-time interactive approval commands

## Access Control

**DM Policy Options:**
- `pairing` (default)
- `allowlist`
- `open` (requires `allowFrom: "*"`)
- `disabled`

**Group Policy Options:**
- `allowlist` (default when configured)
- `open`
- `disabled`

Group mention detection relies on regex patterns since iMessage lacks native mention metadata.

## Deployment Patterns

- **Dedicated Bot User:** Create a separate macOS user with its own Apple ID for isolated bot traffic
- **Remote via Tailscale:** Common architecture with gateway on Linux/VM and `imsg` on a Mac in your tailnet
- **Multi-Account:** Per-account configuration available under `channels.imessage.accounts`

## Media & Addressing

**Outbound Media:**
- Default max size: 16 MB (`mediaMaxMb`)
- Text chunk limit: 4000 characters (configurable)
- Chunk modes: `length` (default) or `newline` (paragraph-first)

**Preferred Target Formats:**
- `chat_id:123` (recommended)
- `chat_guid:...`
- `chat_identifier:...`

## Key Configuration

Channel-initiated config writes are enabled by default; disable via `configWrites: false`.

Remote attachments require proper SSH/SCP setup with host keys pre-populated in `~/.ssh/known_hosts` and strict host-key checking enabled.
