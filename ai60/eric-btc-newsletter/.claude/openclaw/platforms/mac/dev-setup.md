# macOS Dev Setup

## Overview

This documentation explains how to build and run OpenClaw on macOS from source code.

## Core Requirements

You'll need two primary toolsets installed: **Xcode 26.2+** for Swift development, and **Node.js 22+ with pnpm** for the gateway, CLI, and packaging infrastructure.

## Setup Process

The initial setup involves three main steps:

1. **Install dependencies** using `pnpm install`
2. **Build the application** via the `./scripts/package-mac-app.sh` script, which outputs to `dist/OpenClaw.app`
3. **Install the CLI globally** either through the app's General settings or manually via npm

## Key Considerations

**Signing notes**: Without an Apple Developer ID certificate, the build process automatically applies ad-hoc signing. This may trigger security warnings, though the documentation notes that immediate crashes with "Abort trap 6" indicate a separate issue requiring troubleshooting steps.

**CLI requirement**: The macOS app depends on a globally-installed `openclaw` CLI to handle background task management.

## Troubleshooting Areas

The guide addresses three primary issues:

- Toolchain mismatches requiring updated macOS/Xcode versions
- Permission crashes during Speech Recognition or Microphone access (fixable via TCC cache reset)
- Gateway processes stuck in "Starting..." status (requiring port cleanup via `lsof` or gateway commands)