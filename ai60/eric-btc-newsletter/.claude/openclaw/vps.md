# VPS Hosting

## Overview
This page provides guidance on deploying OpenClaw across various VPS and cloud platforms, with links to provider-specific setup instructions.

## Supported Hosting Providers
The documentation lists eight primary options:

- **Railway** and **Northflank** offer one-click browser-based setup
- **Oracle Cloud** provides a free tier option (with caveats about ARM architecture and signup availability)
- **Fly.io**, **Hetzner**, **GCP**, and **exe.dev** each have dedicated guides
- **AWS** is noted as viable, with a video tutorial referenced

## Key Architectural Concepts

The documentation explains that "The **Gateway runs on the VPS** and owns state + workspace," while users connect remotely through the Control UI or Tailscale/SSH. The VPS functions as the authoritative system, requiring regular backups.

Security guidance emphasizes keeping the Gateway on loopback by default, with SSH tunnels or Tailscale Serve for access.

## Deployment Scenarios

**Shared company agents** work when users trust each other, though they require dedicated runtime environments and should avoid personal account integrations.

**Local nodes** paired with a cloud-based Gateway enable local device capabilities while maintaining centralized cloud infrastructure.

## Performance Optimization

For resource-constrained environments, the guide recommends enabling Node's module compile cache and disabling respawn overhead, with specific commands and systemd configuration examples provided.