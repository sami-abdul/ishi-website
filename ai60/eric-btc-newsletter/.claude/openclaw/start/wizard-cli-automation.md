# CLI Automation

## Overview

The OpenClaw documentation covers automated command-line onboarding using the `--non-interactive` flag. This enables scripted setup without interactive prompts.

## Key Concepts

**Non-Interactive Mode**: The `--non-interactive` flag automates the `openclaw onboard` command for script integration. Importantly, "the `--json` flag does not automatically enable non-interactive mode" -- you must explicitly include `--non-interactive` and `--workspace` for automated workflows.

## Baseline Example

The documentation provides a standard non-interactive setup command with Anthropic API keys, local mode configuration, and optional daemon installation.

## Secret Management Approaches

Two methods handle credentials:

1. **Plaintext mode** (`--secret-input-mode plaintext`): Keys passed directly via flags
2. **Reference mode** (`--secret-input-mode ref`): Environment variables referenced in auth profiles instead of stored values

## Provider Support

The page documents provider-specific examples for:
- Gemini
- Z.AI
- Vercel AI Gateway
- Cloudflare AI Gateway
- Moonshot
- Mistral
- Synthetic
- OpenCode
- Custom providers with `--custom-api-key` and `--custom-compatibility` flags

## Adding Multiple Agents

Use `openclaw agents add <name>` to create separate agents with isolated workspaces, sessions, and authentication profiles.

## Related Resources

The documentation references the onboarding wizard, CLI reference guide, and the `openclaw onboard` command reference for additional details.
