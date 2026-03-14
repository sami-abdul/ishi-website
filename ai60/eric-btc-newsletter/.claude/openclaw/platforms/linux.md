# Linux App Documentation Summary

## Runtime Requirements
The Gateway operates on Linux with Node.js as the preferred runtime. According to the documentation, "Node is the recommended runtime" while Bun is discouraged due to messaging platform compatibility issues.

## Quick Installation Path
For VPS deployment, users should:
1. Install Node 22 or later
2. Execute the global npm package installation
3. Run the onboarding daemon installer
4. Establish SSH tunnel forwarding to port 18789
5. Access the web interface and authenticate with a token

## Service Management
The platform installs as a systemd user-level service by default. For shared or persistent servers, system-level service configuration is recommended. The documentation provides a minimal unit file template showing how to configure the service with automatic restart capabilities.

## Available Installation Options
Multiple installation paths exist including Docker, Nix package manager, and experimental Bun support. Users can also repair or migrate existing installations using the doctor command.

## Key Resources
The setup includes links to detailed guides for VPS installation, configuration options, and the complete Gateway runbook for advanced deployment scenarios.