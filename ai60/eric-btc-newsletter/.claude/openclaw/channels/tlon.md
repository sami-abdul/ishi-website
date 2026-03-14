# Tlon Plugin Documentation

## Overview
"Tlon is a decentralized messenger built on Urbit. OpenClaw connects to your Urbit ship and can respond to DMs and group chat messages."

## Installation
The plugin requires separate installation via npm or local checkout since it doesn't ship with the core package.

## Key Features Supported
- Direct messages and group mentions (requiring @mention by default)
- Thread replies that auto-respond within threads
- Markdown formatting conversion to Tlon's native format
- Image uploads to Tlon storage
- Per-channel authorization rules

## Configuration Highlights
Setup requires four essentials: a ship URL, login code, ship name, and optional owner designation. The system provides SSRF protection by default but allows explicit opt-in for private network access.

## Access Control Options
Administrators can implement DM allowlists, owner-based approval workflows, or per-channel authorization rules distinguishing between "restricted" and "open" modes.

## Notable Limitations
Reactions and polls remain unsupported, though reactions are available through the bundled skill. Group channel auto-discovery activates by default but can be disabled.

## Troubleshooting Approach
The documentation recommends running status checks and verifying configuration—particularly ensuring senders match allowlist criteria or that an owner ship is configured for approval delegation.
