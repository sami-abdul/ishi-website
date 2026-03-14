# Voice Overlay Documentation Summary

## Overview
This documentation describes the macOS voice overlay lifecycle, designed to manage interactions between wake-word detection and push-to-talk functionality.

## Core Design Principles

The system implements session-based token tracking to prevent stale callbacks. As stated in the documentation: *"Partial/final/send/dismiss/level updates are dropped when the token doesn't match, avoiding stale callbacks."*

## Key Features

**Adoption mechanism**: When a user activates push-to-talk while the wake-word overlay is visible, the hotkey session adopts existing text rather than resetting it.

**Auto-send behavior**: Wake-word triggers send automatically after silence detection, while push-to-talk sends immediately upon release.

## Architectural Components

The planned implementation includes:

- **VoiceSessionCoordinator**: Manages a single active voice session with token-based APIs
- **VoiceSession**: Data model holding session state, source type, text buffers, and timers
- **VoiceSessionPublisher**: SwiftUI binding that safely mirrors session state
- **Unified send path**: Consistent handling for both wake-word and push-to-talk completion

## Debugging Support

The system provides structured logging at `info` level under subsystem `ai.openclaw` with categories including `voicewake.overlay`, `voicewake.ptt`, and `voicewake.chime`. Administrators can stream logs using the provided command for troubleshooting sticky overlay issues.