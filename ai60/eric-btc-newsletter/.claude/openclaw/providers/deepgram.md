# Deepgram Audio Transcription Documentation

## Overview

Deepgram provides speech-to-text capabilities within OpenClaw for "inbound audio/voice note transcription via `tools.media.audio`."

## Setup

**API Key Configuration:**
```
DEEPGRAM_API_KEY=dg_...
```

**Basic Provider Enable:**
```json5
{
  tools: {
    media: {
      audio: {
        enabled: true,
        models: [{ provider: "deepgram", model: "nova-3" }],
      },
    },
  },
}
```

## Configuration Options

Available settings include:
- `model`: Deepgram model identifier (defaults to `nova-3`)
- `language`: Language specification parameter
- `detect_language`: Automatic language detection toggle
- `punctuate`: Punctuation enhancement option
- `smart_format`: Formatting optimization feature

## Implementation Examples

**With language specification:**
```json5
{
  tools: {
    media: {
      audio: {
        enabled: true,
        models: [{ provider: "deepgram", model: "nova-3", language: "en" }],
      },
    },
  },
}
```

**With advanced options:**
```json5
{
  tools: {
    media: {
      audio: {
        enabled: true,
        providerOptions: {
          deepgram: {
            detect_language: true,
            punctuate: true,
            smart_format: true,
          },
        },
        models: [{ provider: "deepgram", model: "nova-3" }],
      },
    },
  },
}
```

## Key Notes

- Transcription uses pre-recorded audio endpoints (non-streaming)
- Transcripts inject into reply pipeline via `{{Transcript}}` and `[Audio]` block
- Standard authentication order applies; proxy configuration uses `baseUrl` and `headers`
