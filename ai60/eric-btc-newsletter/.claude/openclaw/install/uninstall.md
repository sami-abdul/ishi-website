# Uninstall

This documentation provides comprehensive guidance for removing OpenClaw from your system through two primary approaches.

## Quick Removal Methods

The simplest approach uses the built-in uninstaller command. For automated environments, a non-interactive flag is available. Users can also manually execute the underlying steps: stopping the gateway service, uninstalling it from the system's service manager, and removing configuration directories.

## Complete Cleanup Steps

The manual process involves six stages:

1. **Stop the gateway service** using the appropriate CLI command
2. **Uninstall the service** from your operating system's service manager (launchd on macOS, systemd on Linux, or Task Scheduler on Windows)
3. **Remove configuration and state directories** located in your home folder
4. **Delete your workspace** if you want to remove agent files
5. **Uninstall the CLI** via your package manager (npm, pnpm, or bun)
6. **Remove the macOS app** if you installed the desktop version

## Handling Multiple Profiles

Users who created profiles should repeat state directory removal for each one, as they maintain separate configuration locations.

## Manual Service Removal Without CLI

If the CLI has been removed but the service persists, platform-specific commands remove the service directly from launchd, systemd, or Windows Task Scheduler without requiring the CLI tool.

## Source Installation Cleanup

Developers running OpenClaw from a cloned repository should uninstall the service before deleting the repository directory.
