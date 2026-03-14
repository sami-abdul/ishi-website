# Signal Channel Documentation

## Overview
The Signal integration operates as an external CLI tool that connects OpenClaw to Signal messaging through `signal-cli` via HTTP JSON-RPC and Server-Sent Events (SSE).

## Setup Requirements
Users need OpenClaw installed on Linux (Ubuntu 24 tested), `signal-cli` available on the gateway host, and either an existing Signal account or a phone number capable of receiving SMS verification.

## Two Configuration Paths

**Path A (QR Link):** Link an existing Signal account using `signal-cli link -n "OpenClaw"` and scan with Signal.

**Path B (SMS Registration):** Register a dedicated bot number through `signal-cli register` with captcha and SMS verification.

## Key Configuration Fields
The minimal setup requires specifying the bot's phone number in E.164 format, the path to `signal-cli`, a DM access policy (typically "pairing"), and approved sender numbers.

## Access Control Mechanisms
DM access defaults to "pairing" mode, where unknown senders receive time-limited pairing codes requiring approval via `openclaw pairing approve signal <CODE>`. Groups support "open," "allowlist," or "disabled" policies.

## Notable Features
- Typing indicators and read receipts supported
- Message reactions available via the message tool
- Text chunking with optional newline-based paragraph splitting
- Media attachments supported with configurable size limits
- Group history context available up to 50 messages by default

## Important Security Considerations
Account keys store locally (typically `~/.local/share/signal-cli/data/`), requiring backup before migration. Using a dedicated bot number prevents de-authenticating personal Signal app sessions.
