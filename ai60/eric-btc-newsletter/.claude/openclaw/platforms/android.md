# Android App Documentation Summary

## Overview
The Android App functions as a companion node that requires a separate Gateway installation. The connection architecture uses mDNS/NSD and WebSocket protocols to communicate with the Gateway running on macOS, Linux, or Windows via WSL2.

## Key Connection Requirements
According to the documentation, the Android device must be able to reach the Gateway WebSocket at the default endpoint `ws://<host>:18789`. Connection can be established through:
- Local area network with mDNS/NSD discovery
- Tailscale tailnet with Wide-Area Bonjour/unicast DNS-SD
- Manual host/port configuration as fallback

## Setup Process
The connection workflow involves starting the Gateway, verifying discovery (optional), connecting via the Android app's Connect tab, approving pairing through CLI commands, and verifying node connectivity. The app supports both setup codes and manual configuration modes.

## Featured Capabilities
The Android implementation includes:
- Chat functionality with session selection and history
- Canvas navigation pointing to Gateway-hosted content
- Camera operations (snapshots and video clips)
- Voice interaction with transcript capture
- Device commands covering status, permissions, and health information
- Access to notifications, photos, contacts, calendar events, and motion data

The foreground service model maintains persistent Gateway connectivity through a system notification.