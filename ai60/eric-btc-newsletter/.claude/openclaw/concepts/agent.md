# Agent Runtime Documentation

## Overview

OpenClaw operates a single embedded agent runtime based on **pi-mono**. The system requires a workspace directory and uses bootstrap files to configure agent behavior on first startup.

## Key Components

**Workspace Requirements:**
The agent needs a single working directory (`agents.defaults.workspace`). Users can initialize this with `openclaw setup`, which creates `~/.openclaw/openclaw.json` and sets up workspace files.

**Bootstrap Files:**
On initial session startup, OpenClaw injects content from six user-editable files:
- `AGENTS.md` — instructions and memory
- `SOUL.md` — persona and tone guidelines
- `TOOLS.md` — tool usage notes
- `BOOTSTRAP.md` — first-run ritual (auto-deleted after completion)
- `IDENTITY.md` — agent identity details
- `USER.md` — user profile information

The system "skips blank files" and truncates oversized content to maintain prompt efficiency.

**Tool Availability:**
Core tools (read, execute, edit, write) are always available subject to policy. Skills load from bundled, local (`~/.openclaw/skills`), and workspace (`<workspace>/skills`) locations, with workspace versions taking precedence on naming conflicts.

## Session Management

Transcripts store as JSONL in `~/.openclaw/agents/<agentId>/sessions/<SessionId>.jsonl` with stable, OpenClaw-assigned session IDs.

**Model Configuration:**
Model references parse on the first `/` character. Use `provider/model` format; omitting the provider defaults to the configured default provider.
