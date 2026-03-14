# OpenCode Go Documentation

## Overview

"OpenCode Go is the Go catalog within OpenCode" and utilizes the same API key as the Zen catalog while maintaining its own runtime provider identifier.

## Available Models

The service supports three models:
- `opencode-go/kimi-k2.5`
- `opencode-go/glm-5`
- `opencode-go/minimax-m2.5`

## Setup Instructions

**CLI onboarding** can be completed interactively or by directly providing credentials:
```bash
openclaw onboard --auth-choice opencode-go
# or non-interactive
openclaw onboard --opencode-go-api-key "$OPENCODE_API_KEY"
```

**Configuration example** for your setup file:
```json5
{
  env: { OPENCODE_API_KEY: "YOUR_API_KEY_HERE" },
  agents: { defaults: { model: { primary: "opencode-go/kimi-k2.5" } } },
}
```

## Key Details

The platform handles automatic per-model routing when using the `opencode-go/...` prefix. Runtime references remain explicit: the Zen catalog uses `opencode/...` while Go uses `opencode-go/...` identifiers.

For broader context, consult the main "OpenCode provider documentation" for shared setup information and catalog details.
