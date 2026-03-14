# Deploy on Render

## Overview

OpenClaw can be deployed on Render using Infrastructure as Code through a `render.yaml` Blueprint. This approach enables single-click deployment with version-controlled infrastructure.

## Prerequisites

- A Render account (free tier available)
- An API key from a supported model provider

## Deployment Process

The deployment link initiates three steps: creating a new service from the Blueprint, setting a `SETUP_PASSWORD`, and building/deploying the Docker image. The resulting service URL follows the pattern `https://<service-name>.onrender.com`.

## Blueprint Configuration

The `render.yaml` file defines the complete infrastructure stack. Key features include:

- **Docker runtime** for building from the repository's Dockerfile
- **Health checks** monitoring the `/health` endpoint
- **Persistent disk** (1GB) mounted at `/data` for data survival across redeploys
- **Environment variables** including auto-generated secure tokens
- **Starter plan** as the default (always-on service with disk storage)

## Plan Options

Three tiers are available: Free (15-minute idle spin-down, no disk), Starter (persistent storage, continuous operation), and Standard+ (production-grade with scaling).

## Post-Deployment Setup

After deployment, users navigate to `/setup` to complete the wizard, entering credentials and configuring optional messaging channels (Telegram, Discord, Slack). The control dashboard is accessible at `/openclaw`.

## Key Features

The Render Dashboard provides real-time logs, shell access to the mounted persistent disk, environment variable management, and automatic redeployment when variables change.

## Advanced Capabilities

Custom domains require DNS CNAME configuration, while scaling can be achieved vertically (plan upgrades) or horizontally (instance count increase). Configuration exports are available via `/setup/export` for backups and migration.

## Common Issues and Solutions

Service startup failures typically involve missing passwords or port mismatches. Free tier cold starts may be slow, while data loss occurs without persistent disk storage. Health check failures warrant verification of the `/health` endpoint and local Docker testing.
