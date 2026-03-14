# Remote Control Documentation Summary

## Overview
The documentation explains how to configure OpenClaw's macOS app to act as a remote control for a gateway running on another host via SSH.

## Key Operating Modes
Three modes are supported: local execution on the Mac, remote commands via SSH tunnel (default), and direct WebSocket connections bypassing SSH.

## Essential Setup Requirements
The remote host needs Node, pnpm, and the OpenClaw CLI installed and accessible on the system PATH. SSH key authentication is recommended, particularly using stable identifiers like Tailscale IPs for off-LAN access.

## Configuration Steps
Users navigate to Settings → General and select their preferred transport method, specify the SSH target as `user@host`, optionally provide a gateway URL for direct connections, and run a test to verify remote command execution works correctly.

## Important Technical Details
The SSH tunnel approach causes gateways to see client IP as "127.0.0.1" due to loopback forwarding. Direct connections reveal the actual client IP. Web Chat functionality adapts based on the chosen transport method.

## Security Considerations
The documentation recommends "loopback binds on the remote host and connect via SSH or Tailscale." Host keys should be pre-trusted in `~/.ssh/known_hosts`, and non-loopback bindings require token or password authentication.

## Troubleshooting Focus
Common issues involve PATH misconfiguration (exit code 127), SSH connectivity problems, and WebSocket connection failures preventing Web Chat functionality.