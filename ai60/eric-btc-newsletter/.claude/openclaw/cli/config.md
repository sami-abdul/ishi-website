# OpenClaw Config Documentation

## Overview

The `openclaw config` command manages configuration settings through get/set/unset/validate operations. Running it without arguments opens an interactive configuration wizard.

## Core Functionality

**File Management:**
- `openclaw config file` displays the active configuration file path, resolved from `OPENCLAW_CONFIG_PATH` or default location

**Configuration Operations:**
- Get values: `openclaw config get browser.executablePath`
- Set values: `openclaw config set browser.executablePath "/usr/bin/google-chrome"`
- Remove values: `openclaw config unset tools.web.search.apiKey`
- Validate configuration: `openclaw config validate`

## Path Syntax

Paths support dot or bracket notation for accessing nested properties:
- Dot notation: `agents.defaults.workspace`
- Bracket notation: `agents.list[0].id`
- Combined: `agents.list[1].tools.exec.node`

## Value Parsing

Values parse as JSON5 by default; plain strings work otherwise. Use `--strict-json` to enforce JSON5 parsing:

```bash
openclaw config set gateway.port 19001 --strict-json
openclaw config set channels.whatsapp.groups '["*"]' --strict-json
```

## Validation

Validate configuration against the active schema:

```bash
openclaw config validate
openclaw config validate --json
```

**Important:** Restart the gateway after configuration edits.
