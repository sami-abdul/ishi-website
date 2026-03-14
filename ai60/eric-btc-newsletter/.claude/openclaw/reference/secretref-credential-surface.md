# SecretRef Credential Surface

## Overview

This documentation defines OpenClaw's canonical SecretRef credential surface, which handles "strictly user-supplied credentials that OpenClaw does not mint or rotate."

## Supported Credentials

The system supports credential management across two main configuration targets:

**`openclaw.json` targets** include API keys and tokens for:
- Model providers and skills
- Communication channels (Telegram, Slack, Discord, IRC, Matrix, etc.)
- Web tools (search, fetch via Firecrawl)
- Text-to-speech services (ElevenLabs, OpenAI)
- Gateway authentication
- Cron webhooks

**`auth-profiles.json` targets** support:
- API key references (`keyRef`)
- Token references (`tokenRef`)

Key implementation notes indicate that "Auth-profile plan targets require `agentId`" and that "SecretRef-managed model providers" maintain non-secret markers in generated configuration files rather than resolved values.

## Out-of-Scope Credentials

The system explicitly excludes credentials that are "minted, rotated, session-bearing, or OAuth-durable classes," including:
- OAuth refresh material
- Session-like artifacts
- Runtime-rotated tokens
- Gmail push tokens
- WhatsApp credentials

This scope distinction ensures the surface handles only static, user-managed secrets suitable for external resolution.