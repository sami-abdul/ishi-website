# Personal Assistant Setup with OpenClaw

## Overview
OpenClaw functions as a WhatsApp, Telegram, Discord, and iMessage gateway for Pi agents, with optional Mattermost support. This guide covers setting up a dedicated personal assistant on a secondary phone number.

## Critical Safety Considerations
The documentation emphasizes security risks: "You're putting an agent in a position to run commands on your machine (depending on your Pi tool setup) [and] read/write files in your workspace." Users should:

- Restrict access via `channels.whatsapp.allowFrom`
- Use a dedicated phone number for the assistant
- Disable heartbeats initially by setting the interval to "0m"

## Recommended Two-Phone Architecture
The setup involves three components: your personal phone messaging a dedicated assistant phone, which connects via QR code to your Mac running the Pi agent. This prevents every incoming message from triggering agent processing.

## Quick Setup Process
1. Authenticate WhatsApp through `openclaw channels login`
2. Launch the gateway with `openclaw gateway --port 18789`
3. Configure minimal settings in `~/.openclaw/openclaw.json` specifying allowed phone numbers

## Workspace and Configuration
The agent reads instructions from `~/.openclaw/workspace`, which contains files like `AGENTS.md`, `SOUL.md`, and `MEMORY.md`. The documentation suggests treating this directory as version-controlled backup storage. Configuration supports customization of model selection, thinking modes, session handling, and heartbeat intervals.

## Session Management Features
Sessions reset via `/new` or `/reset` commands, with configurable daily reset schedules. The `/compact` command optimizes context usage, while heartbeats enable proactive agent behavior when configured.

## Operational Tools
Status monitoring uses commands like `openclaw status` and `openclaw health --json`, with logs stored in `/tmp/openclaw/`.
