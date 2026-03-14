# Session Management Documentation Summary

This documentation covers OpenClaw's session management system, which organizes conversations between agents and users.

## Key Concepts

**Session Organization**: OpenClaw treats direct chats as primary sessions, collapsing them to `agent:<agentId>:<mainKey>` format, while group and channel chats receive their own keys.

**Direct Message Scope**: The `dmScope` setting controls how DMs are grouped:
- `main` (default): all DMs share continuity
- `per-peer`: isolation by sender
- `per-channel-peer`: isolation by channel + sender (recommended for multi-user inboxes)
- `per-account-channel-peer`: isolation by account + channel + sender (recommended for multi-account setups)

## Security Considerations

The documentation emphasizes that "without secure DM mode, all users share the same conversation context, which can leak private information between users." To prevent this, users should set `dmScope` to `per-channel-peer` or similar when multiple people can message the agent.

## Session Maintenance

Automatic maintenance keeps session stores bounded with configurable limits for entry count, age, and disk space. The system supports three modes: `warn` (reporting only), `enforce` (active cleanup), and allows both time-based pruning and count-based capping.

## Inspection and Management

Users can monitor sessions through CLI commands like `openclaw status`, `openclaw sessions --json`, and in-chat commands like `/status`, `/context list`, and `/compact`.

The documentation also provides guidance on lifecycle management, reset policies, and configuration examples for different deployment scenarios.
