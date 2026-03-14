# Tools Invoke API

## Overview

OpenClaw's Gateway provides an HTTP endpoint for directly invoking individual tools, controlled by authentication and policy restrictions.

**Endpoint:** `POST /tools/invoke` on the Gateway's standard port (WS + HTTP multiplex)

**Default payload limit:** 2 MB

## Authentication

The system uses Gateway auth configuration with bearer token submission:

```
Authorization: Bearer <token>
```

Token source depends on configuration mode:
- `gateway.auth.mode="token"` -> use `gateway.auth.token`
- `gateway.auth.mode="password"` -> use `gateway.auth.password`

Rate limiting may trigger a `429` response with `Retry-After` header if authentication failures exceed configured thresholds.

## Request Structure

```json
{
  "tool": "sessions_list",
  "action": "json",
  "args": {},
  "sessionKey": "main",
  "dryRun": false
}
```

**Parameters:**
- `tool` (required): The tool identifier
- `action` (optional): Maps to args if schema supports it
- `args` (optional): Tool-specific parameters
- `sessionKey` (optional): Target session; defaults to main session
- `dryRun` (optional): Reserved for future use

## Policy & Access Control

Tool availability filters through policy layers including profiles, allowlists, agent-specific rules, and group/channel policies. Unavailable tools return `404`.

**Hard-blocked tools by default:**
- `sessions_spawn`
- `sessions_send`
- `gateway`
- `whatsapp_login`

Customize via `gateway.tools.deny` and `gateway.tools.allow` configuration.

## Response Codes

- `200`: Success with result
- `400`: Invalid request or tool input error
- `401`: Unauthorized
- `404`: Tool unavailable
- `405`: Method not allowed
- `429`: Rate-limited
- `500`: Execution error

## Example Request

```bash
curl -sS http://127.0.0.1:18789/tools/invoke \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"tool": "sessions_list", "action": "json", "args": {}}'
```
