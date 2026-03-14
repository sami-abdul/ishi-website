# Feishu Bot Integration Guide

## Overview

OpenClaw's Feishu plugin enables team chat integration through Feishu (Lark), a collaboration platform. The system uses WebSocket connections rather than public webhooks, eliminating exposure requirements.

## Key Setup Steps

**Installation**: The plugin comes bundled with current OpenClaw releases. For older installations, run: `openclaw plugins install @openclaw/feishu`

**Configuration Methods**:
- Interactive wizard: `openclaw onboard` (recommended)
- CLI approach: `openclaw channels add`
- Direct config file editing in `~/.openclaw/openclaw.json`
- Environment variables: `FEISHU_APP_ID` and `FEISHU_APP_SECRET`

## Creating a Feishu App

Access the [Feishu Open Platform](https://open.feishu.cn/app) and create an enterprise app. During setup, you'll need to:

1. Copy your **App ID** (format: `cli_xxx`) and **App Secret**
2. Import required permissions via batch import functionality
3. Enable bot capability and set a bot name
4. Configure event subscription using "Use long connection to receive events"
5. Add the `im.message.receive_v1` event
6. Publish the app through version management

## Access Control Options

**Direct Messages**: Default policy requires pairing codes for unknown users. Approve with: `openclaw pairing approve feishu <CODE>`

**Group Chats**: Configure via `groupPolicy` setting:
- `"open"` allows all groups (default)
- `"allowlist"` restricts to specified groups
- `"disabled"` turns off group messaging

Groups require @mentions by default but can be configured otherwise per chat ID.

## Configuration Example

```json5
{
  channels: {
    feishu: {
      enabled: true,
      accounts: {
        main: {
          appId: "cli_xxx",
          appSecret: "xxx",
          botName: "My AI assistant",
        },
      },
    },
  },
}
```

## Gateway Management

Start the gateway with `openclaw gateway`. Monitor status using `openclaw gateway status` and view logs with `openclaw logs --follow`.

## Supported Message Types

**Incoming**: Text, rich text posts, images, files, audio, video, stickers

**Outgoing**: Text, images, files, audio, and partial rich text support
