# voicecall Documentation

## Overview

The `voicecall` command is available through a plugin that must be installed and enabled. For comprehensive details, consult the primary documentation at the [Voice Call plugin page](/plugins/voice-call).

## Frequently Used Commands

- **Status checks**: Monitor ongoing calls using the `status` command with a call identifier
- **Initiating calls**: Place calls with the `call` command, specifying recipient numbers, messages, and operational modes
- **Call continuation**: Send additional messages during active calls via the `continue` command
- **Call termination**: End calls with the `end` command

## Webhook Exposure Configuration

The plugin supports three modes for exposing webhook endpoints:

- **Serve mode**: Uses Tailscale Serve
- **Funnel mode**: Uses Tailscale Funnel
- **Off mode**: Disables webhook exposure

## Important Security Consideration

"Only expose the webhook endpoint to networks you trust. Prefer Tailscale Serve" over alternative methods when feasible. This protects against unauthorized access to voice-call functionality.
