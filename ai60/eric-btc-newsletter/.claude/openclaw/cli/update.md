# OpenClaw Update Documentation

## Overview
The `openclaw update` command enables safe updates and channel switching between stable, beta, and dev versions.

## Command Usage
Basic syntax includes:
- `openclaw update` -- run update
- `openclaw update status` -- check channel and availability
- `openclaw update wizard` -- interactive selection flow
- Channel/tag variants with `--channel` or `--tag` flags
- `--dry-run` to preview changes without applying them

## Key Options
Notable flags include `--no-restart` to skip Gateway service restart, `--json` for machine-readable output, and `--timeout` to customize step timing. The `--dry-run` option "preview[s] planned update actions...without writing config, installing, syncing plugins, or restarting."

## Channel Behavior
When selecting channels, OpenClaw aligns the install method accordingly:
- **dev** uses git checkout (default location `~/openclaw`)
- **stable/beta** installs via npm with matching dist-tags

## Git Checkout Process
For source installations, the workflow includes:
1. Verification of clean worktree status
2. Branch/tag switching
3. Upstream fetch (dev only)
4. Preflight checks with fallback to recent clean commits
5. Dependency installation and build
6. Plugin synchronization
7. Final `openclaw doctor` verification

## Related Commands
Documentation references `openclaw doctor` and links to development channels and updating guides.
