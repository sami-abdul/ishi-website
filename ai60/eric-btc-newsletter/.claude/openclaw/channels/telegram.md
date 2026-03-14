# Telegram Bot API Integration Guide

## Overview

This documentation covers OpenClaw's Telegram Bot API integration, which is production-ready for direct messages and group conversations using grammY. The default mode uses long polling, with webhook mode available as an option.

## Quick Setup Process

### Step 1: Create Bot Token
Contact @BotFather on Telegram, run `/newbot`, and save the generated token.

### Step 2: Configure Token and DM Policy
Add the bot token to your configuration:

```json5
{
  channels: {
    telegram: {
      enabled: true,
      botToken: "123:abc",
      dmPolicy: "pairing",
      groups: { "*": { requireMention: true } },
    },
  },
}
```

Alternatively, use the `TELEGRAM_BOT_TOKEN` environment variable for the default account.

### Step 3: Start Gateway and Approve Access
```bash
openclaw gateway
openclaw pairing list telegram
openclaw pairing approve telegram <CODE>
```

Note that pairing codes expire after 60 minutes.

### Step 4: Add Bot to Groups
Include the bot in group chats and configure `channels.telegram.groups` settings to match your access requirements.

## Access Control Models

### Direct Message Policies

The `dmPolicy` setting controls who can message the bot:

- **pairing** (default): Users must be approved through pairing
- **allowlist**: Explicit numeric Telegram user IDs permitted
- **open**: All users allowed (requires `allowFrom: ["*"]`)
- **disabled**: DMs blocked entirely

For allowlist and pairing flows, `openclaw doctor --fix` can migrate legacy username entries to numeric IDs.

### Group Access Controls

Groups use two layered controls:

1. **Which groups are permitted** via `channels.telegram.groups`
2. **Which senders within groups can trigger the bot** via `groupPolicy`

Scopes for `groupPolicy`:
- **open**: Any group member
- **allowlist** (default): Specific user IDs only
- **disabled**: Groups blocked

**Important distinction**: Place negative group chat IDs (like `-1001234567890`) under `groups`, not under `groupAllowFrom`. User IDs belong in `groupAllowFrom`.

## Mention Requirements

By default, group messages require bot mentions. Configuration options:

```json5
{
  channels: {
    telegram: {
      groups: {
        "*": { requireMention: false },
      },
    },
  },
}
```

Mention patterns can come from:
- Native `@botusername` mention
- Custom patterns in agent or message configuration
- Session commands: `/activation always` or `/activation mention`

## Finding Telegram User IDs

**Safe method** (no third-party bots):
1. Message your bot
2. Run `openclaw logs --follow`
3. Read the `from.id` field

**Official method**:
```bash
curl "https://api.telegram.org/bot<bot_token>/getUpdates"
```

## Telegram-Side Settings

### Privacy Mode Configuration

Telegram bots operate in Privacy Mode by default, which restricts group message visibility. To fix visibility issues:

- Use `/setprivacy` with BotFather to disable Privacy Mode, or
- Make the bot a group administrator

After toggling Privacy Mode, remove and re-add the bot to each group for changes to take effect.

### Important BotFather Commands

- `/setjoingroups`: Control whether the bot can be added to groups
- `/setprivacy`: Manage group message visibility
- `/setmycommands`: Register command menu

## Advanced Features

### Live Stream Preview (Message Editing)

OpenClaw can stream partial replies in real-time using message edits:

```json5
{
  channels: {
    telegram: {
      streaming: "partial",  // off | partial | block | progress
    },
  },
}
```

For text-only replies, the preview message is edited in place with no additional messages sent.

### Forum Topics and Thread Behavior

Forum supergroups support per-topic isolation with thread IDs appended as `:topic:<threadId>`.

**Per-topic agent routing**:
```json5
{
  channels: {
    telegram: {
      groups: {
        "-1001234567890": {
          topics: {
            "1": { agentId: "main" },
            "3": { agentId: "zu" },
            "5": { agentId: "coder" }
          }
        }
      }
    }
  }
}
```

Each topic generates its own session key: `agent:zu:telegram:group:-1001234567890:topic:3`

### Inline Buttons

Configure button availability:

```json5
{
  channels: {
    telegram: {
      capabilities: {
        inlineButtons: "allowlist",  // off | dm | group | all | allowlist
      },
    },
  },
}
```

Button example:
```json5
{
  action: "send",
  channel: "telegram",
  to: "123456789",
  message: "Choose an option:",
  buttons: [
    [
      { text: "Yes", callback_data: "yes" },
      { text: "No", callback_data: "no" },
    ],
  ],
}
```

### Media Handling

**Audio messages**: Use tag `[[audio_as_voice]]` to force voice note format

**Video messages**: Use `asVideoNote: true` for video notes (no captions)

**Stickers**: Static WEBP stickers are processed; animated TGS and video WEBM formats are skipped

### Reactions

Enable reaction handling:
- `reactionNotifications`: `off | own | all` (default: `own`)
- `reactionLevel`: `off | ack | minimal | extensive` (default: `minimal`)

The `own` setting limits notifications to reactions on bot-sent messages only.

### Custom Commands Menu

Register custom commands beyond native ones:

```json5
{
  channels: {
    telegram: {
      customCommands: [
        { command: "backup", description: "Git backup" },
        { command: "generate", description: "Create an image" },
      ],
    },
  },
}
```

Commands use lowercase alphanumeric characters and underscores, with a maximum length of 32 characters.

## Polling vs Webhook Mode

**Default**: Long polling via grammY runner

**Webhook mode** requires:
- `webhookUrl`: Public endpoint for receiving updates
- `webhookSecret`: Security token (required)
- Optional `webhookPath` (default: `/telegram-webhook`)
- Optional `webhookHost` (default: `127.0.0.1`)
- Optional `webhookPort` (default: `8787`)

## Limits and Configuration

- **Text chunk size**: Default 4000 characters via `textChunkLimit`
- **Chunk mode**: Use `"newline"` to split on paragraph boundaries before length limits
- **Media cap**: 100 MB default via `mediaMaxMb`
- **History limit**: 50 messages default for group context
- **Timeout**: Configurable via `timeoutSeconds`

## CLI Commands

Send messages:
```bash
openclaw message send --channel telegram --target 123456789 --message "hi"
openclaw message send --channel telegram --target @username --message "hi"
```

Create polls:
```bash
openclaw message poll --channel telegram --target 123456789 \
  --poll-question "Ship it?" --poll-option "Yes" --poll-option "No"
```

Forum topic polls:
```bash
openclaw message poll --channel telegram --target -1001234567890:topic:42 \
  --poll-question "Pick a time" --poll-option "10am" --poll-option "2pm" \
  --poll-duration-seconds 300 --poll-public
```

## Troubleshooting

### Bot Doesn't Respond to Non-Mention Messages

- Verify Privacy Mode is disabled via BotFather `/setprivacy`
- Ensure bot is re-added to group after changing privacy settings
- Test with `/activation always` session command
- Check logs with `openclaw logs --follow`

### Bot Not Seeing Group Messages

- Confirm group is listed in `channels.telegram.groups` or includes `"*"`
- Verify bot membership in the group
- Review skip reasons in logs

### Commands Not Working

- Confirm sender authorization through pairing or `allowFrom`
- Check that authorization applies even when `groupPolicy: "open"`
- Verify outbound HTTPS connectivity to `api.telegram.org` for command registration

### Network Instability

Common solutions:
- Route API calls through a proxy via `channels.telegram.proxy`
- Force IPv4-first resolution with `channels.telegram.network.autoSelectFamily: false`
- Override DNS result order with `channels.telegram.network.dnsResultOrder: "ipv4first"`
- Check DNS resolution: `dig +short api.telegram.org A` and `dig +short api.telegram.org AAAA`

## Configuration Reference

**Essential settings**:
- `channels.telegram.enabled`: Activate the channel
- `channels.telegram.botToken`: Token from BotFather
- `channels.telegram.tokenFile`: Read token from file (rejects symlinks)
- `channels.telegram.dmPolicy`: Access control for direct messages
- `channels.telegram.allowFrom`: DM allowlist (numeric IDs)
- `channels.telegram.groupPolicy`: Group access control
- `channels.telegram.groupAllowFrom`: Group sender allowlist
- `channels.telegram.groups`: Per-group configuration and allowlist

**Advanced settings**:
- `channels.telegram.streaming`: Live preview mode
- `channels.telegram.capabilities.inlineButtons`: Button visibility scope
- `channels.telegram.actions.*`: Gate specific actions
- `channels.telegram.replyToMode`: Control reply threading
- `channels.telegram.webhook*`: Webhook configuration
- `channels.telegram.proxy`: HTTP/SOCKS proxy for API calls
- `channels.telegram.network.*`: Network behavior overrides

## Related Documentation

- [Pairing](/channels/pairing)
- [Channel routing](/channels/channel-routing)
- [Multi-agent routing](/concepts/multi-agent)
- [Channel troubleshooting](/channels/troubleshooting)
