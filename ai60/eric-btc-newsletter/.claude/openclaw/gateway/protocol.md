# Gateway Protocol

## Overview

The OpenClaw Gateway employs a WebSocket-based control protocol serving as the unified management and transport layer. All client types, including CLI tools, web interfaces, and device nodes, establish connections by declaring their operational role and authorization scope during the initial handshake.

## Connection Architecture

**Transport Method:** Text-framed WebSocket connections carrying JSON payloads, with the opening message required to be a `connect` request.

## Authentication Flow

The gateway initiates a pre-connect challenge containing a server-generated nonce and timestamp. Clients must respond with connection parameters including protocol version, client metadata, role declaration, scope specifications, and cryptographic device identity credentials.

Upon successful authentication, the gateway responds with protocol acknowledgment and policy configuration (such as tick interval milliseconds). When device pairing occurs, the response additionally includes an issued device token scoped to the connection's established role and permissions.

## Role-Based Access Control

**Two Primary Roles:**
- `operator`: Control plane clients managing orchestration
- `node`: Capability-hosting systems providing resources like cameras, screens, or canvas interfaces

**Operator Scopes** include granular permission levels for read operations, write operations, administrative functions, approval workflows, and pairing management. Method-level scope gates apply initial authorization checks, with certain slash commands enforcing stricter validation layers on top.

**Node Capabilities** are declared as claims during connection: capability categories, allowlisted command invocations, and granular permission toggles subject to server-side allowlist enforcement.

## Message Framing Structure

Three frame types structure all communication:

- **Requests:** `{type:"req", id, method, params}`
- **Responses:** `{type:"res", id, ok, payload|error}`
- **Events:** `{type:"event", event, payload, seq?, stateVersion?}`

Side-effecting operations mandate idempotency keys per schema specifications.

## Device Identity and Pairing

Nodes must supply stable device identities derived from keypair fingerprints. The gateway issues tokens per device and role combination. New device identifiers typically require pairing approval unless local auto-approval configuration is enabled. Local connections (loopback or gateway host tailnet addresses) may bypass certain approval workflows.

All WebSocket clients must include device identity during connection establishment and sign the server-provided challenge nonce. Control UIs connecting via insecure localhost may omit device authentication only under explicit configuration flags designed for development scenarios.

## Approval Workflows

Execution requests requiring approval trigger `exec.approval.requested` broadcasts. Operators holding the `operator.approvals` scope resolve approvals via `exec.approval.resolve`. Node-targeted exec requests must include `systemRunPlan` containing canonical command arguments, working directory, raw command text, and session metadata; requests lacking this field are rejected.

## Versioning and Protocol Management

The protocol version constant resides in `src/gateway/protocol/schema.ts`. Clients transmit minimum and maximum protocol versions; server-side version mismatch results in connection rejection. TypeBox-based schema generation produces type definitions for multiple platforms through standardized build commands.

## Security Mechanisms

**Token Management:** Environment-configured gateway tokens require matching client credentials. Issued device tokens persist connection-specific role and scope bindings and should be cached locally. Token rotation and revocation employ dedicated methods requiring pairing scope authorization.

**Error Recovery Guidance:** Authentication failures include error detail codes and recovery hints indicating whether device token retry is viable, configuration updates are needed, or wait-and-retry strategies apply.

**TLS and Pinning:** WebSocket connections support TLS encryption with optional certificate fingerprint pinning via configuration or command-line parameters.

## Migration Diagnostics

Legacy clients using outdated challenge-signing protocols receive specific `DEVICE_AUTH_*` error codes indicating nonce mismatches, signature invalidity, timestamp skew, identity inconsistencies, or key format failures. Migration paths direct clients toward v2 or v3 signature payload formats that incorporate server nonces and platform binding information.
