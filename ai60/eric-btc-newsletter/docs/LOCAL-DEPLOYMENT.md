# Local Multi-Agent Gateway Deployment

Running multiple OpenClaw agents on a single machine through one shared gateway process, with Docker Compose as the primary deployment method.

---

## Why Local Deployment

Running agents on separate cloud VPS instances works but is expensive ($5-15/mo per instance). For agents that don't need isolated compute (no heavy browser automation, no GPU), a single local machine can host all of them through OpenClaw's multi-agent architecture.

**Key constraint:** OpenClaw uses a global lock — only one gateway process runs per machine. Multi-agent must happen within a single gateway, not by running multiple gateway processes.

---

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│          OpenClaw Gateway (single process)                │
│          Port: 18789 (ws://127.0.0.1:18789)              │
│          Config: ~/.openclaw/openclaw.json                │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────────────────┐  ┌─────────────────────────┐│
│  │  Agent: {{agent_id_1}}   │  │  Agent: {{agent_id_2}}   ││
│  │  Role: {{agent_role_1}}  │  │  Role: {{agent_role_2}}  ││
│  │  Bot: {{agent_id_1}}-bot │  │  Bot: {{agent_id_2}}-bot ││
│  │  Model: {{model_ref}}    │  │  Model: {{model_ref}}    ││
│  └─────────────────────────┘  └─────────────────────────┘│
│                                                          │
│  Routing: {{channel_type}} accountId → agent via bindings│
│  Isolation: Separate workspace, agentDir, sessions       │
│  Shared: Model providers, gateway auth, cron engine      │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### What Each Agent Gets (Isolated)

| Resource | Path | Purpose |
|----------|------|---------|
| Workspace | `~/.openclaw/agents/<id>/workspace/` | Bootstrap files, skills, knowledge, scripts |
| Agent state | `~/.openclaw/agents/<id>/agent/` | Auth profiles, runtime state |
| Sessions | `~/.openclaw/agents/<id>/sessions/` | Conversation transcripts, session metadata |
| Bot | One bot token per agent | Independent channel presence |

### What's Shared

| Resource | Path | Purpose |
|----------|------|---------|
| Config | `~/.openclaw/openclaw.json` | Model providers, bindings, channel config |
| Secrets | `~/.openclaw/.env` | All API keys and tokens (merged) |
| Cron engine | `~/.openclaw/cron/` | Shared scheduler, jobs pinned to agents via `--agent` |
| Managed skills | `~/.openclaw/skills/` | Skills visible to all agents |
| Gateway process | Single process, single port | Handles all agents, all channels |

---

## Deployment Option 1: Docker Compose (Recommended)

Docker Compose provides reproducible, isolated deployment with easy scaling.

### docker-compose.yml

```yaml
version: "3.8"

services:
  gateway:
    image: node:20-slim
    container_name: openclaw-gateway
    restart: unless-stopped
    working_dir: /home/openclaw
    command: >
      bash -c "
        npm install -g @openclaw/cli &&
        openclaw gateway run
      "
    env_file:
      - .env
    ports:
      - "127.0.0.1:18789:18789"
    volumes:
      - ./local-gateway/openclaw.json:/home/openclaw/.openclaw/openclaw.json:ro
      - gateway-env:/home/openclaw/.openclaw
      - agent-{{agent_id_1}}-workspace:/home/openclaw/.openclaw/agents/{{agent_id_1}}/workspace
      - agent-{{agent_id_1}}-state:/home/openclaw/.openclaw/agents/{{agent_id_1}}/agent
      - agent-{{agent_id_1}}-sessions:/home/openclaw/.openclaw/agents/{{agent_id_1}}/sessions
      - agent-{{agent_id_2}}-workspace:/home/openclaw/.openclaw/agents/{{agent_id_2}}/workspace
      - agent-{{agent_id_2}}-state:/home/openclaw/.openclaw/agents/{{agent_id_2}}/agent
      - agent-{{agent_id_2}}-sessions:/home/openclaw/.openclaw/agents/{{agent_id_2}}/sessions
      - cron-data:/home/openclaw/.openclaw/cron
      - shared-skills:/home/openclaw/.openclaw/skills
    healthcheck:
      test: ["CMD", "curl", "-sf", "http://127.0.0.1:18789/health"]
      interval: 60s
      timeout: 10s
      retries: 3
      start_period: 30s
    networks:
      - openclaw-internal

networks:
  openclaw-internal:
    driver: bridge

volumes:
  gateway-env:
  agent-{{agent_id_1}}-workspace:
  agent-{{agent_id_1}}-state:
  agent-{{agent_id_1}}-sessions:
  agent-{{agent_id_2}}-workspace:
  agent-{{agent_id_2}}-state:
  agent-{{agent_id_2}}-sessions:
  cron-data:
  shared-skills:
```

### Docker Deploy Flow

```bash
# 1. Prepare workspace files
./deploy.sh                    # Copies workspaces to volume mount points

# 2. Start the gateway
docker compose up -d

# 3. Verify
docker compose logs -f gateway

# 4. Health check
docker compose exec gateway openclaw gateway health
```

### Docker Update Flow

```bash
# Edit workspace files in repo, then:
./deploy.sh                    # Re-copy workspaces
docker compose restart gateway # Pick up changes
```

---

## Deployment Option 2: Native Local Gateway

Run directly on the host machine without Docker.

### Directory Structure

#### Source (git repo)

```
{{project_name}}/
├── local-gateway/                    # Gateway deployment config
│   ├── openclaw.json                 # Multi-agent config (deployed to ~/.openclaw/)
│   ├── deploy.sh                     # Deployment script
│   ├── .env.example                  # Secrets template (never committed)
│   └── .gitignore                    # Protects .env files
│
├── agents/                           # Agent workspaces (source of truth)
│   └── {{org_name}}/
│       └── {{agent_name}}/
│           └── workspace/
│               ├── IDENTITY.md
│               ├── SOUL.md
│               ├── USER.md
│               ├── AGENTS.md
│               ├── TOOLS.md
│               ├── MEMORY.md
│               ├── CRON_JOBS.md
│               ├── context/          # Symlinks → owner/, orgs/
│               ├── skills/
│               ├── scripts/
│               └── knowledge/
│
├── owner/                            # Shared owner profile
└── orgs/                             # Organization contexts
    └── {{org_name}}/
```

#### Deployed (runtime)

```
~/.openclaw/
├── openclaw.json                     # Multi-agent config
├── .env                              # All secrets (chmod 600)
├── agents/
│   ├── {{agent_id_1}}/
│   │   ├── workspace/                # Copied from source
│   │   │   ├── context/              # Resolved (real copies, not symlinks)
│   │   │   │   ├── owner/
│   │   │   │   └── {{org_name}}/
│   │   │   └── ...
│   │   ├── agent/                    # Runtime state (auto-created)
│   │   └── sessions/                 # Session transcripts (auto-created)
│   └── {{agent_id_2}}/
│       ├── workspace/
│       ├── agent/
│       └── sessions/
├── cron/                             # Shared cron engine
│   ├── jobs.json
│   └── runs/
└── skills/                           # Managed skills (shared)
```

---

## Configuration Reference

### openclaw.json (Multi-Agent)

The config lives at `local-gateway/openclaw.json` in the repo and gets deployed to `~/.openclaw/openclaw.json`.

#### agents.list

Defines all agents. Each gets isolated workspace, state directory, and model config.

```json
{
  "agents": {
    "list": [
      {
        "id": "{{agent_id_1}}",
        "name": "{{agent_display_name_1}}",
        "default": true,
        "workspace": "{{home_dir}}/.openclaw/agents/{{agent_id_1}}/workspace",
        "agentDir": "{{home_dir}}/.openclaw/agents/{{agent_id_1}}/agent",
        "model": { "primary": "{{provider}}/{{model_name}}" }
      },
      {
        "id": "{{agent_id_2}}",
        "name": "{{agent_display_name_2}}",
        "workspace": "{{home_dir}}/.openclaw/agents/{{agent_id_2}}/workspace",
        "agentDir": "{{home_dir}}/.openclaw/agents/{{agent_id_2}}/agent",
        "model": { "primary": "{{provider}}/{{model_name}}" }
      }
    ]
  }
}
```

**Key fields:**
- `id` — Unique agent identifier (used in bindings, cron, session keys)
- `default` — Fallback agent when no binding matches (only one agent should be default)
- `workspace` — Absolute path to workspace directory (bootstrap files loaded from here)
- `agentDir` — Absolute path to state directory (auth profiles, never reuse across agents)
- `model.primary` — Model ref in `provider/model` format
- `model.fallbacks` — Array of fallback model refs (optional)

**Critical:** Never reuse `agentDir` across agents — causes auth and session collisions.

#### bindings

Routes inbound messages to the correct agent. Most-specific match wins.

```json
{
  "bindings": [
    {
      "agentId": "{{agent_id_1}}",
      "match": {
        "channel": "{{channel_type}}",
        "accountId": "{{agent_id_1}}-bot"
      }
    },
    {
      "agentId": "{{agent_id_2}}",
      "match": {
        "channel": "{{channel_type}}",
        "accountId": "{{agent_id_2}}-bot"
      }
    }
  ]
}
```

**Routing priority (most-specific wins):**
1. Exact peer match (`peer.kind` + `peer.id`)
2. Guild match (Discord `guildId`)
3. Team match (Slack `teamId`)
4. Account match (`accountId`)
5. Channel match (any account on that channel)
6. Default agent (`agents.list[].default: true`)

**Important:** For multi-bot setups, always include `accountId` in bindings. Without it, the gateway cannot tell which bot received the message and may route to the default agent instead.

#### channels (Multi-Bot)

Each agent gets its own bot. Bots are named accounts under `channels.{{channel_type}}.accounts`.

```json
{
  "channels": {
    "{{channel_type}}": {
      "enabled": true,
      "dmPolicy": "pairing",
      "accounts": {
        "{{agent_id_1}}-bot": { "botToken": "${BOT_TOKEN_{{AGENT_ID_1}}}" },
        "{{agent_id_2}}-bot": { "botToken": "${BOT_TOKEN_{{AGENT_ID_2}}}" }
      },
      "guilds": {
        "{{guild_id}}": {
          "channels": { "*": { "requireMention": true } }
        }
      },
      "groupPolicy": "open",
      "commands": { "native": true, "nativeSkills": true }
    }
  }
}
```

**Important:** Use `${ENV_VAR}` syntax for secrets — OpenClaw resolves these from `~/.openclaw/.env` at startup.

#### models.providers (Custom Provider)

Register non-built-in model providers:

```json
{
  "models": {
    "mode": "merge",
    "providers": {
      "{{provider_name}}": {
        "baseUrl": "{{provider_base_url}}",
        "apiKey": "${{{PROVIDER_API_KEY}}}",
        "api": "openai-completions",
        "models": [{ "id": "{{model_id}}", "name": "{{model_display_name}}" }]
      }
    }
  }
}
```

`mode: "merge"` adds this provider alongside built-in providers. Use `"replace"` to disable all built-ins.

---

## Agent Routing via Bindings

Messages arriving from channel bots are routed to the correct agent using the `bindings` configuration. The gateway checks each binding in order and uses the most-specific match.

### How It Works

1. A message arrives from a specific bot account on a specific channel
2. The gateway looks up which agent is bound to that account
3. The message is routed to that agent's workspace and session store
4. The agent processes the message and responds through the same bot

### Isolation Guarantees

- Each agent has its own session store — no cross-contamination of conversation history
- Each agent reads its own MEMORY.md, AGENTS.md, and other bootstrap files
- Skills are resolved from the agent's own `workspace/skills/` directory first
- Cron jobs are pinned to agents via `--agent` flag

---

## Workspace Isolation

Each agent operates in a completely isolated workspace:

```
~/.openclaw/agents/{{agent_id}}/
├── workspace/          # Bootstrap files, skills, knowledge (agent reads)
├── agent/              # Auth state, runtime state (gateway manages)
└── sessions/           # Conversation transcripts (gateway manages)
```

**Critical isolation rules:**
- Workspaces MUST NOT share `agentDir` paths — causes auth collisions
- Context files are **copies**, not symlinks — deploy.sh resolves symlinks before deployment
- Each agent reads ONLY its own workspace at bootstrap time

---

## Session Management

### Session Keys

Each agent gets isolated session keys:

| Message Type | Session Key Shape |
|--------------|-------------------|
| DM (all collapse to main) | `agent:<agentId>:main` |
| Guild channel | `agent:<agentId>:{{channel_type}}:guild:<guildId>:channel:<channelId>` |
| Thread | `agent:<agentId>:{{channel_type}}:guild:<guildId>:channel:<channelId>:thread:<threadId>` |

### Session Reset

```json
{
  "session": {
    "dmScope": "main",
    "reset": {
      "mode": "daily",
      "atHour": 4,
      "idleMinutes": 240
    }
  }
}
```

- **Daily reset:** 4 AM local time on gateway host
- **Idle reset:** After 240 minutes of inactivity
- Whichever expires first wins

---

## Cron Jobs

Cron runs inside the shared gateway, but jobs can be pinned to specific agents.

### Adding Agent-Specific Cron Jobs

```bash
# Pin to a specific agent
openclaw cron add \
  --name "{{job_name}}" \
  --cron "{{cron_expression}}" \
  --tz "{{timezone}}" \
  --session isolated \
  --message "{{cron_prompt}}" \
  --agent {{agent_id}} \
  --deliver \
  --channel {{channel_type}} \
  --to "{{channel_id}}"
```

**Key flags:**
- `--agent <id>` — Pin job to a specific agent (uses that agent's workspace and session store)
- `--session isolated` — Run in a dedicated cron session (fresh context each run)
- `--deliver` — Send output to a channel
- `--to` — Channel ID for delivery

### Cron Storage

```
~/.openclaw/cron/jobs.json          # All jobs (shared store)
~/.openclaw/cron/runs/<jobId>.jsonl  # Run history (auto-pruned)
```

---

## Skills

### Per-Agent vs Shared Skills

| Location | Scope | Use Case |
|----------|-------|----------|
| `<workspace>/skills/` | Per-agent only | Agent-specific skills |
| `~/.openclaw/skills/` | All agents | Common skills (memory-sync, knowledge-sync) |

Skills in workspace take precedence over managed/bundled skills with the same name.

### Skills Auto-Discovery

OpenClaw auto-discovers skills from the workspace `skills/` directory on gateway start. No manual registration needed beyond listing them in the agent's `AGENTS.md` Commands section.

**Snapshot behavior:** Skills are snapshotted when a session starts. Changes take effect on the next new session or gateway restart.

---

## Deployment

### deploy.sh

The deployment script at `local-gateway/deploy.sh` handles the full deployment:

```bash
cd local-gateway
./deploy.sh
```

**What it does:**
1. Backs up existing `~/.openclaw/openclaw.json`
2. Creates agent directories (`~/.openclaw/agents/{{agent_id}}/`)
3. Copies agent workspaces from their source locations
4. Resolves context symlinks (copies real files from `owner/`, `orgs/`)
5. Copies any credential files from backups if present
6. Installs Node.js dependencies for agent scripts
7. Deploys `openclaw.json` to `~/.openclaw/`
8. Creates `.env` from template if none exists (does NOT overwrite existing)

### First-Time Setup

```bash
# 1. Deploy workspaces and config
cd local-gateway && ./deploy.sh

# 2. Fill in secrets
vim ~/.openclaw/.env    # Add real API keys and tokens
chmod 600 ~/.openclaw/.env

# 3. Start gateway (foreground for testing)
openclaw gateway run

# 4. Verify in logs:
#    - "Agents: N ({{agent_id_1}}, {{agent_id_2}})"
#    - "[{{agent_id_1}}-bot] starting provider"
#    - "[{{agent_id_2}}-bot] starting provider"

# 5. Test: @mention each bot in the channel

# 6. Install as service (production)
openclaw gateway install
openclaw gateway start
```

### Updating Agents

After editing workspace files in the repo:

```bash
# Re-deploy workspaces (config + files)
cd local-gateway && ./deploy.sh

# Restart gateway to pick up changes
openclaw gateway restart
```

### Service Management

```bash
openclaw gateway install    # Install as systemd service
openclaw gateway start      # Start service
openclaw gateway stop       # Stop service
openclaw gateway restart    # Restart service
openclaw gateway status     # Check status
openclaw gateway health     # Health check
openclaw gateway logs --follow  # Stream logs
```

---

## Health Check Procedures

### Quick Health Check

```bash
# Gateway status
openclaw gateway health

# Detailed diagnostics
openclaw gateway status --deep

# Check all agent sessions
openclaw sessions list
```

### Per-Agent Health Check

```bash
# Verify agent's skills loaded
openclaw skills list --agent {{agent_id}}

# Check cron jobs for agent
openclaw cron list --agent {{agent_id}}

# Verify workspace files
ls -la ~/.openclaw/agents/{{agent_id}}/workspace/
```

### Automated Health Check (Cron)

```bash
openclaw cron add \
  --name "gateway-health" \
  --cron "*/15 * * * *" \
  --session isolated \
  --message "Run /health-check and report any failures." \
  --agent {{default_agent_id}} \
  --deliver \
  --channel {{channel_type}} \
  --to "{{channel_id}}"
```

---

## Environment Variables

All secrets live in `~/.openclaw/.env` (shared by all agents). See `local-gateway/.env.example` for the full template.

| Variable | Used By | Purpose |
|----------|---------|---------|
| `{{PROVIDER_API_KEY}}` | All agents | Model provider |
| `BOT_TOKEN_{{AGENT_ID_1}}` | {{agent_id_1}} | Channel bot |
| `BOT_TOKEN_{{AGENT_ID_2}}` | {{agent_id_2}} | Channel bot |
| `GITHUB_USERNAME` | All agents | Memory sync via GitHub API |
| `GITHUB_TOKEN` | All agents | Memory sync via GitHub API |

**Security:** `.env` is protected by `.gitignore` and should have `chmod 600` permissions. Never commit real secrets.

---

## Adding a New Agent

### 1. Create workspace in repo

```bash
# Copy from template or existing agent
cp -r templates/workspace agents/{{org_name}}/{{agent_name}}/workspace

# Customize bootstrap files
vim agents/{{org_name}}/{{agent_name}}/workspace/IDENTITY.md
vim agents/{{org_name}}/{{agent_name}}/workspace/SOUL.md
# ... etc.

# Create context symlinks
cd agents/{{org_name}}/{{agent_name}}/workspace/context
ln -s ../../../../../owner owner
ln -s ../../../../../orgs/{{org_name}} {{org_name}}
```

### 2. Create channel bot

1. Go to your channel provider's developer portal
2. Create a new application and bot
3. Save the bot token
4. Enable required intents (e.g., Message Content Intent for Discord)
5. Invite the bot to your server/workspace

### 3. Add to openclaw.json

Edit `local-gateway/openclaw.json`:

```json
// In agents.list:
{
  "id": "{{new_agent_id}}",
  "name": "{{new_agent_name}}",
  "workspace": "{{home_dir}}/.openclaw/agents/{{new_agent_id}}/workspace",
  "agentDir": "{{home_dir}}/.openclaw/agents/{{new_agent_id}}/agent",
  "model": { "primary": "{{provider}}/{{model_name}}" }
}

// In bindings:
{
  "agentId": "{{new_agent_id}}",
  "match": {
    "channel": "{{channel_type}}",
    "accountId": "{{new_agent_id}}-bot"
  }
}

// In channels.{{channel_type}}.accounts:
"{{new_agent_id}}-bot": { "botToken": "${BOT_TOKEN_{{NEW_AGENT_ID}}}" }
```

### 4. Add secrets

```bash
echo 'BOT_TOKEN_{{NEW_AGENT_ID}}=your-token-here' >> ~/.openclaw/.env
```

### 5. Update deploy.sh

Add the new agent's workspace copy logic to `local-gateway/deploy.sh`.

### 6. Deploy and restart

```bash
cd local-gateway && ./deploy.sh
openclaw gateway restart
```

---

## Troubleshooting

### Gateway won't start

```bash
# Check for existing lock
ls -la /tmp/openclaw*.lock 2>/dev/null

# Check config syntax
python3 -m json.tool ~/.openclaw/openclaw.json > /dev/null

# Check .env has all required variables
grep -E "BOT_TOKEN|API_KEY" ~/.openclaw/.env

# Docker: check container logs
docker compose logs gateway
```

### Agent doesn't respond

```bash
# Check gateway logs
openclaw gateway logs --follow

# Verify bindings match bot accountId
cat ~/.openclaw/openclaw.json | python3 -m json.tool | grep -A5 bindings

# Check if bot is connected
# Look for "[<account>] starting provider" in logs
```

### 409 conflict / duplicate bot login

```
409: Conflict / Already connected with this token
```

Another process is already connected with the same bot token. Common cause: agent still running on another machine or in another container.

```bash
# Check for duplicate processes
ps aux | grep openclaw

# Docker: check for duplicate containers
docker ps | grep openclaw
```

### Cross-talk between agents

If agent A responds to messages meant for agent B:
1. Verify bindings in `openclaw.json` have correct `accountId` for each bot
2. Ensure each bot account has a binding (unmatched accounts fall through to default agent)
3. Check that `requireMention` is set to `true` in the guild config so bots only respond when @mentioned

### Skills not loading

```bash
# Check skill directory
ls -la ~/.openclaw/agents/<id>/workspace/skills/

# Skills are snapshotted at session start
# Restart gateway or start new session to pick up changes
openclaw gateway restart
```

---

## Comparison: Docker vs Native vs Cloud

| Aspect | Docker Compose | Native Local | Cloud VPS |
|--------|---------------|--------------|-----------|
| **Cost** | $0 (local) | $0 (local) | $5-15/mo per instance |
| **Reproducibility** | High (Dockerfile) | Medium (manual setup) | Medium |
| **Isolation** | Container-level | Workspace-level | VM-level |
| **Scaling** | Easy (add services) | Limited by host | Scale with more VMs |
| **Uptime** | Depends on host | Depends on host | 24/7 (VM always on) |
| **Setup** | `docker compose up` | Manual install | Manual provision |
| **Updates** | Rebuild container | Re-run deploy.sh | Re-run deploy.sh |

---

## Known Limitations

1. **Global lock:** Only one gateway process per machine. All agents must share.
2. **Workspace is not sandboxed by default:** Agents can access files outside their workspace via absolute paths. Enable `sandbox` in agent config for true isolation.
3. **Single .env for all agents:** All secrets are shared in one file. An agent could theoretically read another agent's secrets via environment variables.
4. **Channel rate limits:** Multiple bots from the same IP may hit rate limits faster. Monitor for 429 errors.
5. **No automatic failover:** If the local machine goes down, all agents go down. Consider systemd auto-restart or Docker restart policies.
6. **Memory pressure:** Each agent session consumes RAM. Monitor with `htop` or `docker stats` when running 5+ agents.
