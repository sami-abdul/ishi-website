# Anthropic (Claude) Integration Guide

## Authentication Options

OpenClaw supports two primary authentication methods for Anthropic's Claude models:

**API Key Authentication** is recommended for standard API access with usage-based billing. Users generate keys through the Anthropic Console and configure them via CLI or JSON config.

**Setup-Token Authentication** works best for Claude subscription users. These tokens are created using the Claude Code CLI with the command `claude setup-token`, then pasted into OpenClaw during onboarding.

## Key Features

### Adaptive Thinking (Claude 4.6)
Claude 4.6 models default to "adaptive" thinking mode in OpenClaw unless explicitly overridden per-message or through model parameters.

### Prompt Caching
The platform supports Anthropic's prompt caching exclusively for API key authentication. Cache retention options include:
- `short`: 5-minute duration (default for API key auth)
- `long`: 1-hour duration (requires beta flag)
- `none`: Disables caching

Configuration occurs via the `cacheRetention` parameter, with merge priority given to agent-specific settings over default model settings.

### Extended Context Window
The 1M context window feature requires enabling `params.context1m: true` in model configuration. This activation maps to Anthropic's beta feature and necessitates proper credential permissions, or users encounter rate-limit errors.

## Common Issues

Configuration problems typically stem from authentication scope: "Auth is per agent" and new agents don't automatically inherit credentials. Token expiration affects Claude subscription auth, requiring re-authentication through setup-token regeneration.
