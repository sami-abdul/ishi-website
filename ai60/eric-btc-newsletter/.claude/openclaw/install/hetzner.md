# OpenClaw on Hetzner: Docker Production VPS Guide

## Overview

This guide enables you to run OpenClaw Gateway persistently on a Hetzner VPS using Docker. The setup prioritizes durable state management, baked-in binaries, and safe restart behavior for approximately $5/month.

## Security Considerations

The documentation emphasizes that "Company-shared agents are fine when everyone is in the same trust boundary." However, it recommends strict separation through dedicated VPS infrastructure, separate OS users, and firewalled access when users may be adversarial to one another.

## Core Setup Steps

**Infrastructure Requirements:**
- Hetzner VPS (Ubuntu/Debian)
- Docker and Docker Compose
- SSH access and basic command-line experience
- Model authentication credentials
- Approximately 20 minutes for complete setup

**Key Architecture Decisions:**

The guide stresses that "Docker containers are ephemeral" and mandates that all persistent state—configuration, tokens, workspace files—live on the host via volume mounts. This ensures data survives container restarts and rebuilds.

## Critical Implementation Details

**Binary Installation Pattern:**

The Dockerfile must include all required external binaries (such as `gog`, `goplaces`, `wacli`) at image build time. Runtime installations are lost during container restarts. The example Dockerfile demonstrates downloading and extracting binaries into `/usr/local/bin/` during the build process.

**Port Configuration:**

The default setup binds the Gateway to `127.0.0.1:18789` (loopback-only), requiring SSH tunneling from your laptop for security. Direct port exposure is possible but requires manual firewall management and token-based authentication.

**Persistence Table:**

Critical state includes gateway configuration, OAuth tokens, skill configurations, agent workspace artifacts, WhatsApp sessions, and Gmail keyrings—all stored in `/home/node/.openclaw/` via host volume mounts.

## Advanced Deployment

Community-maintained Terraform configurations provide infrastructure-as-code alternatives with automated provisioning, security hardening, and disaster recovery capabilities via the [openclaw-terraform-hetzner](https://github.com/andreesg/openclaw-terraform-hetzner) repository.
