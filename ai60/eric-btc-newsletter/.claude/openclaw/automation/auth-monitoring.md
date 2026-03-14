# Auth Monitoring

## Overview

OpenClaw provides OAuth expiry monitoring capabilities through its CLI tool. The primary method for checking credential status is the `openclaw models status` command, which can be integrated into automation workflows and alerting systems.

## CLI-Based Monitoring (Recommended)

The preferred approach uses the command:

```bash
openclaw models status --check
```

This returns standardized exit codes:
- **0**: Credentials are valid
- **1**: Credentials have expired or are missing
- **2**: Credentials expiring within 24 hours

This method works with cron jobs and systemd without requiring additional scripts.

## Optional Supplementary Scripts

The `scripts/` directory contains optional utilities designed for operational workflows and mobile-based monitoring:

- **claude-auth-status.sh**: Checks authentication status using CLI output (with fallback to direct file reading)
- **auth-monitor.sh**: Cron/systemd compatible alerting via ntfy or phone notifications
- **systemd integration files**: User-level timer and service unit files
- **mobile-focused scripts**: Termux widget implementations for quick status checks and re-authentication flows
- **credential sync tool**: Synchronizes Claude Code credentials to OpenClaw

These scripts are entirely optional and useful primarily for remote management or mobile automation scenarios.
