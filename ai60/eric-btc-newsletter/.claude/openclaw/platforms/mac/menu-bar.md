# Menu Bar Status Logic Documentation

## Overview

This documentation describes how a menu bar displays agent work state and health status. The system tracks activity across multiple sessions and presents visual indicators through icons and text labels.

## Key Components

**What Gets Displayed:**
The menu bar shows "the current agent work state" via an icon and status row. Health information appears only when all sessions are inactive. The Nodes section displays paired devices rather than client presence data.

**Session Management:**
Sessions receive `runId` and `sessionKey` identifiers. The "main" session takes priority; if it's inactive, the most recently active alternative session displays instead. The system avoids switching contexts mid-activity.

## Activity Types and Visual Indicators

Two activity categories exist:

- **Job**: High-level command execution with states (started, streaming, done, error)
- **Tool**: Operations with phases (start, result) including tool name and metadata

Activity kinds map to emoji glyphs:
- `exec` → 💻
- `read` → 📄
- `write` → ✍️
- `edit` → 📝
- `attach` → 📎
- default → 🛠️

## IconState Display Modes

| State | Appearance |
|-------|-----------|
| idle | Standard icon |
| workingMain | Badge with glyph, full color, animation |
| workingOther | Badge with glyph, muted color |
| overridden | Debug-selected appearance |

## Status Text Format

Active sessions display: `<Session role> · <activity label>`

Examples include `Main · exec: pnpm test` or `Other · read: apps/macos/Sources/OpenClaw/AppState.swift`

## Debug Controls

A settings override option allows forcing icon states for testing purposes, stored via app storage preferences.