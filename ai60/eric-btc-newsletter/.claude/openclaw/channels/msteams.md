# Microsoft Teams Plugin Documentation

## Overview

The Microsoft Teams plugin enables OpenClaw to integrate with Microsoft Teams for direct messaging, group chats, and channel communications. As of January 2026, this component has moved out of the core installation and must be installed separately.

## Installation

Install via npm registry:
```bash
openclaw plugins install @openclaw/msteams
```

Or from a local git repository:
```bash
openclaw plugins install ./extensions/msteams
```

## Core Setup Requirements

**Four essential steps:**

1. Install the Microsoft Teams plugin
2. Create an Azure Bot resource with App ID, client secret, and tenant ID
3. Configure OpenClaw with bot credentials
4. Expose the webhook endpoint (`/api/messages` on port 3978 by default) via public URL or tunnel

## Azure Bot Creation

Visit the [Azure Bot creation portal](https://portal.azure.com/#create/Microsoft.AzureBot) and configure:
- Unique bot handle
- Single Tenant app type (multi-tenant deprecated after 2025-07-31)
- Free pricing tier suitable for development

Retrieve credentials from the bot's Configuration page and App Registration settings.

## Minimal Configuration

```json
{
  "channels": {
    "msteams": {
      "enabled": true,
      "appId": "<APP_ID>",
      "appPassword": "<APP_PASSWORD>",
      "tenantId": "<TENANT_ID>",
      "webhook": { "port": 3978, "path": "/api/messages" }
    }
  }
}
```

Environment variables are also supported (`MSTEAMS_APP_ID`, `MSTEAMS_APP_PASSWORD`, `MSTEAMS_TENANT_ID`).

## Access Control Policies

**Direct Messages:** Default "pairing" policy requires approval before unknown senders are accepted. Use Azure AD object IDs for the allowlist (`channels.msteams.allowFrom`).

**Group Chats/Channels:** Default "allowlist" policy blocks group interaction unless explicitly configured. Configure with `channels.msteams.groupAllowFrom` or set `groupPolicy: "open"` for mention-gated access.

## Teams Manifest Requirements

The app manifest must include:
- `botId` matching the Azure Bot App ID
- Scopes: `personal`, `team`, `groupChat`
- `supportsFiles: true` for personal scope file handling
- Resource-specific consent (RSC) permissions
- Icons: 32x32 outline and 192x192 color PNG files

**Critical permissions for channels:**
- `ChannelMessage.Read.Group` and `ChannelMessage.Send.Group`
- `Member.Read.Group`, `Owner.Read.Group`
- `ChatMessage.Read.Chat` for group chats

## Key Capabilities & Limitations

**Text and DM attachments work by default.** Channel and group file sending requires SharePoint integration with Graph API permissions (`Sites.ReadWrite.All`).

Image and file attachments in channels only display as HTML stubs without Graph API permissions. The `ChannelMessage.Read.All` permission enables historical message retrieval and attachment downloads.

## Local Development

Teams webhooks require public URLs. Use tunneling services:
- **ngrok:** `ngrok http 3978` for HTTPS tunnel
- **Tailscale Funnel:** `tailscale funnel 3978` for Tailscale-based access

Set the Azure Bot messaging endpoint to your tunnel URL.

## Reply Styles: Posts vs Threads

Teams supports two channel UI styles that affect reply rendering:
- **Posts (classic):** `replyStyle: "thread"`
- **Threads (Slack-like):** `replyStyle: "top-level"`

Configure per-channel since the Teams API doesn't expose which style a channel uses, and mismatches cause awkward nested replies.

## File Sharing in Group Chats

Bots lack personal OneDrive access, so group chat file sharing requires uploading to SharePoint:

1. Add `Sites.ReadWrite.All` Graph permission and grant admin consent
2. Obtain your SharePoint site ID via Graph API
3. Configure `sharePointSiteId` in OpenClaw settings

Organization-wide sharing links are created without `Chat.Read.All`; adding this permission enables per-user sharing links (more secure).

## Polling & Adaptive Cards

Polls are sent as Adaptive Cards (no native Teams poll API exists). Votes are recorded locally in `~/.openclaw/msteams-polls.json` while the gateway runs.

Send arbitrary Adaptive Cards via the `message` tool or CLI using the `card` parameter.

## Target Format Examples

- User by ID: `user:40a1a0ed-4ff2-4164-a219-55518990c197`
- User by name: `user:John Smith`
- Group/channel: `conversation:19:abc123...@thread.tacv2`

## Common Troubleshooting

"Images not showing in channels" typically indicates missing Graph permissions or incomplete Teams app reinstallation. Manifest version increments and full Teams client restarts are necessary for permission updates to take effect.

"No responses in channel" often stems from the default `requireMention: true` setting—adjust per team or channel as needed.

**Sideload issues:** Use "Upload an app to your org's app catalog" rather than "Upload a custom app" if sideloading encounters restrictions.
