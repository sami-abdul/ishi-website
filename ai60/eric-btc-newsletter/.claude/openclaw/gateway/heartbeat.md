# Heartbeat

## Overview

Heartbeat is a feature that executes periodic agent turns in the main session, allowing models to surface attention-requiring items without excessive notifications.

## Key Configuration

The default interval is **30 minutes** (or 1 hour for Anthropic OAuth). Essential settings include:

- `target`: Controls message delivery ("last" for final contact, "none" for internal-only)
- `lightContext`: When enabled, uses only `HEARTBEAT.md` from bootstrap files
- `activeHours`: Restricts execution to specific time windows

## Response Behavior

The agent acknowledges completion by returning "HEARTBEAT_OK" at the message start or end. OpenClaw drops acknowledgment-only replies under 300 characters. Alert content (non-OK responses) routes normally through configured channels.

## HEARTBEAT.md File

An optional workspace checklist that the agent reads during each cycle. The documentation recommends keeping it concise, think of it as a small, stable task list rather than verbose documentation. OpenClaw skips runs if the file contains only headers and whitespace, conserving API calls.

## Delivery Control

Heartbeats respect channel-level visibility settings (`showOk`, `showAlerts`, `useIndicator`). You can suppress notifications while maintaining internal monitoring, or enable full transparency through separate reasoning messages.

## Manual Triggers

Use `openclaw system event --text "message" --mode now` to immediately trigger heartbeats across configured agents.
