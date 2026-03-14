# Multi-Agent Routing in OpenClaw

## Core Concept

OpenClaw enables multiple isolated agents to operate within a single Gateway instance. Each agent maintains complete separation through its own workspace, state directory, and session store.

## What Defines an Agent?

An agent comprises:
- **Workspace**: Contains files, configuration documents (AGENTS.md, SOUL.md, USER.md), and local notes
- **State directory (`agentDir`)**: Stores authentication profiles, model registry, and per-agent configuration
- **Session store**: Located at `~/.openclaw/agents/<agentId>/sessions`, maintaining chat history and routing state

Authentication credentials remain agent-specific and should never be shared across agent directories.

## Quick Setup Steps

1. **Create agent workspaces** using the wizard:
   ```
   openclaw agents add coding
   openclaw agents add social
   ```

2. **Establish channel accounts** (one per agent on preferred platforms like Discord, Telegram, or WhatsApp)

3. **Configure agents and bindings** in the main configuration file to connect agents with channel accounts

4. **Verify setup**:
   ```
   openclaw agents list --bindings
   ```

## Routing Mechanism

Messages route deterministically through bindings using this priority order:

1. Exact peer match (specific DM or group)
2. Parent peer match (thread inheritance)
3. Discord role-based routing
4. Guild/team identification
5. Account-level matching
6. Channel-wide fallback
7. Default agent assignment

The "most-specific wins" principle ensures predictable message flow.

## Multi-Account Support

Channels supporting multiple accounts (WhatsApp, Telegram, Discord, Slack, and others) use `accountId` to distinguish between instances. Each account can route to different agents, enabling multiple phone numbers or bot tokens on one server without session overlap.

## Isolation Benefits

Multiple agents enable:
- Different personalities and personas per agent
- Separate authentication and session management
- Multiple people sharing infrastructure while maintaining data isolation
- Per-agent tool restrictions and sandbox configurations
