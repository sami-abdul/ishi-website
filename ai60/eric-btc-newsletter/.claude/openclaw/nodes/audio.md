# Audio and Voice Notes Documentation

## Overview
OpenClaw supports audio transcription with multiple provider and CLI options. The system can auto-detect available tools or use explicitly configured models.

## Key Capabilities

**Transcription workflow:** The system locates audio attachments, enforces size limits, attempts transcription through configured models in order, and replaces the message body with an `[Audio]` block while setting `{{Transcript}}`.

**Command parsing:** Once transcribed, slash commands work normally since `CommandBody`/`RawBody` are updated with transcript content.

## Auto-Detection (Default Behavior)

Without explicit configuration, OpenClaw attempts transcription using:
1. Local CLI tools (sherpa-onnx-offline, whisper-cli, whisper)
2. Gemini CLI with file reading
3. Provider keys in priority order (OpenAI, Groq, Deepgram, Google)

Set `tools.media.audio.enabled: false` to disable this behavior.

## Configuration Options

**Essential settings:**
- `maxBytes`: Default 20MB size limit
- `echoTranscript`: Optional confirmation message (default: false)
- `maxChars`: Transcript length trimming
- `scope`: Grant/deny rules by chat type

**Supported providers:** OpenAI, Deepgram, Mistral, and others via CLI tools.

## Group Chat Mention Detection

Voice notes trigger "preflight" transcription in groups requiring mentions, allowing audio content to satisfy mention requirements. Disable per-group with `disableAudioPreflight: true`.

## Important Constraints

- Audio under 1KB is skipped
- CLI output capped at 5MB
- Default timeout: 60 seconds
- OpenAI default model: `gpt-4o-mini-transcribe`
- Transcript available as `{{Transcript}}` template variable
