# TypeBox Protocol Documentation Summary

## Overview
TypeBox serves as the single source of truth for the Gateway WebSocket protocol, driving runtime validation, JSON Schema generation, and Swift code generation for the macOS application.

## Core Protocol Structure
The Gateway WebSocket uses three frame types:
- **Requests**: `{ type: "req", id, method, params }`
- **Responses**: `{ type: "res", id, ok, payload | error }`
- **Events**: `{ type: "event", event, payload, seq?, stateVersion? }`

Connection always begins with a mandatory `connect` request, followed by method calls and event subscriptions.

## Key Implementation Locations
Schema definitions are maintained in `src/gateway/protocol/schema.ts`, with runtime validators in `src/gateway/protocol/index.ts`. The server implementation resides in `src/gateway/server.ts`, while generated outputs include `dist/protocol.schema.json` (JSON Schema) and Swift models.

## Development Workflow
The standard process involves:
1. Updating TypeBox schemas as the source of truth
2. Exporting TypeScript types using `Static<>`
3. Creating AJV validators for runtime validation
4. Implementing server handlers
5. Running `pnpm protocol:check` to regenerate artifacts

## Design Conventions
Schemas enforce strict payloads using `additionalProperties: false`, utilize `NonEmptyString` for identifiers, employ discriminators for type safety, and require `idempotencyKey` for side-effect operations.

## Versioning Strategy
Protocol versioning manages compatibility through client-advertised `minProtocol` and `maxProtocol` ranges, with server rejection of mismatches.
