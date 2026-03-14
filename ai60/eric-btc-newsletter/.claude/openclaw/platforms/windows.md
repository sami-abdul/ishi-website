# Windows (WSL2) Installation Guide Summary

## Key Recommendation
OpenClaw on Windows is best deployed through WSL2 (Ubuntu preferred) rather than native Windows, as this ensures consistent runtime behavior and better tooling compatibility.

## Installation Overview
The setup process involves three main steps:

1. **WSL2 Setup**: Install via `wsl --install` and enable systemd in WSL configuration
2. **OpenClaw Installation**: Clone the repository and run build commands within WSL
3. **Gateway Service**: Install using `openclaw gateway install` or related commands

## Critical Configuration for Headless Setups
To ensure the gateway starts automatically before Windows login:

- Enable user session persistence: `sudo loginctl enable-linger "$(whoami)"`
- Install the gateway service within WSL
- Create a Windows Scheduled Task to boot WSL at startup

## Network Access Consideration
WSL operates on its own virtual network. To expose internal services across a LAN, administrators must configure port forwarding through Windows (portproxy), as "the WSL IP changes after restarts, so you may need to refresh the forwarding rule."

## Future Developments
The documentation notes that native Windows companion applications are currently unavailable but future development is planned.