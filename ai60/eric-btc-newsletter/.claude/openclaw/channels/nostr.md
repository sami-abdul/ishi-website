# Nostr Channel Documentation

## Overview
The Nostr plugin is an optional, disabled-by-default channel that integrates OpenClaw with the decentralized Nostr protocol, enabling the bot to receive and respond to encrypted direct messages via NIP-04.

## Installation Options

Users can install Nostr through the onboarding wizard or manually:

```bash
openclaw plugins install @openclaw/nostr
```

For development workflows, a local path installation is available using the `--link` flag.

## Essential Configuration

The setup requires a Nostr keypair and private key configuration:

```json
{
  "channels": {
    "nostr": {
      "privateKey": "${NOSTR_PRIVATE_KEY}"
    }
  }
}
```

Keys are accepted in `nsec` or 64-character hexadecimal formats.

## Access Control Features

Three DM policies govern message handling:

- **Pairing** (default): Provides codes to unknown senders
- **Allowlist**: Restricts messages to approved pubkeys
- **Open**: Accepts all messages when configured with `allowFrom: ["*"]`

## Network Configuration

The plugin connects to Nostr relays with defaults of `relay.damus.io` and `nos.lol`. Users can customize relay lists for redundancy, though 2-3 relays are recommended to balance reliability and latency.

## Protocol Support Status

NIP-01 (basic events and profiles) and NIP-04 (encrypted DMs) are currently supported. NIP-17 (gift-wrapped messages) and NIP-44 (versioned encryption) are planned features.

## Key Security Recommendations

Private keys should never be hardcoded. The documentation emphasizes using environment variables and considering allowlist policies for production deployments.
