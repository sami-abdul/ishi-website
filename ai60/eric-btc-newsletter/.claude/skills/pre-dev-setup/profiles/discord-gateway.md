## Discord Gateway Profile

### Channel Architecture

Discord servers use channels for routing messages to agents:

```json
{
  "channels": [
    {
      "type": "discord",
      "accountId": "{{agent_name}}-bot",
      "token": "${DISCORD_BOT_TOKEN_{{AGENT_NAME}}}",
      "dm": { "policy": "allowlist", "allowlist": ["owner-discord-id"] }
    }
  ]
}
```

### Conventions

- **Bot accounts**: One Discord bot per agent (separate tokens)
- **Channel routing**: Bind agents to specific channels via `accountId` match
- **DM policy**: Use `allowlist` for worker agents, `pairing` for public-facing
- **Hub-and-spoke**: Orchestrator monitors all channels; workers monitor their assigned channel only
- **Thread support**: Agents can create/reply in threads for context isolation

### Account Setup

For each agent, create a Discord bot at https://discord.com/developers:
1. Create Application → Bot → Copy token
2. Enable Message Content Intent
3. Add bot to server with Send Messages + Read Message History permissions
4. Store token in `.env` as `DISCORD_BOT_TOKEN_{AGENT_NAME}`

### Environment Variables

```bash
# One token per agent bot
DISCORD_BOT_TOKEN_ORCHESTRATOR=...
DISCORD_BOT_TOKEN_WORKER1=...
DISCORD_BOT_TOKEN_WORKER2=...
```

### Binding Pattern

```json
{
  "bindings": [
    { "agentId": "orchestrator", "match": { "channel": "discord", "accountId": "orchestrator-bot" } },
    { "agentId": "worker-1", "match": { "channel": "discord", "accountId": "worker-1-bot" } }
  ]
}
```

### Security

- Never share bot tokens between agents
- Use separate bot accounts per agent for audit trail
- Set minimal permissions per bot (only what the agent needs)
- Use `allowlist` DM policy for agents that should not accept public DMs
