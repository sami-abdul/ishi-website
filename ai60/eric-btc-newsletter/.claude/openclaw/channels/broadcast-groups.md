# Broadcast Groups Documentation

## Overview
Broadcast Groups enable multiple agents to simultaneously process and respond to identical messages. This feature is currently experimental and available exclusively on WhatsApp's web channel.

## Key Functionality

**Message Processing:** According to the documentation, "Broadcast groups are evaluated after channel allowlists and group activation rules," meaning they activate when OpenClaw would normally respond.

## Configuration

The setup requires a top-level `broadcast` section using WhatsApp peer IDs as keys:

```json
{
  "broadcast": {
    "120363403215116621@g.us": ["alfred", "baerbel", "assistant3"]
  }
}
```

Two processing strategies are available:
- **Parallel (default):** All agents process simultaneously
- **Sequential:** Agents process in specified order

## Session Isolation

Each agent maintains completely separate contexts, including distinct session keys, conversation histories, workspaces, and memory structures. The documentation notes that "agents don't see other agents' messages" by design.

## Use Cases

The framework supports specialized agent teams (code review, documentation, security auditing), multi-language support, quality assurance workflows, and task automation scenarios.

## Limitations

Current constraints include no hard agent limit (though 10+ may cause slowness), agents cannot view each other's responses, and parallel responses may arrive in unpredictable order.
