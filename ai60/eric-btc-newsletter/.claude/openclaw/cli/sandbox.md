# Sandbox CLI Documentation

## Overview
OpenClaw's sandbox commands manage Docker-based containers that provide isolated execution environments for agents. The `sandbox` command family helps you oversee these containers, particularly following updates or configuration modifications.

## Available Commands

**`openclaw sandbox explain`**
Displays the active sandbox configuration including mode, scope, workspace access, tool policies, and elevated gates with relevant config paths.

**`openclaw sandbox list`**
Shows all sandbox containers with their operational status, Docker image information, creation age, idle duration, and associated sessions or agents. Supports filtering and JSON output options.

**`openclaw sandbox recreate`**
Removes existing sandbox containers to force their recreation with updated images and configurations. Accepts flags for targeting all containers, specific sessions, particular agents, or browser-only containers.

## Key Use Cases

After updating Docker images, modifying sandbox configuration, changing setup commands, or managing individual agent containers, use `openclaw sandbox recreate` to apply changes. The documentation notes that "existing containers continue running with old settings" until manually removed, as automatic pruning takes 24 hours of inactivity.

## Configuration Location
Sandbox settings are stored in `~/.openclaw/openclaw.json` under the `agents.defaults.sandbox` path, with per-agent overrides available in `agents.list[].sandbox`.

## Important Consideration
The documentation recommends preferring `openclaw sandbox recreate` over manual Docker removal commands, as it properly handles the Gateway's container naming conventions.
