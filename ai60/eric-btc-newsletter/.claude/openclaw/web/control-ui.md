# Control UI (Browser)

## Overview

The Control UI is described as "a small **Vite + Lit** single-page app served by the Gateway" accessible at `http://<host>:18789/` by default. It communicates directly with the Gateway WebSocket on the same port.

## Key Features

The interface supports:
- Real-time chat with model streaming and tool call execution
- Channel management (WhatsApp, Telegram, Discord, Slack, and plugins)
- Instance monitoring and session management
- Cron job scheduling with multiple delivery modes
- Skills administration and configuration
- System debugging and log tailing
- Package updates with restart capability

## Access & Authentication

**Local access** is simplified: `http://127.0.0.1:18789/` requires no additional setup. Remote connections demand "a **one-time pairing approval**" even on trusted networks as a security measure.

Authentication flows through WebSocket handshake parameters using tokens or passwords. The UI persists tokens for browser sessions but never stores passwords.

## Language Support

The Control UI supports English, Simplified Chinese, Traditional Chinese, Portuguese (Brazil), German, and Spanish with automatic browser locale detection and manual override options.

## Security Configuration

For Tailnet deployments, the documentation recommends using "Integrated Tailscale Serve (preferred)" with HTTPS. Plain HTTP access triggers browser restrictions on WebCrypto unless the `allowInsecureAuth` toggle is enabled locally.

The `dangerouslyDisableDeviceAuth` setting disables identity verification entirely, marked as emergency-only.
