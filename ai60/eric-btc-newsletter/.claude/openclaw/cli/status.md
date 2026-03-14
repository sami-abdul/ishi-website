# OpenClaw Status Command Documentation

## Overview
The `openclaw status` command provides diagnostics for channels and sessions within the OpenClaw system.

## Command Syntax
```bash
openclaw status
openclaw status --all
openclaw status --deep
openclaw status --usage
```

## Key Features

The `--deep` flag "runs live probes (WhatsApp Web + Telegram + Discord + Google Chat + Slack + Signal)."

Additional capabilities include:

- **Multi-agent support**: Output displays per-agent session stores when multiple agents are configured
- **Infrastructure overview**: Includes Gateway and node host service installation/runtime status when available
- **Update information**: Surfaces update channel and git SHA for source checkouts; prompts users to run `openclaw update` when updates are available
- **Secret management**: Read-only status operations resolve supported SecretRefs for targeted config paths when possible
- **Error handling**: If a configured channel SecretRef is unavailable, status remains read-only and reports degraded output rather than crashing, with warnings like "configured token unavailable in this command path"
