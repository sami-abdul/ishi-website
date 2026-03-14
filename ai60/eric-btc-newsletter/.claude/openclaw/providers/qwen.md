# Qwen Documentation Page

## Overview

The page provides setup instructions for integrating Qwen's free-tier OAuth flow, supporting Qwen Coder and Qwen Vision models with a limit of "2,000 requests/day, subject to Qwen rate limits."

## Key Setup Steps

**Enable the plugin:**
```bash
openclaw plugins enable qwen-portal-auth
```

**Authenticate via OAuth:**
```bash
openclaw models auth login --provider qwen-portal --set-default
```

This executes a device-code OAuth flow and creates entries in your `models.json` file.

## Available Models

Two model identifiers are provided:
- `qwen-portal/coder-model`
- `qwen-portal/vision-model`

Switch between them using: `openclaw models set qwen-portal/coder-model`

## Important Details

The documentation mentions that "Tokens auto-refresh; re-run the login command if refresh fails or access is revoked." The default API endpoint is `https://portal.qwen.ai/v1`, though users can override this in their configuration if Qwen specifies a different URL.

The system supports credential synchronization from existing Qwen Code CLI logins stored at `~/.qwen/oauth_creds.json`.
