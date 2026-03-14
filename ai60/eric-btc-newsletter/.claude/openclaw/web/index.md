# Web (Gateway) Documentation

The Gateway component serves a browser-based Control UI through Vite + Lit on port 18789 (default).

## Core Features

The Gateway exposes:
- A Control UI dashboard at `http://<host>:18789/`
- Optional webhook endpoint when enabled
- WebSocket communication for agent control

## Configuration

The Control UI is enabled by default when assets exist in `dist/control-ui`. Configuration allows setting a custom `basePath` (e.g., `/openclaw`) and toggling the interface on/off.

## Access Methods

**Tailscale Serve (Recommended):** Keep the Gateway on loopback and use Tailscale as a proxy for secure, simple access via `https://<magicdns>/`.

**Tailnet Bind:** Expose the Gateway to your Tailscale network at `http://<tailscale-ip>:18789/` with token authentication.

**Public Internet (Funnel):** Use Tailscale Funnel with password authentication for public access.

## Security Considerations

- Authentication is required by default (token, password, or Tailscale identity)
- Non-loopback binds mandate explicit credentials
- CORS origins must be explicitly configured for remote deployments
- Tailscale identity headers can satisfy Control UI auth when `allowTailscale` is enabled
- HTTP API endpoints still require token/password regardless

## Build Instructions

Generate static assets using: `pnpm ui:build`
