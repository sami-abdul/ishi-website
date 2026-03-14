# OAuth Documentation Summary

## Overview
OpenClaw supports OAuth authentication through subscription-based flows for providers like OpenAI Codex (ChatGPT OAuth) and Anthropic setup tokens. For Anthropic in production environments, "API key auth is the safer recommended path over subscription setup-token auth."

## Key Storage Locations
Credentials are organized by agent:
- Primary: `~/.openclaw/agents/<agentId>/agent/auth-profiles.json`
- Legacy: `~/.openclaw/agents/<agentId>/agent/auth.json`
- Import-only: `~/.openclaw/credentials/oauth.json`

## Token Management
The system implements automatic refresh handling. Profiles store expiration timestamps, and the runtime "if expired -> refresh (under a file lock) and overwrite the stored credentials."

## Authentication Methods

**Anthropic Setup Token:**
Users run `claude setup-token`, then paste results into OpenClaw via `openclaw models auth setup-token --provider anthropic`

**OpenAI Codex OAuth:**
Uses PKCE flow with these steps: generate verifier/challenge, open authorization endpoint, capture callback at `http://127.0.0.1:1455/auth/callback`, exchange credentials, and store access/refresh tokens with account ID.

## Multi-Account Strategies

1. **Isolated agents** - separate credentials and sessions for different contexts
2. **Profile routing** - multiple profiles within one agent, selected via config ordering or session overrides (e.g., `/model Opus@anthropic:work`)
