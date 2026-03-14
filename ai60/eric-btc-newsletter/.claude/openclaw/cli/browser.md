# OpenClaw Browser Documentation

## Overview
The `openclaw browser` command manages OpenClaw's browser control server, enabling control over tabs, snapshots, screenshots, navigation, clicks, and typing actions.

## Key Features

**Common Command Flags:**
- `--url <gatewayWsUrl>`: Specifies Gateway WebSocket URL
- `--token <token>`: Authentication token if needed
- `--timeout <ms>`: Request timeout setting
- `--browser-profile <name>`: Selects a browser profile
- `--json`: Returns machine-readable output

## Browser Profiles

Two main profile types exist:
- **openclaw**: Launches a dedicated, isolated Chrome instance managed by OpenClaw
- **chrome**: Controls existing Chrome tabs via the Chrome extension relay

Profile management commands include creating, deleting, and listing profiles with custom colors.

## Core Actions

Users can perform these operations:
- View and manage tabs
- Open URLs and focus specific tabs
- Capture snapshots and screenshots
- Navigate pages, click elements, and type text using reference-based automation

## Chrome Extension Integration

The extension allows manual attachment to existing Chrome tabs without auto-attachment. Installation requires loading the unpacked extension through Chrome's developer mode at `chrome://extensions`.

## Remote Setup

For distributed environments, a node host running on the machine with Chrome/Brave/Edge/Chromium enables the Gateway to proxy browser actions remotely without requiring a separate browser control server.

**Related Resources:**
- Browser tool and API documentation
- Chrome extension guide
- Remote access and security configuration
