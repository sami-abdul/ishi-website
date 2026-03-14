# Discord Bot Integration Guide

## Overview
This documentation covers setting up and configuring OpenClaw's Discord bot integration for direct messaging and guild channel conversations.

## Quick Setup Summary

The setup process involves seven main steps:

1. **Create Discord Application**: Visit the Discord Developer Portal and create a new application with bot credentials.

2. **Enable Required Intents**: Activate Message Content Intent (required), Server Members Intent (recommended), and optionally Presence Intent.

3. **Secure Bot Token**: Generate and securely store your bot token using environment variables or configuration files.

4. **Configure OAuth2**: Set scopes (`bot`, `applications.commands`) and permissions including View Channels, Send Messages, Read Message History, Embed Links, and Attach Files.

5. **Collect IDs**: Enable Developer Mode in Discord to copy your Server ID and User ID.

6. **Enable DMs**: Configure server privacy settings to allow direct messages from bot users.

7. **Complete Pairing**: Initialize the bot with `openclaw config set` commands and approve the pairing code.

## Key Configuration Features

**Access Control**: Discord integration supports three policy modes—pairing (default for DMs), allowlist, and open—with guild-level and channel-level restrictions available.

**Guild Workspaces**: Configure individual Discord channels as isolated session contexts where each channel maintains separate conversation history and memory.

**Interactive Components**: The system supports Discord components v2 including buttons, select menus, and modal forms with role-based user restrictions.

**Voice Support**: Join voice channels for realtime conversations using `/vc join|leave|status` commands (requires native commands enabled).

**Message Features**: Configure streaming responses, reply threading, reaction notifications, and history limits per channel or DM context.

## Advanced Capabilities

- **Thread Bindings**: Bind Discord threads to specific session targets or subagent instances
- **ACP Integration**: Persistent "always-on" workspaces for automated agents
- **PluralKit Support**: Map proxied messages to system member identities
- **Exec Approvals**: Button-based command approval workflows in DMs or channels
- **Role-Based Routing**: Direct Discord members to different agents based on role assignments

## Security Considerations

Store bot tokens securely using environment variables (`DISCORD_BOT_TOKEN`) rather than plain text configuration. Enable least-privilege Discord permissions and avoid Administrator role unless explicitly required. Use numeric IDs in configuration for reliable audits rather than usernames or tags.

## Common Troubleshooting

Guild messages may be blocked due to missing intents, incorrect policy settings, mention requirements, or allowlist misconfigurations. Long-running handlers can timeout; adjust `listenerTimeout` and `inboundWorker.runTimeoutMs` parameters. Bot-to-bot loops are prevented by default but require careful allowlist configuration if `allowBots=true`.
