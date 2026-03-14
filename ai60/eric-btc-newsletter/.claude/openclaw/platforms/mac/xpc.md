# macOS IPC Documentation Summary

## Architecture Overview

OpenClaw implements a local Unix socket connection between a node host service and macOS app to handle execution approvals and system commands. The system prioritizes a single GUI instance that manages all TCC-facing operations.

## Key Components

**Gateway + Node Transport**: The application runs the Gateway locally and connects as a node, performing agent actions through `node.invoke` for tasks like `system.run` and `system.notify`.

**Node Service Communication**: A headless node service connects via WebSocket to the Gateway, forwarding `system.run` requests to the macOS app over a Unix socket, where the app executes commands in UI context with optional prompts.

The documentation describes the flow: "Agent → Gateway → Node Service (WS) → Mac App (UI + TCC + system.run)" using IPC with "UDS + token + HMAC + TTL."

## UI Automation

PeekabooBridge handles UI automation through a separate Unix socket (`bridge.sock`) using JSON protocol. The host preference follows this order: Peekaboo.app → Claude.app → OpenClaw.app → local execution. Security requires allowed TeamID matching, with a DEBUG-only escape hatch available through environment configuration.

## Operational Management

Restart procedures use signed bundles with developer identity. The system enforces single instance operation, terminating duplicate launches with identical bundle IDs.

## Security Measures

Hardening includes TeamID matching requirements, socket mode `0600`, peer-UID verification, HMAC challenges, and short TTLs -- all communication remains local-only.