# Text-to-Speech

## Overview
OpenClaw converts outbound replies to audio using ElevenLabs, OpenAI, or Edge TTS, with support for platforms like Telegram that display voice-note bubbles.

## Supported Providers

**Three TTS services available:**
- ElevenLabs (primary or fallback)
- OpenAI (primary or fallback; also handles summaries)
- Edge TTS (Microsoft's neural service via `node-edge-tts`, requires no API key)

Edge TTS operates as a public web service without published SLAs. Microsoft's Speech REST API documents a "10-minute audio limit per request" though Edge doesn't publish specific limits.

## Configuration Requirements

**Optional API keys:**
- `ELEVENLABS_API_KEY` or `XI_API_KEY`
- `OPENAI_API_KEY`

Edge TTS needs no credentials. When multiple providers are configured, the selected one runs first with others as fallbacks. Auto-summary requires authentication for the configured summary model.

## Default Behavior

Auto-TTS is **disabled by default**. Enable via `messages.tts.auto` in configuration or `/tts always` per session. Edge TTS activates automatically once TTS is enabled and no other API keys exist.

## Key Features

**Model-driven overrides** allow the AI to emit `[[tts:...]]` directives controlling voice, speed, and other parameters per reply. Providers can emit `[[tts:text]]...[[/tts:text]]` blocks for expressive markup (laughter, singing cues) appearing only in audio.

**Per-user preferences** store local overrides at `~/.openclaw/settings/tts.json`, including enabled status, provider choice, and summary settings.

**Slash commands** (`/tts off|always|inbound|tagged|status|provider|limit|summary|audio`) manage TTS behavior per session.

## Output Formats

- **Telegram**: Opus voice notes (48kHz/64kbps)
- **Other channels**: MP3 (44.1kHz/128kbps)
- **Edge TTS**: Configurable via `edge.outputFormat`

## Flow Logic

Replies skip TTS if they contain media, `MEDIA:` directives, or are very short (<10 characters). Long replies trigger summarization when enabled before audio generation.