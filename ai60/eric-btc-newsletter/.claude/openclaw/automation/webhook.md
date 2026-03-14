# Webhooks Documentation

## Overview

OpenClaw's Gateway offers HTTP webhook endpoints for external event triggers. The system supports two primary endpoint types: `/hooks/wake` for system events and `/hooks/agent` for isolated agent execution.

## Key Configuration Requirements

To enable webhooks, you must set `hooks.enabled: true` and provide a `hooks.token`. The documentation emphasizes that "hooks.token is required when hooks.enabled=true." Optional settings include path customization and agent ID allowlisting.

## Authentication Methods

Requests require the hook token via:
- `Authorization: Bearer <token>` (recommended)
- `x-openclaw-token: <token>`

Query-string tokens are explicitly rejected with a 400 response.

## Primary Endpoints

**`POST /hooks/wake`** enqueues system events for the main session. Required field: `text` (event description). Optional `mode` parameter controls timing: `now` triggers immediate heartbeat, while `next-heartbeat` waits for the periodic check.

**`POST /hooks/agent`** runs isolated agent turns with customizable routing. Key parameters include `message` (required), `agentId` (optional routing), `sessionKey` (disabled by default), and model/thinking overrides.

## Session Key Security

A significant breaking change restricts `sessionKey` overrides to disabled by default. The recommended approach uses a fixed `hooks.defaultSessionKey` with `allowRequestSessionKey: false`. When enabled, `hooks.allowedSessionKeyPrefixes` should restrict values to patterns like `["hook:"]`.

## Custom Mappings

The `POST /hooks/<name>` endpoint supports custom transformations via `hooks.mappings` and optional JavaScript/TypeScript modules. Gmail integration is available through built-in presets.

## Security Recommendations

Keep endpoints behind loopback or trusted proxies, use dedicated hook tokens, implement rate-limiting safeguards, restrict agent routing with allowlists, and avoid logging sensitive payloads. Webhook payloads receive safety wrapping by default unless explicitly disabled.
