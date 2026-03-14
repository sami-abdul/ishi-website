# Messages

This OpenClaw documentation page explains how the platform processes inbound messages, manages sessions, handles queueing, and controls streaming behavior.

## Core Message Flow

Messages follow this path: "Inbound message -> routing/bindings -> session key -> queue (if a run is active) -> agent run (streaming + tools) -> outbound replies."

## Key Features

**Duplicate Prevention**: The system maintains a cache to prevent duplicate message processing when channels redeliver messages after reconnects.

**Message Debouncing**: Rapid consecutive text messages from the same sender can be batched into a single agent turn, with configurable delays per channel. Media and attachments bypass this debouncing and process immediately.

**Session Management**: Sessions belong to the gateway rather than individual clients. Direct chats use a main session key, while groups/channels receive their own keys. The Control UI and TUI show the authoritative gateway-backed transcript.

**History Handling**: The system distinguishes between the prompt body (what the agent receives) and command body (raw user text for directives). Group messages include sender labels for consistency between real-time and queued messages.

**Queueing Options**: Active runs can queue incoming messages using modes like interrupt, steer, followup, or collect.

**Streaming Control**: Block streaming, chunking, and human-like delays are configurable via settings like `blockStreamingDefault` and `humanDelay`, with channel-specific overrides available.

**Reasoning Visibility**: Users can control model reasoning exposure using `/reasoning on|off|stream` commands, though reasoning still counts toward token usage.
