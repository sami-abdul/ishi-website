# Docker Documentation for OpenClaw

## Overview

Docker support in OpenClaw is optional and designed for users who want containerized deployment, isolated gateway environments, or agent sandboxing. The documentation emphasizes that Docker isn't required for local development workflows.

## Key Requirements

To use Docker with OpenClaw, you'll need:

- Docker Desktop or Docker Engine plus Docker Compose v2
- Minimum 2 GB RAM for image builds
- Adequate disk space for images and logs
- Security hardening considerations if deploying on public hosts

## Quick Start with docker-setup.sh

The primary installation method uses a setup script that:

1. Builds or pulls the gateway image
2. Runs an onboarding wizard
3. Starts the gateway via Docker Compose
4. Generates authentication tokens

Users can access the interface at `http://127.0.0.1:18789/` after setup completes.

## Configuration Options

The setup script supports several environment variables for customization:

- `OPENCLAW_IMAGE` — specify a remote image instead of building locally
- `OPENCLAW_EXTENSIONS` — pre-install extension dependencies
- `OPENCLAW_EXTRA_MOUNTS` — add additional bind mounts
- `OPENCLAW_HOME_VOLUME` — persist container home directory
- `OPENCLAW_SANDBOX` — enable Docker agent sandbox

## Agent Sandbox Features

When enabled, the sandbox isolates tool execution in Docker containers while keeping the gateway on the host. Key characteristics include:

- Configurable scope (per-session or per-agent)
- Workspace access control (none, read-only, or read-write)
- Tool allow/deny policies
- Network isolation options
- Automatic pruning of idle or aged containers

## Security Considerations

The documentation emphasizes several hardening practices:

- "The image runs as `node` (uid 1000)" with non-root execution by default
- Port binding defaults to `lan` mode for container access
- Tool policies enforce deny-over-allow precedence
- Sandbox containers use `tmpfs` for ephemeral storage

## Storage Architecture

Data persistence follows this model: host bind mounts preserve configuration and workspace data across container recreation, while sandbox containers use temporary filesystems that disappear when removed.
