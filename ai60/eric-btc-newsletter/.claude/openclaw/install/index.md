# OpenClaw Installation Guide

## System Requirements

OpenClaw requires Node 22+ across macOS, Linux, or Windows. The installation script handles Node detection automatically. Windows users should consider WSL2 for optimal performance.

## Primary Installation Method

The installer script is the recommended approach. For macOS/Linux/WSL2, run:

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

Windows PowerShell users should execute:

```powershell
iwr -useb https://openclaw.ai/install.ps1 | iex
```

To skip the onboarding wizard, append `--no-onboard` to either command.

## Alternative Installation Routes

**npm/pnpm Installation**: If Node 22+ is already installed, you can install globally via package managers. The npm approach is straightforward, while pnpm requires explicit approval for build scripts through the `approve-builds` command.

**From Source**: Contributors can clone the repository, run `pnpm install`, build the UI and main application, then link globally or run commands directly from the checkout.

**Specialized Deployments**: Docker, Podman, Nix, Ansible, and Bun installations are available for containerized, declarative, automated, or CLI-only setups.

## Post-Installation Verification

Run these commands to ensure proper setup:

- `openclaw doctor` — identifies configuration issues
- `openclaw status` — shows gateway status
- `openclaw dashboard` — launches the browser interface

## PATH Troubleshooting

If the `openclaw` command isn't recognized, verify that your npm global bin directory is in your system PATH. Use `npm prefix -g` to locate it, then add the directory to your shell startup file if needed.
