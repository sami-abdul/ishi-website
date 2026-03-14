## Multi-Agent Architecture

### Deployment Model

All agents run inside Docker containers via Docker Compose. The gateway container hosts the OpenClaw process; each agent gets an isolated sandbox container for tool execution.

```
docker-compose.yml
  └── openclaw-gateway (container)
        ├── Agent 1 sandbox (container, scope: agent)
        ├── Agent 2 sandbox (container, scope: agent)
        └── Agent N sandbox (container, scope: agent)
```

### Gateway Architecture

Single OpenClaw gateway process manages multiple isolated agents:

- **Config**: `local-gateway/openclaw.json` → mounted into gateway container
- **Secrets**: `.env` file (shared by all agents, 600 permissions)
- **Routing**: Channel accountId → agent via `bindings` config
- **Isolation**: Each agent has separate workspace, sessions, and state directory

### Agent Routing

Messages are routed to agents via bindings (most-specific match wins):

```json
{
  "bindings": [
    { "agentId": "orchestrator", "match": { "channel": "discord", "accountId": "orchestrator-bot" } },
    { "agentId": "worker-1", "match": { "channel": "discord", "accountId": "worker-1-bot" } }
  ]
}
```

One agent must be set as `"default": true` (fallback for unmatched messages).

### Agent-to-Agent Communication

The orchestrator directs other agents via gateway-level tools:
- `sessions_send` — inject directive into agent session (synchronous, with evaluation loop)
- `sessions_spawn` — fire-and-forget background task
- `sessions_list` — find target agent's session key
- `sessions_history` — review agent activity

Enable via: `tools.agentToAgent.enabled: true` with explicit `allow` list.

### Directory Structure

```
project/
├── docker-compose.yml           # Gateway container
├── .env                         # Shared secrets
├── local-gateway/
│   ├── openclaw.json            # Multi-agent config (hardened baseline)
│   └── deploy.sh                # Deploy workspaces to container volumes
├── orchestrator/
│   └── workspace/               # Orchestrator agent files
├── agents/
│   └── {agent-name}/
│       └── workspace/           # Per-agent workspace files
├── owner/                       # Shared owner context (read-only to agents)
├── orgs/                        # Organization contexts (read-only to agents)
└── scripts/                     # Deployment and health scripts
```

### Session Management

- `dmScope: "per-channel-peer"` — isolated context per sender per channel
- `reset.mode: "daily"` — sessions reset daily at configured hour
- `reset.idleMinutes: 240` — sessions reset after 4 hours idle
