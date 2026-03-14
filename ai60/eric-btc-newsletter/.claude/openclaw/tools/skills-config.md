# Skills Config Documentation

## Overview

Skills configuration in OpenClaw is managed through the `skills` section of `~/.openclaw/openclaw.json`. This controls how skills are loaded, installed, and executed.

## Configuration Structure

The skills configuration includes several key areas:

**Loading & Discovery:**
- `allowBundled`: Restricts which bundled skills can run (optional allowlist)
- `load.extraDirs`: Additional directories to scan for skills
- `load.watch`: Enables automatic skill folder monitoring (default: true)
- `load.watchDebounceMs`: Debounce delay for file watcher events (default: 250ms)

**Installation Preferences:**
- `install.preferBrew`: Prioritize Homebrew installers when available
- `install.nodeManager`: Choose between npm, pnpm, yarn, or bun for skill dependencies

**Per-Skill Configuration:**
Individual skills can be customized via `entries.<skillKey>`:
- `enabled`: Toggle a skill on or off
- `env`: Environment variables for agent execution
- `apiKey`: API credential management with optional secret references

## Important Constraints

**Sandboxed Environments:**
When running in Docker sandboxes, skills don't inherit host environment variables. Instead, configure environment variables through:
- `agents.defaults.sandbox.docker.env`
- Per-agent sandbox settings
- Custom sandbox images with baked-in environment values

**Dynamic Updates:**
Configuration changes are recognized on the next agent turn when the file watcher is active.
