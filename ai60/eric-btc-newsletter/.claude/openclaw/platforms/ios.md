# iOS App Documentation Summary

## Overview
The iOS app is currently in internal preview and connects to a Gateway via WebSocket to expose node capabilities including canvas rendering, screen snapshots, camera access, location services, and voice features.

## Key Requirements
The system needs "a Gateway running on another device (macOS, Linux, or Windows via WSL2)" with network connectivity through LAN via Bonjour, a Tailnet with DNS-SD, or manual host/port configuration.

## Setup Process
Users must start the Gateway on port 18789, discover it in iOS settings, approve pairing through command-line tools, and verify connection status using provided CLI commands.

## Discovery Methods
- **Bonjour**: Automatic LAN discovery via `_openclaw-gw._tcp`
- **Tailnet**: Cross-network access using unicast DNS-SD with Tailscale split DNS
- **Manual**: Direct host and port entry in Settings

## Canvas Functionality
The iOS app renders content through WKWebView. The Gateway serves canvas and A2UI interfaces at `/__openclaw__/canvas/` and `/__openclaw__/a2ui/`, allowing JavaScript evaluation and snapshot capture via `node.invoke` commands.

## Limitations
The documentation notes that "iOS may suspend background audio; treat voice features as best-effort when the app is not active." Several common errors relate to app state, configuration, and pairing tokens.