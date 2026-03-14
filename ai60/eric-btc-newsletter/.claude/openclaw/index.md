# OpenClaw Documentation

## What is OpenClaw?

OpenClaw is a self-hosted gateway connecting messaging platforms like WhatsApp, Telegram, Discord, and iMessage to AI coding agents. The project emphasizes user control through self-hosting and open-source development under an MIT license.

## Core Features

The platform supports multiple channels simultaneously through a single gateway process. Key capabilities include:

- Multi-channel messaging integration
- Plugin-based channel expansion (Mattermost support available)
- Multi-agent routing with isolated sessions
- Media handling for images, audio, and documents
- Browser-based control dashboard
- Mobile node pairing for iOS and Android devices

## Getting Started

Installation requires Node 22+ and involves three basic steps:

1. Install via npm: `npm install -g openclaw@latest`
2. Run onboarding: `openclaw onboard --install-daemon`
3. Launch the gateway: `openclaw gateway --port 18789`

The Control UI dashboard becomes accessible at `http://127.0.0.1:18789/` after startup.

## Configuration

The system uses sensible defaults but allows customization through `~/.openclaw/openclaw.json`. Users can restrict access by phone number and configure group chat mention requirements.

## Documentation Resources

The documentation provides guidance across several areas: channel setup, node configuration, security practices, troubleshooting, multi-agent routing, and remote access patterns. A complete documentation index is available at the project's docs site.