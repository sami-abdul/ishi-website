# OpenClaw on GCP Compute Engine

## Overview

This documentation provides a comprehensive guide for deploying OpenClaw Gateway on Google Cloud Platform's Compute Engine using Docker. The setup creates a persistent, production-ready installation accessible 24/7 for approximately $5-12 monthly.

## Core Components

**What Gets Deployed:**
- OpenClaw Gateway running in Docker containers
- Persistent state storage on the host system
- SSH tunnel access from local machines
- Baked-in binaries for reliability across restarts

## Key Setup Steps

**Infrastructure Creation:**
1. GCP project setup with billing enabled
2. Compute Engine VM provisioning (e2-small minimum recommended)
3. Docker installation on the VM
4. Repository cloning and directory configuration

**Machine Type Recommendations:**
- e2-medium (2 vCPU, 4GB RAM): Most reliable; ~$25/month
- e2-small (2 vCPU, 2GB RAM): Minimum recommended; ~$12/month
- e2-micro: Free tier eligible but prone to build failures

**Persistence Strategy:**
The guide emphasizes that binaries, configurations, and workspace data must survive container restarts. This requires:
- Host volume mounts for all stateful directories
- Dockerfile modifications to install binaries at build time
- Environment variables for secure credential management

## Critical Configuration Elements

**.env Variables:**
Authentication tokens, gateway binding settings, configuration directories, and keyring passwords require secure generation using `openssl rand -hex 32`.

**Docker Compose Setup:**
Services bind to `127.0.0.1` by default, requiring SSH tunneling for laptop access. The port mapping configuration explicitly notes: "Recommended: keep the Gateway loopback-only on the VM; access via SSH tunnel."

**Binary Installation:**
External dependencies (gog for Gmail, goplaces for Maps, wacli for WhatsApp) must be installed in the Dockerfile during image construction—runtime installation causes data loss on restart.

## Verification and Access

After deployment, users verify binary availability, check gateway logs for the listener confirmation message, and establish SSH tunnels for browser access. The setup includes device approval workflows for securing the Control UI.

## Maintenance

Updates follow a straightforward pattern: `git pull`, rebuild the image, and restart services. All user data persists independently of the container lifecycle.
