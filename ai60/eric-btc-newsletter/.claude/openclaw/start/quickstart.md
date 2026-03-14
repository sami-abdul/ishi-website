# Getting Started

Goal: go from zero to a first working chat with minimal setup.

**Fastest chat:** open the Control UI (no channel setup needed). Run `openclaw dashboard` and chat in the browser, or open `http://127.0.0.1:18789/` on the gateway host. Docs: [Dashboard](/web/dashboard) and [Control UI](/web/control-ui).

## Prereqs

* Node 22 or newer

Check your Node version with `node --version` if you are unsure.

## Installation Process

OpenClaw offers platform-specific installation scripts:
- macOS/Linux users execute a curl-based installer
- Windows users run a PowerShell command

Both methods point to the official OpenClaw website installation resources.

## Setup Workflow

The onboarding wizard (`openclaw onboard --install-daemon`) handles authentication, gateway configuration, and optional channel setup automatically.

## Verification Steps

Users can confirm proper installation through:
- Gateway status verification via CLI
- Control UI accessibility through `openclaw dashboard`
- Test messaging to configured channels

## Configuration Options

Three environment variables customize installation locations:
- `OPENCLAW_HOME` - primary directory
- `OPENCLAW_STATE_DIR` - state file location
- `OPENCLAW_CONFIG_PATH` - configuration file location

## Outcome

Following these steps produces a running Gateway, configured authentication, and accessible chat interface either through the Control UI or connected messaging channels.

## Additional Resources

The guide references supplementary documentation for advanced configuration, macOS app setup, and channel integration details.
