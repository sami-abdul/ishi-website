# WebChat Documentation

## Overview
WebChat is a native chat interface for the gateway that connects via WebSocket. According to the documentation, it's "a native chat UI for the gateway (no embedded browser and no local static server)."

## Key Features

**Core Functionality:**
- Operates as a macOS/iOS SwiftUI application connecting directly to the Gateway WebSocket
- Uses the same sessions and routing rules as other channels
- Implements deterministic routing where "replies always go back to WebChat"

**History Management:**
The system bounds chat history "for stability: Gateway may truncate long text fields, omit heavy metadata, and replace oversized entries with [chat.history omitted: message too large]."

**Message Operations:**
- `chat.inject` allows appending assistant notes directly to transcripts
- Aborted runs can retain partial assistant output in the UI
- The gateway persists aborted partial text and marks entries with abort metadata

## Configuration

WebChat doesn't require a dedicated configuration block. Instead, it relies on:
- `gateway.port` and `gateway.bind` for WebSocket settings
- `gateway.auth.mode`, `gateway.auth.token`, `gateway.auth.password` for authentication
- `gateway.remote.url` for remote gateway tunneling via SSH/Tailscale

## Additional Capabilities

The Control UI Tools panel fetches a runtime catalog via `tools.catalog` and labels tools as "core" or "plugin:<id>" with optional designations for plugin tools.
