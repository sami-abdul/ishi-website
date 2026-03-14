# Tailscale Integration for OpenClaw Gateway

## Overview

OpenClaw supports automatic Tailscale configuration for securing gateway access. The system offers three operational modes:

- **Serve**: Provides tailnet-only access via `tailscale serve`, keeping the gateway on loopback
- **Funnel**: Enables public HTTPS exposure via `tailscale funnel` (requires password authentication)
- **Off**: Default mode with no Tailscale automation

## Authentication Options

Gateway authentication can use either tokens or passwords. When "serve" mode is active with `gateway.auth.allowTailscale` enabled, the Control UI and WebSocket can authenticate using Tailscale identity headers without credentials.

The system verifies identity by resolving the forwarded address through the local Tailscale daemon and confirming header consistency. However, HTTP API endpoints still require token or password authentication.

## Setup Examples

**Tailnet-Only Access**: Configure the gateway to bind on loopback with serve mode enabled, then access via `https://<magicdns>/`

**Direct Tailnet Binding**: Set `gateway.bind: "tailnet"` to allow direct connection from other tailnet devices on port 18789

**Public Access**: Enable funnel mode with password authentication for internet-facing deployment

## Requirements & Constraints

The Tailscale CLI must be installed and authenticated. Funnel mode requires version 1.38.3+, MagicDNS, HTTPS enabled, and supports only ports 443, 8443, and 10000. The optional `resetOnExit` setting allows OpenClaw to clean up Serve/Funnel configuration upon shutdown.
