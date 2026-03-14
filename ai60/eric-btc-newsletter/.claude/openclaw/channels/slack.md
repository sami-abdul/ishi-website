# Slack Integration Documentation

## Overview

OpenClaw's Slack integration supports direct messages and channels through Socket Mode (default) or HTTP Events API. The system is production-ready and handles DMs in pairing mode by default.

## Setup Options

**Socket Mode (Recommended)**
Create a Slack app with Socket Mode enabled, generate an App Token (`xapp-...`) and Bot Token (`xoxb-...`), then configure OpenClaw with these credentials. Subscribe to required bot events including mentions, messages, and reactions. Launch with `openclaw gateway`.

**HTTP Events API**
Alternative mode requiring a signing secret and webhook path. Each account needs a distinct webhook path to avoid registration conflicts.

## Key Configuration Areas

**Token Management**: Bot and app tokens are required for Socket Mode; HTTP mode needs bot token plus signing secret. User tokens (`xoxp-...`) are configuration-only and default to read-only access.

**Access Control**: DM policy options include pairing (default), allowlist, open, or disabled. Channel policy supports open, allowlist, or disabled modes. Channel messages require mentions by default unless configured otherwise.

**Threading**: DMs default to the agent's main session. Channels create isolated sessions, with optional thread-specific sessions. Thread history defaults to 20 messages; set to 0 to disable fetching.

**Text Streaming**: Supports Slack's native streaming API with "partial" replacement (default), "block" appending, or "progress" status modes.

## Notable Features

- Acknowledgement and typing reactions provide visual feedback
- Native slash commands adapt menu rendering (buttons, select menus, or async filtering) based on option count
- File attachments and outbound media respect configurable size limits (default 20MB)
- System events capture edits, reactions, member changes, and pin activity

## Common Troubleshooting

Check group policy, channel allowlists, mention requirements, and user allowlists if channels aren't responding. For DMs, verify enablement and pairing approvals. Validate tokens and signing secrets for connectivity issues.
