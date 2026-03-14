# OpenClaw Setup

## Core Configuration Strategy

The documentation emphasizes keeping customizations separate from the repository. Users should maintain their tailored setup in two locations: `~/.openclaw/workspace` (for skills, prompts, and memories) and `~/.openclaw/openclaw.json` (for configuration settings). This approach allows for straightforward updates without losing personal modifications.

## Installation Approaches

**Stable Workflow**: Install the macOS application, which manages the bundled Gateway automatically. Users complete onboarding, verify the Gateway is running locally, and then link communication channels like WhatsApp.

**Bleeding Edge Workflow**: Developers can run the Gateway independently using `pnpm gateway:watch` for hot-reload functionality while keeping the macOS app attached in Local mode.

## Key Prerequisites

The setup requires Node version 22 or higher and `pnpm` as the package manager. Docker is optional and only needed for containerized deployments.

## Credential Management

The documentation provides a detailed storage map for different authentication types:
- WhatsApp credentials go to `~/.openclaw/credentials/whatsapp/`
- Telegram and Discord tokens can use environment variables or configuration files
- Slack tokens are managed through configuration
- Model authentication profiles are stored in agent-specific directories

## Linux Considerations

On Linux systems using systemd, the documentation notes that user services may stop during logout. The recommendation is to enable lingering with `sudo loginctl enable-linger $USER` for continuous operation.
