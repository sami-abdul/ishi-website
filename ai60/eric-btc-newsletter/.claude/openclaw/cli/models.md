# OpenClaw Models Documentation

## Overview

The `openclaw models` command handles model discovery, scanning, and configuration tasks including setting default models, configuring fallbacks, and managing authentication profiles.

## Key Commands

The documentation outlines four primary commands:

- `openclaw models status` -- displays the resolved default and fallback models along with authentication status
- `openclaw models list` -- shows available models
- `openclaw models set <model-or-alias>` -- changes the active model
- `openclaw models scan` -- discovers models

## Status Command Features

The `models status` command provides authentication overview information. When provider usage snapshots exist, it includes OAuth/token status details. The `--probe` flag enables live authentication verification against configured providers, though this may consume tokens and trigger rate limits.

When used with `--agent <id>`, the command inspects a specific agent's model and authentication state.

## Model Reference Syntax

Model references parse by splitting on the first forward slash. For models with multiple path segments (OpenRouter-style), include the provider prefix. Without a provider specification, OpenClaw treats input as an alias or model for the default provider.

## Authentication Management

Authentication-related commands include:

- `openclaw models auth add` -- adds a new profile
- `openclaw models auth login --provider <id>` -- initiates provider-specific authentication
- `openclaw models auth setup-token` -- configures a setup-token value
- `openclaw models auth paste-token` -- accepts externally-generated tokens

The documentation notes that setup-token support requires verification of current Anthropic terms before broad implementation.
