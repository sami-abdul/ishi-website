# OpenRouter Documentation

## Overview
OpenRouter provides a unified API that routes requests to multiple models through a single endpoint and API key, maintaining OpenAI compatibility.

## Setup Instructions

**CLI Configuration:**
```bash
openclaw onboard --auth-choice apiKey --token-provider openrouter --token "$OPENROUTER_API_KEY"
```

**Configuration File:**
```json5
{
  env: { OPENROUTER_API_KEY: "sk-or-..." },
  agents: {
    defaults: {
      model: { primary: "openrouter/anthropic/claude-sonnet-4-5" },
    },
  },
}
```

## Key Points

- Model identifiers follow the pattern `openrouter/<provider>/<model>`
- Additional model and provider information is available in the [model providers documentation](/concepts/model-providers)
- The service uses Bearer token authentication with your API key

## Additional Resources

Complete documentation is available at: https://docs.openclaw.ai/llms.txt

---

*Built with Mintlify*
