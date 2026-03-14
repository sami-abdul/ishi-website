# OpenClaw Approvals Documentation

## Overview

The `openclaw approvals` command manages execution approvals across local hosts, gateway hosts, or specific node hosts. By default, operations target the local approvals file; use flags to target other locations.

## Related Resources

- Exec approvals: [Exec approvals](/tools/exec-approvals)
- Nodes: [Nodes](/nodes)

## Retrieve Approvals

```bash
openclaw approvals get
openclaw approvals get --node <id|name|ip>
openclaw approvals get --gateway
```

## Update Approvals from File

```bash
openclaw approvals set --file ./exec-approvals.json
openclaw approvals set --node <id|name|ip> --file ./exec-approvals.json
openclaw approvals set --gateway --file ./exec-approvals.json
```

## Allowlist Management

```bash
openclaw approvals allowlist add "~/Projects/**/bin/rg"
openclaw approvals allowlist add --agent main --node <id|name|ip> "/usr/bin/uptime"
openclaw approvals allowlist add --agent "*" "/usr/bin/uname"

openclaw approvals allowlist remove "~/Projects/**/bin/rg"
```

## Key Details

- The `--node` flag resolves targets using the same mechanism as `openclaw nodes` (supports id, name, ip, or id prefix)
- The `--agent` parameter defaults to `"*"` to apply settings to all agents
- Target nodes must advertise `system.execApprovals.get/set` capabilities (macOS app or headless node host)
- Approvals files are stored per host at `~/.openclaw/exec-approvals.json`
