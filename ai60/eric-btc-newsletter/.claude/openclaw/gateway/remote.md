# Remote Access

## Overview
The OpenClaw system supports remote access through SSH tunneling and tailnet connections, allowing operators to control a centralized Gateway host from remote machines.

## Key Architecture Principles

The documentation describes a hub-and-spoke model where a single Gateway instance maintains all state and channels. As stated: "One gateway service owns state + channels. Nodes are peripherals." Nodes connect to the Gateway via WebSocket rather than running their own gateway instances.

## Primary Remote Access Methods

**SSH Tunneling**: Users can forward the Gateway's loopback port (default 18789) over SSH using standard tunneling commands. This enables CLI tools and clients to reach the remote Gateway as if it were local.

**Tailnet/VPN Approach**: For always-on scenarios, the Gateway can run on a persistent host within a Tailscale network, accessible via identity-based routing without explicit port forwarding.

## Credential Management

The system implements a clear precedence hierarchy: explicit credentials (tokens/passwords) override all defaults, environment variables take priority over config files, and remote mode has distinct fallback chains from local mode. Notably, "Node-host local-mode exception: gateway.remote.token / .password are ignored."

## Security Posture

The recommended approach maintains the Gateway bound to loopback only, eliminating public exposure. For trusted networks, SSH tunnels or Tailscale Serve provide encrypted access without requiring plaintext WebSocket exposure.
