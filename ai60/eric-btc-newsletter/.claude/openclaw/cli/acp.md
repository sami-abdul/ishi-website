# OpenClaw ACP Bridge Documentation

## Overview

The `openclaw acp` command operates as a Gateway-backed Agent Client Protocol bridge, enabling IDEs and other clients to communicate with OpenClaw Gateway sessions through stdio while forwarding prompts over WebSocket.

## Key Capabilities

**Implemented Features:**
- Core bridge operations including initialization, session management, prompts, and cancellation
- Session listing and slash command support
- Partial support for session loading, prompt content handling, and session modes
- Tool streaming with raw I/O and file location data

**Notable Limitations:**
- Per-session MCP servers are unsupported in bridge mode
- Client filesystem and terminal methods unavailable
- Session plans and thought streaming not exposed
- Session history replay excludes tool calls and system notices

## Configuration & Usage

Connect to a local or remote Gateway:

```bash
openclaw acp --url wss://gateway-host:18789 --token-file ~/.openclaw/gateway.token
```

Target specific agents using session keys:

```bash
openclaw acp --session agent:main:main
openclaw acp --session-label "support inbox"
```

## IDE Integration

**Zed Setup:** Add a custom ACP agent in `~/.config/zed/settings.json`:

```json
{
  "agent_servers": {
    "OpenClaw ACP": {
      "type": "custom",
      "command": "openclaw",
      "args": ["acp"]
    }
  }
}
```

**ACP Clients:** Use `acpx openclaw` to connect coding agents like Codex or Claude Code to your OpenClaw sessions.

## Security Guidance

Avoid exposing credentials in process listings. Use `--token-file`/`--password-file` or environment variables (`OPENCLAW_GATEWAY_TOKEN`, `OPENCLAW_GATEWAY_PASSWORD`) instead of command-line arguments.
