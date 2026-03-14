# Multi-Agent Sandbox & Tools Configuration

## Key Concepts

The documentation explains how to configure individual agents with distinct security profiles within a multi-agent setup. Each agent can override global sandbox settings and tool restrictions.

## Core Features

**Per-Agent Configuration:**
- Sandbox modes can vary by agent (off, all, non-main)
- Tool access is granular with allow/deny lists
- Authentication credentials stored separately per agent at `~/.openclaw/agents/<agentId>/agent/auth-profiles.json`

**Configuration Precedence:**
Agent-specific settings override defaults. The tool filtering order follows seven levels, from tool profiles down to subagent policies, where "each level can only further restrict, not grant back."

## Practical Use Cases

The guide provides three main examples:
1. Personal assistant (unrestricted) + family bot (read-only, sandboxed)
2. Work agent with shared sandbox and selective tool access
3. Different sandbox modes per agent with global defaults

## Tool Groups & Restrictions

Shorthand groups like `group:runtime`, `group:fs`, and `group:messaging` simplify policy definition. Common patterns include read-only agents, safe execution agents (no file modifications), and communication-only agents.

## Important Notes

- "non-main" mode bases decisions on session keys, not agent IDs
- Workspace separation prevents credential sharing
- Testing involves checking agent resolution, sandbox containers, and tool restrictions via logs
