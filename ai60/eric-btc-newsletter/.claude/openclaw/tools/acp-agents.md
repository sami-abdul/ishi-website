# ACP Agents Documentation

## Overview

ACP (Agent Client Protocol) sessions enable OpenClaw to run external coding environments like Codex, Claude Code, and Gemini CLI through an ACP backend plugin rather than native sub-agent runtime.

## Quick Start

**Spawning a session:**
```
/acp spawn codex --mode persistent --thread auto
```

**Common operations:**
- Check status: `/acp status`
- Adjust settings: `/acp model <provider/model>`
- Stop work: `/acp close`

## Key Differences: ACP vs Sub-agents

ACP sessions use external harness runtimes, while sub-agents use OpenClaw-native delegation. ACP sessions have identifiers like `agent:<agentId>:acp:<uuid>` and are controlled via `/acp` commands.

## Thread Binding

When enabled, ACP sessions can bind to Discord threads or Telegram topics. Follow-up messages in bound threads automatically route to the same session. This requires:

- `acp.enabled=true`
- Channel adapter support (Discord/Telegram both supported)
- Feature flags: `channels.discord.threadBindings.spawnAcpSessions=true`

## Starting Sessions

**Via `sessions_spawn` tool:**
```json
{
  "task": "Open the repo and summarize tests",
  "runtime": "acp",
  "agentId": "codex",
  "thread": true,
  "mode": "session"
}
```

**Resume existing sessions:**
Use `resumeSessionId` to continue previous work with full conversation history restored.

## Configuration Requirements

Minimal ACP config includes:
- `acp.enabled: true`
- `acp.backend: "acpx"`
- `acp.defaultAgent: "codex"`
- `acp.allowedAgents` list

## Supported Harnesses

Current acpx built-in aliases: pi, claude, codex, opencode, gemini, kimi

## Permission Handling

ACP sessions run non-interactively. Configure via:
- `permissionMode`: approve-all, approve-reads, deny-all
- `nonInteractivePermissions`: fail (default) or deny

## Sandbox Limitations

ACP sessions run on host runtime, not in OpenClaw sandbox. Sandboxed sessions cannot spawn ACP sessions; use `runtime="subagent"` instead.

## Troubleshooting

Common issues include disabled ACP, missing backend plugins, agents not in allowlist, and permission prompt failures. Use `/acp doctor` for backend health checks.
