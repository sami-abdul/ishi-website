# Zalo Personal Integration Overview

## Key Information

The Zalo Personal integration is an **experimental, unofficial plugin** that automates personal Zalo accounts through the `zca-js` library within OpenClaw. According to the documentation, "This integration automates a personal Zalo account via native zca-js inside OpenClaw."

### Important Warning

Users should be aware that this unofficial integration carries risk. The documentation cautions: "This is an unofficial integration and may result in account suspension/ban."

## Setup Process

Installation requires the plugin package, followed by QR code authentication on the Gateway machine. The basic configuration involves enabling the channel and restarting the system. Direct message access defaults to a pairing mode requiring initial approval.

## Core Capabilities

- Operates entirely within the OpenClaw process using JavaScript APIs
- Supports text, media, and link replies
- Implements typing indicators and message reactions
- Handles delivery and read acknowledgements
- Chunks outbound text to approximately 2000 characters due to client limitations

## Access Control Features

The integration offers granular controls including:
- DM policies (pairing, allowlist, open, or disabled)
- Group allowlists with optional mention requirements
- Multi-account support through named profiles
- Sender authorization checks for group messages and control commands

## Resources

Users can discover peer and group information using the directory CLI commands and resolve names to IDs during configuration setup.
