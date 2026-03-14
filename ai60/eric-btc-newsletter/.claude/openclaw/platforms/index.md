# Platforms Documentation Summary

## Core Information
OpenClaw is primarily built in TypeScript with Node.js as the recommended runtime. The documentation emphasizes that "Bun is not recommended for the Gateway (WhatsApp/Telegram bugs)."

## Available Platforms
The page outlines installation options across multiple operating systems:

**Desktop & Mobile:** macOS (menu bar app), iOS, and Android have companion applications. Windows and Linux companion apps are in development, though the Gateway functions fully on these systems today via WSL2.

**Hosting Options:** The documentation provides guides for VPS deployment across multiple providers including Fly.io, Hetzner, GCP, and exe.dev.

## Gateway Installation
Users can install the gateway service through several methods: the onboard wizard (recommended), direct installation, configuration flow, or repair utilities. The service integrates differently depending on the OS—as a LaunchAgent on macOS and as a systemd user service on Linux/WSL2 systems.

## Key Resources
The page references several important links including getting started guides, gateway configuration documentation, and a status command accessible via `openclaw gateway status`.