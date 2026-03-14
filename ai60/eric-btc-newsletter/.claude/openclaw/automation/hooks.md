# Hooks Documentation

## Overview

OpenClaw's hooks system provides event-driven automation. As the documentation explains, "Hooks provide an extensible event-driven system for automating actions in response to agent commands and events."

## Two Hook Types

**Internal Hooks**: Execute within the Gateway when agent events occur (like `/new`, `/reset`, `/stop`)

**Webhooks**: External HTTP endpoints allowing external systems to trigger OpenClaw actions

## Key Capabilities

Hooks enable users to:
- Preserve session context to memory during resets
- Maintain command audit trails for compliance
- Launch automated workflows on lifecycle events
- Write files to agent workspaces or invoke external services

## Discovery & Structure

Hooks are discovered automatically from three directories (in precedence order):
1. Workspace hooks: `<workspace>/hooks/`
2. Managed hooks: `~/.openclaw/hooks/`
3. Bundled hooks: shipped with OpenClaw

Each hook requires:
- `HOOK.md`: Metadata and documentation in YAML frontmatter
- `handler.ts`: TypeScript implementation

## Event Categories

- **Command events**: `/new`, `/reset`, `/stop`
- **Session events**: Compaction lifecycle
- **Agent events**: Bootstrap operations
- **Gateway events**: Startup
- **Message events**: Reception, transcription, preprocessing, sending

## Bundled Hooks Provided

1. **session-memory**: Saves context snapshots
2. **bootstrap-extra-files**: Injects additional workspace files
3. **command-logger**: Audit logging to JSONL format
4. **boot-md**: Executes startup instructions

## CLI Management

Users manage hooks via commands like `openclaw hooks list`, `openclaw hooks enable`, and `openclaw hooks disable`.
