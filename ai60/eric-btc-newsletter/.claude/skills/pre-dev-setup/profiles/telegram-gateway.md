## Telegram Gateway Profile

### Channel Architecture

Telegram uses bot accounts created via @BotFather:

```json
{
  "channels": [
    {
      "type": "telegram",
      "accountId": "{{agent_name}}_bot",
      "token": "${TELEGRAM_BOT_TOKEN_{{AGENT_NAME}}}",
      "dm": { "policy": "pairing" }
    }
  ]
}
```

### Conventions

- **Bot accounts**: One Telegram bot per agent (via @BotFather)
- **Channel routing**: Bind agents to bots via `accountId` match
- **DM policy**: Use `pairing` for general access, `allowlist` with Telegram user IDs for restricted
- **Groups**: Agents can be added to Telegram groups; use `/command@bot_name` to target specific agents
- **Inline mode**: Optional — enable for agents that should respond to inline queries

### Account Setup

For each agent:
1. Message @BotFather on Telegram
2. `/newbot` → Set name → Copy token
3. `/setprivacy` → Disable (if agent should see all group messages)
4. Store token in `.env` as `TELEGRAM_BOT_TOKEN_{AGENT_NAME}`

### Environment Variables

```bash
# One token per bot
TELEGRAM_BOT_TOKEN_ORCHESTRATOR=...
TELEGRAM_BOT_TOKEN_WORKER1=...
TELEGRAM_BOT_TOKEN_WORKER2=...
```

### Binding Pattern

```json
{
  "bindings": [
    { "agentId": "orchestrator", "match": { "channel": "telegram", "accountId": "orchestrator_bot" } },
    { "agentId": "worker-1", "match": { "channel": "telegram", "accountId": "worker1_bot" } }
  ]
}
```

### Security

- Never share bot tokens between agents
- Use privacy mode for bots that should not read all group messages
- Set allowed_updates to limit webhook event types
- Use `allowlist` with Telegram user IDs for sensitive agents
