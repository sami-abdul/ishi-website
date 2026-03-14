# Fly.io Deployment Guide for OpenClaw

## Overview
This documentation covers deploying OpenClaw Gateway on Fly.io with persistent storage, automatic HTTPS, and channel integrations.

## Prerequisites
- flyctl CLI installed
- Fly.io account (free tier eligible)
- API keys for model providers
- Channel credentials (Discord bot token, Telegram token, etc.)

## Key Deployment Steps

**1. Initialize the Application**
Clone the repository, create a Fly app, and establish a persistent volume for data storage.

**2. Configure fly.toml**
The configuration file specifies the app name, region, Docker build settings, environment variables, process definitions, HTTP service configuration, VM specifications, and volume mounts. Critical settings include binding to `0.0.0.0` for Fly's proxy access and allocating 2GB of memory.

**3. Set Secrets**
Store sensitive credentials as environment variables, including gateway tokens, model provider API keys, and channel credentials. As the documentation emphasizes, "Prefer env vars over config file" to prevent accidental exposure.

**4. Deploy and Verify**
Run `fly deploy` to build and launch the container, then check status and logs.

**5. Configure OpenClaw**
SSH into the machine to create `/data/openclaw.json` with agents, authentication profiles, bindings, and channel settings.

## Important Security Considerations

The standard deployment creates a public URL. For hidden infrastructure, use the private deployment template to release public IPs and access via proxy, WireGuard, or SSH instead.

## Troubleshooting Common Issues

- **Binding errors**: Add `--bind lan` to process commands
- **Health check failures**: Ensure `internal_port` matches gateway port
- **Memory problems**: Increase VM memory to 2GB minimum
- **Lock file issues**: Remove persistent PID lock files during restarts
- **Private deployments with webhooks**: Use ngrok tunnels for callback URLs

## Cost Estimate
Approximately $10-15 monthly for the recommended configuration (shared-cpu-2x with 2GB RAM).
