# OpenResponses API

## Overview
OpenClaw's Gateway offers an OpenResponses-compatible `POST /v1/responses` endpoint for executing agent runs via HTTP. This endpoint is disabled by default and must be explicitly enabled.

## Authentication
The endpoint uses Gateway authentication with bearer tokens. Token selection depends on configured auth mode:
- Token mode: use `gateway.auth.token`
- Password mode: use `gateway.auth.password`

Rate limiting returns `429` status when exceeded.

## Security Considerations
This endpoint provides "full operator-access" to the gateway instance. Key points include:

- Bearer auth grants owner/operator-level credentials, not per-user scopes
- Requests execute through trusted operator pathways
- Should remain on loopback, tailnet, or private networks only
- Not suitable for public internet exposure

## Agent Selection
Specify agents via the `model` field or headers:
- `model: "openclaw:<agentId>"` or `"agent:<agentId>"`
- `x-openclaw-agent-id: <agentId>` header (defaults to `main`)
- Optional `x-openclaw-session-key` for advanced routing

## Configuration

**Enabling:**
```json
{ "gateway": { "http": { "endpoints": { "responses": { "enabled": true } } } } }
```

**Disabling:**
```json
{ "gateway": { "http": { "endpoints": { "responses": { "enabled": false } } } } }
```

## Supported Input Types
- Messages (roles: system, developer, user, assistant)
- Function call outputs for turn-based tools
- Images (base64 or URL; max 10MB; supports JPEG, PNG, GIF, WebP, HEIC, HEIF)
- Files (base64 or URL; max 5MB; supports text, markdown, HTML, CSV, JSON, PDF)

## Request Parameters
- `input`: string or item array
- `instructions`: merged into system prompt
- `tools`: client-side function definitions
- `tool_choice`: filter/require tools
- `stream`: enables SSE streaming
- `max_output_tokens`: output limit
- `user`: enables stable session routing

## Session Behavior
Sessions are stateless by default. Providing a `user` string derives a stable session key for persistent agent state across requests.

## Streaming
Enable with `stream: true` for Server-Sent Events. Events include response creation, progress updates, content additions, and completion status.

## Example Requests

**Non-streaming curl:**
```bash
curl -sS http://127.0.0.1:18789/v1/responses \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Content-Type: application/json' \
  -H 'x-openclaw-agent-id: main' \
  -d '{"model": "openclaw", "input": "hi"}'
```

**Streaming curl:**
```bash
curl -N http://127.0.0.1:18789/v1/responses \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Content-Type: application/json' \
  -H 'x-openclaw-agent-id: main' \
  -d '{"model": "openclaw", "stream": true, "input": "hi"}'
```
