# Session Tools Documentation

## Overview

OpenClaw provides a compact toolkit for agent-to-agent communication. The system enables agents to discover, retrieve, and forward messages across isolated sessions while maintaining security controls.

## Core Tools

The documentation defines four primary functions:

1. **sessions_list** - Discovers available sessions with optional filtering by kind, activity window, and message inclusion
2. **sessions_history** - Retrieves transcript data for a specific session
3. **sessions_send** - Routes messages to another session with synchronous or fire-and-forget modes
4. **sessions_spawn** - Launches isolated sub-agent runs with resource limits and sandboxing

## Key Design Principles

The system uses standardized session identifiers: `"main"` for direct chats, structured keys like `"agent:<agentId>:<channel>:group:<id>"` for groups, and prefixed formats for cron/hook/node sessions.

"Global and unknown are reserved values and are never listed" to prevent ambiguity in routing logic.

## Message Routing & Reply Logic

**sessions_send** implements a sophisticated multi-round pattern. After the primary message delivery completes, OpenClaw initiates an automatic reply-back loop allowing up to five alternating exchanges. Either party can halt this with `REPLY_SKIP`. Subsequently, an announce step broadcasts results to the target channel unless suppressed via `ANNOUNCE_SKIP`.

## Security Enforcement

Access control operates at the policy level rather than per-session. Configuration blocks specific channel/chat-type combinations:

```json
{
  "session": {
    "sendPolicy": {
      "rules": [{"match": {"channel": "discord", "chatType": "group"}, "action": "deny"}],
      "default": "allow"
    }
  }
}
```

## Sandbox Isolation

Sandboxed agents face restricted session visibility by default (tree-scoped: current + spawned children). The `sessionToolsVisibility` configuration can further clamp access, preventing cross-agent enumeration even within trusted deployments.
