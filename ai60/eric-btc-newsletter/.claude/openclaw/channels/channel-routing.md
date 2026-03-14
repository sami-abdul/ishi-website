# Channel Routing Documentation

## Overview
OpenClaw implements deterministic channel routing where replies return to the originating message's channel. The system doesn't allow models to select destinations; instead, configuration controls where responses go.

## Core Concepts

**Channels supported:** WhatsApp, Telegram, Discord, Slack, Signal, iMessage, and WebChat.

**Key components:**
- **AccountId**: Represents per-channel account instances
- **AgentId**: Isolated workspace with its own session storage
- **SessionKey**: Storage bucket for context and concurrency management

## Session Organization

The platform structures sessions hierarchically:

- Direct messages use the agent's main session: `agent:<agentId>:<mainKey>`
- Groups and channels maintain isolation: `agent:<agentId>:<channel>:group:<id>`
- Threads append identifiers: `:thread:<threadId>` for Slack/Discord

Example: `agent:main:telegram:group:-1001234567890:topic:42`

## Agent Selection Process

Routing follows a priority hierarchy:

1. Exact peer matching via bindings
2. Parent peer/thread inheritance
3. Discord guild + roles matching
4. Guild-only matching
5. Slack team matching
6. Account ID matching
7. Channel-wide matching
8. Default agent fallback

Multiple match criteria require **all fields to satisfy conditions** before applying a binding.

## Broadcast Configuration

Run multiple agents simultaneously for the same peer using broadcast groups:

```json5
{
  broadcast: {
    strategy: "parallel",
    "120363403215116621@g.us": ["alfred", "baerbel"]
  }
}
```

## Storage Location

Sessions persist at: `~/.openclaw/agents/<agentId>/sessions/sessions.json`

Custom paths support `{agentId}` templating via the `session.store` configuration option.
