# macOS App Documentation Summary

## Overview
The OpenClaw macOS app functions as a "menu-bar companion" that manages permissions, connects to the Gateway, and exposes macOS-specific capabilities to agents.

## Core Functionality
The application handles native notifications, TCC permission prompts, Gateway connections, and macOS-exclusive tools including Canvas, Camera, and Screen Recording features.

## Operating Modes

**Local Mode (Default):** Attaches to an existing local Gateway or enables the launchd service automatically.

**Remote Mode:** Connects to a Gateway via SSH/Tailscale without spawning local processes, while starting a node host service for remote access.

## Key Features

- **Launchd Management:** Controls LaunchAgent labeled `ai.openclaw.gateway` with profile support
- **Node Capabilities:** Exposes canvas, camera, screen recording, and system commands
- **Exec Approvals:** Manages `system.run` permissions through `~/.openclaw/exec-approvals.json`
- **Deep Links:** Supports `openclaw://` URL scheme for triggering agent requests with optional unattended mode

## Security Considerations

The documentation emphasizes avoiding cloud-synced state directories (iCloud, CloudStorage) due to potential latency and file-lock issues. Preferred storage uses local paths like `~/.openclaw`.

Command execution includes filtering of environment variables and requires explicit approval or allowlisting for shell commands containing control syntax.

## Development & Debugging
The app includes CLI tools for testing Gateway connectivity without launching the full application, useful for troubleshooting connection issues.