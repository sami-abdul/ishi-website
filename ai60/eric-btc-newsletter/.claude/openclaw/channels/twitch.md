# Twitch Plugin Documentation

## Overview
OpenClaw's Twitch plugin enables bot integration via IRC connection, allowing message receipt and transmission in Twitch channels through a dedicated bot account.

## Installation
The plugin requires separate installation:
- **npm**: `openclaw plugins install @openclaw/twitch`
- **Local**: `openclaw plugins install ./extensions/twitch`

## Core Setup Requirements

Four essential steps establish functionality:

1. **Account Creation**: Designate a Twitch account for the bot
2. **Credential Generation**: Obtain OAuth tokens and Client ID from [Twitch Token Generator](https://twitchtokengenerator.com/)
3. **User ID Lookup**: Retrieve your permanent Twitch user ID for access control
4. **Configuration**: Set tokens via environment variable or config file

The documentation emphasizes: *"Usernames can change, allowing impersonation. User IDs are permanent."*

## Access Control (Critical)

The plugin defaults `requireMention` to `true` and strongly recommends implementing allowlists:
- **`allowFrom`**: Hard-coded user ID restrictions (most secure)
- **`allowedRoles`**: Role-based filtering (moderator, owner, vip, subscriber, all)

## Advanced Features

**Token Refresh**: Manual regeneration required for standard tokens; automatic refresh possible with custom Twitch app credentials (clientSecret + refreshToken)

**Multi-Account Support**: Single bot account can manage multiple channels using separate `accounts` configuration with distinct tokens per channel

## Technical Constraints
- **Message limit**: 500 characters, automatically chunked at word boundaries
- **No markdown**: Stripped before transmission
- **Built-in rate limiting**: Defers to Twitch's native constraints
