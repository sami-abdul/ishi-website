# Pairing Command Documentation

## Overview

The `openclaw pairing` command manages direct message pairing requests for supported channels.

## Key Functionality

This tool allows users to list pending pairing requests and approve them. You can "Approve or inspect DM pairing requests (for channels that support pairing)."

## Command Examples

**Listing pairings:**
- Basic syntax: `openclaw pairing list telegram`
- With account specification: `openclaw pairing list --channel telegram --account work`
- JSON output: `openclaw pairing list telegram --json`

**Approving pairings:**
- Standard approval: `openclaw pairing approve telegram <code>`
- With notifications: `openclaw pairing approve --channel telegram --account work <code> --notify`

## Important Details

- Channel names can be provided as positional arguments or via the `--channel` flag
- Multi-account channels support the `--account <accountId>` parameter
- The approve command accepts both `--account` and `--notify` options
- Single pairing-capable channel setups allow simplified syntax: `pairing approve <code>`

## Related Resources

The pairing flow is documented separately in the channel pairing section of the OpenClaw documentation.
