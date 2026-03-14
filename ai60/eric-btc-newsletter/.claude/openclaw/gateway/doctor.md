# OpenClaw Doctor

## Overview

The `openclaw doctor` command functions as OpenClaw's repair and migration utility. It diagnoses configuration issues, verifies system health, and provides actionable remediation steps.

## Quick Start Commands

Basic invocation:
```bash
openclaw doctor
```

Key usage variants include:
- `--yes`: Accept defaults without prompting
- `--repair`: Apply recommended fixes automatically
- `--repair --force`: Apply aggressive repairs including custom config overwrites
- `--non-interactive`: Safe migrations only, no prompts requiring human confirmation
- `--deep`: Scan system services for additional gateway installations

## Primary Functions

The tool performs these core operations:

**Configuration & State Management:**
- UI protocol freshness verification
- Configuration normalization for legacy values
- On-disk state migration (sessions, agent directories, authentication)
- Legacy cron job store cleanup and migration

**Health & Diagnostics:**
- Service health checks with restart prompts
- Skills eligibility assessment
- Model authentication status (OAuth expiry detection and refresh)
- State directory integrity and permission validation

**System Integration:**
- Sandbox image repair when enabled
- Gateway service migration and cleanup
- Supervisor config audits (launchd/systemd/schtasks)
- Port collision diagnostics on default gateway port 18789
- systemd linger verification for Linux

**Security:**
- Config file permission checks (enforces chmod 600 locally)
- Direct message policy warnings
- Gateway authentication readiness assessment

## Notable Migrations

The doctor automatically converts legacy configuration structures, including:
- Routing rules to channel-specific configurations
- Agent definitions to standardized agent list format
- Browser SSRF policies with updated terminology
- WhatsApp authentication state relocation

## Key Behavioral Notes

Migrations are idempotent and best-effort. The Gateway itself auto-runs doctor migrations on startup when detecting legacy formats. Interactive runs offer update opportunities for git-based installations. The tool respects SecretRef credential configurations and avoids overwriting them with plaintext values.
