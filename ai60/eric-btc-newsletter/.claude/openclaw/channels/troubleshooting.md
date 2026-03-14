# Channel Troubleshooting Documentation

This page provides diagnostic guidance for messaging channel connectivity issues in OpenClaw.

## Initial Diagnostics

The recommended troubleshooting sequence includes running: `openclaw status`, `openclaw gateway status`, `openclaw logs --follow`, `openclaw doctor`, and `openclaw channels status --probe`.

A properly functioning system should display "Runtime: running," "RPC probe: ok," and channel probes indicating connected/ready status.

## Platform-Specific Issues

The documentation covers failure patterns across eight messaging platforms:

**WhatsApp** issues often involve unapproved senders, mention requirements in groups, or credential problems requiring re-login.

**Telegram** complications include pairing approvals, privacy mode settings affecting group visibility, and network routing to Telegram's API servers.

**Discord** problems typically stem from permission gaps (message content intent), guild/channel allowlists, or mention gating configurations.

**Slack** challenges involve socket mode validation, token verification, and channel allowlist settings.

**iMessage and BlueBubbles** require webhook verification and macOS privacy permissions (TCC) management.

**Signal** difficulties center on daemon connectivity, account verification, and group allowlist configuration.

**Matrix** obstacles involve room policies, encryption support, and sender approval workflows.

## Available Resources

Each channel section references dedicated troubleshooting pages with deeper technical guidance accessible via internal documentation links.
