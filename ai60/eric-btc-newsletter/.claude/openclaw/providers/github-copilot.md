# GitHub Copilot Integration with OpenClaw

## Overview

OpenClaw supports GitHub Copilot as a model provider through two distinct approaches. The built-in `github-copilot` provider uses device-login authentication and is the default option, while the `copilot-proxy` alternative routes requests through a VS Code extension.

## Authentication Setup

To authenticate with GitHub Copilot, execute:

```bash
openclaw models auth login-github-copilot
```

This command initiates GitHub's device flow, requiring you to visit a URL and enter a code in your terminal. The process stores credentials in an auth profile for future use.

Optional configuration flags include `--profile-id` for custom profile naming and `--yes` to bypass prompts.

## Configuration

Set your default model with:

```bash
openclaw models set github-copilot/gpt-4o
```

Or add this configuration snippet:

```json5
{
  agents: { defaults: { model: { primary: "github-copilot/gpt-4o" } } },
}
```

## Key Considerations

- Authentication requires an interactive terminal
- Model availability varies by GitHub plan
- If a model is unavailable, try alternative IDs like `github-copilot/gpt-4.1`
- The login process exchanges a GitHub token for Copilot API credentials
