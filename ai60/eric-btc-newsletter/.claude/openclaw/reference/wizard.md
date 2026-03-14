# Onboarding Wizard Reference

This documentation provides a comprehensive guide to the `openclaw onboard` CLI wizard, which sets up the OpenClaw agent system.

## Key Workflow Steps

The wizard progresses through nine main phases:

1. **Existing config detection** -- Checks for existing configuration and offers options to keep, modify, or reset settings
2. **Model/Auth** -- Configures authentication with providers like Anthropic, OpenAI, xAI, and others
3. **Workspace** -- Sets up the default workspace at `~/.openclaw/workspace`
4. **Gateway** -- Configures port, binding, and authentication mode
5. **Channels** -- Enables communication integrations (WhatsApp, Telegram, Discord, etc.)
6. **Web search** -- Selects a search provider (Perplexity, Brave, Gemini, etc.)
7. **Daemon install** -- Installs LaunchAgent (macOS) or systemd (Linux/Windows)
8. **Health check** -- Validates the Gateway installation
9. **Skills** -- Installs optional dependencies and selects a node manager
10. **Finish** -- Provides summary and next steps

## Automation Options

The wizard supports non-interactive scripting via `--non-interactive` flag with environment variables, allowing automated deployment across environments.

## Configuration Storage

The wizard writes settings to `~/.openclaw/openclaw.json`, with credentials stored separately in `~/.openclaw/credentials/` directories by channel type.