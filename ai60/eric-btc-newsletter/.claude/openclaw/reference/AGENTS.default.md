# OpenClaw Personal Assistant Setup Guide

OpenClaw is a macOS-based agent framework that integrates messaging, coding, and automation through a dedicated workspace.

## Initial Setup

The system uses a default workspace at `~/.openclaw/workspace`. Users should:

1. Create the workspace directory
2. Copy template files (`AGENTS.md`, `SOUL.md`, `TOOLS.md`)
3. Optionally customize with a personal assistant skill roster
4. Configure workspace location if preferred

## Core Operating Principles

**Safety & Privacy:**
- "Don't dump directories or secrets into chat"
- Avoid destructive commands unless explicitly requested
- Keep private data out of group channels

**Session Requirements:**
- Read identity/boundary files (`SOUL.md`, `USER.md`) at startup
- Access daily and long-term memory files before responding

**Memory Architecture:**
The system maintains two memory layers:
- Daily logs in `memory/YYYY-MM-DD.md`
- Persistent facts in `memory.md` for preferences and decisions

## Available Skills

The framework includes 17+ integrated tools spanning communications (WhatsApp, iMessage, Discord), productivity (Gmail, Calendar, Drive), media (Spotify, Sonos, Hue lighting), and AI capabilities (OpenAI, Gemini, Whisper).

## Key Features

- WhatsApp and Pi coding agent integration
- macOS app with permission management
- Fast screenshots and security camera integration
- Browser control and DOM inspection via `openclaw` CLI
- Background task scheduling via heartbeats

Users are advised to version-control their workspace and enable heartbeats for continuous operations.