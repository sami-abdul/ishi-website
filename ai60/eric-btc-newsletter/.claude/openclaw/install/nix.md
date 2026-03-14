# Nix Installation Guide

OpenClaw recommends **nix-openclaw**, a Home Manager module for Nix-based setup on macOS.

## Key Setup Steps

The documentation suggests these actions: verify Determinate Nix installation, create a local flake using provided templates, establish a Telegram bot with authentication credentials, configure API secrets, apply Home Manager settings, and validate the launchd service functionality.

## Nix Mode Features

When `OPENCLAW_NIX_MODE=1` is enabled, the system operates deterministically with disabled auto-installation. Users can set this via environment variable or macOS defaults. The runtime reads configuration from `OPENCLAW_CONFIG_PATH` and stores state in `OPENCLAW_STATE_DIR`.

## What's Included

"Gateway + macOS app + tools (whisper, spotify, cameras) — all pinned" with launchd service persistence and declarative plugin configuration supporting instant rollback.

## Important Paths

- `OPENCLAW_HOME`: Base directory (defaults to HOME/USERPROFILE)
- `OPENCLAW_STATE_DIR`: Mutable data location (~/.openclaw)
- `OPENCLAW_CONFIG_PATH`: JSON5 configuration file

The documentation emphasizes that **nix-openclaw on GitHub is the authoritative source**, with this page serving as a quick reference only.
