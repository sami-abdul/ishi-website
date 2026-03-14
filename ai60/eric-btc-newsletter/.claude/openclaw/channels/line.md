# LINE Plugin Documentation

## Overview
The LINE plugin enables OpenClaw to connect with LINE Messaging API through webhook integration. It supports direct messages, group chats, media, locations, Flex messages, template messages, and quick replies, though reactions and threads remain unsupported.

## Installation
Install via package manager or local git repository:
```bash
openclaw plugins install @openclaw/line
# or locally:
openclaw plugins install ./extensions/line
```

## Configuration Steps
1. Access LINE Developers Console at https://developers.line.biz/console/
2. Create a Provider and add a Messaging API channel
3. Retrieve Channel access token and Channel secret from settings
4. Enable webhook functionality in API settings
5. Configure webhook URL to your HTTPS gateway endpoint: `https://gateway-host/line/webhook`

## Minimal Configuration
```json5
{
  channels: {
    line: {
      enabled: true,
      channelAccessToken: "TOKEN_HERE",
      channelSecret: "SECRET_HERE",
      dmPolicy: "pairing",
    },
  },
}
```

Configuration supports environment variables (`LINE_CHANNEL_ACCESS_TOKEN`, `LINE_CHANNEL_SECRET`), token/secret files, and multiple accounts with custom webhook paths.

## Access Control
Direct messages default to pairing mode, requiring user approval. Configuration options include:
- `dmPolicy`: pairing | allowlist | open | disabled
- `groupPolicy`: allowlist | open | disabled
- `allowFrom`: allowlisted user IDs
- Per-group overrides available

Valid LINE IDs: User (U + 32 hex), Group (C + 32 hex), Room (R + 32 hex)

## Message Handling
- Text chunks at 5000 characters
- Markdown converts to Flex cards when applicable
- Streaming responses buffer for full chunks
- Media downloads capped at 10MB (configurable)

## Rich Message Support
Use `channelData.line` for quick replies, locations, Flex cards, and template messages. The plugin includes a `/card` command for Flex presets.

## Troubleshooting
Common issues: webhook verification failures (verify HTTPS and secret matching), missing events (confirm webhook path routing), and media errors (increase size limits).
