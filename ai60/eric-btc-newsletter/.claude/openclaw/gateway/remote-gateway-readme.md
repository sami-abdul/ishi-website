# Remote Gateway Setup for OpenClaw.app

## Summary

This documentation explains how to configure OpenClaw.app to connect to a remote gateway using SSH tunneling. The setup involves creating an SSH configuration, establishing a tunnel to forward local port 18789, and optionally automating the process.

## Key Setup Steps

The basic process requires:

1. **SSH Configuration**: Add a host entry to `~/.ssh/config` that specifies the remote machine details and port forwarding rules
2. **Authentication**: Copy your SSH public key to the remote machine to enable password-less connections
3. **Token Configuration**: Set the `OPENCLAW_GATEWAY_TOKEN` environment variable using `launchctl`
4. **Tunnel Activation**: Launch the SSH tunnel with port forwarding enabled
5. **App Restart**: Relaunch OpenClaw.app to establish the remote connection

## Automation Option

For persistent connectivity, users can create a macOS Launch Agent that automatically starts the SSH tunnel on login and maintains it if it crashes. The documentation provides a complete plist configuration file for this purpose.

## Technical Architecture

The setup establishes a local websocket connection at `ws://127.0.0.1:18789` on the client machine. This connection is tunneled through SSH to the remote gateway's identical local port, enabling secure communication with the remote system.
