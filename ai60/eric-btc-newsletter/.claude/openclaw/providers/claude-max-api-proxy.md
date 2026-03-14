# Claude Max API Proxy Documentation

## Overview
This community tool creates an OpenAI-compatible API endpoint using your Claude Max/Pro subscription, enabling compatibility with tools supporting the OpenAI format.

## Key Warning
"This path is technical compatibility only. Anthropic has blocked some subscription usage outside Claude Code in the past." Users must verify current terms before implementation.

## Cost Comparison
The proxy targets personal workflows where a $200/month subscription may be economical compared to per-token pricing (~$15/M input, $75/M output for Opus).

## Architecture
The system converts OpenAI-formatted requests into Claude Code CLI commands, processing them through your authenticated subscription rather than official API endpoints.

## Setup Requirements
- Node.js 20 or higher
- Claude Code CLI with authentication
- Installation via `npm install -g claude-max-api-proxy`

## Server Operation
The proxy listens at `http://localhost:3456` and supports:
- Health checks
- Model listing
- Chat completions with streaming

## Supported Models
- claude-opus-4
- claude-sonnet-4
- claude-haiku-4

## Integration Options
Can configure with OpenClaw by setting `OPENAI_BASE_URL` to the local proxy endpoint.

## macOS Auto-Start
LaunchAgent configuration provided for automatic startup on system boot.

## Important Notes
- Community-maintained, unsupported by Anthropic
- Processes data locally without external transmission
- Requires active subscription with authenticated CLI
