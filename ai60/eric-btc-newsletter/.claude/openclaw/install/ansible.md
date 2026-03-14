# OpenClaw Ansible Installation Guide

## Overview

OpenClaw recommends **openclaw-ansible** for production deployment, featuring a "firewall-first security" approach with one-command setup.

## Quick Installation

The fastest deployment method involves running:

```bash
curl -fsSL https://raw.githubusercontent.com/openclaw/openclaw-ansible/main/install.sh | bash
```

## Key Features

The installer provides several security and operational benefits:

- **Firewall protection** using UFW with Docker isolation, exposing only SSH and Tailscale ports
- **VPN mesh access** via Tailscale for secure remote connectivity
- **Container sandboxing** for agent execution in isolated environments
- **Automatic service management** through systemd with hardening configurations
- **Minimal setup time** requiring just minutes for complete deployment

## System Requirements

You'll need:
- Debian 11+ or Ubuntu 20.04+
- Root or sudo access
- Internet connectivity
- Ansible 2.14+ (auto-installed by the setup script)

## Components Installed

The playbook configures six primary elements: Tailscale, UFW firewall, Docker with Compose V2, Node.js 22.x with pnpm, OpenClaw itself, and systemd service integration. Notably, the gateway runs directly on the host rather than in containers.

## Post-Installation Steps

After setup completes, switch to the openclaw user and follow the onboarding wizard for provider configuration and gateway testing.

## Updating and Maintenance

The installer enables manual updates following standard procedures. Re-running the playbook remains safe and idempotent for configuration modifications.

For comprehensive details, consult the [official repository](https://github.com/openclaw/openclaw-ansible).
