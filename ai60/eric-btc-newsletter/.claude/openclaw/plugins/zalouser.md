# Zalo Personal Plugin Documentation

## Overview

The Zalo Personal plugin enables OpenClaw to automate personal Zalo user accounts through the `zca-js` library. The channel identifier is `zalouser` to distinguish this unofficial automation from potential future official integrations.

## Key Characteristics

**Execution Location:** The plugin operates within the Gateway process itself, requiring installation and configuration on the machine running the Gateway.

**Installation Options:**
- NPM installation: `openclaw plugins install @openclaw/zalouser`
- Local development: Install from a local folder and run `pnpm install`

Both methods require a Gateway restart afterward.

## Configuration

Settings are placed under `channels.zalouser` in the config file:

```json5
{
  channels: {
    zalouser: {
      enabled: true,
      dmPolicy: "pairing",
    },
  },
}
```

## Available Commands

The CLI supports login/logout, status checks, message sending, and directory operations like querying peers and groups.

## Agent Integration

The `zalouser` tool provides multiple actions including message sending, image sharing, link posting, friend/group management, and user status retrieval. Messages support reaction functionality.

## Important Notice

"Unofficial automation may lead to account suspension/ban. Use at your own risk."
