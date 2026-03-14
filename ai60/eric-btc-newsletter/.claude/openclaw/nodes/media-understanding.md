# Media Understanding Documentation

## Core Functionality

OpenClaw's media understanding feature processes inbound images, audio, and video by converting them to text summaries before the reply pipeline executes. The system "auto-detects when local tools or provider keys are available" and can be customized or disabled entirely.

## Key Processing Flow

The system follows these steps:

1. Collects inbound media attachments
2. Selects attachments per configured policy (default: first item)
3. Chooses the first eligible model based on size and capability
4. Falls back to alternative models if the primary fails
5. Converts media to text blocks while preserving original files for the model

## Configuration Structure

Settings live under `tools.media` with support for:
- Shared model lists applicable across all media types
- Per-capability overrides (image/audio/video)
- Concurrency control (default: 2 concurrent operations)
- Attachment selection policies

## Model Support

The platform supports both provider-based and CLI-based models:

**Provider integrations:** OpenAI, Anthropic, Google, Groq, Deepgram, and Mistral

**CLI fallbacks:** whisper, whisper-cpp, sherpa-onnx, and gemini

Models can specify maximum file sizes, character limits, and timeouts. "If media exceeds `maxBytes`, that model is skipped and the **next model is tried**."

## Default Limits

- Images/videos: 500 characters (recommended)
- Audio: unlimited unless configured
- File sizes: 10MB (image), 20MB (audio), 50MB (video)

## Auto-Detection

When no models are explicitly configured, OpenClaw attempts detection in order: local CLIs, Gemini CLI, then provider keys.
