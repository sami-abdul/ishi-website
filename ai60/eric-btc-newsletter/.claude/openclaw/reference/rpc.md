# RPC Adapters

OpenClaw integrates external CLIs via JSON-RPC using two primary patterns.

## Pattern A: HTTP Daemon (signal-cli)

The `signal-cli` service operates as a daemon exposing JSON-RPC over HTTP. Key characteristics include:

- Event streaming via SSE at `/api/v1/events`
- Health monitoring endpoint: `/api/v1/check`
- Lifecycle management by OpenClaw when `channels.signal.autoStart=true`

Refer to the [Signal](/channels/signal) documentation for configuration and endpoint details.

## Pattern B: Stdio Child Process (Legacy: imsg)

> **Note:** BlueBubbles is recommended for new iMessage implementations instead.

OpenClaw spawns `imsg rpc` as a subprocess for legacy iMessage support. Communication occurs through line-delimited JSON-RPC over stdin/stdout.

Essential RPC methods:

- `watch.subscribe` -> notifications (`method: "message"`)
- `watch.unsubscribe`
- `send`
- `chats.list` (diagnostics/verification)

Consult [iMessage](/channels/imessage) documentation for legacy configuration and addressing conventions (`chat_id` format preferred).

## Adapter Guidelines

- The gateway controls process lifecycle (startup/shutdown aligned with provider operations)
- Implement resilient RPC clients with timeout handling and exit recovery
- Utilize stable identifiers like `chat_id` rather than user-facing display names