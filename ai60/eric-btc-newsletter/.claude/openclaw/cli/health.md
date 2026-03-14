# OpenClaw Health Documentation

## Command Overview

The `openclaw health` command retrieves health status information from an active Gateway.

## Usage Syntax

```bash
openclaw health
openclaw health --json
openclaw health --verbose
```

## Key Features

**Standard Execution**: Running `openclaw health` without flags provides basic health status output.

**JSON Output**: The `--json` flag formats the response in machine-readable JSON structure.

**Verbose Mode**: The `--verbose` option "runs live probes and prints per-account timings when multiple accounts are configured." Additionally, it displays per-agent session store details when several agents are set up.

## Additional Notes

The output adapts based on your system configuration -- it includes per-agent session stores when multiple agents exist in your setup.
