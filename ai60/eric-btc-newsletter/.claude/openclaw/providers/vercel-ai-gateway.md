# Vercel AI Gateway Documentation

## Overview

The Vercel AI Gateway offers "a unified API to access hundreds of models through a single endpoint." It uses the provider identifier `vercel-ai-gateway` and requires authentication via `AI_GATEWAY_API_KEY`. The service maintains compatibility with Anthropic Messages API standards.

## Key Features

**Auto-discovery capability**: OpenClaw automatically discovers available models through the Gateway's `/v1/models` catalog, enabling references like `vercel-ai-gateway/openai/gpt-5.4`.

## Setup Instructions

**Authentication**: Users can establish credentials using:
```
openclaw onboard --auth-choice ai-gateway-api-key
```

**Configuration**: Set a default model in your configuration:
```json5
{
  agents: {
    defaults: {
      model: { primary: "vercel-ai-gateway/anthropic/claude-opus-4.6" },
    },
  },
}
```

**Non-interactive setup**:
```bash
openclaw onboard --non-interactive \
  --mode local \
  --auth-choice ai-gateway-api-key \
  --ai-gateway-api-key "$AI_GATEWAY_API_KEY"
```

## Environment Configuration

When running the Gateway as a daemon (launchd/systemd), ensure the `AI_GATEWAY_API_KEY` is accessible to that process—typically through `~/.openclaw/.env` or equivalent environment variables.

## Model Reference Shortcuts

OpenClaw normalizes Vercel Claude model references at runtime:
- `vercel-ai-gateway/claude-opus-4.6` → `vercel-ai-gateway/anthropic/claude-opus-4.6`
- `vercel-ai-gateway/opus-4.6` → `vercel-ai-gateway/anthropic/claude-opus-4-6`
