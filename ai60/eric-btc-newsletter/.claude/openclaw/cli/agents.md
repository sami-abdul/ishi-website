# OpenClaw Agents Documentation

## Overview

The `openclaw agents` command manages isolated agents with their own workspaces, authentication, and routing configurations. This feature connects to multi-agent routing and agent workspace concepts.

## Core Commands

Basic agent management includes listing agents, adding new ones, and deleting existing ones:

```bash
openclaw agents list
openclaw agents add work --workspace ~/.openclaw/workspace-work
openclaw agents delete work
```

Identity and avatar customization can be configured through:

```bash
openclaw agents set-identity --agent main --avatar avatars/openclaw.png
```

## Routing Bindings

Bindings direct incoming channel traffic to specific agents. You can list all bindings or filter by agent:

```bash
openclaw agents bindings
openclaw agents bindings --agent work
```

To add a binding, specify the agent and channel (with optional account ID):

```bash
openclaw agents bind --agent work --bind telegram:ops --bind discord:guild-a
```

The system supports three binding scopes: channel-default (no account ID), explicit account IDs, and wildcard (`*`) for all accounts. When upgrading from a channel-only binding to an account-specific one, OpenClaw replaces the existing binding rather than creating duplicates.

Remove bindings using:

```bash
openclaw agents unbind --agent work --bind telegram:ops
openclaw agents unbind --agent work --all
```

## Identity Configuration

Each agent workspace can include an `IDENTITY.md` file at its root. The `set-identity` command manages agent identity fields including name, theme, emoji, and avatar. Avatar paths resolve relative to the workspace root, supporting file paths, HTTP(S) URLs, or data URIs.

Load identity from file:

```bash
openclaw agents set-identity --workspace ~/.openclaw/workspace --from-identity
```

Or override specific fields directly:

```bash
openclaw agents set-identity --agent main --name "OpenClaw" --emoji "🦞"
```
