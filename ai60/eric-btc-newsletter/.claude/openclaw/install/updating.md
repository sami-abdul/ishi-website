# OpenClaw Update Documentation

## Overview
OpenClaw provides multiple pathways for updating the system, with emphasis on treating updates like infrastructure deployments that require verification checks and restarts.

## Primary Update Methods

**Website Installer (Recommended)**
The preferred approach involves re-running the installation script, which automatically detects existing installations and performs in-place upgrades:

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

Key options include `--no-onboard` to skip the wizard and `--install-method git` for source-based installations.

**Global Package Manager Updates**
For npm or pnpm installations, users can upgrade directly:

```bash
npm i -g openclaw@latest
pnpm add -g openclaw@latest
```

**Source Installation Updates**
The `openclaw update` command provides a structured flow for git-based checkouts, performing validation, dependency installation, compilation, and diagnostics before restarting the gateway.

## Pre-Update Preparation

Documentation recommends documenting your installation method (global vs. source), how the Gateway currently runs (foreground vs. supervised service), and creating snapshots of configuration files, credentials, and workspace directories.

## Advanced Features

**Update Channels**
Users can switch between release channels—stable, beta, or dev—to control update cadence and timing.

**Auto-Updater**
An optional automated update feature is disabled by default but configurable with staggered rollout capabilities for production stability.

**Health Verification**
"Always Run: `openclaw doctor`" emphasizes that this diagnostic command "repair + migrate + warn" and should follow every update.

## Rollback Procedures

If issues arise, users can pin specific versions via package managers or checkout particular commit dates when running from source repositories.
