# Migration Guide: OpenClaw to a New Machine

## Overview

This guide explains how to migrate OpenClaw Gateway between machines while preserving your existing configuration and sessions.

## Key Components to Migrate

The migration requires copying two main directories:

1. **State directory** (typically `~/.openclaw/`) — contains configuration, authentication, sessions, and channel state
2. **Workspace** (typically `~/.openclaw/workspace/`) — contains agent files, memory, and prompts

## Migration Steps

**Step 0:** Stop the gateway on the original machine and create backups using `tar` compression.

**Step 1:** Install OpenClaw on the new machine following standard installation procedures.

**Step 2:** Copy both the state directory and workspace to the new machine using `scp`, `rsync`, or external storage, ensuring hidden directories and correct file ownership are preserved.

**Step 3:** Run `openclaw doctor` to apply migrations and repair services, then restart the gateway.

## Critical Warnings

The documentation emphasizes several common mistakes:

- **Profile mismatches** — running the gateway with different profile settings than the original
- **Incomplete copies** — "copying only `openclaw.json` is not enough" since credentials and agent state live elsewhere
- **Ownership issues** — file permissions must allow the gateway user to read credentials
- **Remote/local confusion** — migrating local machines won't move a remote gateway's data
- **Security risks** — state directories contain secrets requiring encrypted backup storage

## Verification

Confirm successful migration by checking gateway status, channel connectivity, dashboard access, and workspace file presence.
