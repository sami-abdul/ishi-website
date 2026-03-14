## Slack Gateway Profile

### Channel Architecture

Slack uses bot apps created via the Slack API portal:

```json
{
  "channels": [
    {
      "type": "slack",
      "accountId": "{{agent_name}}-app",
      "token": "${SLACK_BOT_TOKEN_{{AGENT_NAME}}}",
      "appToken": "${SLACK_APP_TOKEN_{{AGENT_NAME}}}",
      "dm": { "policy": "allowlist", "allowlist": ["owner-slack-id"] }
    }
  ]
}
```

### Conventions

- **Bot apps**: One Slack app per agent (separate OAuth tokens)
- **Channel routing**: Bind agents to apps via `accountId` match
- **DM policy**: Use `allowlist` for internal agents, `pairing` for user-facing
- **Socket mode**: Recommended for local development (no public URL needed)
- **Slash commands**: Map to OpenClaw skills via Slack slash command configuration
- **Threads**: Agents reply in threads to keep channels organized

### Account Setup

For each agent:
1. Create app at https://api.slack.com/apps
2. Enable Socket Mode → Copy App-Level Token (`xapp-...`)
3. OAuth & Permissions → Add Bot Token Scopes: `chat:write`, `channels:history`, `channels:read`, `im:history`, `im:write`
4. Install to workspace → Copy Bot User OAuth Token (`xoxb-...`)
5. Store tokens in `.env`

### Environment Variables

```bash
# Bot token + App token per agent
SLACK_BOT_TOKEN_ORCHESTRATOR=xoxb-...
SLACK_APP_TOKEN_ORCHESTRATOR=xapp-...
SLACK_BOT_TOKEN_WORKER1=xoxb-...
SLACK_APP_TOKEN_WORKER1=xapp-...
```

### Binding Pattern

```json
{
  "bindings": [
    { "agentId": "orchestrator", "match": { "channel": "slack", "accountId": "orchestrator-app" } },
    { "agentId": "worker-1", "match": { "channel": "slack", "accountId": "worker-1-app" } }
  ]
}
```

### Security

- Use minimal OAuth scopes per bot (principle of least privilege)
- Enable Socket Mode for local deployments (no public ingress)
- Never share bot tokens between agents
- Restrict app installation to specific workspace channels
- Use `allowlist` DM policy with Slack user IDs for sensitive agents
