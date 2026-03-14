# OpenClaw on Oracle Cloud (OCI) - Summary

## Overview
This guide explains how to run OpenClaw Gateway on Oracle Cloud's free ARM tier, offering zero-cost hosting with tradeoffs around architecture and capacity limits.

## Key Setup Steps

The installation involves eight primary phases:

1. **Instance Creation**: Provision a VM.Standard.A1.Flex ARM instance (Ubuntu 24.04) with up to 4 OCPUs and 24GB RAM
2. **System Updates**: Install build tools necessary for ARM compilation
3. **User Configuration**: Set hostname and enable service persistence
4. **Tailscale Installation**: Enable secure remote access via your private network
5. **OpenClaw Installation**: Deploy the gateway software
6. **Gateway Security**: Bind to loopback, enable token authentication, and configure Tailscale Serve
7. **Verification**: Confirm version, daemon status, and local connectivity
8. **Network Hardening**: Restrict VCN ingress to only Tailscale traffic (UDP 41641)

## Security Architecture

The approach implements "defense in-depth" by combining network-level blocking (VCN restrictions) with application-level controls. As noted in the documentation: *"VCN blocks before traffic reaches instance"* and traditional host-based measures like UFW and fail2ban become unnecessary when edge-level filtering is active.

## Access Pattern

Control UI is reached via HTTPS at `https://openclaw.<tailnet-name>.ts.net/` from any Tailscale-connected device, eliminating public IP exposure.

## Cost Context
Oracle's Always Free tier provides the most economical option ($0/month) compared to alternatives like Hetzner ($4) or DigitalOcean ($6), though with architectural constraints.