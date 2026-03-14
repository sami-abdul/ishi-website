# LiteLLM Integration with OpenClaw

## Overview

LiteLLM is an open-source gateway providing "a unified API to 100+ model providers." It enables OpenClaw users to centralize operations across multiple AI services through a single interface.

## Key Benefits

The documentation highlights several advantages:

- **Cost visibility** — Track spending across all models in one place
- **Provider flexibility** — Switch between Claude, GPT-4, Gemini, and Bedrock without reconfiguring OpenClaw
- **Spend controls** — Create API keys with budget limits
- **Request tracking** — Access comprehensive logs for troubleshooting
- **Reliability** — Automatic failover mechanisms if primary providers experience outages

## Setup Methods

Users can onboard via the CLI or manually configure by installing the LiteLLM proxy, setting the `LITELLM_API_KEY` environment variable, and running OpenClaw.

## Configuration Options

The system supports both environment variable setup and JSON configuration files. Users can define multiple models with specifications including context windows, maximum tokens, and input capabilities (text/image).

## Advanced Features

The documentation describes virtual key generation with monthly budget caps, model routing across different backends, and usage monitoring through API endpoints and dashboards.

## Technical Details

LiteLLM operates on port 4000 locally and uses OpenAI-compatible endpoints, ensuring full compatibility with OpenClaw's existing feature set without degradation.
