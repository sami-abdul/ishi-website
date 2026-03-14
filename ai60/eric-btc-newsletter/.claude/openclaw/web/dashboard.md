# Dashboard Documentation

## Overview
The Gateway dashboard is a browser-based control interface accessible at `/` (default: `http://127.0.0.1:18789/`). It serves as an admin surface for chat, configuration, and execution approvals.

## Key Security Points
The documentation emphasizes that this is an **admin interface** and should not be exposed publicly. It warns: *"The UI keeps dashboard URL tokens in sessionStorage for the current browser tab session and selected gateway URL, and strips them from the URL after load."* Access should be restricted to localhost, Tailscale Serve, or SSH tunnels.

## Quick Access
Users can access the dashboard through:
- Direct localhost URL
- `openclaw dashboard` CLI command (automatically copies links and opens browsers when available)
- Headless systems via SSH hints

## Authentication
Authentication occurs at the WebSocket handshake using `connect.params.auth` with either a token or password, configured through `gateway.auth` settings.

## Token Management
For non-localhost access, the documentation recommends Tailscale Serve (which can be tokenless if `gateway.auth.allowTailscale: true`), tailnet binding with tokens, or SSH tunnels.

## Troubleshooting
If users encounter "unauthorized" errors or WebSocket code 1008, the guide suggests:
- Verifying gateway reachability
- Resolving token drift through provided recovery checklists
- Retrieving tokens via `openclaw config get gateway.auth.token` or environment variables
