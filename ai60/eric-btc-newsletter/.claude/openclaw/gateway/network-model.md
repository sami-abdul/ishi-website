# Network Model

## Overview

The documentation describes OpenClaw's network architecture, which centers on a Gateway component that manages connections and the WebSocket control plane for most operations.

## Key Architecture Points

**Gateway Fundamentals:**
The system recommends running "one Gateway per host," as it's the sole process permitted to own the WhatsApp Web session. For isolation scenarios, administrators may deploy multiple gateways with separate profiles and ports.

**Connection Defaults:**
The Gateway WebSocket typically operates at `ws://127.0.0.1:18789` with loopback as the primary configuration. Authentication tokens are generated automatically, even for local connections, though tokens become mandatory when the Gateway binds beyond localhost.

**Canvas Hosting:**
The Gateway's HTTP server delivers the Canvas interface on the same port as the WebSocket connection (default 18789), serving routes under `/__openclaw__/canvas/` and `/__openclaw__/a2ui/`. These routes receive authentication protection when `gateway.auth` is enabled and the Gateway extends beyond loopback access.

**Node Connectivity:**
Nodes establish connections to the Gateway WebSocket across LAN, tailnet, or SSH infrastructure. The legacy TCP bridge has been deprecated in favor of these modern connection methods.

**Remote Access:**
For external usage, the documentation references SSH tunneling and tailnet VPN solutions.
