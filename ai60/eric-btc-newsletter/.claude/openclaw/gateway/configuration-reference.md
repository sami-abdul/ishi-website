# Configuration Reference

This is a comprehensive field-by-field reference for `~/.openclaw/openclaw.json` in JSON5 format (comments and trailing commas allowed). All fields are optional with safe defaults when omitted.

## Core Sections

### Channels
OpenClaw supports multiple messaging platforms with customizable access policies:

- **DM Policies**: `pairing` (default, requires approval), `allowlist`, `open`, or `disabled`
- **Group Policies**: `allowlist` (default), `open`, or `disabled`
- Supported platforms include WhatsApp, Telegram, Discord, Google Chat, Slack, Mattermost, Signal, BlueBubbles, iMessage, Microsoft Teams, IRC, and more

### Agent Configuration
Configure agent defaults and per-agent overrides:

- **Workspace**: Default at `~/.openclaw/workspace`
- **Model Selection**: Primary model plus fallback options (e.g., `anthropic/claude-opus-4-6`)
- **Bootstrap Files**: Auto-created workspace documentation files (AGENTS.md, SOUL.md, etc.)
- **Sandbox Settings**: Optional Docker isolation with configurable access levels

### Session Management
Control how conversations are organized and reset:

- **Scope**: `per-sender` groups by user identity
- **Reset Modes**: `daily` at specific hour or `idle` after inactivity period
- **Thread Bindings**: Auto-unfocus settings for Discord/Telegram threads
- **Maintenance**: Cleanup policies for session storage with rotation and retention options

### Messages & Streaming
Configure message handling and delivery:

- **Response Prefix**: Emoji or text identifier (supports template variables like `{model}`, `{identity.name}`)
- **Queue Mode**: `collect`, `steer`, `followup`, `interrupt`, or `queue` for multi-message handling
- **Debouncing**: Batch rapid messages with configurable delays
- **TTS Integration**: Text-to-speech via ElevenLabs or OpenAI with voice configuration

### Tools
Enable and restrict agent capabilities:

- **Tool Profiles**: `minimal`, `coding`, `messaging`, or `full` as base allowlist
- **Tool Groups**: Organized categories like `group:fs`, `group:runtime`, `group:web`
- **Elevated Access**: Host-level `exec` with per-sender authorization
- **Loop Detection**: Safety checks for repeated tool calls (disabled by default)

### Browser & Automation
Configure browser automation and SSRF policies:

- **Browser Profiles**: Multiple profiles with different CDP ports
- **SSRF Policy**: Control private-network access (`dangerouslyAllowPrivateNetwork` defaults to `true`)
- **Evaluate**: Enable/disable JavaScript evaluation

### Gateway
Local or remote gateway configuration:

- **Port & Binding**: Default port 18789, bind modes include `loopback`, `lan`, `tailscale`
- **Authentication**: `token`, `password`, `trusted-proxy`, or `none` modes
- **Rate Limiting**: Failed-auth protection with configurable lockout
- **Control UI**: Optional web interface at `/openclaw`
- **Tailscale Integration**: Optional `serve` or `funnel` modes

### Custom Models
Extend the model catalog with custom providers:

```
models.providers.<id>: {
  baseUrl, apiKey, api, models
}
```

Supports OpenAI-compatible, Anthropic, and Google endpoints with fallback chains.

### Plugins
Extensibility system for custom functionality:

- Load from `~/.openclaw/extensions` or custom paths
- Per-plugin config and env vars
- Optional prompt-injection guards

### Skills
Named agent capabilities with optional API credentials:

- Bundled skills allowlist
- Custom directories for organization
- Per-skill configuration and environment variables

## Notable Features

**Multi-Agent Routing**: Bind different agents to channels/accounts via `bindings[]` with deterministic match order.

**Identity Links**: Map cross-platform identities (e.g., Telegram + Discord accounts) to shared sessions.

**Compaction**: Auto-summarization for long transcripts with token reserve floors and memory flushing.

**Context Pruning**: Remove old tool results without modifying persistent history.

**Docker Sandboxing**: Optional per-scope/per-agent isolation with network, filesystem, and capability controls.

**Heartbeat Runs**: Periodic autonomous agent checks with configurable intervals and delivery targets.

All configuration changes require a gateway restart except where explicitly noted (e.g., inline directives in chat messages).
