# OpenClaw Installer Internals

OpenClaw provides three installation scripts for different platforms and use cases:

## Overview

The three installer scripts are:

1. **install.sh** — For macOS, Linux, and WSL environments
2. **install-cli.sh** — For local prefix installations without system Node dependency
3. **install.ps1** — For Windows using PowerShell

## Key Installation Methods

Both `install.sh` and `install.ps1` support two approaches:

- **npm method** (default): Global package installation via npm
- **git method**: Repository cloning, dependency installation with pnpm, building, and wrapper script creation

## Quick Start Commands

For bash environments:
```bash
curl -fsSL --proto '=https' --tlsv1.2 https://openclaw.ai/install.sh | bash
```

For PowerShell on Windows:
```powershell
iwr -useb https://openclaw.ai/install.ps1 | iex
```

For isolated installations:
```bash
curl -fsSL --proto '=https' --tlsv1.2 https://openclaw.ai/install-cli.sh | bash
```

## Notable Features

- **Node.js requirement**: Version 22 or higher is enforced across all installers
- **Post-install steps**: Scripts run diagnostics and optionally launch onboarding workflows
- **CI/automation support**: Non-interactive flags (`--no-prompt`, `--no-onboard`) enable predictable deployments
- **Environment variables**: Configuration can be controlled via `OPENCLAW_*` prefixed variables

## Common Troubleshooting

If the `openclaw` command isn't found after installation, consult Node.js path configuration documentation. Git installation is required for the git method but recommended even for npm installations to prevent dependency resolution failures.
