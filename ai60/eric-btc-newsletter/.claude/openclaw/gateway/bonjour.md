# Bonjour Discovery

## Overview

OpenClaw utilizes Bonjour (mDNS/DNS-SD) as "a LAN-only convenience to discover an active Gateway (WebSocket endpoint)." It functions on a best-effort basis and does not supplant SSH or Tailnet connectivity options.

## Key Features

**Wide-Area Discovery**: For nodes on different networks, the system supports unicast DNS-SD over Tailscale, enabling the same discovery experience across network boundaries where multicast mDNS cannot traverse.

**Service Advertisement**: "Only the Gateway advertises `_openclaw-gw._tcp`" and publishes non-secret hints including the gateway role, display name, port information, and optional TLS fingerprints.

## Security Considerations

The documentation emphasizes critical security practices:

- "Bonjour/mDNS TXT records are unauthenticated. Clients must not treat TXT as authoritative routing."
- Clients should validate using resolved service endpoints rather than relying on advertised hints
- TLS pinning must never allow advertised fingerprints to override previously stored pins
- iOS/Android nodes should require explicit user confirmation before trusting first-time fingerprints

## Troubleshooting

The system provides debugging tools including macOS built-in commands (`dns-sd`), Gateway log monitoring for Bonjour-specific entries, and iOS discovery debug logs accessible via Settings.

Common issues include multicast blocking on certain networks, interface churn affecting mDNS results, and hostname complexity confusing resolvers.
