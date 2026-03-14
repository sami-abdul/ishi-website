---
name: add-agent-to-gateway
description: |
  Use when adding an existing agent workspace to the gateway configuration.
  Triggers: "add agent to gateway", "register agent", "connect agent", "bind agent".
  Adds agent entry, binding, and channel account to openclaw.json.
---

# Add Agent to Gateway

MANDATORY: Follow This Runbook Exactly.

## Step 1: Identify Agent

Read the agent's workspace to gather registration info:

1. Read `agents/{agent-name}/workspace/IDENTITY.md` → extract name, role, emoji
2. Read `agents/{agent-name}/workspace/TOOLS.md` → determine trust level
3. Verify all 7 workspace files exist

If workspace is incomplete → STOP. Suggest running `/new-agent` or `/workspace-audit` first.

## Step 2: Determine Configuration

Based on the agent's trust level (from TOOLS.md or ask user):

| Trust Level | Profile | Sandbox Mode | Sandbox Scope | Workspace Access |
|-------------|---------|-------------|---------------|-----------------|
| Full | `full` | `off` or `non-main` | N/A | `rw` |
| Coding | `coding` | `all` | `agent` | `rw` |
| Minimal | `minimal` | `all` | `agent` | `ro` |
| Messaging | `messaging` | `all` | `session` | `none` |

Ask the user:
1. **Channel account** — Which bot account should route to this agent?
2. **Trust level** — Confirm trust level (Full/Coding/Minimal/Messaging)

## Step 3: Update openclaw.json

Read `local-gateway/openclaw.json` and add:

### Agent Entry
Add to the `agents` array:
```json
{
  "agentId": "{agent-name}",
  "agentDir": "agents/{agent-name}",
  "tools": {
    "profile": "{profile}"
  },
  "sandbox": {
    "mode": "all",
    "scope": "agent",
    "workspaceAccess": "{access}"
  }
}
```

### Binding
Add to the `bindings` array:
```json
{
  "agentId": "{agent-name}",
  "match": { "channel": "{channel_type}", "accountId": "{account-id}" }
}
```

### Channel Account (if new bot needed)
Add to the `channels` array:
```json
{
  "type": "{channel_type}",
  "accountId": "{account-id}",
  "token": "${CHANNEL_BOT_TOKEN_{AGENT_NAME}}"
}
```

## Step 4: Update .env

Add token placeholder to `.env.example`:
```bash
{CHANNEL}_BOT_TOKEN_{AGENT_NAME}=...
```

Remind user to add actual token to `.env`.

## Step 5: Update Orchestrator

If the project has an orchestrator agent, update its IDENTITY.md to include the new agent in the co-located agents table.

## Step 6: Verify

```bash
docker compose exec openclaw-gateway openclaw config validate
```
- Timeout: 15s
- PASS: Config valid with new agent
- FAIL: Validation errors → report and fix

## Step 7: Restart

Ask user if they want to restart the gateway now:
```bash
docker compose restart openclaw-gateway
```
- Timeout: 60s
- Verify new agent appears in `openclaw agents list`

## Report

```
=== Agent Registered ===

Agent: {emoji} {agent-name}
Role: {role}
Profile: {profile}
Sandbox: {mode}, scope: {scope}
Channel: {channel_type} → {account-id}

Gateway: local-gateway/openclaw.json updated
Token: Add {CHANNEL}_BOT_TOKEN_{AGENT_NAME} to .env

Next: /deploy-gateway to apply changes
```
