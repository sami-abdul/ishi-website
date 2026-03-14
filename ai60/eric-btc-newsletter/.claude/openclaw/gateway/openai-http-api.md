# OpenAI Chat Completions API

## Overview
OpenClaw's Gateway provides an OpenAI-compatible Chat Completions endpoint at `POST /v1/chat/completions` (disabled by default).

## Key Configuration
Enable the endpoint by setting `gateway.http.endpoints.chatCompletions.enabled` to `true` in your configuration.

## Authentication
The endpoint uses Gateway authentication via bearer tokens:
- Token mode: Use `gateway.auth.token`
- Password mode: Use `gateway.auth.password`
- Rate limiting applies with 429 responses when threshold exceeded

## Critical Security Warning
This endpoint provides "full operator-access" to the gateway. The documentation emphasizes that bearer authentication here represents owner-level credentials, not per-user scoping. Requests execute through the same trusted operator pathway as direct agent commands. The endpoint should remain on private networks only and never be exposed publicly.

## Agent Selection
Specify target agents through:
- `model` field: `"openclaw:<agentId>"` or `"agent:<agentId>"`
- Header: `x-openclaw-agent-id: <agentId>`
- Advanced: `x-openclaw-session-key` for session control

## Session & Streaming
Sessions default to stateless per-request but can be stabilized using the OpenAI `user` field. The endpoint supports Server-Sent Events streaming with `stream: true`, returning responses as `data: <json>` lines ending with `[DONE]`.
