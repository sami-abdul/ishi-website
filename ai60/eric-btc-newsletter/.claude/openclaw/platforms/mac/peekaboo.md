# Peekaboo Bridge

## Overview

OpenClaw can host PeekabooBridge as a local UI automation broker. The system enables the `peekaboo` CLI to drive macOS UI automation while leveraging the app's existing TCC permissions.

## Key Capabilities

The bridge operates as a thin broker rather than a full interface. "Visual overlays stay in Peekaboo.app; OpenClaw is a thin broker host." The setup reuses macOS security permissions already granted to the OpenClaw application.

## Setup Instructions

Users can activate the bridge through the macOS app settings menu by selecting **Enable Peekaboo Bridge**. When enabled, OpenClaw launches a local UNIX socket server. Disabling it stops the server and causes `peekaboo` to fall back to alternative hosts.

## Host Discovery

Peekaboo clients attempt connections in a specific sequence:
1. Peekaboo.app (full experience)
2. Claude.app (if present)
3. OpenClaw.app (broker mode)

Users can verify active hosts using `peekaboo bridge status --verbose` or override the default socket with an environment variable.

## Security Features

The bridge validates "caller code signatures; an allowlist of TeamIDs is enforced." Requests include a ~10-second timeout, and missing permissions generate clear error messages instead of prompting system dialogs.

## Data Handling

Snapshots reside in memory with automatic expiration. Recapturing from the client is necessary for extended retention.