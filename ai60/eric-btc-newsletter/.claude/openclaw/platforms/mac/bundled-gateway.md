# Gateway on macOS

## Overview

The OpenClaw macOS application no longer includes bundled Node/Bun or Gateway runtime. Instead, it requires an external `openclaw` CLI installation and manages Gateway operations through per-user launchd services.

## CLI Installation

Users must have Node 22+ installed, then globally install the CLI:

```bash
npm install -g openclaw@<version>
```

The app provides an "Install CLI" button that automates this process via npm or pnpm.

## LaunchAgent Configuration

**Service Details:**
- Label: `ai.openclaw.gateway` (or `ai.openclaw.<profile>`)
- Location: `~/Library/LaunchAgents/ai.openclaw.gateway.plist`
- Manager: The macOS app handles LaunchAgent setup/updates

**Operational Behavior:**
- The "OpenClaw Active" toggle enables or disables the LaunchAgent
- Closing the app does not terminate the Gateway service
- If an existing Gateway runs on the configured port, the app connects to it rather than spawning a duplicate

**Log Output:**
- Gateway logs are written to `/tmp/openclaw/openclaw-gateway.log`

## Version Management

The macOS app validates Gateway version compatibility with its own release. Users should update the global CLI when version mismatches occur.

## Verification Commands

Test the installation:

```bash
openclaw --version
```

Run a local smoke test with environment flags:

```bash
OPENCLAW_SKIP_CHANNELS=1 \
OPENCLAW_SKIP_CANVAS_HOST=1 \
openclaw gateway --port 18999 --bind loopback
```

Verify Gateway health:

```bash
openclaw gateway call health --url ws://127.0.0.1:18999 --timeout 3000
```