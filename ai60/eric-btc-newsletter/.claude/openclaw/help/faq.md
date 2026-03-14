# OpenClaw FAQ

## Overview

OpenClaw is a personal AI assistant system you operate on your own devices, accessible through messaging platforms like WhatsApp, Telegram, Slack, Discord, Signal, and iMessage. The **Gateway** serves as the always-on control plane.

## Quick Troubleshooting (First 60 Seconds)

When issues arise, these commands provide diagnostic information:

```bash
openclaw status
openclaw status --all
openclaw gateway status
openclaw status --deep
openclaw logs --follow
openclaw doctor
openclaw health --json
```

## Installation & Setup

### Getting Started

The recommended installation path uses the onboarding wizard:

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
openclaw onboard --install-daemon
```

For contributors or those wanting source access:

```bash
curl -fsSL https://openclaw.ai/install.sh | bash -s -- --install-method git
```

**Requirements:** Node >= 22, with `pnpm` recommended. Bun is not recommended for the Gateway.

### Platform-Specific Notes

**Raspberry Pi:** Works on Pi 4 with 512MB-1GB RAM minimum (2GB recommended). Use 64-bit OS and prefer git installs for faster updates.

**Windows:** Install Git for Windows first. WSL2 provides the smoothest experience. The installer includes verbose mode: add `--verbose` flag for troubleshooting.

**Linux:** Standard package installation works. For Linuxbrew compatibility, add the brew prefix to systemd service PATH variables.

### Switching Between Installations

You can transition between npm and git installs without losing data:

```bash
openclaw doctor
openclaw gateway restart
```

Doctor detects mismatches and updates service configuration without deleting state or workspace files.

## Configuration

### File Location & Format

Configuration lives in `$OPENCLAW_CONFIG_PATH` (default: `~/.openclaw/openclaw.json`) using JSON5 format. If missing, safe defaults apply.

### Data Storage Structure

| Path | Purpose |
|------|---------|
| `~/.openclaw/openclaw.json` | Main config |
| `~/.openclaw/credentials/` | Provider state |
| `~/.openclaw/agents/<agentId>/` | Per-agent state |
| `~/.openclaw/agents/<agentId>/sessions/` | Conversation history |
| `~/.openclaw/workspace/` | Agent workspace (AGENTS.md, MEMORY.md, skills) |

**Important:** Your workspace (containing AGENTS.md, SOUL.md, USER.md, and memory files) exists separately from `~/.openclaw`. Default location is `~/.openclaw/workspace`, configurable via `agents.defaults.workspace`.

### Environment Variables

OpenClaw loads environment variables from:
1. Parent process (shell, systemd, etc.)
2. `.env` in current working directory
3. `~/.openclaw/.env` (fallback)
4. Inline config `env` block (if missing from process)

When running as a service without shell environment inheritance, place credentials in `~/.openclaw/.env`.

### Hot Reload

By default, config changes apply automatically (`gateway.reload.mode: "hybrid"`). Safe changes reload on-the-fly; critical changes trigger a restart.

## Authentication & Models

### Anthropic Setup

**Setup-token auth:** Generated via Claude Code CLI (not available in web console):

```bash
claude setup-token
```

Then paste the token: `openclaw models auth paste-token --provider anthropic`

**Rate Limiting:** HTTP 429 errors mean your quota is exhausted. Subscriptions have window limits; API keys show usage in the Anthropic Console.

### OpenAI & Codex

OpenClaw supports "OpenAI Code (Codex)" subscription OAuth. The onboarding wizard handles the OAuth flow automatically.

### Model Selection

References use format `provider/model` (e.g., `anthropic/claude-opus-4-6`). Omitting the provider currently defaults to Anthropic but should be explicit.

Built-in aliases exist for common models but can be overridden via `models.aliases` in config.

### Failover & Switching

Models configured in `agents.defaults.model.primary` establish the default. Switch on-the-fly with `/model <provider/name>` or set per-agent defaults.

Per-agent override example:

```json5
{
  agents: {
    list: [
      { id: "fast-chat", model: { primary: "openai/gpt-4" } },
      { id: "coding", model: { primary: "anthropic/opus-4-6" } }
    ]
  }
}
```

## Channels & Multi-Agent Routing

### WhatsApp

No separate bot account needed. OpenClaw runs on your existing account. Groups require allowlisting unless using the mention gating pattern.

**Get group JID:** Tail logs and send a test message:

```bash
openclaw logs --follow --json
```

Look for JID ending in `@g.us`.

Multiple people can share one WhatsApp number across different agents using multi-agent routing. Each person gets their own workspace while replies come from the same account.

### Telegram

Access control uses numeric Telegram user IDs, not usernames. Resolve via the official API:

```
https://api.telegram.org/bot<bot_token>/getUpdates
```

Or obtain via the bot itself by checking logs after sending a DM.

### Multi-Agent Setup

Route different channels or senders to different agents, each with separate workspaces and session stores:

```json5
{
  agents: {
    defaults: { workspace: "~/.openclaw/workspace" },
    list: [
      { id: "agent-1", model: { primary: "anthropic/opus" } },
      { id: "agent-2", model: { primary: "openai/gpt-4" } }
    ],
    routing: {
      whatsapp: { default: "agent-1", allowFrom: { "+1234567890": "agent-2" } }
    }
  }
}
```

## Sessions & Memory

### Session Management

Send `/new` or `/reset` to start a fresh conversation. Sessions auto-expire after `session.idleMinutes` (default 60). The next message creates a new session ID.

**Compaction:** Use `/compact` to summarize older turns while keeping context. Helps prevent "context too large" errors.

### Memory System

Memory lives in the workspace as Markdown files:
- `MEMORY.md` for curated long-term notes (main sessions only)
- `memory/YYYY-MM-DD.md` for daily notes
- OpenClaw encourages the model to write durable facts to these files

Semantic search requires:
- **OpenAI embeddings:** need real API key (`OPENAI_API_KEY`)
- **Gemini embeddings:** need `GEMINI_API_KEY`
- **Local:** `memorySearch.provider = "local"`

Codex OAuth covers chat/completions but not embeddings access.

## Remote Access & Nodes

### Running on a VPS

Install on any Linux VPS, then access via:
- **SSH tunnel:** `ssh -N -L 18789:127.0.0.1:18789 user@host`
- **Tailscale (recommended):** `openclaw gateway --tailscale serve`
- **Tailnet bind:** `openclaw gateway --bind tailnet --token "<token>"`

### Nodes

A **node** is a companion device connecting to the Gateway over WebSocket. Common setup: Gateway on always-on host, your laptop/phone as a node for local screen/camera/exec access.

Approve nodes via:

```bash
openclaw devices list
openclaw devices approve <requestId>
```

Nodes do not run the Gateway. They only provide extra capabilities.

### Tailscale Setup

```bash
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
```

Enable MagicDNS in the Tailscale admin console for stable hostnames. Connect from your Mac using the tailnet hostname.

## Tools & Automation

### Skills & Customization

Customize without editing the repo using managed overrides in `~/.openclaw/skills/<name>/SKILL.md`. Precedence: `<workspace>/skills` -> `~/.openclaw/skills` -> bundled skills -> `skills.load.extraDirs`.

Install via ClawHub:

```bash
npm i -g clawhub
clawhub install <skill-slug>
```

### Scheduling

Cron jobs require the Gateway running continuously (no sleep/restarts). Enable via `cron.enabled` and avoid setting `OPENCLAW_SKIP_CRON`.

Debug cron:

```bash
openclaw cron run <jobId> --force
openclaw cron runs --id <jobId> --limit 50
```

### Browser Automation

Run headless via config:

```json5
{
  browser: { headless: true }
}
```

Use Brave or another Chromium browser by setting `browser.executablePath`. The Chrome extension enables browser relay when the Gateway runs remotely.

### Web Search & Fetch

`web_fetch` works without keys. `web_search` requires a provider key (Brave, Gemini, Grok, Kimi, or Perplexity):

```bash
openclaw configure --section web
```

## Troubleshooting

### Common Issues

**"Wake up my friend" stuck on onboarding:**

```bash
openclaw gateway restart
openclaw status
openclaw models status
openclaw doctor
```

**HTTP 429 rate limiting:** Wait for quota window to reset or upgrade your plan. Set a fallback model to keep the bot operational.

**Config wiped by config.apply:** Always back up `~/.openclaw/openclaw.json`. Use `openclaw config set` for small changes instead of `config.apply`.

**Context too large:** Use `/compact`, switch to a larger model, or enable session pruning via `agents.defaults.contextPruning`.

### Reset & Recovery

Full reset (keeping installation):

```bash
openclaw reset --scope full --yes --non-interactive
openclaw onboard --install-daemon
```

Complete uninstall: See the dedicated [Uninstall guide](/install/uninstall).

## Backup Strategy

Back up your **agent workspace** (AGENTS.md, MEMORY.md, memory files) in a private git repository. Do **not** commit `~/.openclaw` (contains credentials and tokens).

For full restoration, separately back up both the workspace and state directory (`~/.openclaw`).

## Security

### Local-First Design

Data lives locally by default (`~/.openclaw` + workspace). External services still see messages sent to model APIs and chat platforms.

### Access Control

- Restrict DM access via `channels.whatsapp.allowFrom` or `channels.telegram.allowFrom` (numeric user ID)
- Gate group replies with `groupPolicy: "allowlist"` and `groupAllowFrom`
- Review [Security](/gateway/security) for prompt injection and pairing risks

### Sandboxing

Enable Docker sandboxing for untrusted input:

```json5
{
  agents: {
    defaults: {
      sandbox: { mode: "non-main" }
    }
  }
}
```

Groups/channels run sandboxed; main DM session stays on-host.

## Getting Help

For complex setup issues, use the **hackable (git) install** so an AI agent can read your repo and logs:

```bash
curl -fsSL https://openclaw.ai/install.sh | bash -s -- --install-method git
```

Basic commands to share when asking for help:

```bash
openclaw status
openclaw models status
openclaw doctor
```

**Documentation:** [https://docs.openclaw.ai](https://docs.openclaw.ai)
**GitHub:** [https://github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)
