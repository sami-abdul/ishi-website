# Sub-Agents Documentation

## Overview

Sub-agents are background agent runs spawned from existing agent sessions that operate independently and report results back to the requester channel. They maintain their own session context using the format `agent:<agentId>:subagent:<uuid>`.

## Key Commands

The `/subagents` slash command provides management controls:
- List, kill, log, and inspect active sub-agent runs
- Send messages or steering instructions to specific sub-agents
- Spawn new sub-agents with optional model and thinking overrides

## Spawning Behavior

When you spawn a sub-agent using `/subagents spawn`, the operation returns immediately with a run ID. Upon completion, the sub-agent delivers a summary message back to the requester, including status, runtime statistics, and token usage information. The system attempts direct delivery first, then falls back to queue routing if needed.

## Thread-Bound Sessions

Discord channels support persistent thread bindings for sub-agents. This allows follow-up user messages within a thread to route automatically to the same sub-agent session. Users can manually control bindings with `/focus` and `/unfocus` commands.

## Nested Sub-Agents

By setting `maxSpawnDepth: 2`, you enable an orchestrator pattern where sub-agents can spawn their own children. The system prevents infinite nesting: depth-2 agents cannot spawn further sub-agents. Results flow back up the chain, with each level synthesizing child outputs before announcing to its parent.

## Tool Access

Sub-agents receive most tools except session management tools like `sessions_spawn` by default. Orchestrator-level sub-agents (depth 1, when nesting is enabled) gain additional management capabilities to oversee their children.

## Resource Management

Sub-agents operate within a dedicated queue lane with configurable concurrency limits (default: 8 concurrent runs). The system auto-archives sessions after a configurable duration and respects per-agent spawn limits to prevent runaway resource consumption.
