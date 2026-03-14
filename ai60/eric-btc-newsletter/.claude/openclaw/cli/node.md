# OpenClaw Node Documentation

## Overview

The `openclaw node` command launches a headless node host that connects to the Gateway WebSocket and exposes `system.run` and `system.which` capabilities on remote machines.

## Primary Use Cases

Node hosts enable agents to execute commands on distributed machines without requiring full application installation. Key scenarios include:

- Operating commands on remote Linux/Windows systems (build servers, lab equipment, storage devices)
- Maintaining sandboxed execution on the gateway while delegating approved operations to other hosts
- Providing lightweight, headless execution targets for automation or CI environments

Command access remains governed by "exec approvals and per-agent allowlists on the node host."

## Browser Proxy Feature

Node hosts automatically advertise browser proxy capabilities if enabled, allowing agent-driven browser automation without additional setup. This feature can be disabled via configuration:

```json5
{
  nodeHost: {
    browserProxy: {
      enabled: false,
    },
  },
}
```

## Running Modes

**Foreground execution:**
```bash
openclaw node run --host <gateway-host> --port 18789
```

**Background service installation:**
```bash
openclaw node install --host <gateway-host> --port 18789
```

Common options include `--tls`, `--node-id`, and `--display-name` flags.

## Authentication

Node host authentication resolves from environment variables or local configuration -- not from remote gateway credentials in local mode. Priority: `OPENCLAW_GATEWAY_TOKEN` -> local config -> remote fallback (in remote mode only).

## Device Pairing & Management

Initial connections generate pending pairing requests. Approval occurs via:

```bash
openclaw devices list
openclaw devices approve <requestId>
```

Node configuration persists in `~/.openclaw/node.json`.

## Command Execution Controls

`system.run` operations are restricted by local exec approvals stored in `~/.openclaw/exec-approvals.json`, manageable through the Gateway interface.
