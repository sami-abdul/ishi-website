# Agent Workspace Documentation

## Overview
The workspace serves as an agent's primary working directory and memory storage, distinct from the configuration directory at `~/.openclaw/`. It's a default current working directory for file operations, though absolute paths can access elsewhere unless sandboxing is restricted.

## Location & Configuration
The default workspace resides at `~/.openclaw/workspace`, with profile-specific variants available. Users can override this location in their `openclaw.json` configuration file. The `openclaw onboard`, `configure`, or `setup` commands will initialize the workspace and populate bootstrap files if needed.

## Standard Workspace Files
The documentation outlines several key files users should maintain:

- **AGENTS.md** - Operating instructions and behavioral guidelines
- **SOUL.md** - Personality, communication style, and boundaries
- **USER.md** - User information and preferences
- **IDENTITY.md** - Agent name and emoji designation
- **TOOLS.md** - Local tool documentation and conventions
- **HEARTBEAT.md** - Optional lightweight checklist for periodic runs
- **BOOT.md** - Optional startup checklist
- **memory/YYYY-MM-DD.md** - Daily memory logs

Optional directories include `skills/` for workspace-specific capabilities and `canvas/` for UI components.

## What Stays Out
Credentials, session transcripts, config files, and managed skills belong under `~/.openclaw/` rather than the workspace itself.

## Backup Recommendations
The documentation strongly advises treating workspaces as sensitive memory and maintaining them in a private git repository. Users should exclude secrets, API keys, and raw chat dumps from version control, utilizing a `.gitignore` file to prevent accidental commits.
