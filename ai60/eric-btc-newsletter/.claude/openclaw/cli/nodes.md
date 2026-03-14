# OpenClaw Nodes Command Documentation

## Overview
The `openclaw nodes` command manages paired devices and invokes their capabilities. It supports listing nodes, approving requests, checking status, and executing remote commands.

## Key Command Categories

**Node Management:**
- List paired and pending nodes with connection status filtering
- Approve node connection requests
- Check node status with connection parameters

**Command Execution:**
- `invoke`: Execute specific commands with JSON parameters
- `run`: Execute shell commands with exec-style defaults
- `run --raw`: Execute shell strings directly

## Important Features

The documentation notes that "node invoke timeout defaults to 15000ms" and can be customized via the `--invoke-timeout` flag.

For shell execution, the system uses "/bin/sh -lc" on Unix or "cmd.exe /c" on Windows. On Windows node hosts using allowlist mode, the shell-wrapper form requires explicit approval even with allowlist entries.

## Related Resources
- Nodes overview and camera/image node documentation are available
- Complete documentation index at https://docs.openclaw.ai/llms.txt

The command supports common options like `--url`, `--token`, `--timeout`, and `--json` formatting across all node operations.
