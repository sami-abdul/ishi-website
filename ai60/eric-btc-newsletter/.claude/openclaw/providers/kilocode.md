# Kilocode - Kilo Gateway Documentation

## Overview

Kilo Gateway provides a "unified API that routes requests to many models behind a single endpoint and API key." It maintains OpenAI compatibility, allowing most OpenAI SDKs to function with a base URL switch.

## API Key Setup

Users need to:
1. Visit [app.kilo.ai](https://app.kilo.ai)
2. Create an account or sign in
3. Generate a new key in the API Keys section

## Configuration Methods

**CLI setup:**
```bash
openclaw onboard --kilocode-api-key <key>
```

**Environment variable:**
```bash
export KILOCODE_API_KEY="<your-kilocode-api-key>"
```

**Configuration file (JSON5):**
```json5
{
  env: { KILOCODE_API_KEY: "<your-kilocode-api-key>" },
  agents: {
    defaults: {
      model: { primary: "kilocode/kilo/auto" },
    },
  },
}
```

## Default and Available Models

The default model is `kilocode/kilo/auto`, which intelligently routes tasks—directing planning and debugging work to Claude Opus while handling code writing with Claude Sonnet.

Available models include:
- `kilocode/kilo/auto` (default intelligent routing)
- `kilocode/anthropic/claude-sonnet-4`
- `kilocode/openai/gpt-5.2`
- `kilocode/google/gemini-3-pro-preview`

Users can view complete available models using `/models kilocode`.

## Technical Details

- Model references use the format: `kilocode/<model-id>`
- Base URL: `https://api.kilo.ai/api/gateway/`
- Authentication uses Bearer tokens
- See [/concepts/model-providers](/concepts/model-providers) for additional options

---

**Resource:** Complete documentation available at https://docs.openclaw.ai/llms.txt
