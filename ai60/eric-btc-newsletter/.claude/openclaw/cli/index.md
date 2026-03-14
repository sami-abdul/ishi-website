# CLI Reference - OpenClaw Documentation

## Overview

OpenClaw provides an extensive command-line interface for managing agents, channels, models, and gateway services. The CLI supports both interactive wizards and non-interactive scripting modes.

## Key Command Categories

**Setup & Configuration:**
Commands like `setup`, `onboard`, and `configure` initialize workspaces and credentials. The `config` command enables non-interactive get/set/unset operations for configuration values.

**Channel Management:**
The `channels` command handles WhatsApp, Telegram, Discord, Slack, and other platforms. Users can add accounts, check status, and manage authentication across multiple channels.

**Agent Operations:**
"Manage isolated agents (workspaces + auth + routing)" through the `agents` command, supporting listing, adding, deleting, and binding agents to specific channels.

**Model Management:**
The `models` command surfaces auth profiles, fallback chains, and provider usage tracking. It supports scanning for available models and managing API keys across multiple providers.

**Gateway Control:**
The `gateway` command runs the WebSocket server, while `gateway install|uninstall|start|stop|restart` manage it as a system service on launchd, systemd, or Windows.

## Output & Styling

The CLI renders ANSI colors in TTY sessions and supports OSC-8 hyperlinks in compatible terminals. The "lobster palette" uses accent orange (#FF5A2D), success green (#2FBF71), and error red (#E23D2D) for visual feedback.

## Global Flags

`--dev` isolates state under `~/.openclaw-dev`, while `--profile <name>` creates profile-specific directories. The `--no-color` flag disables styling, and `-V` prints the version.
