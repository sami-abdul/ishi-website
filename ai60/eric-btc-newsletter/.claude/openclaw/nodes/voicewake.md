# Voice Wake Documentation

## Overview

OpenClaw implements a **centralized wake word system** managed through the Gateway, rather than supporting individual node customization. As the documentation explains, "There are **no per-node custom wake words**."

## Key Storage Details

Wake words are persisted on the gateway host at `~/.openclaw/settings/voicewake.json` with a structure containing triggers and a timestamp for updates.

## Protocol Operations

The system supports two main methods:
- `voicewake.get` retrieves the current trigger list
- `voicewake.set` updates triggers with normalization and safety limits

All WebSocket clients and connected nodes receive `voicewake.changed` event broadcasts when modifications occur.

## Platform-Specific Implementations

**macOS and iOS** both leverage the global trigger list with local enable/disable toggles. The macOS app gates voice runtime triggers, while iOS maintains responsive detection.

**Android** takes a different approach. The documentation notes that "Voice Wake is currently disabled in Android runtime/Settings," requiring manual microphone capture through the Voice tab instead.

## Implementation Note

The system enforces that "Empty lists fall back to defaults" and applies safety limits on trigger count and length.
