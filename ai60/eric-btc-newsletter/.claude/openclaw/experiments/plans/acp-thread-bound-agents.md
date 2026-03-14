# ACP Thread Bound Agents

## Overview

This documentation outlines OpenClaw's architecture for supporting ACP (Agent Control Protocol) coding agents in thread-capable channels, starting with Discord. The plan emphasizes production-level lifecycle management and recovery mechanisms.

## Key Architectural Decisions

### Hybrid Architecture Model

The design separates concerns between OpenClaw core and pluggable runtime backends:

- **Core responsibilities**: Session identity, thread binding, routing decisions, delivery guarantees, and lifecycle cleanup
- **Plugin responsibilities**: ACP transport, queueing, cancellation, and reconnection logic

The document states: *"OpenClaw should not reimplement ACP transport internals in core"* and emphasizes that routing decisions must exist in core rather than relying purely on plugin interception.

## Non-Negotiable Invariants

The system enforces several critical guarantees:

- Every ACP thread binding references a valid session record
- Sessions maintain explicit state (`creating`, `idle`, `running`, `cancelling`, `closed`, `error`)
- Runs track explicit state (`queued`, `running`, `completed`, `failed`, `cancelled`)
- Spawn, bind, and initial enqueue operations are atomic
- Command retries remain idempotent without duplicate runs or outputs
- Thread output derives solely from ACP run events, never ad-hoc side effects

## Core Runtime Contract

The system defines a backend-agnostic interface for ACP runtimes:

```typescript
export interface AcpRuntime {
  ensureSession(input): Promise<AcpRuntimeHandle>;
  submit(input): Promise<{ runtimeRunId: string }>;
  stream(input): Promise<void>;
  cancel(input): Promise<void>;
  close(input): Promise<void>;
  health?(): Promise<{ ok: boolean; details?: string }>;
}
```

This abstraction enables swapping backends without modifying core dispatch logic.

## Control-Plane Persistence Model

The long-term approach uses SQLite (WAL mode) as the source of truth:

- `acp_sessions`: Session metadata and lifecycle state
- `acp_runs`: Individual run tracking and status
- `acp_bindings`: Thread-to-session mappings
- `acp_events`: Append-only event log for replay and recovery
- `acp_delivery_checkpoint`: Idempotent delivery tracking
- `acp_idempotency`: Command request deduplication

The document clarifies: *"keep SessionEntry.acp as a compatibility projection during migration"* rather than as the authoritative store.

## Per-Session Actor Model

An `AcpSessionManager` maintains one actor per ACP session key that:

- Serializes `submit`, `cancel`, `close`, and `stream` operations
- Owns runtime handle lifecycle for that session
- Writes run events in-order before Discord delivery
- Updates checkpoints after successful sends

This eliminates cross-turn races and prevents duplicate or out-of-order output.

## Idempotency and Delivery

All external ACP actions carry idempotency keys to ensure:

- Idempotent retries without creating duplicate runs
- Discord messages derived from events plus checkpoints
- Exactly-once final reply emission per run from projection logic

## Routing and Delivery Logic

**Inbound**: Thread binding lookup resolves to ACP session key before normal dispatch.

**Outbound**: When a bound thread is active for a session turn, parent channel completion is suppressed to avoid duplication.

**Streaming**: Partial output coalesces with configurable intervals and chunk sizes to respect Discord rate limits.

## Configuration Surface

Core configuration keys include:

- `acp.enabled`
- `acp.dispatch.enabled` (independent routing kill switch)
- `acp.backend` (default `acpx`)
- `acp.defaultAgent`
- `acp.allowedAgents[]`
- `acp.maxConcurrentSessions`
- Stream and runtime tuning parameters
- Control-plane store and recovery options

## Session State Machines

**Sessions**: `creating -> idle -> running -> idle` with branching to `cancelling`, `error`, or `closed`.

**Runs**: `queued -> running -> completed` with alternate paths to `failed` or `cancelled`.

Transaction boundaries ensure atomicity at spawn, close, and cancel boundaries.

## acpx Backend Integration

The first production backend uses these command patterns:

- Ensure session: `acpx --format json ... sessions ensure --name <name>`
- Prompt turn: `acpx --format json ... prompt --session <name> --file -`
- Cancel: `acpx --format json ... cancel --session <name>`
- Close: `acpx --format json ... sessions close <name>`

Output streams as ndjson events that normalize to ACP runtime events.

## Required Safety Controls

- Allowlist ACP agents by name
- Restrict workspace roots for sessions
- Environment variable passthrough allowlists
- Maximum concurrent sessions per account and globally
- Bounded restart backoff for runtime crashes

## New Commands

- `/acp spawn <agent-id> [--mode persistent|oneshot] [--thread auto|here|off]`
- `/acp cancel [session]`
- `/acp steer <instruction>`
- `/acp close [session]`
- `/acp sessions`

## Phased Rollout Strategy

The implementation follows six phases:

1. **Phase 0**: ADR and schema freeze
2. **Phase 1**: Control-plane foundation in core
3. **Phase 2**: Core routing and lifecycle integration
4. **Phase 3**: acpx backend adapter
5. **Phase 4**: Delivery projection and channel UX
6. **Phase 5**: Migration and cutover to SQLite-primary

Phases 6+ cover hardening, SLOs, and operational readiness.

## Error Handling

Stable error codes with user-safe messages include:

- `ACP_BACKEND_MISSING`: Runtime not configured
- `ACP_BACKEND_UNAVAILABLE`: Runtime temporarily unavailable
- `ACP_SESSION_INIT_FAILED`: Runtime initialization failed
- `ACP_TURN_FAILED`: Turn failed before completion

The document emphasizes: *"never silently fall back to normal LLM path when ACP routing"* was explicitly selected.

## Observability Requirements

Metrics track spawn success/failure, run latency, actor restarts, stale bindings, idempotency replay hits, and delivery retries. Structured logs key by `sessionKey`, `runId`, `backend`, `threadId`, and `idempotencyKey`.

## Risks and Mitigations

Key risks addressed include duplicate deliveries, runtime process churn, missing plugins, config confusion, store corruption, and actor deadlocks. Each has specific mitigation strategies documented.

## Acceptance Criteria

The implementation succeeds when ACP sessions spawn and bind to threads, route all messages to the bound session only, prevent parent channel duplication, maintain atomicity and idempotency, handle crashes gracefully, support concurrent sessions, and provide clear diagnostics for operators.