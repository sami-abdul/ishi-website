## Generic Channel Profile

### Channel Architecture

For custom or unsupported channel types, use the generic webhook or API channel:

```json
{
  "channels": [
    {
      "type": "webhook",
      "accountId": "{{agent_name}}-webhook",
      "secret": "${WEBHOOK_SECRET_{{AGENT_NAME}}}",
      "dm": { "policy": "open" }
    }
  ]
}
```

### Conventions

- **Webhook channels**: Accept HTTP POST with message payload
- **API channels**: Programmatic message send/receive via gateway API
- **Channel routing**: Bind agents to webhook endpoints via `accountId` match
- **DM policy**: Depends on use case — `open` for APIs, `allowlist` for restricted
- **Custom integrations**: Use webhook channel as adapter for WhatsApp, email, SMS, or custom platforms

### Account Setup

For webhook-based channels:
1. Configure webhook endpoint URL in your external platform
2. Generate a webhook secret for HMAC verification
3. Store secret in `.env` as `WEBHOOK_SECRET_{AGENT_NAME}`
4. Point external platform to `http://localhost:18789/webhook/{accountId}`

For API-based channels:
1. Use the gateway REST API to send/receive messages
2. Authenticate with gateway token from `.env`
3. No additional channel tokens needed

### Environment Variables

```bash
# Webhook secrets (if using webhook channels)
WEBHOOK_SECRET_ORCHESTRATOR=...
WEBHOOK_SECRET_WORKER1=...

# Or API-only (just gateway token)
OPENCLAW_GATEWAY_TOKEN=...
```

### Binding Pattern

```json
{
  "bindings": [
    { "agentId": "orchestrator", "match": { "channel": "webhook", "accountId": "orchestrator-webhook" } },
    { "agentId": "worker-1", "match": { "channel": "webhook", "accountId": "worker-1-webhook" } }
  ]
}
```

### Integration Examples

| Platform | Channel Type | Notes |
|----------|-------------|-------|
| WhatsApp | webhook | Via WhatsApp Business API → webhook relay |
| Email | webhook | Via email-to-webhook service (e.g., Mailgun, SendGrid) |
| SMS | webhook | Via Twilio webhook |
| Custom app | api | Direct gateway API calls |
| Web chat | webhook | Via frontend → webhook |

### Security

- Always verify webhook signatures (HMAC with shared secret)
- Use HTTPS for external webhook endpoints
- Rate-limit incoming webhooks
- Use `allowlist` DM policy when possible
- Never expose gateway port to public internet — use reverse proxy or Tailscale
