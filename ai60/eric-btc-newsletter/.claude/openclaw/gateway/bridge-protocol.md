# Bridge Protocol

## Overview

The Bridge protocol represents a **legacy node transport mechanism** using TCP JSONL. The documentation emphasizes that new implementations should adopt the unified Gateway WebSocket protocol instead.

## Key Points

**Current Status:**
Modern OpenClaw builds no longer include the TCP bridge listener. This document serves as "kept for historical reference" only, with legacy configuration keys removed from the current schema.

**Security & Architecture Rationale:**
The Bridge protocol provided several distinct advantages:
- A restricted API surface compared to the full gateway
- Node identity management through per-node tokens
- Local network discovery capabilities via Bonjour
- Isolated control plane functionality

## Technical Specifications

**Transport Details:**
- Protocol: TCP with line-delimited JSON (JSONL)
- Optional TLS encryption support
- Legacy port: 18790 (no longer active in current builds)

**Message Types:**
The protocol supports bidirectional frames including RPC requests, node events, command invocations, and keepalive signals.

**Pairing Process:**
Client-gateway pairing involves a handshake sequence where clients provide metadata and tokens, with gateway approval required before full access.

## Notable Features

Execution lifecycle tracking enabled nodes to emit completion or denial events for system commands, which were mapped to gateway-level system events. The protocol also supported tailnet binding for alternative network topologies.

**Versioning Status:**
The Bridge protocol operates as implicit v1 without negotiation mechanisms, though backward compatibility was expected.
