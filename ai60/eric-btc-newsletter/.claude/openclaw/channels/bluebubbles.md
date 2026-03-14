# BlueBubbles Integration Overview

BlueBubbles is a **macOS REST-based plugin** for iMessage integration. Here are the key points:

## Core Functionality

The documentation describes BlueBubbles as "bundled plugin that talks to the BlueBubbles macOS server over HTTP," operating through REST API calls for messages, webhooks for incoming communications, and supporting attachments, stickers, and reactions.

## Setup Requirements

1. Install the BlueBubbles server application on macOS
2. Enable the web API and configure a password in BlueBubbles settings
3. Configure OpenClaw with the server URL and password
4. Point BlueBubbles webhooks back to your gateway endpoint

## Key Features

- **Access Control**: Supports pairing codes and allowlists for direct messages and group chats
- **Advanced Actions**: Edit, unsend, reply threading, reactions (tapbacks), message effects, and group management
- **Read Receipts & Typing**: Automatic typing indicators and configurable read receipts
- **Media Support**: Handles inbound attachments and voice messages (MP3/CAF formats)
- **Mention Gating**: Group chats can require agent mentions before responding

## Security Considerations

Webhook authentication uses password matching. The documentation emphasizes: "Always set a webhook password" and notes that "Password authentication is checked before reading/parsing full webhook bodies."

## Platform Notes

Works on macOS Sequoia and Tahoe, though certain features like message editing are broken on Tahoe due to private API changes.
