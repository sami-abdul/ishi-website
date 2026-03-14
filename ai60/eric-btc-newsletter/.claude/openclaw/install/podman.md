# Podman Documentation

This page provides comprehensive guidance for running OpenClaw gateway in a rootless Podman container.

## Key Setup Components

The documentation outlines a three-step quick start process. First, users run `./setup-podman.sh` for one-time setup, which creates a dedicated system user and builds the container image. The script can optionally install a systemd Quadlet service for production deployments with auto-restart capabilities.

## User and Security Model

The setup creates a non-login `openclaw` system user with restricted shell access. This user requires subuid/subgid ranges configured in `/etc/subuid` and `/etc/subgid` for rootless Podman functionality. The documentation emphasizes that "only `openclaw` and root can access `/home/openclaw/.openclaw`," restricting configuration file permissions.

## Configuration and Runtime Options

Gateway configuration supports several customization paths:
- Authentication tokens stored in `~openclaw/.openclaw/.env`
- Port mapping overrides via environment variables (`OPENCLAW_PODMAN_GATEWAY_HOST_PORT`)
- Local-only or LAN exposure through `--bind` settings
- Provider API keys configured in the `.env` file

## Storage and Persistence

Host directories for config and workspace are bind-mounted, ensuring persistence. The documentation notes that "disk growth hotspots" include media files, session data, and log files, recommending monitoring these locations.

## Troubleshooting Focus

The documentation addresses common permission issues, missing configuration files, subuid/subgid problems, and systemd integration failures with specific diagnostic commands and remediation steps.
