# Multiple Gateways

## Overview

The documentation explains when and how to run multiple OpenClaw Gateways on the same host. According to the guide, "Most setups should use one Gateway because a single Gateway can handle multiple messaging connections and agents."

## Key Requirements for Isolation

To run multiple Gateways safely, you must ensure these settings remain unique per instance:

- Configuration file path (`OPENCLAW_CONFIG_PATH`)
- State directory (`OPENCLAW_STATE_DIR`)
- Agent workspace root (`agents.defaults.workspace`)
- Gateway port (`gateway.port`)
- Derived ports for browser and canvas services

Sharing these settings "will hit config races and port conflicts."

## Recommended Approach: Profiles

Using the `--profile` parameter automatically isolates configuration and state:

```bash
openclaw --profile main gateway --port 18789
openclaw --profile rescue gateway --port 19001
```

## Rescue Bot Setup

A secondary Gateway serves as a backup for debugging or configuration changes if the primary instance fails. Key implementation steps:

1. Run with its own isolated profile and state directory
2. Use a unique base port (minimum 20 ports separated from primary)
3. Each instance requires separate browser control and CDP port ranges
4. Avoid pinning identical `browser.cdpUrl` values across instances

## Port Allocation

The base gateway port derives additional ports: browser control service (base + 2) and CDP auto-allocation from base + 9 through base + 108.
