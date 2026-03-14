# Gateway CLI Documentation

## Overview

The Gateway is OpenClaw's WebSocket server handling channels, nodes, sessions, and hooks. All subcommands operate under `openclaw gateway ...`

## Running the Gateway

Start a local Gateway with:
```bash
openclaw gateway
```

Key requirements and notes:
- Requires `gateway.mode=local` in `~/.openclaw/openclaw.json` unless using `--allow-unconfigured`
- Cannot bind beyond loopback without authentication enabled
- Supports `SIGUSR1` for in-process restarts and standard signal handlers for shutdown

### Common Options

- `--port <port>`: Set WebSocket port (default typically `18789`)
- `--bind <loopback|lan|tailnet|auto|custom>`: Configure listener binding
- `--auth <token|password>`: Override authentication mode
- `--tailscale <off|serve|funnel>`: Expose via Tailscale
- `--dev`: Create dev configuration if missing
- `--verbose`: Enable verbose logging
- `--ws-log <auto|full|compact>`: Configure WebSocket logging style

## Querying the Gateway

Output supports human-readable format (default with TTY coloring) and `--json` for machine-readable results. All query commands use WebSocket RPC.

### Key Commands

**Health check:**
```bash
openclaw gateway health --url ws://127.0.0.1:18789
```

**Service status:**
```bash
openclaw gateway status [--json] [--no-probe]
```

**Debug everything (probes both remote and localhost):**
```bash
openclaw gateway probe
```

**Low-level RPC:**
```bash
openclaw gateway call <method> [--params JSON]
```

## Service Management

```bash
openclaw gateway install
openclaw gateway start
openclaw gateway stop
openclaw gateway restart
openclaw gateway uninstall
```

## Gateway Discovery (Bonjour)

Scan for Gateway beacons with:
```bash
openclaw gateway discover [--timeout ms] [--json]
```

Supports both multicast DNS-SD (`local.`) and unicast DNS-SD for Wide-Area Bonjour discovery.
