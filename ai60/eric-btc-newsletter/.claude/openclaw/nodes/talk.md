# Talk Mode Documentation

## Overview

Talk mode enables continuous voice conversations through a cycle of listening, transcription, model processing, and text-to-speech playback.

## Core Functionality

The system operates as a loop: "**Listen for speech -> Send transcript to model -> Wait for response -> Speak via ElevenLabs**"

On macOS, an always-on overlay displays state transitions (Listening -> Thinking -> Speaking). When users pause briefly, the transcript automatically sends. Replies appear in WebChat, and speech interruption is enabled by default, stopping playback when the user speaks while the assistant responds.

## Voice Control

Responses can include a JSON directive on the first line to customize voice parameters:

```json
{ "voice": "<voice-id>", "once": true }
```

The `once` flag applies settings to that reply only; without it, settings become the new default. Supported parameters include voice ID, model, speed, stability, language, and output format.

## Configuration

Settings live in `~/.openclaw/openclaw.json` under the `talk` section, specifying ElevenLabs voice ID, model version, output format, API key, and silence timeout (default 700-900ms depending on platform).

## Platform Details

macOS includes menu bar toggle and config tab controls. The overlay shows mic levels while listening, a sinking animation while thinking, and radiating rings while speaking. Users can click the cloud to stop speaking or the X to exit mode.

## Technical Requirements

The feature requires Speech and Microphone permissions and uses the ElevenLabs streaming API with the `chat.send` method on the main session for lower-latency playback.
