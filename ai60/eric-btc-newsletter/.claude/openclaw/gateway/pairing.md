# Gateway-Owned Pairing

## Overview

In this pairing model, the Gateway serves as the authoritative source for node membership validation. The documentation notes that "the **Gateway** is the source of truth for which nodes are allowed to join," while UI applications function as approval interfaces rather than decision-makers.

A critical distinction exists: WebSocket nodes employ device pairing during connection, but the `node.pair.*` operations represent a separate approval mechanism that doesn't control the initial handshake.

## Core Concepts

The system revolves around three key states:

- **Pending requests**: Nodes awaiting administrative approval
- **Paired nodes**: Authenticated nodes possessing valid tokens
- **Transport layer**: Stateless forwarding without membership authority

## Operational Workflow

The pairing sequence follows these steps:

1. Node initiates Gateway connection
2. Gateway creates pending request and broadcasts `node.pair.requested` event
3. Administrator approves or rejects via CLI or UI
4. Successful approval generates a fresh authentication token
5. Node reconnects using the issued token

Pending requests automatically expire after five minutes.

## Available Commands

```
openclaw nodes pending
openclaw nodes approve <requestId>
openclaw nodes reject <requestId>
openclaw nodes status
openclaw nodes rename --node <id|name|ip> --name "Living Room iPad"
```

## API Methods and Events

**Events:**
- `node.pair.requested` and `node.pair.resolved`

**Methods:**
- Request, list, approve, reject, and verify operations

The system generates "a fresh token" with each approval; tokens never return from initial requests.

## Storage Location

Pairing data resides in `~/.openclaw/nodes/` with `paired.json` and `pending.json` files requiring careful security handling.
