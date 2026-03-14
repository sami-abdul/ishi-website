# Usage Tracking Documentation

## Overview

This documentation page explains OpenClaw's usage tracking system, which retrieves provider usage and quota information directly from their endpoints rather than providing estimates.

## Key Features

The system displays usage information in several contexts:

- **Chat `/status` command**: Shows a formatted status card including session tokens, estimated costs, and current model provider usage (with API key credentials)
- **Chat `/usage` commands**: Offers three options: `off|tokens|full` for per-response footers (OAuth shows tokens only), or `cost` for local summaries from session logs
- **CLI tools**: The `openclaw status --usage` command provides comprehensive per-provider breakdowns, while `openclaw channels list` displays usage alongside provider configuration
- **macOS integration**: A "Usage" section appears in the Context menu bar when available

## Supported Providers

The tracking system works with several providers when proper credentials are configured:

- Anthropic (Claude) via OAuth tokens
- GitHub Copilot via OAuth tokens
- Gemini CLI via OAuth tokens
- Antigravity via OAuth tokens
- OpenAI Codex via OAuth tokens (utilizing accountId when present)
- MiniMax via API key with 5-hour coding plan window
- z.ai via API key through environment variables or config

Usage information remains hidden when matching credentials are unavailable.
