# Groups Documentation

## Core Concept
OpenClaw operates through existing messaging accounts without a separate bot user. Groups function consistently across WhatsApp, Telegram, Discord, Slack, Signal, iMessage, Microsoft Teams, and Zalo.

## Key Access Controls

**Default behavior restricts groups** using an allowlist model. The documentation explains that "Groups are restricted (`groupPolicy: "allowlist")`" and require mentions by default unless explicitly disabled.

Three policy options exist:
- **"open"**: Bypasses allowlists but mention-gating persists
- **"disabled"**: Blocks all group messages
- **"allowlist"**: Only permits configured groups

## Message Flow Logic

Messages follow a sequential evaluation: First, the system checks `groupPolicy` status. Next, it verifies group allowlists. Finally, it applies mention-gating requirements before responding.

## Configuration Examples

To allow all groups requiring mentions:
```json
groups: { "*": { requireMention: true } }
```

To restrict triggering to specific users only:
```json
groupPolicy: "allowlist"
groupAllowFrom: ["+1555..."]
```

## Advanced Features

- **Session isolation**: Groups use dedicated session keys (`agent:<agentId>:<channel>:group:<id>`)
- **Tool restrictions**: Per-group tool allowlists/denylists available
- **Mention patterns**: Configurable regex patterns recognize mentions as fallback
- **Owner commands**: `/activation` lets group owners toggle reply behavior

## Practical Pattern

A single agent can serve DMs (full access, host-based) while restricting groups (sandboxed, limited tools), sharing one "brain" across different execution environments.
