# Google Chat Integration Documentation

## Overview

The OpenClaw documentation provides setup instructions for integrating Google Chat as a communication channel, supporting both direct messages and spaces via webhooks.

## Key Setup Steps

The quick setup requires creating a Google Cloud project with the Chat API enabled, then establishing a service account with JSON credentials. Users must configure the app in the Google Cloud Console, specifying connection settings to route webhooks to their gateway's `/googlechat` endpoint.

## Security Approach

The documentation emphasizes selective exposure: "only expose the `/googlechat` path to the internet. Keep the OpenClaw dashboard and other sensitive endpoints on your private network." Three implementation options are provided—Tailscale Funnel, reverse proxy configuration, or Cloudflare Tunnel—each allowing administrators to restrict public access to the webhook while maintaining private dashboard access.

## Authentication & Access Control

Messages are verified through bearer token authentication. The system supports both app-URL and project-number audience types for token validation. Access policies differentiate between direct messages (defaulting to pairing mode) and group spaces (requiring @-mentions by default).

## Configuration Features

The JSON configuration supports service account credential storage, webhook customization, typing indicators, media handling with size limits (default 20MB), and reaction capabilities when enabled. Allowlists control which users or spaces can interact with the bot.

## Troubleshooting Resources

Common issues like 405 errors typically stem from missing channel configuration, disabled plugins, or unapplied gateway restarts. The documentation provides CLI commands to verify configuration status and channel operation.
