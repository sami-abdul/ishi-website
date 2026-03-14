# Browser (OpenClaw-managed) Documentation

## Overview

OpenClaw provides a dedicated, isolated Chrome/Brave/Edge/Chromium browser profile controlled by agents. This separate browser maintains complete isolation from your personal browser profile through a local control service accessible only via loopback.

## Core Features

The system offers "deterministic tab control" with capabilities including tab management, agent-driven actions, snapshots, and screenshots. The default `openclaw` profile runs as an isolated managed browser, while the `chrome` profile uses system browser integration via extension relay.

## Quick Start

Basic commands include:
- Status check: `openclaw browser --browser-profile openclaw status`
- Start browser: `openclaw browser --browser-profile openclaw start`
- Navigate: `openclaw browser --browser-profile openclaw open https://example.com`
- Capture: `openclaw browser --browser-profile openclaw snapshot`

## Profile Types

Two main profiles exist:

**openclaw**: "managed, isolated browser (no extension required)"

**chrome**: "extension relay to your **system browser** (requires the OpenClaw extension to be attached to a tab)"

The default profile can be configured via `browser.defaultProfile` setting.

## Configuration

Settings live in `~/.openclaw/openclaw.json` and include options for enabling/disabling the browser, SSRF policies, remote CDP timeouts, executable paths, and multi-profile setup. Control service binds to loopback with derived ports from the gateway configuration.

## Remote Browser Control

OpenClaw supports three control modes:

1. **Local control**: Gateway launches browser locally
2. **Node browser proxy**: Node host on browser machine proxies to gateway
3. **Remote CDP**: Direct connection to remote Chromium via CDP URL

Hosted services like Browserless and Browserbase are supported through their respective CDP endpoints.

## Security Considerations

Browser control remains loopback-only, with access managed through gateway authentication or node pairing. The system includes SSRF protection for navigation, and supports strict hostname allowlisting. Remote CDP URLs and tokens should be treated as secrets and managed via environment variables rather than config files.

## Control API

The gateway exposes HTTP endpoints for local integrations covering tabs, snapshots, screenshots, actions, state management (cookies/storage), and debugging features. All endpoints require authentication when gateway auth is configured.

## Browser Selection & Customization

OpenClaw auto-detects available Chromium-based browsers in order: Chrome → Brave → Edge → Chromium → Chrome Canary. Override detection using `browser.executablePath` with platform-specific paths for macOS, Windows, or Linux installations.

## Snapshot & Ref System

Two snapshot styles exist:

- **AI snapshots**: "numeric refs" enabling actions like `openclaw browser click 12`
- **Role snapshots**: "role refs like `e12`" providing "a role-based list/tree"

Refs remain unstable across navigation, requiring fresh snapshots after page changes.

## CLI Reference

Common commands span basics (status, start, tabs, open, focus), inspection (screenshot, snapshot, console, errors, requests, pdf), actions (navigate, click, type, hover, drag, select, download, upload, wait), and state management (cookies, storage, offline mode, headers, geolocation, timezone, device emulation).

## Advanced Features

The browser supports JavaScript evaluation, network tracing, file downloads/uploads, dialog handling, and comprehensive debugging workflows. State manipulation enables testing scenarios like offline mode, custom headers, authentication, and device emulation.
