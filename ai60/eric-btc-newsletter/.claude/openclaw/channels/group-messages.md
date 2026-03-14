# Group Messages Documentation

## Overview
This documentation covers WhatsApp group chat functionality for Clawd, an AI agent that can be added to WhatsApp groups and activated through mentions or configured to respond continuously.

## Key Features

**Activation Modes**: The agent can operate in two modes—`mention` (default, requires direct pings) or `always` (responds to every message but uses `NO_REPLY` when adding no value).

**Session Isolation**: Group conversations maintain separate session states from direct messages, with keys formatted as `agent:<agentId>:whatsapp:group:<jid>`. Commands like `/verbose on` apply only to the specific group.

**Context Management**: The system provides "pending-only group messages (default 50)" as context for the agent, separated from the triggering message with clear formatting markers and sender attribution.

**Access Control**: Group policy settings determine acceptance levels (`open|disabled|allowlist`), with an allowlist serving as the default protective mechanism.

## Configuration
Users can configure mention patterns using regex (case-insensitive), set group-wide or per-agent activation defaults, and establish sender allowlists through `openclaw.json`.

## Usage Pattern
Members mention the bot using `@openclaw` or its phone number; only allowlisted senders trigger responses unless open policy is enabled. Commands sent as standalone messages apply only to that group's session.
