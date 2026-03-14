# OpenClaw Onboarding Overview

OpenClaw provides flexible setup options for users depending on their operating system and configuration preferences.

## Available Onboarding Paths

The platform supports two primary onboarding approaches:

1. **CLI wizard**: Available across macOS, Linux, and Windows (via WSL2), offering command-line based setup
2. **macOS app**: Provides a guided graphical interface for Apple silicon and Intel Macs

## CLI Wizard Setup

Users can initiate the CLI wizard by running:

```bash
openclaw onboard
```

"Use the CLI wizard when you want full control of the Gateway, workspace, channels, and skills."

Related resources include the Onboarding Wizard (CLI) guide and the `openclaw onboard` command documentation.

## macOS Application Setup

The native macOS app delivers an entirely guided setup experience for macOS users.

## Custom Provider Configuration

For endpoints not included in standard offerings, users can select the Custom Provider option within the CLI wizard. This option supports:

- OpenAI-compatible, Anthropic-compatible, or auto-detect configurations
- Custom base URLs and API keys
- Model IDs with optional aliases
- Multiple simultaneous custom endpoints through unique Endpoint IDs

The detailed implementation guide is available in the CLI onboarding documentation.
