# OpenClaw Message Command Documentation

## Overview

The `openclaw message` command enables sending messages and channel actions across multiple platforms including Discord, Slack, Telegram, WhatsApp, Google Chat, Signal, iMessage, MS Teams, and Mattermost.

## Key Features

**Channel Support:** The tool works with nine different messaging platforms. Users must specify a channel via `--channel` flag unless only one is configured.

**Target Formats:** Each platform has specific formatting requirements. For example, Discord uses `channel:<id>` syntax, while WhatsApp requires E.164 phone numbers or group JIDs.

**Name Resolution:** The system can resolve channel names like "Help" or "#help" through directory caching, with live lookups available on supported platforms.

## Primary Actions

The command supports core messaging operations including:
- **send**: Transmit messages with optional media and replies
- **poll**: Create multi-option polls with customizable duration
- **react**: Add emoji reactions to messages
- **read/edit/delete**: Manage message content
- **pin/unpin**: Pin important messages

Additional capabilities cover thread management, emoji/sticker uploads, Discord roles and members, events, and moderation features like timeouts and bans.

## Usage Pattern

Commands follow this structure: `openclaw message <subcommand> [flags]`, with common flags including `--channel`, `--target`, `--message`, and `--dry-run` for testing.
