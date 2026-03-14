# OpenCode Documentation

## Overview

OpenCode provides two hosted model catalogs through OpenClaw: the Zen catalog (accessed via `opencode/...`) and the Go catalog (via `opencode-go/...`). Both use the same API key, though runtime providers remain separate for proper routing.

## Setup Instructions

**Zen Catalog:**
```bash
openclaw onboard --auth-choice opencode-zen
openclaw onboard --opencode-zen-api-key "$OPENCODE_API_KEY"
```

**Go Catalog:**
```bash
openclaw onboard --auth-choice opencode-go
openclaw onboard --opencode-go-api-key "$OPENCODE_API_KEY"
```

## Configuration

A sample configuration looks like this:
```json5
{
  env: { OPENCODE_API_KEY: "sk-..." },
  agents: { defaults: { model: { primary: "opencode/claude-opus-4-6" } } },
}
```

## Available Catalogs

**Zen** - "the curated OpenCode multi-model proxy" with models like `opencode/claude-opus-4-6`, `opencode/gpt-5.2`, and `opencode/gemini-3-pro`.

**Go** - provides "the OpenCode-hosted Kimi/GLM/MiniMax lineup" including `opencode-go/kimi-k2.5`, `opencode-go/glm-5`, and `opencode-go/minimax-m2.5`.

## Key Points

- One API key supports both catalogs during onboarding
- The environment variable `OPENCODE_ZEN_API_KEY` is also supported
- Users manage billing and catalog access through the OpenCode dashboard
