# openclaw daemon Documentation

## Overview

The `openclaw daemon` command is a legacy interface for managing the Gateway service. It provides an alias that maps directly to `openclaw gateway` service control commands.

## Available Commands

```bash
openclaw daemon status
openclaw daemon install
openclaw daemon start
openclaw daemon stop
openclaw daemon restart
openclaw daemon uninstall
```

## Subcommand Functions

- **status**: Displays service installation state and checks Gateway health
- **install**: Installs the service using platform-specific mechanisms (launchd, systemd, or schtasks)
- **uninstall**: Removes the installed service
- **start**: Launches the service
- **stop**: Halts the service
- **restart**: Stops and restarts the service

## Command Options by Type

**Status command**: `--url`, `--token`, `--password`, `--timeout`, `--no-probe`, `--deep`, `--json`

**Install command**: `--port`, `--runtime <node|bun>`, `--token`, `--force`, `--json`

**Lifecycle commands** (uninstall, start, stop, restart): `--json`

## Key Implementation Details

- Authentication SecretRefs are resolved during status checks when available
- On Linux systemd systems, token drift verification examines both `Environment=` and `EnvironmentFile=` sources
- Service installation validates SecretRef resolution for token authentication without persisting resolved values
- Installation fails if a required token SecretRef cannot be resolved
- Configuration requires explicit mode setting when both token and password authentication are configured

## Recommendation

The documentation suggests using the current `openclaw gateway` command instead for up-to-date information and examples.
