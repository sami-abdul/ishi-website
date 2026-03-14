# Models CLI Documentation Summary

## Key Concepts

OpenClaw's model selection follows a hierarchical approach: **primary model** -> **fallbacks** -> **provider auth failover**. The system maintains an allowlist through `agents.defaults.models` that restricts available options.

## Configuration Overview

The documentation outlines several critical settings:

- Primary and fallback model definitions
- Image model specifications (used when primary can't process images)
- Model allowlist/catalog management
- Custom provider configuration

## Usage Commands

Users can switch models interactively via `/model` commands in chat or manage them through CLI tools like `openclaw models list`, `models status`, and `models set`. The system supports aliases, fallback chains, and separate image model handling.

## Important Restrictions

When `agents.defaults.models` is configured as an allowlist, attempting to use unlisted models returns: "Model 'provider/model' is not allowed. Use /model to list available models." This occurs before response generation.

## Advanced Features

The documentation includes scanning capabilities for OpenRouter's free models, OAuth expiry monitoring, and a models registry (`models.json`) that manages custom providers with precedence rules for API keys and endpoints.
