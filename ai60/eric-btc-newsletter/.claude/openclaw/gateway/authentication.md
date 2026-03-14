# Authentication

OpenClaw provides multiple authentication methods for model providers, with API keys recommended for long-lived gateways.

## Key Authentication Options

**API Key Setup (Recommended)**
The simplest approach involves creating an API key through your provider's console and exporting it on the gateway host:

```bash
export <PROVIDER>_API_KEY="..."
openclaw models status
```

For daemon-managed gateways, store credentials in `~/.openclaw/.env` to ensure persistence across restarts.

**Anthropic Subscription Tokens**
Claude subscribers can use setup-token authentication via:

```bash
claude setup-token
openclaw models auth setup-token --provider anthropic
```

However, there's an important caveat: "Anthropic has blocked some subscription usage outside Claude Code in the past." Users should verify current terms before adopting this method.

## Credential Management

OpenClaw supports API key rotation, prioritizing credentials in this order:
- `OPENCLAW_LIVE_<PROVIDER>_KEY`
- `<PROVIDER>_API_KEYS`
- `<PROVIDER>_API_KEY`
- `<PROVIDER>_API_KEY_*`

The system retries failed requests with alternative keys only for rate-limit errors (429, quota exceeded, etc.).

## Session and Agent-Level Control

Users can pin specific credentials per session using `/model <alias>@<profileId>` or configure permanent auth profile ordering at the agent level through `openclaw models auth order` commands.

## Verification Commands

Check authentication status with:
```bash
openclaw models status
openclaw doctor
```
