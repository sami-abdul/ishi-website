# Retry Policy Documentation

## Overview
The retry policy documentation outlines how OpenClaw handles failed HTTP requests across different messaging providers.

## Key Goals
The system implements these principles:
- "Retry per HTTP request, not per multi-step flow"
- Maintains sequence integrity by retrying only the current operation
- Prevents duplication of non-idempotent actions

## Default Settings
Standard configuration applies across providers:
- **Attempts**: 3 retries maximum
- **Max delay cap**: 30 seconds
- **Jitter**: 10%
- Provider-specific minimums: Telegram (400ms), Discord (500ms)

## Provider-Specific Behavior

**Discord** retries exclusively on rate-limiting errors (HTTP 429), leveraging Discord's built-in retry timing when supplied.

**Telegram** covers a broader range of transient failures including rate limits, timeouts, and connection issues. Markdown parsing failures don't trigger retries; the system defaults to plaintext instead.

## Configuration
Users can customize retry behavior in `~/.openclaw/openclaw.json` with separate settings for Telegram and Discord channels, adjusting attempts, delay parameters, and jitter levels.

## Important Notes
Retries apply granularly to individual actions (messages, media, reactions). Multi-step workflows skip already-completed steps during retry sequences.
