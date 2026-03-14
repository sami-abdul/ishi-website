# Voice Wake & Push-to-Talk Documentation

## Overview

This page documents the Voice Wake feature, which enables hands-free voice interaction through trigger words or manual push-to-talk activation.

## Core Modes

The system operates in two configurations:

1. **Wake-word mode** (default): A continuously-listening recognizer activates upon detecting specified trigger tokens, automatically capturing and transcribing speech until silence is detected.

2. **Push-to-talk**: Users hold the right Option key to manually initiate capture without requiring a trigger word.

## Wake-Word Behavior

The speech recognizer requires "a **meaningful pause** between the wake word and the next word (~0.55s gap)" to register activation. Silence detection uses two windows: 2.0 seconds during active speech, or 5.0 seconds if only the trigger was heard. A hard 120-second limit prevents extended sessions, with a 350-millisecond debounce between consecutive activations.

## Key Technical Components

- `VoiceWakeRuntime` manages the recognizer lifecycle
- `VoiceWakeOverlayController` handles visual feedback
- `VoicePushToTalk` controls manual capture
- `VoiceSessionCoordinator` coordinates restart operations

## Overlay and Reliability

The system ensures the recognizer continues listening even when the overlay is manually dismissed. Manual overlay closure triggers a refresh operation that resumes listening, addressing previous "sticky overlay" failure scenarios.

## Push-to-Talk Implementation

Hotkey detection monitors for the right Option key (`keyCode 61`). When activated, the wake-word runtime automatically pauses to prevent audio conflicts and resumes after release.

## User Configuration

Available settings include Voice Wake toggle, push-to-talk enablement, language/microphone selection, audio level monitoring, and customizable notification sounds (defaults to macOS "Glass" sound).

## Message Forwarding

"Transcripts are forwarded to the active gateway/agent" using the same local or remote mode as the main application, with delivery to the last-selected provider (WhatsApp, Telegram, Discord, or WebChat).