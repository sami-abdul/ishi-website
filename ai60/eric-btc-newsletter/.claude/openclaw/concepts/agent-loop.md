# Agent Loop (OpenClaw) - Complete Documentation

## Overview

An agentic loop represents the complete execution path of an agent: "intake -> context assembly -> model inference -> tool execution -> streaming replies -> persistence." It transforms messages into actions while maintaining session consistency.

## Entry Points

The agent loop can be accessed through:
- Gateway RPC: `agent` and `agent.wait` calls
- CLI: `agent` command

## High-Level Execution Flow

**Step 1: Initial RPC Call**
The `agent` RPC validates parameters, resolves the session, persists metadata, and immediately returns `{ runId, acceptedAt }`.

**Step 2: Agent Command Execution**
`agentCommand` handles model resolution, loads skill snapshots, invokes the pi-agent-core runtime, and emits lifecycle events if the embedded loop doesn't.

**Step 3: Embedded Pi Agent Runtime**
`runEmbeddedPiAgent` serializes runs through queues, builds the pi session, subscribes to events, enforces timeouts, and returns payloads with usage data.

**Step 4: Event Bridging**
`subscribeEmbeddedPiSession` maps pi-agent-core events to OpenClaw streams (tool, assistant, lifecycle).

**Step 5: Wait Mechanism**
`agent.wait` polls for lifecycle completion and returns `{ status, startedAt, endedAt, error? }`.

## Queueing & Concurrency

Runs serialize per session key and optionally through global lanes, preventing race conditions and maintaining history consistency. Queue modes (collect/steer/followup) feed this system.

## Session & Workspace Preparation

The system resolves and creates workspaces, loads skills, injects bootstrap/context files into the system prompt, and acquires session write locks before streaming begins.

## Prompt Assembly

The system prompt combines OpenClaw's base, skills, bootstrap context, and per-run overrides while enforcing model-specific token limits and compaction reserves.

## Hook Points

### Internal Hooks (Gateway Hooks)
- **`agent:bootstrap`**: Modify bootstrap files before system prompt finalization
- **Command hooks**: Respond to `/new`, `/reset`, `/stop` and other commands

### Plugin Hooks
- **`before_model_resolve`**: Override provider/model pre-session
- **`before_prompt_build`**: Inject context or system prompt modifications
- **`before_agent_start`**: Legacy compatibility hook
- **`agent_end`**: Inspect final state post-completion
- **`before_compaction` / `after_compaction`**: Observe compaction cycles
- **`before_tool_call` / `after_tool_call`**: Intercept tool operations
- **`tool_result_persist`**: Transform results before transcript storage
- **`message_received` / `message_sending` / `message_sent`**: Message lifecycle hooks
- **`session_start` / `session_end`**: Session boundaries
- **`gateway_start` / `gateway_stop`**: Gateway lifecycle

## Streaming & Partial Replies

Assistant deltas stream from pi-agent-core as `assistant` events. Block and reasoning streaming support partial replies on `text_end` or `message_end`.

## Tool Execution

Tool events emit on the `tool` stream with start/update/end notifications. Results are sanitized for size and image payloads before logging.

## Reply Shaping

Final payloads assemble from assistant text, optional reasoning, inline tool summaries, and error text. `NO_REPLY` tokens filter from outgoing payloads; messaging tool duplicates are removed.

## Compaction & Retries

Auto-compaction emits events and triggers retries with buffer resets to prevent duplicate output.

## Event Streams

- **`lifecycle`**: Emitted by session subscription (or fallback by command)
- **`assistant`**: Streamed deltas from pi-agent-core
- **`tool`**: Tool events from pi-agent-core

## Chat Channel Handling

Assistant deltas buffer into chat `delta` messages; a chat `final` emits on lifecycle completion.

## Timeouts

- `agent.wait` default: 30 seconds (overridable via `timeoutMs`)
- Agent runtime default: 600 seconds (`agents.defaults.timeoutSeconds`)

## Early Termination Points

- Agent timeout (abort)
- AbortSignal (cancel)
- Gateway disconnect or RPC timeout
- `agent.wait` timeout (wait-only; doesn't stop agent)
